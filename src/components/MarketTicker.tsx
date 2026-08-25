import React from 'react';
import { LiveMarketTickerItem } from '../types';
import { Flame, ShieldCheck } from 'lucide-react';

interface Props {
  items: LiveMarketTickerItem[];
}

export const MarketTicker: React.FC<Props> = ({ items }) => {
  return (
    <div id="market-ticker-banner" className="bg-amber-950/40 border-b border-amber-500/20 py-1.5 px-4 text-xs overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-wider shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="hidden sm:inline">Ao Vivo 7.4:</span>
          <span className="sm:hidden">Live:</span>
        </div>

        <div className="relative flex-1 overflow-hidden h-5">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
            {items.map((item) => (
              <div key={item.id} className="inline-flex items-center gap-2 text-stone-300">
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded uppercase ${
                  item.server === 'miracle' ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50' :
                  item.server === 'mythera' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' :
                  'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                }`}>
                  {item.server} 7.4
                </span>
                <span>{item.text}</span>
                <span className="text-stone-500 text-[10px]">({item.timeAgo})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-emerald-400 text-xs shrink-0 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Entrega Safe Trade no DP</span>
        </div>
      </div>
    </div>
  );
};
