import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import GenerationSteps from '../components/GenerationSteps';
import { generateSiteV2, generateSite } from '../lib/ai';
import type { AgentProgress } from '../lib/ai';
import { saveProject } from '../lib/storage';
import { generateId } from '../lib/utils';
import type { PalettePreset, Project } from '../types';

interface LocationState {
  niche: string;
  palette: PalettePreset;
  description: string;
  additionalInstructions: string;
}

export default function Generate() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [phase, setPhase] = useState<'progress' | 'error'>('progress');
  const [error, setError] = useState('');
  const [agentProgress, setAgentProgress] = useState<AgentProgress[]>([]);
  const didRun = useRef(false);

  const handleProgress = useCallback((progress: AgentProgress) => {
    setAgentProgress((prev) => {
      const existing = prev.findIndex((p) => p.agent === progress.agent);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = progress;
        return next;
      }
      return [...prev, progress];
    });
  }, []);

  const startGeneration = useCallback(async () => {
    if (!templateId || !state || didRun.current) return;
    didRun.current = true;

    try {
      const config = await generateSiteV2(
        {
          templateId,
          niche: state.niche,
          palette: state.palette,
          description: state.description,
          additionalInstructions: state.additionalInstructions,
        },
        handleProgress
      );

      const project: Project = {
        id: generateId(),
        name: config.brandName,
        templateId,
        niche: state.niche,
        palette: state.palette,
        config,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        versions: [
          {
            id: generateId(),
            config,
            label: 'Initial generation',
            createdAt: Date.now(),
          },
        ],
        currentVersion: 0,
      };

      saveProject(project);
      navigate(`/preview/${project.id}`);
    } catch (err) {
      console.error('Generation failed, trying fallback:', err);
      try {
        const config = await generateSite({
          templateId,
          niche: state.niche,
          palette: state.palette,
          description: state.description,
          additionalInstructions: state.additionalInstructions,
        });

        const project: Project = {
          id: generateId(),
          name: config.brandName,
          templateId,
          niche: state.niche,
          palette: state.palette,
          config,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          versions: [
            {
              id: generateId(),
              config,
              label: 'Initial generation (fallback)',
              createdAt: Date.now(),
            },
          ],
          currentVersion: 0,
        };

        saveProject(project);
        navigate(`/preview/${project.id}`);
      } catch (fallbackErr) {
        setError(fallbackErr instanceof Error ? fallbackErr.message : 'Something went wrong.');
        setPhase('error');
      }
    }
  }, [templateId, state, navigate, handleProgress]);

  useEffect(() => {
    if (!state && templateId) {
      navigate(`/configure/${templateId}`);
    }
  }, [state, templateId, navigate]);

  useEffect(() => {
    if (state && templateId && !didRun.current) {
      startGeneration();
    }
  }, [state, templateId, startGeneration]);

  if (!state || !templateId) return null;

  if (phase === 'error') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AlertTriangle size={40} className="mx-auto mb-4 text-[var(--app-muted)]" />
          <h2
            className="mb-2 text-xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We couldn't build the site right now.
          </h2>
          <p className="mb-8 text-sm text-[var(--app-muted)]">{error || 'Please try again.'}</p>
          <button
            onClick={() => {
              didRun.current = false;
              setAgentProgress([]);
              setPhase('progress');
              setError('');
              startGeneration();
            }}
            className="btn-primary"
          >
            <RotateCcw size={14} />
            Try again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <GenerationSteps progress={agentProgress} />
      </motion.div>
    </div>
  );
}
