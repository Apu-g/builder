import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { getProjects, deleteProject } from '../lib/storage';
import { getTemplate } from '../templates/index';
import { formatDate } from '../lib/utils';
import type { Project } from '../types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(getProjects());
    setConfirmDelete(null);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1
              className="text-3xl font-medium tracking-tight sm:text-4xl"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              My Projects
            </h1>
            <p className="mt-1 text-sm text-[var(--app-muted)]">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
          <Link to="/" className="btn-primary">
            <Plus size={14} />
            New project
          </Link>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--app-border)] py-20 text-center"
          >
            <p className="mb-4 text-sm text-[var(--app-muted)]">
              No projects yet. Start by choosing a template.
            </p>
            <Link to="/" className="btn-primary">
              Browse templates
            </Link>
          </motion.div>
        )}

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {projects.map((project, i) => {
              const template = getTemplate(project.templateId);
              const theme = project.palette.theme;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                >
                  {/* Mini preview */}
                  <Link
                    to={`/preview/${project.id}`}
                    className="block"
                  >
                    <div
                      className="flex flex-col gap-2 p-4 pb-5"
                      style={{ background: theme.background }}
                    >
                      <div
                        className="h-2.5 rounded-full"
                        style={{ background: theme.accent, width: '35%' }}
                      />
                      <div
                        className="mt-1 h-14 rounded-lg"
                        style={{ background: theme.accent, opacity: 0.12 }}
                      >
                        <div
                          className="ml-3 mt-2.5 h-2 rounded-full"
                          style={{ background: theme.accent, opacity: 0.35, width: '50%' }}
                        />
                        <div
                          className="ml-3 mt-1.5 h-1.5 rounded-full"
                          style={{ background: theme.accent, opacity: 0.2, width: '30%' }}
                        />
                      </div>
                      <div className="flex gap-2">
                        {[0, 1, 2].map((j) => (
                          <div
                            key={j}
                            className="flex-1 rounded-md"
                            style={{ height: 28, background: theme.accent, opacity: 0.07 + j * 0.02 }}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1.5 p-4 pt-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-sm font-bold tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.name}
                      </h3>
                      <Link
                        to={`/preview/${project.id}`}
                        className="mt-0.5 shrink-0 text-[var(--app-muted)] transition-colors hover:text-[var(--app-fg)]"
                      >
                        <ExternalLink size={13} />
                      </Link>
                    </div>

                    <span className="text-[11px] uppercase tracking-wider text-[var(--app-muted)]">
                      {template?.metadata.name ?? project.templateId}
                    </span>

                    <p className="text-xs text-[var(--app-muted)]">
                      {project.niche}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-[10px] text-[var(--app-muted)]">
                        {formatDate(project.updatedAt)}
                      </span>

                      {confirmDelete === project.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-medium text-white transition-colors hover:bg-red-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="rounded-md px-2 py-0.5 text-[10px] font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(project.id)}
                          className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]"
                        >
                          <Trash2 size={10} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
