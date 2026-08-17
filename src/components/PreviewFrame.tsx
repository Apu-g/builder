import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import type { SiteConfig } from '../types';
import { cn } from '../lib/utils';

interface PreviewFrameProps {
  children: React.ReactNode;
  device: 'desktop' | 'tablet' | 'mobile';
  config: SiteConfig;
}

const devices = [
  { key: 'desktop' as const, icon: Monitor, label: 'Desktop', width: '100%' },
  { key: 'tablet' as const, icon: Tablet, label: 'Tablet', width: 768 },
  { key: 'mobile' as const, icon: Smartphone, label: 'Mobile', width: 375 },
];

export default function PreviewFrame({ children, device, config }: PreviewFrameProps) {
  const active = devices.find((d) => d.key === device) ?? devices[0];

  return (
    <div className="preview-frame flex flex-col">
      {/* Chrome bar */}
      <div className="preview-chrome">
        <div className="preview-dot" style={{ background: '#FF5F57' }} />
        <div className="preview-dot" style={{ background: '#FFBD2E' }} />
        <div className="preview-dot" style={{ background: '#28CA42' }} />
        <div className="preview-url">preview.websitebuilder.dev</div>
      </div>

      {/* Device switcher */}
      <div className="flex items-center justify-center gap-1 border-b border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-2">
        {devices.map((d) => {
          const Icon = d.icon;
          const isActive = d.key === device;
          return (
            <button
              key={d.key}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                isActive
                  ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                  : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-hover)]'
              )}
            >
              <Icon size={12} strokeWidth={1.5} />
              {d.label}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="relative flex justify-center overflow-auto bg-[var(--app-bg)] p-4" style={{ minHeight: 400 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={device}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)]"
            style={{
              width: typeof active.width === 'number' ? active.width : '100%',
              maxWidth: '100%',
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
