import React from 'react';

interface Props {
  templateId: string;
  theme: { background: string; foreground: string; accent: string; muted: string };
  width?: number;
  height?: number;
}

function AtelierPreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#F4F1EB" rx="8" />
      {/* Nav */}
      <rect x="20" y="12" width="60" height="10" rx="2" fill={theme.foreground} opacity="0.8" />
      <rect x="240" y="14" width="30" height="6" rx="1" fill={theme.foreground} opacity="0.3" />
      <rect x="280" y="14" width="30" height="6" rx="1" fill={theme.foreground} opacity="0.3" />
      <rect x="320" y="14" width="30" height="6" rx="1" fill={theme.foreground} opacity="0.3" />
      {/* Hero headline */}
      <rect x="20" y="40" width="200" height="10" rx="2" fill={theme.foreground} opacity="0.85" />
      <rect x="20" y="56" width="260" height="10" rx="2" fill={theme.foreground} opacity="0.85" />
      <rect x="20" y="72" width="140" height="10" rx="2" fill={theme.foreground} opacity="0.85" />
      {/* Subtitle */}
      <rect x="20" y="92" width="180" height="5" rx="1" fill={theme.muted} opacity="0.6" />
      {/* CTA buttons */}
      <rect x="20" y="108" width="70" height="22" rx="4" fill={theme.accent} />
      <rect x="100" y="108" width="70" height="22" rx="4" fill="none" stroke={theme.foreground} strokeWidth="1.5" opacity="0.5" />
      {/* Hero image area */}
      <rect x="20" y="142" width="360" height="80" rx="6" fill={theme.muted} opacity="0.35" />
      <rect x="160" y="165" width="80" height="30" rx="3" fill={theme.foreground} opacity="0.08" />
      {/* Service cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 120}, 232)`}>
          <rect width="108" height="38" rx="4" fill="white" opacity="0.5" />
          <circle cx="14" cy="14" r="6" fill={theme.accent} opacity="0.5" />
          <rect x="26" y="11" width="50" height="5" rx="1" fill={theme.foreground} opacity="0.5" />
          <rect x="26" y="21" width="65" height="3" rx="1" fill={theme.muted} opacity="0.4" />
          <rect x="26" y="27" width="55" height="3" rx="1" fill={theme.muted} opacity="0.3" />
        </g>
      ))}
    </g>
  );
}

function NorthlinePreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#FAFBFC" rx="8" />
      {/* Nav */}
      <rect x="20" y="14" width="55" height="9" rx="2" fill={theme.foreground} opacity="0.8" />
      <rect x="170" y="13" width="36" height="11" rx="5.5" fill={theme.muted} opacity="0.2" />
      <rect x="214" y="13" width="36" height="11" rx="5.5" fill={theme.muted} opacity="0.2" />
      <rect x="258" y="13" width="36" height="11" rx="5.5" fill={theme.muted} opacity="0.2" />
      <rect x="350" y="13" width="30" height="11" rx="5.5" fill={theme.accent} opacity="0.9" />
      {/* Hero badge */}
      <rect x="120" y="34" width="160" height="10" rx="5" fill={theme.accent} opacity="0.12" />
      {/* Hero headline */}
      <rect x="90" y="52" width="220" height="10" rx="2" fill={theme.foreground} opacity="0.9" />
      <rect x="110" y="68" width="180" height="10" rx="2" fill={theme.foreground} opacity="0.9" />
      {/* Subtitle */}
      <rect x="100" y="88" width="200" height="5" rx="1" fill={theme.muted} opacity="0.5" />
      <rect x="120" y="97" width="160" height="5" rx="1" fill={theme.muted} opacity="0.4" />
      {/* CTA */}
      <rect x="145" y="110" width="110" height="22" rx="5" fill={theme.accent} />
      {/* Product mockup */}
      <rect x="50" y="142" width="300" height="65" rx="6" fill="white" opacity="0.9" />
      <rect x="50" y="142" width="60" height="65" rx="6" fill={theme.muted} opacity="0.15" />
      <rect x="58" y="150" width="44" height="6" rx="2" fill={theme.foreground} opacity="0.15" />
      <rect x="58" y="162" width="44" height="4" rx="1" fill={theme.foreground} opacity="0.08" />
      <rect x="58" y="170" width="44" height="4" rx="1" fill={theme.foreground} opacity="0.08" />
      <rect x="58" y="178" width="44" height="4" rx="1" fill={theme.foreground} opacity="0.08" />
      <rect x="120" y="150" width="100" height="40" rx="3" fill={theme.muted} opacity="0.1" />
      <rect x="235" y="150" width="100" height="40" rx="3" fill={theme.muted} opacity="0.1" />
      {/* Feature grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} transform={`translate(${20 + col * 124}, ${215 + row * 30})`}>
            <rect width="112" height="24" rx="3" fill="white" opacity="0.6" />
            <circle cx="12" cy="8" r="4" fill={theme.accent} opacity="0.35" />
            <rect x="22" y="5" width="55" height="4" rx="1" fill={theme.foreground} opacity="0.35" />
            <rect x="22" y="13" width="70" height="3" rx="1" fill={theme.muted} opacity="0.25" />
          </g>
        );
      })}
    </g>
  );
}

function FormaPreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#F8F5F0" rx="8" />
      {/* Nav */}
      <rect x="24" y="14" width="70" height="8" rx="1" fill={theme.foreground} opacity="0.7" />
      <rect x="310" y="15" width="25" height="6" rx="1" fill={theme.foreground} opacity="0.25" />
      <rect x="345" y="15" width="25" height="6" rx="1" fill={theme.foreground} opacity="0.25" />
      <rect x="380" y="15" width="8" height="6" rx="1" fill={theme.foreground} opacity="0.25" />
      {/* Hero large headline */}
      <text x="24" y="52" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill={theme.foreground} opacity="0.9">Architecture begins</text>
      <text x="24" y="68" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill={theme.foreground} opacity="0.9">with listening —</text>
      <text x="24" y="84" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill={theme.foreground} opacity="0.65">to the site, the light.</text>
      {/* Subtitle */}
      <rect x="24" y="96" width="160" height="4" rx="1" fill={theme.muted} opacity="0.5" />
      {/* Two project images */}
      <rect x="24" y="114" width="170" height="90" rx="4" fill={theme.muted} opacity="0.3" />
      <rect x="206" y="114" width="170" height="55" rx="4" fill={theme.muted} opacity="0.25" />
      <rect x="206" y="177" width="82" height="27" rx="4" fill={theme.muted} opacity="0.15" />
      <rect x="294" y="177" width="82" height="27" rx="4" fill={theme.muted} opacity="0.2" />
      {/* Project labels */}
      <rect x="32" y="190" width="80" height="5" rx="1" fill="white" opacity="0.6" />
      <rect x="32" y="198" width="50" height="4" rx="1" fill="white" opacity="0.4" />
      {/* Accent line */}
      <rect x="24" y="218" width="352" height="1" fill={theme.accent} opacity="0.4" />
      {/* Services labels */}
      <text x="24" y="235" fontFamily="Georgia, serif" fontSize="7" fontWeight="600" fill={theme.foreground} opacity="0.45" letterSpacing="0.5">RESIDENTIAL</text>
      <text x="114" y="235" fontFamily="Georgia, serif" fontSize="7" fontWeight="600" fill={theme.foreground} opacity="0.45" letterSpacing="0.5">COMMERCIAL</text>
      <text x="214" y="235" fontFamily="Georgia, serif" fontSize="7" fontWeight="600" fill={theme.foreground} opacity="0.45" letterSpacing="0.5">INTERIOR</text>
      <text x="300" y="235" fontFamily="Georgia, serif" fontSize="7" fontWeight="600" fill={theme.foreground} opacity="0.45" letterSpacing="0.5">CONSULTATION</text>
      {/* Bottom decorative */}
      <rect x="24" y="246" width="60" height="3" rx="1" fill={theme.accent} opacity="0.25" />
      <rect x="24" y="256" width="352" height="1" fill={theme.foreground} opacity="0.06" />
      <text x="24" y="268" fontFamily="Georgia, serif" fontSize="6" fill={theme.foreground} opacity="0.3" letterSpacing="1">FORMA ARCHITECTS</text>
    </g>
  );
}

function LocalTablePreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#FBF8F3" rx="8" />
      {/* Nav centered */}
      <rect x="150" y="10" width="100" height="10" rx="2" fill={theme.foreground} opacity="0.75" />
      <rect x="280" y="12" width="28" height="6" rx="1" fill={theme.foreground} opacity="0.25" />
      <rect x="318" y="12" width="28" height="6" rx="1" fill={theme.foreground} opacity="0.25" />
      {/* Hero image */}
      <rect x="20" y="30" width="360" height="100" rx="5" fill={theme.muted} opacity="0.3" />
      {/* Overlaid text */}
      <rect x="30" y="55" width="160" height="10" rx="2" fill="white" opacity="0.7" />
      <rect x="30" y="70" width="200" height="10" rx="2" fill="white" opacity="0.7" />
      <rect x="30" y="86" width="100" height="5" rx="1" fill="white" opacity="0.5" />
      {/* Decorative accent on hero */}
      <rect x="30" y="100" width="30" height="3" rx="1.5" fill={theme.accent} />
      {/* Menu section */}
      <rect x="20" y="140" width="50" height="8" rx="1" fill={theme.foreground} opacity="0.7" />
      <rect x="20" y="152" width="360" height="1" fill={theme.muted} opacity="0.25" />
      {/* Menu items - left column */}
      {[0, 1, 2].map((i) => (
        <g key={`ml${i}`} transform={`translate(20, ${160 + i * 20})`}>
          <rect width="150" height="4" rx="1" fill={theme.foreground} opacity="0.5" />
          <rect x="0" y="6" width="110" height="3" rx="1" fill={theme.muted} opacity="0.35" />
          <rect x="155" y="0" width="15" height="4" rx="1" fill={theme.foreground} opacity="0.35" />
          <line x1="135" y1="2" x2="153" y2="2" stroke={theme.muted} strokeWidth="0.5" strokeDasharray="1,2" opacity="0.4" />
        </g>
      ))}
      {/* Menu items - right column */}
      {[0, 1, 2].map((i) => (
        <g key={`mr${i}`} transform={`translate(210, ${160 + i * 20})`}>
          <rect width="150" height="4" rx="1" fill={theme.foreground} opacity="0.5" />
          <rect x="0" y="6" width="110" height="3" rx="1" fill={theme.muted} opacity="0.35" />
          <rect x="155" y="0" width="15" height="4" rx="1" fill={theme.foreground} opacity="0.35" />
          <line x1="135" y1="2" x2="153" y2="2" stroke={theme.muted} strokeWidth="0.5" strokeDasharray="1,2" opacity="0.4" />
        </g>
      ))}
      {/* Story section */}
      <rect x="20" y="232" width="70" height="50" rx="4" fill={theme.muted} opacity="0.25" />
      <rect x="100" y="234" width="130" height="5" rx="1" fill={theme.foreground} opacity="0.5" />
      <rect x="100" y="244" width="280" height="3" rx="1" fill={theme.muted} opacity="0.3" />
      <rect x="100" y="251" width="260" height="3" rx="1" fill={theme.muted} opacity="0.25" />
      <rect x="100" y="258" width="240" height="3" rx="1" fill={theme.muted} opacity="0.2" />
      {/* Reservation button */}
      <rect x="300" y="235" width="80" height="20" rx="4" fill={theme.accent} />
      <rect x="308" y="242" width="64" height="5" rx="1" fill="white" opacity="0.9" />
    </g>
  );
}

function ForgePreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#F0EDE8" rx="8" />
      {/* Bold uppercase nav */}
      <text x="20" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="900" fill={theme.foreground} opacity="0.85" letterSpacing="1">FORGE</text>
      <text x="280" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="700" fill={theme.foreground} opacity="0.3" letterSpacing="0.5">SERVICES</text>
      <text x="320" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="700" fill={theme.foreground} opacity="0.3" letterSpacing="0.5">PROJECTS</text>
      <text x="365" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="700" fill={theme.foreground} opacity="0.3" letterSpacing="0.5">CONTACT</text>
      {/* Very large bold hero text */}
      <text x="20" y="42" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill={theme.foreground} opacity="0.9" letterSpacing="-0.5">WE BUILD THE</text>
      <text x="20" y="64" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill={theme.foreground} opacity="0.9" letterSpacing="-0.5">STRUCTURES THAT</text>
      <text x="20" y="86" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill={theme.accent} letterSpacing="-0.5">SHAPE COMMUNITIES</text>
      {/* Geometric accent block */}
      <rect x="20" y="96" width="60" height="6" rx="0" fill={theme.accent} opacity="0.7" />
      {/* Subtitle */}
      <rect x="20" y="110" width="200" height="4" rx="1" fill={theme.muted} opacity="0.4" />
      <rect x="20" y="118" width="170" height="4" rx="1" fill={theme.muted} opacity="0.3" />
      {/* 4 service blocks with numbers */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${20 + i * 93}, 132)`}>
          <rect width="85" height="50" rx="0" fill="white" opacity="0.4" />
          <text x="8" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="900" fill={theme.accent} opacity="0.5">0{i + 1}</text>
          <rect x="8" y="26" width="55" height="4" rx="1" fill={theme.foreground} opacity="0.45" />
          <rect x="8" y="34" width="65" height="3" rx="1" fill={theme.muted} opacity="0.3" />
          <rect x="8" y="40" width="50" height="3" rx="1" fill={theme.muted} opacity="0.2" />
        </g>
      ))}
      {/* Statistics row */}
      <rect x="20" y="192" width="360" height="1" fill={theme.muted} opacity="0.2" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 122}, 200)`}>
          <text x="0" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="900" fill={theme.foreground} opacity="0.85">{['$1.2B+', '250+', '0.8M'][i]}</text>
          <rect x="0" y="26" width={80} height="3" rx="1" fill={theme.muted} opacity="0.35" />
        </g>
      ))}
      {/* Bottom accent blocks */}
      <rect x="20" y="250" width="360" height="1" fill={theme.muted} opacity="0.15" />
      <rect x="20" y="258" width="360" height="16" rx="0" fill={theme.foreground} opacity="0.05" />
      <rect x="25" y="261" width="60" height="10" rx="0" fill={theme.accent} opacity="0.6" />
      <text x="30" y="269" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="800" fill="white" opacity="0.9" letterSpacing="0.5">GET A QUOTE</text>
    </g>
  );
}

function MotionPreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#0A0A0A" rx="8" />
      {/* Nav */}
      <text x="20" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="900" fill="#FAFAFA" letterSpacing="1.5">MOTION</text>
      <text x="260" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="600" fill="#737373" letterSpacing="0.5">PROGRAMS</text>
      <text x="300" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="600" fill="#737373" letterSpacing="0.5">COACHES</text>
      <text x="345" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="600" fill="#737373" letterSpacing="0.5">MEMBERSHIP</text>
      {/* Red accent line */}
      <rect x="20" y="24" width="360" height="2" fill="#EF4444" />
      {/* Hero headline */}
      <text x="20" y="50" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#FAFAFA" letterSpacing="1">YOUR STRONGEST</text>
      <text x="20" y="72" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#FAFAFA" letterSpacing="1">CHAPTER STARTS</text>
      <text x="20" y="94" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#EF4444" letterSpacing="1">HERE.</text>
      {/* Subtitle */}
      <rect x="20" y="106" width="180" height="4" rx="1" fill="#737373" opacity="0.5" />
      {/* CTA */}
      <rect x="20" y="118" width="90" height="20" rx="2" fill="#EF4444" />
      <text x="30" y="132" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="800" fill="white" letterSpacing="0.5">START FREE</text>
      <rect x="120" y="118" width="70" height="20" rx="2" fill="none" stroke="#737373" strokeWidth="1" />
      {/* Program cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 124}, 148)`}>
          <rect width="112" height="50" rx="3" fill="#1A1A1A" />
          <rect width="112" height="3" rx="0" fill={theme.accent} opacity="0.6" />
          <rect x="8" y="12" width="60" height="5" rx="1" fill="#FAFAFA" opacity="0.7" />
          <rect x="8" y="21" width="80" height="3" rx="1" fill="#737373" opacity="0.5" />
          <rect x="8" y="28" width="70" height="3" rx="1" fill="#737373" opacity="0.35" />
          <rect x="8" y="38" width="40" height="6" rx="1" fill="#EF4444" opacity="0.2" />
        </g>
      ))}
      {/* Trainer circles */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${80 + i * 100}, 212)`}>
          <circle cx="0" cy="14" r="14" fill="#1A1A1A" stroke="#EF4444" strokeWidth="1.5" opacity="0.8" />
          <circle cx="0" cy="14" r="6" fill="#737373" opacity="0.3" />
          <rect x="-16" y="34" width="32" height="4" rx="1" fill="#FAFAFA" opacity="0.5" />
          <rect x="-20" y="40" width="40" height="3" rx="1" fill="#737373" opacity="0.3" />
        </g>
      ))}
      {/* Bottom bar */}
      <rect x="0" y="268" width="400" height="12" fill="#EF4444" opacity="0.15" />
      <rect x="130" y="270" width="140" height="8" rx="2" fill="#EF4444" opacity="0.5" />
    </g>
  );
}

function MonoPreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#FFFFFF" rx="8" />
      {/* Ultra minimal nav */}
      <text x="24" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="900" fill="#000000" letterSpacing="2">MONO</text>
      {/* HUGE headline */}
      <text x="24" y="52" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#000000" letterSpacing="-1">I design digital</text>
      <text x="24" y="76" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#000000" letterSpacing="-1">products that are</text>
      <text x="24" y="100" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="300" fill="#000000" letterSpacing="-1">clear, useful.</text>
      {/* Thin subtitle */}
      <text x="24" y="118" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="400" fill="#888888">Product designer based in Berlin. Previously at Figma.</text>
      {/* Divider */}
      <line x1="24" y1="130" x2="376" y2="130" stroke="#000000" strokeWidth="0.75" opacity="0.2" />
      {/* Project list */}
      {['FigJam Widget System', 'Orbital', 'Mono Type Specimen', 'Meridian Design System', 'Weather Journal'].map((_, i) => (
        <g key={i} transform={`translate(24, ${142 + i * 24})`}>
          <text fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="700" fill="#000000" opacity="0.8">{['FigJam Widget System', 'Orbital', 'Mono Type Specimen', 'Meridian Design System', 'Weather Journal'][i]}</text>
          <text x="0" y="10" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fontWeight="400" fill="#888888">{['Product Design · 2022', 'Side Project · 2023', 'Typography · 2024', 'Design Systems · 2021', 'App Design · 2024'][i]}</text>
          <line x1="340" y1="-2" x2="352" y2="-2" stroke="#000000" strokeWidth="0.75" opacity="0.25" />
          <text x="354" y="2" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fill="#000000" opacity="0.3">→</text>
        </g>
      ))}
      {/* Bottom line */}
      <line x1="24" y1="266" x2="376" y2="266" stroke="#000000" strokeWidth="0.5" opacity="0.12" />
    </g>
  );
}

function CommercePreview({ theme }: { theme: Props['theme'] }) {
  return (
    <g>
      <rect width="400" height="280" fill="#FAFAF9" rx="8" />
      {/* Nav */}
      <rect x="20" y="12" width="55" height="9" rx="2" fill={theme.foreground} opacity="0.8" />
      <text x="350" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill={theme.foreground} opacity="0.5">◻</text>
      {/* Hero badge */}
      <rect x="140" y="30" width="120" height="10" rx="5" fill={theme.accent} opacity="0.1" />
      {/* Hero headline */}
      <rect x="100" y="48" width="200" height="10" rx="2" fill={theme.foreground} opacity="0.85" />
      <rect x="120" y="64" width="160" height="10" rx="2" fill={theme.foreground} opacity="0.85" />
      {/* Subtitle */}
      <rect x="110" y="84" width="180" height="4" rx="1" fill={theme.muted} opacity="0.45" />
      {/* CTA */}
      <rect x="150" y="96" width="100" height="20" rx="5" fill={theme.accent} />
      <text x="163" y="110" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" fill="white">Shop Now</text>
      {/* Product hero image */}
      <rect x="130" y="124" width="140" height="50" rx="6" fill={theme.muted} opacity="0.2" />
      {/* Product grid 2x2 */}
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={i} transform={`translate(${20 + col * 192}, ${182 + row * 42})`}>
            <rect width="176" height="36" rx="4" fill="white" opacity="0.7" />
            <rect x="4" y="4" width="30" height="28" rx="3" fill={theme.muted} opacity="0.2" />
            <rect x="40" y="8" width="80" height="5" rx="1" fill={theme.foreground} opacity="0.5" />
            <rect x="40" y="17" width="60" height="3" rx="1" fill={theme.muted} opacity="0.35" />
            <rect x="40" y="25" width="30" height="4" rx="1" fill={theme.accent} opacity="0.4" />
          </g>
        );
      })}
    </g>
  );
}

export default function TemplatePreview({ templateId, theme, width = 400, height = 280 }: Props) {
  const renderers: Record<string, React.FC<{ theme: Props['theme'] }>> = {
    atelier: AtelierPreview,
    northline: NorthlinePreview,
    forma: FormaPreview,
    'local-table': LocalTablePreview,
    forge: ForgePreview,
    motion: MotionPreview,
    mono: MonoPreview,
    commerce: CommercePreview,
  };

  const Renderer = renderers[templateId] || AtelierPreview;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 8, overflow: 'hidden' }}
    >
      <clipPath id={`clip-${templateId}`}>
        <rect width="400" height="280" rx="8" />
      </clipPath>
      <g clipPath={`url(#clip-${templateId})`}>
        <Renderer theme={theme} />
      </g>
    </svg>
  );
}
