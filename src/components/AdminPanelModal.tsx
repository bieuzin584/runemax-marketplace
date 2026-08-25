import React, { useState } from 'react';
import { TradeOffer } from '../types';
import { soundFx } from '../utils/audio';
import { X, Settings, Plus, Trash2, Edit2, Check, RefreshCw, Key, MessageSquare } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  offers: TradeOffer[];
  onUpdateOfferPrice: (id: string, newPriceBrl: number, newStock: number) => void;
  pixKey: string;
  onChangePixKey: (newKey: string) => void;
  whatsappNumber: string;
  onChangeWhatsappNumber: (newNumber: string) => void;
}

export const AdminPanelModal: React.FC<Props> = ({
  isOpen,
  onClose,
  offers,
  onUpdateOfferPrice,
  pixKey,
  onChangePixKey,
  whatsappNumber,
  onChangeWhatsappNumber,
}) => {
  if (!isOpen) return null;

  const [currentPix, setCurrentPix] = useState(pixKey);
  const [currentWa, setCurrentWa] = useState(whatsappNumber);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onChangePixKey(currentPix);
    onChangeWhatsappNumber(currentWa);
    soundFx.playSuccess();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl text-stone-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              Painel do Anunciante & Gestão RMT
            </h3>
            <p className="text-xs text-stone-400">
              Configure sua chave Pix, contato de WhatsApp e altere preços e estoque das BPs em tempo real.
            </p>
          </div>
        </div>

        {/* Global Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 space-y-4 mb-6">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            1. Dados de Pagamento & Atendimento
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Sua Chave Pix para Receber:
              </label>
              <div className="relative">
                <Key className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  value={currentPix}
                  onChange={(e) => setCurrentPix(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-stone-200 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                WhatsApp (sem traços/espaços):
              </label>
              <div className="relative">
                <MessageSquare className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  value={currentWa}
                  onChange={(e) => setCurrentWa(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-stone-200 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {savedNotice && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Configurações salvas com sucesso!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition"
            >
              Salvar Dados Globais
            </button>
          </div>
        </form>

        {/* Stock & Prices Management */}
        <div>
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            2. Cotações Rápidas & Estoque de BPs
          </h4>
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {offers.slice(0, 10).map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-xs"
              >
                <div className="flex-1 mr-3">
                  <div className="font-semibold text-stone-200 truncate">{offer.title}</div>
                  <div className="text-[10px] text-stone-400">
                    Servidor: <span className="capitalize font-bold text-amber-400">{offer.server} 7.4</span> | Tipo: {offer.tradeType === 'sell' ? 'Venda' : 'Compra de Maker'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-stone-400">R$:</span>
                    <input
                      type="number"
                      step="0.5"
                      defaultValue={offer.priceBrl}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) onUpdateOfferPrice(offer.id, val, offer.stockBps);
                      }}
                      className="w-16 px-1.5 py-1 text-xs bg-stone-900 border border-stone-700 rounded text-center text-amber-300 font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-stone-400">BPs:</span>
                    <input
                      type="number"
                      defaultValue={offer.stockBps}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) onUpdateOfferPrice(offer.id, offer.priceBrl, val);
                      }}
                      className="w-14 px-1.5 py-1 text-xs bg-stone-900 border border-stone-700 rounded text-center text-stone-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
