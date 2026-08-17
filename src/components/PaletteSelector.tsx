import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { PalettePreset } from '../types';
import { cn } from '../lib/utils';

interface PaletteSelectorProps {
  palettes: PalettePreset[];
  selected: string | null;
  onSelect: (palette: PalettePreset) => void;
}

export default function PaletteSelector({ palettes, selected, onSelect }: PaletteSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {palettes.map((palette) => {
        const isActive = selected === palette.id;
        return (
          <motion.button
            key={palette.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={isActive ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelect(palette)}
            className={cn(
              'flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors',
              isActive
                ? 'border-[var(--app-fg)] bg-[var(--app-surface)]'
                : 'border-[var(--app-border)] bg-[var(--app-surface)] hover:border-[var(--app-muted)]'
            )}
          >
            {/* Header row */}
            <div className="flex w-full items-center justify-between">
              <span
                className="text-xs font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {palette.name}
              </span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--app-fg)]"
                >
                  <Check size={11} strokeWidth={2.5} className="text-[var(--app-bg)]" />
                </motion.span>
              )}
            </div>

            {/* Color swatches */}
            <div className="flex gap-1.5">
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-lg border border-black/5"
                  style={{ background: color }}
                />
              ))}
            </div>

            {/* Hex codes */}
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              {palette.colors.map((color, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] text-[var(--app-muted)]"
                >
                  {color}
                </span>
              ))}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
