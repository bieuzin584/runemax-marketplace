import React from 'react';
import { ServerId, ServerInfo, ItemCategory } from '../types';
import { soundFx } from '../utils/audio';
import { Search, Server, Sparkles, Shield, Users, TrendingUp, ChevronRight, Layers, Flame } from 'lucide-react';
import { UhRuneSprite, SdRuneSprite, GfbRuneSprite, HmmRuneSprite, ExploRuneSprite, GoldCoinsSprite } from '../utils/tibiaSprites';

interface Props {
  servers: ServerInfo[];
  selectedServer: ServerId;
  onSelectServer: (server: ServerId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ItemCategory;
  onSelectCategory: (cat: ItemCategory) => void;
  totalOffersCount: number;
}

export const ServerSelector: React.FC<Props> = ({
  servers,
  selectedServer,
  onSelectServer,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalOffersCount,
}) => {
  const currentServerInfo = servers.find((s) => s.id === selectedServer);

  const categories: { id: ItemCategory; label: string; icon?: React.ReactNode; color: string; badge?: string }[] = [
    { id: 'all', label: 'Todas as Runas (7.4)', color: 'from-blue-600/20 to-indigo-600/20' },
    { id: 'rune_uh', label: 'BP de UH (20 BPs)', icon: <UhRuneSprite size={28} />, color: 'from-blue-500/20 to-cyan-500/20', badge: 'Mais Vendida' },
    { id: 'rune_sd', label: 'BP de SD (20 BPs)', icon: <SdRuneSprite size={28} />, color: 'from-purple-500/20 to-pink-500/20', badge: 'Warmode PK' },
    { id: 'rune_gfb', label: 'BP de GFB', icon: <GfbRuneSprite size={28} />, color: 'from-amber-500/20 to-orange-500/20', badge: 'Hunt D-Lair' },
    { id: 'rune_hmm', label: 'BP de HMM', icon: <HmmRuneSprite size={28} />, color: 'from-emerald-500/20 to-teal-500/20' },
    { id: 'rune_explo', label: 'BP de Explosion', icon: <ExploRuneSprite size={28} />, color: 'from-rose-500/20 to-red-500/20' },
    { id: 'fluid', label: 'Mana Fluids', icon: <GoldCoinsSprite size={28} />, color: 'from-sky-500/20 to-blue-500/20' },
    { id: 'gold', label: 'Gold / CCs', icon: <GoldCoinsSprite size={28} />, color: 'from-yellow-500/20 to-amber-500/20', badge: 'Cotação Alta' },
  ];

  return (
    <div className="space-y-6">
      
      {/* GGMAX-style Hero Banner: "comprar e vender - contas, runas, bps, gold, itens digitais e mais!" */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#121622] via-[#0e111a] to-[#0a0c10] border border-[#202738] p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Tibia 7.4 Oficial</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            [ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400">comprar e vender</span> ]
          </h1>
          
          <p className="text-sm sm:text-base text-stone-300 font-medium max-w-xl mx-auto">
            bps de uh, sd, gfb, gold, itens e produções de makers em tempo real!
          </p>

          {/* GGMAX style big rounded search bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-[#171b26] border border-[#2c354a] rounded-2xl shadow-xl overflow-hidden focus-within:border-blue-500 transition-colors">
              <Search className="w-5 h-5 ml-4 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Busque por item, runa (ex: UH, SD, GFB, 100k Gold)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-white px-3 py-3.5 text-sm focus:outline-none placeholder-stone-500 font-medium"
              />
              <button
                onClick={() => {
                  soundFx.playClick();
                }}
                className="mr-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shrink-0"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Server tabs buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onSelectServer('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                selectedServer === 'all'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-900/40'
                  : 'bg-[#141824] text-stone-300 border-[#242b3d] hover:border-stone-600'
              }`}
            >
              Todos os Servidores
            </button>
            {servers.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectServer(s.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  selectedServer === s.id
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-900/40'
                    : 'bg-[#141824] text-stone-300 border-[#242b3d] hover:border-stone-600'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{s.name} 7.4</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GGMAX "Categorias Populares" Carousel Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Categorias Populares
          </h2>
          <span className="text-xs text-stone-400 font-semibold">{totalOffersCount} ofertas disponíveis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectCategory(cat.id);
                }}
                className={`group relative p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-b from-blue-900/60 to-[#141926] border-blue-400 shadow-lg shadow-blue-950/50 scale-[1.03]'
                    : 'bg-[#121622]/90 border-[#202738] hover:border-[#35405c] hover:bg-[#181e2e]'
                }`}
              >
                {cat.badge && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full text-[9px] font-black bg-amber-500 text-stone-950 shadow">
                    {cat.badge}
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-[#191f2e] border border-[#2b354c] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon || <Layers className="w-5 h-5 text-blue-400" />}
                </div>

                <div className="text-[11px] font-bold text-stone-200 line-clamp-1 leading-tight">
                  {cat.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Server Context Card */}
      {currentServerInfo && (
        <div id="server-highlight-card" className="bg-[#121622] border border-[#232a3d] p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30 text-blue-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">{currentServerInfo.name} 7.4</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50 uppercase">
                  Servidor Ativo
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{currentServerInfo.highlightText}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-stone-300 bg-[#171c2b] px-3 py-1.5 rounded-lg border border-[#252e42]">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Jogadores: <strong>~{currentServerInfo.estimatedPlayers}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300 bg-[#171c2b] px-3 py-1.5 rounded-lg border border-[#252e42]">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Cotação Gold: <strong>{currentServerInfo.goldRate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Safe Trade Thais/Carlin</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
