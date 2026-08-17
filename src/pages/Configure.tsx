import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, AlertTriangle } from 'lucide-react';
import { getTemplate } from '../templates/index';
import { palettes, nicheSuggestions } from '../data/palettes';
import PaletteSelector from '../components/PaletteSelector';
import type { PalettePreset } from '../types';

const STEPS = [
  { id: 1, label: "What's your niche?" },
  { id: 2, label: 'Choose your palette' },
  { id: 3, label: 'Tell us about the website' },
];

export default function Configure() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const template = templateId ? getTemplate(templateId) : undefined;

  const [step, setStep] = useState(1);
  const [niche, setNiche] = useState('');
  const [palette, setPalette] = useState<PalettePreset | null>(null);
  const [description, setDescription] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const canSubmit = useMemo(
    () => niche.trim().length > 0 && palette !== null && description.trim().length > 0,
    [niche, palette, description]
  );

  if (!template) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <AlertTriangle size={40} className="mb-4 text-[var(--app-muted)]" />
        <h2 className="mb-2 text-xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Template not found
        </h2>
        <p className="mb-6 text-sm text-[var(--app-muted)]">
          The template you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Back to templates
        </Link>
      </div>
    );
  }

  function handleSubmit() {
    if (!canSubmit || !templateId) return;
    navigate(`/generate/${templateId}`, {
      state: { niche, palette, description, additionalInstructions },
    });
  }

  function handleNicheSelect(value: string) {
    setNiche(value);
  }

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left sidebar: steps + template preview */}
          <aside className="w-full shrink-0 lg:w-72">
            {/* Template reminder */}
            <div
              className="mb-8 flex flex-col gap-3 rounded-xl border border-[var(--app-border)] p-4"
              style={{ background: template.metadata.theme.background }}
            >
              <div
                className="h-2 w-10 rounded-full"
                style={{ background: template.metadata.theme.accent }}
              />
              <h3
                className="text-sm font-bold tracking-tight"
                style={{ color: template.metadata.theme.foreground, fontFamily: 'var(--font-display)' }}
              >
                {template.metadata.name}
              </h3>
              <span className="text-[11px] uppercase tracking-wider text-[var(--app-muted)]">
                {template.metadata.category}
              </span>
            </div>

            {/* Steps progress */}
            <nav className="flex flex-col gap-1">
              {STEPS.map((s) => {
                const isActive = s.id === step;
                const isDone = s.id < step;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (s.id <= step) setStep(s.id);
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                        : isDone
                          ? 'text-[var(--app-fg)] hover:bg-[var(--app-surface-hover)]'
                          : 'text-[var(--app-muted)]'
                    }`}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold"
                      style={{
                        borderColor: isActive ? 'currentColor' : isDone ? 'var(--app-fg)' : 'var(--app-border)',
                        background: isDone && !isActive ? 'var(--app-fg)' : 'transparent',
                        color: isDone && !isActive ? 'var(--app-bg)' : undefined,
                      }}
                    >
                      {isDone && !isActive ? '✓' : s.id}
                    </span>
                    <span className="flex-1">{s.label}</span>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right: step content */}
          <main className="flex min-h-[400px] flex-1 flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex-1"
              >
                {/* Step 1: Niche */}
                {step === 1 && (
                  <div>
                    <h2
                      className="mb-2 text-2xl font-medium tracking-tight sm:text-3xl"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      What's your niche?
                    </h2>
                    <p className="mb-8 text-sm text-[var(--app-muted)]">
                      Help us tailor the content to your industry.
                    </p>

                    <input
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      placeholder="e.g. Coffee shop, AI startup, Law firm..."
                      className="mb-6 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-fg)]"
                    />

                    <div className="flex flex-wrap gap-2">
                      {nicheSuggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleNicheSelect(s)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                            niche === s
                              ? 'border-[var(--app-fg)] bg-[var(--app-fg)] text-[var(--app-bg)]'
                              : 'border-[var(--app-border)] text-[var(--app-muted)] hover:border-[var(--app-muted)] hover:text-[var(--app-fg)]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Palette */}
                {step === 2 && (
                  <div>
                    <h2
                      className="mb-2 text-2xl font-medium tracking-tight sm:text-3xl"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      Choose your palette
                    </h2>
                    <p className="mb-8 text-sm text-[var(--app-muted)]">
                      Select a color system for your site.
                    </p>
                    <PaletteSelector
                      palettes={palettes}
                      selected={palette?.id ?? null}
                      onSelect={setPalette}
                    />
                  </div>
                )}

                {/* Step 3: Description */}
                {step === 3 && (
                  <div>
                    <h2
                      className="mb-2 text-2xl font-medium tracking-tight sm:text-3xl"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      Tell us about the website
                    </h2>
                    <p className="mb-8 text-sm text-[var(--app-muted)]">
                      Describe the website you want, and we'll bring it to life.
                    </p>

                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your website — what it's about, who it's for, what sections you want, the tone of voice..."
                      rows={6}
                      className="mb-4 w-full resize-none rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-fg)]"
                    />

                    <label className="mb-1 block text-xs font-medium text-[var(--app-muted)]">
                      Additional instructions (optional)
                    </label>
                    <textarea
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      placeholder="e.g. Use a playful tone, include a pricing section, hero should have a full-width image..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-fg)]"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-10 flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="btn-primary"
                  disabled={
                    (step === 1 && niche.trim().length === 0) ||
                    (step === 2 && palette === null)
                  }
                >
                  Continue
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                  disabled={!canSubmit}
                >
                  Build my site
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
