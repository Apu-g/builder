import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface EditableCommandProps {
  onSubmit: (change: string) => void;
  isProcessing: boolean;
}

export default function EditableCommand({ onSubmit, isProcessing }: EditableCommandProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isProcessing) return;
    onSubmit(trimmed);
    setValue('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2"
    >
      <label className="sr-only" htmlFor="editable-command-input">
        Describe a change
      </label>
      <input
        id="editable-command-input"
        type="text"
        placeholder="Describe a change..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isProcessing}
        className="flex-1 bg-transparent text-sm text-[var(--app-fg)] outline-none placeholder:text-[var(--app-muted)] disabled:opacity-40"
      />
      <button
        type="submit"
        disabled={!value.trim() || isProcessing}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--app-fg)] text-[var(--app-bg)] transition-colors hover:bg-[#2a2a2a] disabled:opacity-30"
      >
        {isProcessing ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Send size={13} />
        )}
      </button>
    </form>
  );
}
