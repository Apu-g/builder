import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { TemplateDefinition } from '../templates/index';
import TemplatePreview from './TemplatePreview';

interface TemplateCardProps {
  template: TemplateDefinition;
  onSelect: (id: string) => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const { name, category, description, style } = template.metadata;

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.25 }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]"
      onClick={() => onSelect(template.metadata.id)}
    >
      <div className="w-full overflow-hidden" style={{ background: template.metadata.theme.background }}>
        <TemplatePreview
          templateId={template.metadata.id}
          theme={template.metadata.theme}
          width={400}
          height={280}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 pt-3.5">
        <h3
          className="text-sm font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {name}
        </h3>
        <span className="text-[11px] uppercase tracking-wider text-[var(--app-muted)]">
          {category}
        </span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--app-muted)]">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {style.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--app-bg)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--app-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className="btn-primary mt-3 w-full gap-1.5 text-[12px]"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template.metadata.id);
          }}
        >
          Use template
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}
