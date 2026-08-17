import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Clock } from 'lucide-react';
import type { ProjectVersion } from '../types';
import { formatDate } from '../lib/utils';
import { cn } from '../lib/utils';

interface VersionHistoryProps {
  versions: ProjectVersion[];
  currentVersion: number;
  onRestore: (versionId: string) => void;
}

export default function VersionHistory({ versions, currentVersion, onRestore }: VersionHistoryProps) {
  return (
    <motion.aside
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 24, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-72 flex-col gap-1 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3"
    >
      <h3
        className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]"
      >
        <Clock size={12} strokeWidth={1.5} />
        Version history
      </h3>

      <div className="flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 360 }}>
        <AnimatePresence>
          {[...versions].reverse().map((v, idx) => {
            const isCurrent = versions.indexOf(v) === currentVersion;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={cn(
                  'flex items-start justify-between gap-2 rounded-lg px-3 py-2.5 transition-colors',
                  isCurrent
                    ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                    : 'hover:bg-[var(--app-surface-hover)]'
                )}
              >
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-medium leading-tight">
                    {v.label}
                  </span>
                  <span
                    className={cn(
                      'block text-[10px] leading-tight mt-0.5',
                      isCurrent ? 'opacity-50' : 'text-[var(--app-muted)]'
                    )}
                  >
                    {formatDate(v.createdAt)}
                  </span>
                </div>

                {!isCurrent && (
                  <button
                    onClick={() => onRestore(v.id)}
                    className="mt-0.5 flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-[var(--app-muted)] transition-colors hover:bg-[var(--app-border)] hover:text-[var(--app-fg)]"
                  >
                    <RotateCcw size={10} />
                    Restore
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {versions.length === 0 && (
          <p className="px-3 py-4 text-center text-[11px] text-[var(--app-muted)]">
            No versions yet
          </p>
        )}
      </div>
    </motion.aside>
  );
}
