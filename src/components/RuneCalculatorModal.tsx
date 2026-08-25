import React, { useState } from 'react';
import { ServerId, ServerInfo } from '../types';
import { soundFx } from '../utils/audio';
import { X, Calculator, Sparkles, Flame, ShieldCheck, ShoppingCart } from 'lucide-react';
import { UhRuneSprite, SdRuneSprite, GfbRuneSprite, GoldCoinsSprite } from '../utils/tibiaSprites';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  servers: ServerInfo[];
  onQuickOrderCombo?: (server: 'miracle' | 'mythera' | 'deusold', items: { name: string; qty: number }[]) => void;
}

export const RuneCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  servers,
  onQuickOrderCombo,
}) => {
  if (!isOpen) return null;

  const [selectedServer, setSelectedServer] = useState<'miracle' | 'mythera' | 'deusold'>('miracle');
  const [uhQty, setUhQty] = useState(5);
  const [sdQty, setSdQty] = useState(2);
  const [gfbQty, setGfbQty] = useState(2);
  const [goldKkQty, setGoldKkQty] = useState(1); // in 100k units

  // Rates per server
  const serverRates = {
    miracle: { uh: 14.00, sd: 22.00, gfb: 9.50, gold100k: 22.00 },
    mythera: { uh: 12.50, sd: 20.00, gfb: 8.50, gold100k: 18.00 },
    deusold: { uh: 15.50, sd: 24.00, gfb: 10.50, gold100k: 25.00 },
  };

  const rates = serverRates[selectedServer];
  const subtotalUh = uhQty * rates.uh;
  const subtotalSd = sdQty * rates.sd;
  const subtotalGfb = gfbQty * rates.gfb;
  const subtotalGold = goldKkQty * rates.gold100k;

  const totalRaw = subtotalUh + subtotalSd + subtotalGfb + subtotalGold;
  const totalBps = uhQty + sdQty + gfbQty;

  // Combo Discount
  let comboDiscountPercent = 0;
  if (totalBps >= 15 || totalRaw >= 250) {
    comboDiscountPercent = 12;
  } else if (totalBps >= 8 || totalRaw >= 120) {
    comboDiscountPercent = 7;
  } else if (totalBps >= 4) {
    comboDiscountPercent = 4;
  }

  const discountAmount = totalRaw * (comboDiscountPercent / 100);
  const totalFinal = totalRaw - discountAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl text-stone-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              Calculadora & Simulador 7.4
            </h3>
            <p className="text-xs text-stone-400">
              Simule combos de BPs para hunts ou Warmode e veja os descontos progressivos.
            </p>
          </div>
        </div>

        {/* Server Select */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Servidor:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['miracle', 'mythera', 'deusold'] as const).map((srv) => (
              <button
                key={srv}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedServer(srv);
                }}
                className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition capitalize ${
                  selectedServer === srv
                    ? 'bg-amber-500 text-stone-950 border-amber-300 font-extrabold shadow-md'
                    : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                }`}
              >
                {srv} 7.4
              </button>
            ))}
          </div>
        </div>

        {/* Item Rows */}
        <div className="space-y-3 bg-stone-950/80 p-3.5 rounded-xl border border-stone-800">
          {/* UH */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <UhRuneSprite size={20} />
              <div>
                <span className="font-semibold text-stone-200">Backpack de UH (20 BPs)</span>
                <span className="block text-[10px] text-stone-400">R$ {rates.uh.toFixed(2).replace('.', ',')} / BP</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUhQty((prev) => Math.max(0, prev - 1))}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-amber-300">{uhQty}</span>
              <button
                onClick={() => setUhQty((prev) => prev + 1)}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* SD */}
          <div className="flex items-center justify-between gap-3 text-xs border-t border-stone-900 pt-2">
            <div className="flex items-center gap-2">
              <SdRuneSprite size={20} />
              <div>
                <span className="font-semibold text-stone-200">Backpack de SD (20 BPs)</span>
                <span className="block text-[10px] text-stone-400">R$ {rates.sd.toFixed(2).replace('.', ',')} / BP</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSdQty((prev) => Math.max(0, prev - 1))}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-amber-300">{sdQty}</span>
              <button
                onClick={() => setSdQty((prev) => prev + 1)}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* GFB */}
          <div className="flex items-center justify-between gap-3 text-xs border-t border-stone-900 pt-2">
            <div className="flex items-center gap-2">
              <GfbRuneSprite size={20} />
              <div>
                <span className="font-semibold text-stone-200">Backpack de GFB (20 BPs)</span>
                <span className="block text-[10px] text-stone-400">R$ {rates.gfb.toFixed(2).replace('.', ',')} / BP</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGfbQty((prev) => Math.max(0, prev - 1))}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-amber-300">{gfbQty}</span>
              <button
                onClick={() => setGfbQty((prev) => prev + 1)}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Gold */}
          <div className="flex items-center justify-between gap-3 text-xs border-t border-stone-900 pt-2">
            <div className="flex items-center gap-2">
              <GoldCoinsSprite size={20} />
              <div>
                <span className="font-semibold text-stone-200">Pacotes de 100k Gold (10 CC)</span>
                <span className="block text-[10px] text-stone-400">R$ {rates.gold100k.toFixed(2).replace('.', ',')} / 100k</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGoldKkQty((prev) => Math.max(0, prev - 1))}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-amber-300">{goldKkQty}</span>
              <button
                onClick={() => setGoldKkQty((prev) => prev + 1)}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="mt-4 p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-1 text-xs">
          <div className="flex justify-between text-stone-400">
            <span>Subtotal Bruto:</span>
            <span>R$ {totalRaw.toFixed(2).replace('.', ',')}</span>
          </div>

          {comboDiscountPercent > 0 && (
            <div className="flex justify-between text-emerald-400 font-semibold">
              <span>Desconto de Combo ({comboDiscountPercent}% OFF):</span>
              <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-stone-100 font-bold pt-2 border-t border-amber-500/20 text-sm">
            <span>Total com Desconto:</span>
            <span className="text-amber-400 text-base">R$ {totalFinal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2">
          <button
            onClick={() => {
              soundFx.playSuccess();
              alert(`Combo adicionado! Vá até o card do item para fechar seu pedido com Safe Trade no servidor ${selectedServer.toUpperCase()} 7.4.`);
              onClose();
            }}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Fazer Pedido deste Combo (R$ {totalFinal.toFixed(2).replace('.', ',')})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
