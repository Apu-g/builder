import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Download,
  Save,
  History,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { getProject, updateProject } from '../lib/storage';
import { editSite } from '../lib/ai';
import PreviewFrame from '../components/PreviewFrame';
import EditableCommand from '../components/EditableCommand';
import VersionHistory from '../components/VersionHistory';
import type { SiteConfig } from '../types';

const rendererMap: Record<string, React.LazyExoticComponent<React.FC<{ config: SiteConfig }>>> = {
  atelier: lazy(() => import('../templates/atelier/Renderer')),
  northline: lazy(() => import('../templates/northline/Renderer')),
  forma: lazy(() => import('../templates/forma/Renderer')),
  'local-table': lazy(() => import('../templates/local-table/Renderer')),
  forge: lazy(() => import('../templates/forge/Renderer')),
  motion: lazy(() => import('../templates/motion/Renderer')),
  mono: lazy(() => import('../templates/mono/Renderer')),
  commerce: lazy(() => import('../templates/commerce/Renderer')),
};

export default function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProject(projectId) : null;

  const [config, setConfig] = useState<SiteConfig | null>(project?.config ?? null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState(project?.versions ?? []);
  const [currentVersion, setCurrentVersion] = useState(project?.currentVersion ?? 0);

  const Renderer = config && project ? rendererMap[project.templateId] : undefined;

  useEffect(() => {
    if (project) {
      setConfig(project.config);
      setVersions(project.versions);
      setCurrentVersion(project.currentVersion);
    }
  }, [project]);

  const handleEdit = useCallback(
    async (change: string) => {
      if (!config || !project || isProcessing) return;
      setIsProcessing(true);
      try {
        const newConfig = await editSite({
          templateId: project.templateId,
          currentConfig: config,
          change,
        });
        const newVersion = {
          id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
          config: newConfig,
          label: change,
          createdAt: Date.now(),
        };
        const newVersions = [...versions, newVersion];
        setConfig(newConfig);
        setVersions(newVersions);
        setCurrentVersion(newVersions.length - 1);

        updateProject({
          ...project,
          config: newConfig,
          versions: newVersions,
          currentVersion: newVersions.length - 1,
        });
      } catch {
        // silently fail — mock always succeeds
      } finally {
        setIsProcessing(false);
      }
    },
    [config, project, isProcessing, versions]
  );

  const handleRestore = useCallback(
    (versionId: string) => {
      if (!project) return;
      const idx = versions.findIndex((v) => v.id === versionId);
      if (idx === -1) return;
      const restored = versions[idx];
      setConfig(restored.config);
      setCurrentVersion(idx);
      updateProject({
        ...project,
        config: restored.config,
        currentVersion: idx,
      });
    },
    [project, versions]
  );

  const handleExport = useCallback(() => {
    if (!config) return;
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.brandName.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  const handleSave = useCallback(() => {
    if (!project || !config) return;
    updateProject({ ...project, config, versions, currentVersion });
  }, [project, config, versions, currentVersion]);

  if (!project || !config) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <AlertTriangle size={40} className="mb-4 text-[var(--app-muted)]" />
        <h2
          className="mb-2 text-xl font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Project not found
        </h2>
        <p className="mb-6 text-sm text-[var(--app-muted)]">
          This project may have been deleted or the link is invalid.
        </p>
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top toolbar */}
      <div
        className="sticky top-0 z-40 flex items-center gap-2 border-b border-[var(--app-border)] px-4 py-2"
        style={{
          background: 'rgba(248,247,244,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Link
          to="/projects"
          className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>

        <div className="flex-1 text-center">
          <span
            className="text-xs font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {config.brandName}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditMode((m) => !m)}
            className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors ${
              editMode
                ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]'
            }`}
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            onClick={() => {
              setConfig({ ...config });
            }}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]"
          >
            <RefreshCw size={13} />
            Regenerate
          </button>

          <button
            onClick={handleExport}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]"
          >
            <Download size={13} />
            Export
          </button>

          <button
            onClick={handleSave}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]"
          >
            <Save size={13} />
            Save
          </button>

          <button
            onClick={() => setShowHistory((h) => !h)}
            className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors ${
              showHistory
                ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]'
            }`}
          >
            <History size={13} />
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex flex-1 flex-col overflow-auto p-4">
          <PreviewFrame device={device} config={config}>
            <Suspense
              fallback={
                <div className="flex min-h-[300px] items-center justify-center">
                  <Loader2 size={20} className="animate-spin text-[var(--app-muted)]" />
                </div>
              }
            >
              {Renderer && <Renderer config={config} />}
            </Suspense>
          </PreviewFrame>

          {/* Device switcher bar (mirrors PreviewFrame's internal one for external control) */}
          <div className="mt-3 flex justify-center">
            <div className="flex items-center gap-1 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] p-1">
              {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors ${
                    device === d
                      ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                      : 'text-[var(--app-muted)] hover:text-[var(--app-fg)]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Version history panel */}
        <AnimatePresence>
          {showHistory && (
            <div className="hidden shrink-0 p-4 lg:block">
              <VersionHistory
                versions={versions}
                currentVersion={currentVersion}
                onRestore={handleRestore}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit command bar */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky bottom-0 z-40 border-t border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(248,247,244,0.92)',
            }}
          >
            <div className="mx-auto max-w-2xl">
              <EditableCommand onSubmit={handleEdit} isProcessing={isProcessing} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
