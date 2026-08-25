import React from 'react';

interface SpriteProps {
  className?: string;
  size?: number;
}

export const UhRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Rune stone base - classic cyan/light blue tint */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#006699" stroke="#003366" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#0099cc" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#33ccff" />
    
    {/* Inner highlight */}
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#99eeff" fillOpacity="0.8" />
    <path d="M23 7v18h2V7zM7 23h18v2H7z" fill="#0077aa" fillOpacity="0.8" />
    
    {/* Classic UH Cross symbol (Dark Blue / Deep Indigo) */}
    {/* Vertical bar */}
    <rect x="13" y="9" width="6" height="14" fill="#001a4d" />
    <rect x="14" y="10" width="4" height="12" fill="#002b80" />
    
    {/* Horizontal bar */}
    <rect x="9" y="13" width="14" height="6" fill="#001a4d" />
    <rect x="10" y="14" width="12" height="4" fill="#002b80" />
    
    {/* Center highlight */}
    <rect x="14" y="14" width="4" height="4" fill="#1a53ff" />
    <rect x="15" y="15" width="2" height="2" fill="#80aaff" />
  </svg>
);

export const SdRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Rune stone base - Dark Black/Slate */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#111115" stroke="#000000" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#222228" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#2d2d38" />
    
    {/* Inner shadow/highlight */}
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#4d4d60" fillOpacity="0.6" />
    <path d="M23 7v18h2V7zM7 23h18v2H7z" fill="#15151c" fillOpacity="0.9" />
    
    {/* SD Skull / Death Symbol (Vibrant Mystical Purple / Magenta) */}
    <rect x="11" y="9" width="10" height="7" rx="2" fill="#cc0066" />
    <rect x="12" y="10" width="8" height="5" rx="1" fill="#ff1a8c" />
    {/* Eye sockets */}
    <rect x="13" y="11" width="2" height="2" fill="#200010" />
    <rect x="17" y="11" width="2" height="2" fill="#200010" />
    {/* Teeth / Chin */}
    <rect x="13" y="16" width="6" height="3" fill="#cc0066" />
    <rect x="14" y="16" width="4" height="2" fill="#ff66b2" />
    <rect x="15" y="17" width="2" height="2" fill="#ffffff" />
    {/* Crossbones bottom */}
    <rect x="9" y="19" width="4" height="4" fill="#99004d" />
    <rect x="19" y="19" width="4" height="4" fill="#99004d" />
    <rect x="10" y="20" width="2" height="2" fill="#ff66b2" />
    <rect x="20" y="20" width="2" height="2" fill="#ff66b2" />
  </svg>
);

export const GfbRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Red/Orange Stone */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#801500" stroke="#4d0d00" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#b32400" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#e63900" />
    
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#ff7043" fillOpacity="0.8" />
    
    {/* Fireball glyph (Golden yellow flame core) */}
    <circle cx="16" cy="16" r="6" fill="#ffcc00" />
    <circle cx="16" cy="16" r="4" fill="#ffffff" />
    {/* Flame spikes */}
    <path d="M16 8l2 5h-4l2-5zm0 16l-2-5h4l-2 5zm-8-8l5-2v4l-5-2zm16 0l-5 2v-4l5 2z" fill="#ff9900" />
    <circle cx="16" cy="16" r="2" fill="#ffffff" />
  </svg>
);

export const HmmRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Blue/Indigo stone */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#003366" stroke="#001a33" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#004d99" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#1a75ff" />
    
    {/* Magic missile blue/white spark */}
    <rect x="10" y="14" width="12" height="4" rx="2" fill="#ffffff" />
    <rect x="14" y="10" width="4" height="12" rx="2" fill="#ffffff" />
    <circle cx="16" cy="16" r="3" fill="#b3d1ff" />
    <circle cx="16" cy="16" r="1.5" fill="#0044ff" />
  </svg>
);

export const ExploRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Brown/Stone base */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#59432e" stroke="#332417" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#8c6239" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#b37d47" />
    
    {/* Yellow/Orange explosive star */}
    <polygon points="16,8 19,13 24,14 20,18 22,24 16,21 10,24 12,18 8,14 13,13" fill="#ffaa00" stroke="#cc5500" strokeWidth="1" />
    <polygon points="16,10 18,14 22,15 19,17 20,22 16,20 12,22 13,17 10,15 14,14" fill="#ffee66" />
    <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
  </svg>
);

export const ManaFluidSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Cork */}
    <rect x="14" y="5" width="4" height="3" fill="#a06030" stroke="#503010" strokeWidth="0.5" />
    {/* Bottle Neck */}
    <rect x="13" y="8" width="6" height="4" fill="#aaccff" fillOpacity="0.7" stroke="#4477aa" strokeWidth="0.8" />
    {/* Bottle Body */}
    <path d="M13 12L8 18v8a2 2 0 002 2h12a2 2 0 002-2v-8l-5-6h-6z" fill="#99ccff" fillOpacity="0.4" stroke="#4477aa" strokeWidth="1" />
    {/* Purple Mana Liquid inside */}
    <path d="M10 20v6a1 1 0 001 1h10a1 1 0 001-1v-6l-2-3H12l-2 3z" fill="#8800cc" />
    <path d="M11 21v4h10v-4l-1.5-2h-7l-1.5 2z" fill="#aa33ff" />
    <ellipse cx="16" cy="19" rx="4" ry="1" fill="#cc88ff" />
    {/* Glass reflections */}
    <path d="M10 19v6" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8" />
    <circle cx="14" cy="22" r="1" fill="#ffffff" fillOpacity="0.7" />
  </svg>
);

export const GoldCoinsSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm ${className}`}
  >
    {/* Crystal Coins / Crystal Blue Platinums */}
    {/* Coin 1 bottom */}
    <ellipse cx="14" cy="24" rx="8" ry="4" fill="#0088cc" stroke="#004466" strokeWidth="1" />
    <ellipse cx="14" cy="23" rx="7" ry="3.2" fill="#00c8ff" />
    <ellipse cx="14" cy="22.5" rx="5" ry="2" fill="#80e5ff" />
    
    {/* Coin 2 middle */}
    <ellipse cx="18" cy="18" rx="8" ry="4" fill="#0088cc" stroke="#004466" strokeWidth="1" />
    <ellipse cx="18" cy="17" rx="7" ry="3.2" fill="#00c8ff" />
    <ellipse cx="18" cy="16.5" rx="5" ry="2" fill="#80e5ff" />
    
    {/* Coin 3 top (Gold / Crystal shine) */}
    <ellipse cx="15" cy="11" rx="8" ry="4" fill="#cc9900" stroke="#664d00" strokeWidth="1" />
    <ellipse cx="15" cy="10" rx="7" ry="3.2" fill="#ffd700" />
    <ellipse cx="15" cy="9.5" rx="5" ry="2" fill="#fff3a3" />
    
    {/* Sparkle */}
    <polygon points="23,6 24,9 27,10 24,11 23,14 22,11 19,10 22,9" fill="#ffffff" />
  </svg>
);

export const BackpackSprite: React.FC<SpriteProps & { colorVariant?: 'blue' | 'brown' | 'camo' | 'purple' | 'red' }> = ({
  className = '',
  size = 32,
  colorVariant = 'blue',
}) => {
  const colors = {
    blue: { main: '#1e3a8a', trim: '#3b82f6', light: '#93c5fd', buckle: '#fbbf24' },
    brown: { main: '#5c3a21', trim: '#8b5a2b', light: '#d4a373', buckle: '#fbbf24' },
    camo: { main: '#2d4a22', trim: '#476930', light: '#85994b', buckle: '#fbbf24' },
    purple: { main: '#4c1d95', trim: '#7c3aed', light: '#c4b5fd', buckle: '#fbbf24' },
    red: { main: '#7f1d1d', trim: '#dc2626', light: '#fca5a5', buckle: '#fbbf24' },
  }[colorVariant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-sm ${className}`}
    >
      {/* Top handle */}
      <rect x="13" y="4" width="6" height="3" rx="1.5" fill="#1c1917" />
      {/* Flap top */}
      <path d="M7 9C7 7.5 8.5 7 11 7H21C23.5 7 25 7.5 25 9V14H7V9Z" fill={colors.trim} stroke="#1c1917" strokeWidth="1" />
      {/* Main bag */}
      <rect x="6" y="13" width="20" height="15" rx="3" fill={colors.main} stroke="#1c1917" strokeWidth="1" />
      {/* Front pouch */}
      <rect x="9" y="16" width="14" height="9" rx="2" fill={colors.trim} stroke="#1c1917" strokeWidth="0.8" />
      {/* Straps / Highlight */}
      <rect x="11" y="9" width="2" height="15" fill={colors.light} fillOpacity="0.4" />
      <rect x="19" y="9" width="2" height="15" fill={colors.light} fillOpacity="0.4" />
      {/* Buckle */}
      <rect x="14" y="14" width="4" height="4" rx="1" fill={colors.buckle} stroke="#78350f" strokeWidth="0.8" />
      <rect x="15" y="15" width="2" height="2" fill="#ffffff" />
    </svg>
  );
};

export const RareItemSprite: React.FC<SpriteProps & { itemType?: 'mpa' | 'demon_helmet' | 'sov' | 'sca' }> = ({
  className = '',
  size = 32,
  itemType = 'demon_helmet',
}) => {
  if (itemType === 'mpa') {
    // Magic Plate Armor
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`inline-block drop-shadow-sm ${className}`}>
        <path d="M10 6L6 11V18L10 26H22L26 18V11L22 6H10Z" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M12 8L8 12V17L11 23H21L24 17V12L20 8H12Z" fill="#2563eb" />
        <circle cx="16" cy="16" r="4" fill="#60a5fa" stroke="#fbbf24" strokeWidth="1" />
        <path d="M16 13V19M13 16H19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  
  if (itemType === 'sov') {
    // Sword of Valor
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`inline-block drop-shadow-sm ${className}`}>
        <path d="M26 6L24 4L14 14L16 16L26 6Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />
        <path d="M14 14L11 11L9 13L12 16L14 14Z" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <path d="M12 16L8 20L6 18L10 14L12 16Z" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <path d="M9 17L5 25L7 27L15 19L9 17Z" fill="#dc2626" />
        <circle cx="5" cy="27" r="2" fill="#fbbf24" />
      </svg>
    );
  }

  // Demon Helmet default
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`inline-block drop-shadow-sm ${className}`}>
      {/* Horns */}
      <path d="M6 10C5 6 9 4 11 6L9 12H6V10Z" fill="#dc2626" stroke="#450a0a" strokeWidth="1" />
      <path d="M26 10C27 6 23 4 21 6L23 12H26V10Z" fill="#dc2626" stroke="#450a0a" strokeWidth="1" />
      {/* Helm */}
      <path d="M9 10C9 8 11 7 16 7C21 7 23 8 23 10V22L16 26L9 22V10Z" fill="#991b1b" stroke="#450a0a" strokeWidth="1.5" />
      {/* Visor / Faceplate */}
      <path d="M11 13H21V19L16 23L11 19V13Z" fill="#450a0a" />
      {/* Glowing red eyes */}
      <rect x="12" y="15" width="3" height="2" rx="0.5" fill="#f87171" />
      <rect x="17" y="15" width="3" height="2" rx="0.5" fill="#f87171" />
    </svg>
  );
};

export const ParalyzeRuneSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    {/* Teal stone */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#004d40" stroke="#00241b" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#00796b" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#009688" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#80cbc4" fillOpacity="0.8" />
    {/* Spider web / Paralyze glyph */}
    <circle cx="16" cy="16" r="6" stroke="#e0f2f1" strokeWidth="1.2" />
    <circle cx="16" cy="16" r="3" stroke="#e0f2f1" strokeWidth="1" />
    <path d="M16 8v16M8 16h16M10 10l12 12M10 22L22 10" stroke="#e0f2f1" strokeWidth="1.2" />
    <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
  </svg>
);

export const MagicWallSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    {/* Golden/Yellow rune */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#713f12" stroke="#422006" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#a16207" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#ca8a04" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#fde047" fillOpacity="0.8" />
    {/* Brick Wall Glyphs */}
    <rect x="10" y="10" width="5" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="17" y="10" width="5" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="8" y="14" width="4" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="14" y="14" width="4" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="20" y="14" width="4" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="10" y="18" width="5" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
    <rect x="17" y="18" width="5" height="3" fill="#422006" stroke="#fef08a" strokeWidth="0.8" />
  </svg>
);

export const FireBombSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#7c2d12" stroke="#451a03" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#c2410c" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#ea580c" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#fdba74" fillOpacity="0.8" />
    {/* Bomb outline with fuse */}
    <circle cx="16" cy="17" r="5" fill="#18181b" stroke="#451a03" strokeWidth="1" />
    <rect x="15" y="10" width="2" height="3" fill="#a1a1aa" />
    <path d="M17 10Q19 8 21 9" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="21" cy="9" r="1.5" fill="#fde047" />
    <circle cx="14" cy="15" r="1" fill="#ffffff" />
  </svg>
);

export const EnergyBombSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#4c1d95" stroke="#2e1065" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#6d28d9" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#7c3aed" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#c4b5fd" fillOpacity="0.8" />
    {/* Lightning Bolt */}
    <polygon points="17,8 11,17 15,17 13,24 21,14 17,14" fill="#ffffff" stroke="#c084fc" strokeWidth="1" />
    <circle cx="15" cy="16" r="1.5" fill="#e9d5ff" />
  </svg>
);

export const PoisonBombSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#14532d" stroke="#052e16" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#15803d" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#16a34a" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#86efac" fillOpacity="0.8" />
    {/* Poison droplet / flask */}
    <path d="M16 9C16 9 11 16 11 19C11 21.76 13.24 24 16 24C18.76 24 21 21.76 21 19C21 16 16 9 16 9Z" fill="#22c55e" stroke="#052e16" strokeWidth="1" />
    <circle cx="15" cy="17" r="1.5" fill="#bbf7d0" />
  </svg>
);

export const DestroyFieldSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#475569" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#64748b" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#cbd5e1" fillOpacity="0.8" />
    {/* Broom / Sweeping wind */}
    <path d="M22 10L14 18M11 21L15 17L13 15L9 19L11 21Z" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 22L8 24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChameleonSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#365314" stroke="#1a2e05" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#4d7c0f" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#65a30d" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#bef264" fillOpacity="0.8" />
    {/* Spiral tail chameleon */}
    <path d="M10 18C10 13 14 11 18 11C21 11 23 13 23 16C23 18 21 20 18 20H12C11 20 10 19 10 18Z" fill="#a3e635" stroke="#1a2e05" strokeWidth="1" />
    <circle cx="20" cy="14" r="1.5" fill="#ffffff" />
    <circle cx="20" cy="14" r="0.8" fill="#000000" />
  </svg>
);

export const IntenseHealingSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#0e7490" stroke="#164e63" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#06b6d4" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#22d3ee" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#a5f3fc" fillOpacity="0.8" />
    {/* Single IH Cross */}
    <rect x="14" y="10" width="4" height="12" fill="#083344" />
    <rect x="10" y="14" width="12" height="4" fill="#083344" />
    <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
  </svg>
);

export const SoulfireSprite: React.FC<SpriteProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block drop-shadow-sm ${className}`}>
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#581c87" stroke="#3b0764" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="2" fill="#7e22ce" />
    <rect x="7" y="7" width="18" height="18" rx="1" fill="#9333ea" />
    <path d="M7 7h18v2H7zM7 7v18h2V7z" fill="#d8b4fe" fillOpacity="0.8" />
    {/* Purple fire */}
    <path d="M16 8C16 8 21 14 20 18C19 22 14 24 16 24C12 24 11 20 13 17C14 15 16 13 16 8Z" fill="#e879f9" stroke="#3b0764" strokeWidth="1" />
    <circle cx="16" cy="19" r="2" fill="#ffffff" />
  </svg>
);

export const RenderItemIcon: React.FC<{ runeType: string; category?: string; size?: number; className?: string }> = ({
  runeType,
  category,
  size = 32,
  className = '',
}) => {
  const typeLower = runeType.toLowerCase();
  
  if (typeLower.includes('uh') || typeLower.includes('ultimate healing')) {
    return <UhRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('sd') || typeLower.includes('sudden death')) {
    return <SdRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('gfb') || typeLower.includes('great fireball')) {
    return <GfbRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('hmm') || typeLower.includes('magic missile')) {
    return <HmmRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('explo') || typeLower.includes('explosion')) {
    return <ExploRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('paralyze') || typeLower.includes('para')) {
    return <ParalyzeRuneSprite size={size} className={className} />;
  }
  if (typeLower.includes('mwall') || typeLower.includes('magic wall') || typeLower.includes('wall')) {
    return <MagicWallSprite size={size} className={className} />;
  }
  if (typeLower.includes('fbomb') || typeLower.includes('fire bomb')) {
    return <FireBombSprite size={size} className={className} />;
  }
  if (typeLower.includes('ebomb') || typeLower.includes('energy bomb')) {
    return <EnergyBombSprite size={size} className={className} />;
  }
  if (typeLower.includes('pbomb') || typeLower.includes('poison bomb')) {
    return <PoisonBombSprite size={size} className={className} />;
  }
  if (typeLower.includes('destroy') || typeLower.includes('dfield')) {
    return <DestroyFieldSprite size={size} className={className} />;
  }
  if (typeLower.includes('chameleon') || typeLower.includes('cham')) {
    return <ChameleonSprite size={size} className={className} />;
  }
  if (typeLower.includes('soul') || typeLower.includes('soulfire')) {
    return <SoulfireSprite size={size} className={className} />;
  }
  if (typeLower.includes('ih') || typeLower.includes('intense healing')) {
    return <IntenseHealingSprite size={size} className={className} />;
  }
  if (typeLower.includes('mana') || typeLower.includes('fluid') || category === 'fluid') {
    return <ManaFluidSprite size={size} className={className} />;
  }
  if (typeLower.includes('gold') || typeLower.includes('kk') || typeLower.includes('coin') || category === 'gold') {
    return <GoldCoinsSprite size={size} className={className} />;
  }
  if (typeLower.includes('mpa') || typeLower.includes('magic plate')) {
    return <RareItemSprite itemType="mpa" size={size} className={className} />;
  }
  if (typeLower.includes('demon') || typeLower.includes('helmet')) {
    return <RareItemSprite itemType="demon_helmet" size={size} className={className} />;
  }
  if (typeLower.includes('sov') || typeLower.includes('sword') || typeLower.includes('sca')) {
    return <RareItemSprite itemType="sov" size={size} className={className} />;
  }

  // Default Backpack
  return <BackpackSprite colorVariant="blue" size={size} className={className} />;
};
