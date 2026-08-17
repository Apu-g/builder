import { motion } from 'framer-motion';
import type { AgentProgress } from '../lib/ai';

interface GenerationStepsProps {
  progress: AgentProgress[];
}

const AGENT_LABELS: Record<string, { label: string; icon: string }> = {
  analysis: { label: 'Analyzing your business', icon: '🔍' },
  content: { label: 'Generating website content', icon: '✍️' },
  images: { label: 'Finding perfect images', icon: '🖼️' },
  assembly: { label: 'Assembling your site', icon: '⚙️' },
};

const AGENT_ORDER = ['analysis', 'content', 'images', 'assembly'];

function getAgentStatus(progress: AgentProgress[], agent: string): AgentProgress | undefined {
  return progress.find((p) => p.agent === agent);
}

function isAgentComplete(progress: AgentProgress[], agent: string): boolean {
  const status = getAgentStatus(progress, agent);
  return status?.status === 'complete';
}

function isAgentRunning(progress: AgentProgress[], agent: string): boolean {
  const status = getAgentStatus(progress, agent);
  return status?.status === 'running';
}

function isAgentError(progress: AgentProgress[], agent: string): boolean {
  const status = getAgentStatus(progress, agent);
  return status?.status === 'error';
}

function getLatestMessage(progress: AgentProgress[], agent: string): string {
  const status = getAgentStatus(progress, agent);
  return status?.message || '';
}

export default function GenerationSteps({ progress }: GenerationStepsProps) {
  const completedCount = AGENT_ORDER.filter((a) => isAgentComplete(progress, a)).length;
  const overallProgress = (completedCount / AGENT_ORDER.length) * 100;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ fontFamily: 'var(--font-editorial)' }}
      >
        Building your site
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 text-center text-sm"
        style={{ color: 'var(--app-muted)' }}
      >
        Multiple AI agents working in parallel
      </motion.p>

      <div className="flex w-full max-w-md flex-col gap-3">
        {AGENT_ORDER.map((agentKey, i) => {
          const meta = AGENT_LABELS[agentKey];
          const complete = isAgentComplete(progress, agentKey);
          const running = isAgentRunning(progress, agentKey);
          const error = isAgentError(progress, agentKey);
          const message = getLatestMessage(progress, agentKey);
          const active = complete || running || error;

          return (
            <motion.div
              key={agentKey}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: active ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: active ? 'var(--app-surface)' : 'transparent',
                border: active ? '1px solid var(--app-border)' : '1px solid transparent',
              }}
            >
              <span className="text-lg">{meta.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: complete
                        ? '#16a34a'
                        : error
                          ? '#dc2626'
                          : running
                            ? 'var(--app-fg)'
                            : 'var(--app-muted)',
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-0.5 text-xs truncate"
                    style={{ color: 'var(--app-muted)' }}
                  >
                    {message}
                  </motion.p>
                )}
              </div>
              <div className="shrink-0">
                {complete && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                    style={{ background: '#dcfce7', color: '#16a34a' }}
                  >
                    ✓
                  </motion.span>
                )}
                {running && (
                  <motion.div
                    className="h-5 w-5 rounded-full border-2"
                    style={{
                      borderColor: 'var(--app-border)',
                      borderTopColor: 'var(--app-fg)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {error && (
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                    style={{ background: '#fef2f2', color: '#dc2626' }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <div className="mt-8 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-[var(--app-border)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--app-fg)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <p
        className="mt-3 text-xs"
        style={{ color: 'var(--app-muted)' }}
      >
        {completedCount} of {AGENT_ORDER.length} agents complete
      </p>
    </div>
  );
}
