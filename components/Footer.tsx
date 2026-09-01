import { profile } from "@/lib/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-9 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-surface font-display text-[12px] font-bold tracking-tight">
            {profile.initials}
          </span>
          <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
            © {year} {profile.name}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-volt"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-volt"
          >
            Email
          </a>
          <a
            href="#top"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-volt"
          >
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
