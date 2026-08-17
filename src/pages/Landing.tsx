import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllTemplates } from '../templates/index';
import TemplateCard from '../components/TemplateCard';

export default function Landing() {
  const navigate = useNavigate();
  const templates = getAllTemplates();

  function handleSelect(templateId: string) {
    navigate(`/configure/${templateId}`);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-editorial)' }}
        >
          Build from a good foundation.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--app-muted)] sm:text-lg"
        >
          Choose a template. Describe your idea. We'll shape the design around it.
        </motion.p>
      </section>

      {/* Templates grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 text-sm font-semibold uppercase tracking-wider text-[var(--app-muted)]"
        >
          Choose a template
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((t, i) => (
            <motion.div
              key={t.metadata.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
            >
              <TemplateCard template={t} onSelect={handleSelect} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--app-border)] py-10 text-center">
        <p
          className="text-sm font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Website Builder
        </p>
        <p className="mt-1 text-[11px] text-[var(--app-muted)]">
          Template-driven web design, shaped by your idea.
        </p>
      </footer>
    </div>
  );
}
