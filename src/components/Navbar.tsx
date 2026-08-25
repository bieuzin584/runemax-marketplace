import React, { useState } from 'react';
import { ServerInfo } from '../types';
import { UhRuneSprite, SdRuneSprite } from '../utils/tibiaSprites';
import { soundFx } from '../utils/audio';
import { 
  Calculator, 
  Volume2, 
  VolumeX, 
  Settings, 
  ArrowRightLeft, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Zap,
  Search,
  ShoppingCart,
  Bell,
  ChevronDown,
  Layers
} from 'lucide-react';

interface Props {
  servers: ServerInfo[];
  activeServer: string;
  onSelectServer: (server: 'all' | 'miracle' | 'mythera' | 'deusold') => void;
  onOpenCalculator: () => void;
  onOpenSellModal: () => void;
  onOpenAdmin: () => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<Props> = ({
  servers,
  activeServer,
  onSelectServer,
  onOpenCalculator,
  onOpenSellModal,
  onOpenAdmin,
  whatsappNumber,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playCoinJingle();
  };

  const handleOpenWhatsapp = () => {
    soundFx.playClick();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá equipe Rune Market! Gostaria de tirar uma dúvida sobre compra/venda de BPs de UH e Runas 7.4.')}`;
    window.open(url, '_blank');
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#0d0f15]/95 backdrop-blur-md border-b border-[#232733] shadow-2xl">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-900/40 via-amber-900/30 to-blue-900/40 border-b border-white/5 py-1 px-4 text-center text-[11px] text-stone-300 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
          Tibia 7.4 Safe Market
        </span>
        <span>Entrega automática no Depot via Safe Trade com aviso instantâneo no WhatsApp!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Brand (GGMAX styled gaming brand) */}
          <div className="flex items-center gap-3.5 cursor-pointer shrink-0" onClick={() => onSelectServer('all')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#161a23] to-[#0d0f15] border-2 border-blue-500/40 shadow-lg shadow-blue-950/40 group hover:border-blue-400 transition-all">
              <div className="absolute -top-1 -left-1">
                <UhRuneSprite size={18} />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <SdRuneSprite size={18} />
              </div>
              <Zap className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  RUNE<span className="text-amber-400">MAX</span>
                </span>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-500/40 uppercase tracking-wider">
                  7.4
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium hidden sm:block">
                Mercado de Runas, BPs & Gold
              </p>
            </div>
          </div>

          {/* Quick Server Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#141822] p-1 rounded-xl border border-[#262c3d]">
            <button
              onClick={() => {
                soundFx.playClick();
                onSelectServer('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeServer === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-[#1a202e]'
              }`}
            >
              Todos Servidores
            </button>
            {servers.map((s) => {
              const isSelected = activeServer === s.id;
              return (
                <button
                  key={s.id}
                  id={`nav-server-${s.id}`}
                  onClick={() => {
                    soundFx.playClick();
                    onSelectServer(s.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-[#1a202e]'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Actions & Utilities (Inspired by GGMAX) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Calculator Button */}
            <button
              id="btn-nav-calculator"
              onClick={() => {
                soundFx.playClick();
                onOpenCalculator();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171b26] hover:bg-[#202636] text-stone-200 text-xs font-bold border border-[#283044] transition-all hover:border-blue-500/40"
              title="Calculadora de Preço de BPs e Descontos"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Calculadora</span>
            </button>

            {/* Quero Vender Minhas Runas (Makers) - GGMAX Style 'Anunciar / Vender' */}
            <button
              id="btn-nav-sell-runes"
              onClick={() => {
                soundFx.playClick();
                onOpenSellModal();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-200" />
              <span>Vender Runas</span>
            </button>

            {/* WhatsApp Contact */}
            <button
              id="btn-nav-whatsapp"
              onClick={handleOpenWhatsapp}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all"
              title="Fale com nosso time no WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp Time</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={handleToggleSound}
              className="p-2.5 rounded-xl bg-[#171b26] hover:bg-[#202636] text-stone-400 hover:text-amber-400 border border-[#283044] transition-colors"
              title={isMuted ? 'Ativar Efeitos Sonoros 7.4' : 'Silenciar Efeitos Sonoros'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Admin / Seller Manage */}
            <button
              id="btn-nav-admin"
              onClick={() => {
                soundFx.playClick();
                onOpenAdmin();
              }}
              className="p-2.5 rounded-xl bg-[#171b26] hover:bg-[#202636] text-stone-400 hover:text-stone-200 border border-[#283044] transition-colors"
              title="Painel do Anunciante & Gestão RMT"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
