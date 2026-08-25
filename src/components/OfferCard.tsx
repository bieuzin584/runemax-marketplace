import React, { useState } from 'react';
import { TradeOffer } from '../types';
import { RenderItemIcon } from '../utils/tibiaSprites';
import { soundFx } from '../utils/audio';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';

interface Props {
  offer: TradeOffer;
  onOpenOrderModal: (offer: TradeOffer, quantity: number) => void;
  onOpenSellModalWithOffer?: (offer: TradeOffer) => void;
}

export const OfferCard: React.FC<Props> = ({
  offer,
  onOpenOrderModal,
  onOpenSellModalWithOffer,
}) => {
  const [quantity, setQuantity] = useState(offer.minOrder || 1);

  const isBuyOrder = offer.tradeType === 'buy';

  const handleIncrement = () => {
    soundFx.playClick();
    setQuantity((prev) => Math.min(prev + 1, offer.stockBps || 999));
  };

  const handleDecrement = () => {
    soundFx.playClick();
    setQuantity((prev) => Math.max(prev - 1, offer.minOrder || 1));
  };

  // Calculate discount
  let appliedDiscountPercent = 0;
  if (offer.bulkDiscounts && offer.bulkDiscounts.length > 0) {
    const matched = [...offer.bulkDiscounts]
      .sort((a, b) => b.minQty - a.minQty)
      .find((d) => quantity >= d.minQty);
    if (matched) {
      appliedDiscountPercent = matched.discountPercent;
    }
  }

  const rawTotal = offer.priceBrl * quantity;
  const finalTotal = rawTotal * (1 - appliedDiscountPercent / 100);

  const serverColors = {
    miracle: {
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      label: 'Miracle 7.4',
    },
    mythera: {
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      label: 'Mythera 7.4',
    },
    deusold: {
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      label: 'DeusOLD 7.4',
    },
  }[offer.server];

  return (
    <div
      id={`offer-card-${offer.id}`}
      className="relative rounded-2xl tibia-stone-card transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      {/* Top tag / Featured badge */}
      {offer.featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>Mais Vendido</span>
          </div>
        </div>
      )}

      {/* Main card body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        {/* Header with Sprite, Title & Server Badge */}
        <div>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#171c2b] border border-[#2b354d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <RenderItemIcon runeType={offer.runeType} category={offer.category} size={38} />
            </div>

            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className={`px-2 py-0.2 text-[10px] font-bold rounded-full border ${serverColors.badge}`}>
                  {serverColors.label}
                </span>

                {isBuyOrder ? (
                  <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50 uppercase">
                    Compramos de Makers
                  </span>
                ) : (
                  <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-emerald-400" />
                    Entrega Imediata
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                {offer.title}
              </h3>
            </div>
          </div>

          {/* GGMAX Style Seller Trust Pill */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-stone-400 bg-[#161c2a] px-2.5 py-1 rounded-xl border border-[#242e45]">
            <div className="flex items-center text-amber-400 gap-0.5 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>5.0</span>
            </div>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Vendedor Verificado
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400 truncate">Safe Trade 100%</span>
          </div>

          {/* Description & Charges Info */}
          <p className="text-xs text-stone-400 mt-2.5 line-clamp-2 leading-relaxed">
            {offer.description}
          </p>

          {offer.chargesInfo && (
            <div className="mt-2 text-[11px] text-stone-300 flex items-center gap-1.5 bg-[#171d2b] px-2.5 py-1 rounded-lg border border-[#263047]">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{offer.chargesInfo}</span>
            </div>
          )}

          {/* Bulk discounts pill preview */}
          {offer.bulkDiscounts && offer.bulkDiscounts.length > 0 && !isBuyOrder && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-stone-400 flex items-center gap-1 font-bold">
                <Tag className="w-3 h-3 text-blue-400" />
                Descontos:
              </span>
              {offer.bulkDiscounts.map((d, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    quantity >= d.minQty
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-[#192030] text-stone-300 border border-[#29344d]'
                  }`}
                >
                  {d.minQty}+ = {d.discountPercent}% OFF
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Block */}
        <div className="mt-4 pt-3 border-t border-[#202738] flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              {isBuyOrder ? 'Pagamos por Unidade:' : 'Preço por Unidade:'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-white">
                R$ {offer.priceBrl.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[11px] text-stone-400 font-semibold">/ {offer.unitLabel.includes('100k') ? '100k' : 'BP'}</span>
            </div>
            {offer.priceGoldKk && (
              <span className="text-[10px] text-amber-400/90 font-medium block">
                ou ~{offer.priceGoldKk} KKs in-game
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              {isBuyOrder ? 'Demanda:' : 'Estoque:'}
            </span>
            <span className="text-xs font-black text-white flex items-center justify-end gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>{offer.stockBps} {offer.unitLabel.includes('100k') ? 'x 100k' : 'BPs'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3.5 bg-[#0e121c] border-t border-[#202738] flex items-center justify-between gap-2">
        {/* Quantity selector */}
        {!isBuyOrder ? (
          <div className="flex items-center bg-[#151a26] border border-[#29334a] rounded-xl p-0.5">
            <button
              id={`btn-dec-${offer.id}`}
              onClick={handleDecrement}
              disabled={quantity <= (offer.minOrder || 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
              title="Diminuir quantidade"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-black text-white">
              {quantity}
            </span>
            <button
              id={`btn-inc-${offer.id}`}
              onClick={handleIncrement}
              disabled={quantity >= offer.stockBps}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
              title="Aumentar quantidade"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-blue-400 font-bold flex items-center gap-1 pl-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pix Imediato</span>
          </div>
        )}

        {/* Buy / Sell CTA Button */}
        {!isBuyOrder ? (
          <button
            id={`btn-buy-${offer.id}`}
            onClick={() => {
              soundFx.playCoinJingle();
              onOpenOrderModal(offer, quantity);
            }}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-blue-950/50 hover:shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Comprar</span>
            <span className="font-extrabold text-blue-200">
              (R$ {finalTotal.toFixed(2).replace('.', ',')})
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        ) : (
          <button
            id={`btn-sell-to-store-${offer.id}`}
            onClick={() => {
              soundFx.playClick();
              if (onOpenSellModalWithOffer) {
                onOpenSellModalWithOffer(offer);
              }
            }}
            className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-blue-950/40 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Vender Runas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
