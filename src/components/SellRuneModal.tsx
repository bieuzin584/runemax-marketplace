import React, { useState } from 'react';
import { ServerId, SellRuneSubmission, TradeOffer } from '../types';
import { TIBIA_CITIES, DEFAULT_WHATSAPP } from '../data/initialData';
import { soundFx } from '../utils/audio';
import { 
  X, 
  Check, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  User,
  MapPin,
  Flame
} from 'lucide-react';
import { UhRuneSprite, SdRuneSprite, GfbRuneSprite } from '../utils/tibiaSprites';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: SellRuneSubmission) => void;
  preselectedOffer?: TradeOffer | null;
  whatsappNumber?: string;
}

export const SellRuneModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  preselectedOffer,
  whatsappNumber = DEFAULT_WHATSAPP,
}) => {
  if (!isOpen) return null;

  const [server, setServer] = useState<'miracle' | 'mythera' | 'deusold'>(
    preselectedOffer?.server || 'miracle'
  );
  const [runeType, setRuneType] = useState(preselectedOffer?.runeType || 'UH');
  const [quantityBps, setQuantityBps] = useState(10);
  const [makerCharName, setMakerCharName] = useState('');
  const [city, setCity] = useState(TIBIA_CITIES[0]);
  const [whatsapp, setWhatsapp] = useState('');
  const [pixKeyToReceive, setPixKeyToReceive] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Approximate buy prices paid to makers (R$ per BP of 2000 charges or standard)
  const makerPayoutRates: Record<string, Record<string, number>> = {
    miracle: {
      UH: 11.50,
      SD: 18.00,
      GFB: 7.50,
      HMM: 5.00,
      Explosion: 8.00,
    },
    mythera: {
      UH: 10.00,
      SD: 16.00,
      GFB: 6.50,
      HMM: 4.50,
      Explosion: 7.00,
    },
    deusold: {
      UH: 13.00,
      SD: 19.50,
      GFB: 8.50,
      HMM: 5.50,
      Explosion: 9.00,
    },
  };

  const currentRate = makerPayoutRates[server]?.[runeType] || 10.00;
  const estimatedPayout = currentRate * quantityBps;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!makerCharName.trim()) {
      alert('Por favor informe o nome do seu personagem maker.');
      return;
    }
    if (!pixKeyToReceive.trim()) {
      alert('Por favor informe sua Chave Pix para receber o pagamento.');
      return;
    }

    soundFx.playSuccess();

    const submission: SellRuneSubmission = {
      id: `MAKER-${Math.floor(1000 + Math.random() * 9000)}`,
      server,
      runeType,
      quantityBps,
      expectedPriceBrl: estimatedPayout,
      makerCharName: makerCharName.trim(),
      city,
      whatsapp: whatsapp.trim() || whatsappNumber,
      pixKeyToReceive: pixKeyToReceive.trim(),
      notes: notes.trim(),
      submittedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    onSubmit(submission);
    setIsSuccess(true);
  };

  const handleNotifyWhatsApp = () => {
    const msg = `⚡ *QUERO VENDER RUNAS NO RUNE MARKET (MAKER 7.4)* ⚡\n\n` +
      `*Servidor:* ${server.toUpperCase()} 7.4\n` +
      `*Runa:* ${quantityBps}x BPs de ${runeType}\n` +
      `*Valor Total Estimado:* R$ ${estimatedPayout.toFixed(2).replace('.', ',')}\n` +
      `*Personagem Maker:* ${makerCharName}\n` +
      `*Cidade no DP:* ${city}\n` +
      `*Minha Chave Pix:* ${pixKeyToReceive}\n\n` +
      `_Estou online no jogo com o maker pronto no Depot para passar as BPs via Safe Trade!_`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-stone-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl text-stone-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  Vender Produção (Rune Makers)
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    Pix Imediato
                  </span>
                </h3>
                <p className="text-xs text-stone-400">
                  Tem Druid ou Sorcerer maker farmando? Compramos seu estoque de BPs no atacado!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Server Select */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  1. Selecione o Servidor 7.4:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['miracle', 'mythera', 'deusold'] as const).map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setServer(srv)}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition capitalize ${
                        server === srv
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/40'
                          : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {srv} 7.4
                    </button>
                  ))}
                </div>
              </div>

              {/* Rune Type */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  2. Tipo de Runa:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {['UH', 'SD', 'GFB', 'HMM', 'Explosion'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRuneType(r)}
                      className={`py-1.5 px-1 text-xs font-bold rounded-lg border text-center transition ${
                        runeType === r
                          ? 'bg-amber-500 text-stone-950 border-amber-300'
                          : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-stone-950/70 border border-stone-800 p-3 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-300 font-medium">Quantidade de BPs para vender:</span>
                  <span className="text-amber-400 font-bold text-sm">{quantityBps} BPs</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={100}
                  step={1}
                  value={quantityBps}
                  onChange={(e) => setQuantityBps(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between items-center pt-2 border-t border-stone-800/80 text-xs">
                  <span className="text-stone-400">Cotação paga por BP:</span>
                  <span className="text-stone-200 font-semibold">R$ {currentRate.toFixed(2).replace('.', ',')} / BP</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-emerald-400">Você receberá no Pix:</span>
                  <span className="text-emerald-400 text-base">R$ {estimatedPayout.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Character Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Nome do seu Char / Maker:
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Druid Farm"
                      value={makerCharName}
                      onChange={(e) => setMakerCharName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Depot / Cidade:
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-emerald-500"
                    >
                      {TIBIA_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pix Key */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Sua Chave Pix para Recebimento:
                </label>
                <input
                  type="text"
                  required
                  placeholder="CPF, E-mail, Celular ou Chave Aleatória"
                  value={pixKeyToReceive}
                  onChange={(e) => setPixKeyToReceive(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Whatsapp */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Seu WhatsApp (opcional para agilizar):
                </label>
                <input
                  type="text"
                  placeholder="(DDD) 99999-9999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Confirmar Proposta de Venda (R$ {estimatedPayout.toFixed(2).replace('.', ',')})</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400">Proposta de Venda Registrada!</h3>
            <p className="text-xs text-stone-300 max-w-sm mx-auto">
              Recebemos sua oferta de <strong>{quantityBps}x BPs de {runeType}</strong> no servidor <strong>{server.toUpperCase()} 7.4</strong>.
            </p>
            <div className="bg-stone-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Valor a receber:</span>
                <strong className="text-emerald-400 font-bold">R$ {estimatedPayout.toFixed(2).replace('.', ',')}</strong>
              </div>
              <div className="flex justify-between mt-1">
                <span>Safe Trade no DP:</span>
                <span>{city} ({makerCharName})</span>
              </div>
            </div>

            <button
              onClick={handleNotifyWhatsApp}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar no WhatsApp para Passar as BPs Agora</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-stone-200 underline pt-2 block mx-auto"
            >
              Fechar Janela
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
