import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Settings2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/', label: 'Templates' },
  { to: '/projects', label: 'My Projects' },
  { to: '/#how-it-works', label: 'How it works' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(248,247,244,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Left: Brand */}
        <div className="flex flex-col">
          <span
            className="text-base font-bold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Website Builder
          </span>
          <span className="text-[10px] tracking-wide text-[var(--app-muted)]">
            Template-driven web design
          </span>
        </div>

        {/* Center: Glass pill nav — desktop */}
        <nav className="glass-pill hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                    : 'text-[var(--app-muted)] hover:text-[var(--app-fg)]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Settings button + mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--app-surface-hover)]"
            aria-label="Settings"
          >
            <Settings2 size={16} strokeWidth={1.5} />
          </button>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--app-surface-hover)] md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-[var(--app-border)] bg-[var(--app-bg)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--app-fg)] text-[var(--app-bg)]'
                        : 'text-[var(--app-muted)] hover:bg-[var(--app-surface-hover)] hover:text-[var(--app-fg)]'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
