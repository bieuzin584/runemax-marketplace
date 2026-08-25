import React from 'react';
import { Review } from '../types';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';

interface Props {
  reviews: Review[];
}

export const ReviewsSection: React.FC<Props> = ({ reviews }) => {
  return (
    <div id="reviews-section" className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-100">Avaliações de Compradores & Makers 7.4</h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verificado
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Mais de 4.500 negociações de BPs de UH, SD e Gold entregues com Safe Trade nos depósitos.
          </p>
        </div>

        {/* Global Rating Score */}
        <div className="flex items-center gap-3 bg-stone-950/80 px-4 py-2.5 rounded-xl border border-stone-800">
          <div className="text-2xl font-black text-amber-400">4.98</div>
          <div className="space-y-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-[10px] text-stone-400">Classificação em 1.420 reviews</div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-stone-950/90 border border-stone-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-200 block leading-tight">{rev.author}</span>
                    <span className="text-[10px] text-stone-400">{rev.charLevel || 'Player 7.4'}</span>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-stone-900 text-stone-300 rounded mb-2 border border-stone-800 capitalize">
                Servidor: <span className="text-amber-400">{rev.server} 7.4</span> • {rev.itemBought}
              </div>

              <p className="text-xs text-stone-300 italic">"{rev.comment}"</p>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-900 flex items-center justify-between text-[10px] text-stone-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Safe Trade Concluído
              </span>
              <span>{rev.dateAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
