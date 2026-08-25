import React, { useState } from 'react';
import { TradeOffer, OrderDetails } from '../types';
import { TIBIA_CITIES, DEFAULT_PIX_KEY, DEFAULT_WHATSAPP } from '../data/initialData';
import { RenderItemIcon } from '../utils/tibiaSprites';
import { soundFx } from '../utils/audio';
import { 
  X, 
  Check, 
  Copy, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  User, 
  QrCode, 
  Sparkles, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  offer: TradeOffer | null;
  initialQuantity: number;
  onClose: () => void;
  onOrderCompleted: (order: OrderDetails) => void;
  pixKey?: string;
  whatsappNumber?: string;
}

export const OrderModal: React.FC<Props> = ({
  offer,
  initialQuantity,
  onClose,
  onOrderCompleted,
  pixKey = DEFAULT_PIX_KEY,
  whatsappNumber = DEFAULT_WHATSAPP,
}) => {
  if (!offer) return null;

  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [buyerCharName, setBuyerCharName] = useState('');
  const [city, setCity] = useState(TIBIA_CITIES[0]);
  const [tradeMethod, setTradeMethod] = useState<'depot_safe_trade' | 'parcel' | 'guild_hall'>('depot_safe_trade');
  const [contactWhatsapp, setContactWhatsapp] = useState('');
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [copiedPix, setCopiedPix] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);

  // Discount calculations
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
  const discountValue = rawTotal * (appliedDiscountPercent / 100);
  const finalTotal = rawTotal - discountValue;

  // Generate a mock Pix code string
  const generateMockPixCode = () => {
    const orderId = `TB74-${Math.floor(100000 + Math.random() * 900000)}`;
    return `00020126580014BR.GOV.BCB.PIX0136${pixKey}520400005303986540${finalTotal.toFixed(2)}5802BR5915TIBIA 7.4 STORE6009SAO PAULO62140510${orderId}6304`;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerCharName.trim()) {
      alert('Por favor, informe o nome do seu personagem no Tibia 7.4.');
      return;
    }

    soundFx.playCoinJingle();
    const orderId = `TB74-${Math.floor(100000 + Math.random() * 900000)}`;
    const pixCode = generateMockPixCode();

    const order: OrderDetails = {
      id: orderId,
      offerId: offer.id,
      itemTitle: offer.title,
      server: offer.server,
      quantity,
      unitPriceBrl: offer.priceBrl,
      discountPercent: appliedDiscountPercent,
      totalPriceBrl: finalTotal,
      buyerCharName: buyerCharName.trim(),
      city,
      tradeMethod,
      contactWhatsapp: contactWhatsapp.trim() || whatsappNumber,
      pixKey,
      pixCode,
      status: 'pending_payment',
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setCreatedOrder(order);
    onOrderCompleted(order);
    setStep('payment');
  };

  const handleCopyPix = () => {
    if (!createdOrder) return;
    soundFx.playClick();
    navigator.clipboard.writeText(createdOrder.pixCode || pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleOpenWhatsAppOrder = () => {
    if (!createdOrder) return;
    soundFx.playSuccess();
    
    const message = `⚔️ *NOVO PEDIDO - TIBIA 7.4 RMT* ⚔️\n\n` +
      `*Pedido:* #${createdOrder.id}\n` +
      `*Servidor:* ${offer.server.toUpperCase()} 7.4\n` +
      `*Item:* ${quantity}x ${offer.title}\n` +
      `*Valor Total:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n` +
      `*Personagem:* ${buyerCharName}\n` +
      `*Local de Entrega:* ${city}\n` +
      `*Método:* ${tradeMethod === 'depot_safe_trade' ? 'Safe Trade no Depot' : 'Parcel Seguro'}\n\n` +
      `_Realizei o pagamento via Pix e aguardo a entrega no Depot!_`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        id="order-modal-container"
        className="relative w-full max-w-lg bg-stone-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
              <RenderItemIcon runeType={offer.runeType} category={offer.category} size={28} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Checkout Seguro • {offer.server.toUpperCase()} 7.4
              </span>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 line-clamp-1">
                {step === 'form' && 'Detalhes da Entrega'}
                {step === 'payment' && 'Pagamento Instantâneo via Pix'}
                {step === 'success' && 'Pedido Enviado com Sucesso!'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="p-5 sm:p-6 space-y-4">
            {/* Item summary banner */}
            <div className="p-3.5 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">Item Selecionado:</span>
                <span className="font-bold text-stone-200">{offer.title}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">Quantidade:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={offer.minOrder || 1}
                    max={offer.stockBps || 999}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(offer.minOrder || 1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-stone-900 text-center font-bold text-amber-300 py-1 px-2 rounded border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-stone-400">{offer.unitLabel.includes('100k') ? 'x 100k' : 'BPs'}</span>
                </div>
              </div>

              {appliedDiscountPercent > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold pt-1 border-t border-stone-800">
                  <span>Desconto por Quantidade ({appliedDiscountPercent}% OFF):</span>
                  <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm pt-2 border-t border-stone-800 font-bold">
                <span className="text-stone-300">Total a pagar:</span>
                <span className="text-xl font-black text-amber-400">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Character Name */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Nome do seu Personagem no {offer.server.toUpperCase()} 7.4 *</span>
              </label>
              <input
                id="input-buyer-char-name"
                type="text"
                required
                placeholder="Ex: Knight das Trevas / Druid Maker"
                value={buyerCharName}
                onChange={(e) => setBuyerCharName(e.target.value)}
                className="w-full bg-stone-950 text-stone-100 text-sm px-3.5 py-2.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500 placeholder-stone-600"
              />
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Cidade de Entrega (Depot) *</span>
              </label>
              <select
                id="select-buyer-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-stone-950 text-stone-100 text-sm px-3.5 py-2.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500"
              >
                {TIBIA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Trade Method */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Método de Entrega
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTradeMethod('depot_safe_trade')}
                  className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                    tradeMethod === 'depot_safe_trade'
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div>Safe Trade no DP</div>
                    <div className="text-[10px] text-stone-400 font-normal">Janela de troca segura</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTradeMethod('parcel')}
                  className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                    tradeMethod === 'parcel'
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div>Parcel com Seguro</div>
                    <div className="text-[10px] text-stone-400 font-normal">Enviado direto na sua box</div>
                  </div>
                </button>
              </div>
            </div>

            {/* WhatsApp (Optional/Contact) */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seu WhatsApp para Notificação (Opcional)</span>
              </label>
              <input
                id="input-buyer-whatsapp"
                type="text"
                placeholder="(DDD) 99999-9999"
                value={contactWhatsapp}
                onChange={(e) => setContactWhatsapp(e.target.value)}
                className="w-full bg-stone-950 text-stone-100 text-sm px-3.5 py-2.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500 placeholder-stone-600"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-order-form"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm rounded-xl shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Avançar para Pagamento Pix</span>
                <span className="font-bold text-stone-900">
                  (R$ {finalTotal.toFixed(2).replace('.', ',')})
                </span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PIX PAYMENT */}
        {step === 'payment' && createdOrder && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="text-center p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <span className="text-xs text-amber-300 font-medium">
                Pedido <strong>#{createdOrder.id}</strong> gerado com sucesso!
              </span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                R$ {finalTotal.toFixed(2).replace('.', ',')}
              </div>
            </div>

            {/* Pix QR Code representation */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner mx-auto max-w-[220px]">
              {/* Retro SVG QR Code pattern */}
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <rect width="160" height="160" fill="white" />
                {/* Corner markers */}
                <rect x="10" y="10" width="40" height="40" fill="black" />
                <rect x="18" y="18" width="24" height="24" fill="white" />
                <rect x="24" y="24" width="12" height="12" fill="black" />

                <rect x="110" y="10" width="40" height="40" fill="black" />
                <rect x="118" y="18" width="24" height="24" fill="white" />
                <rect x="124" y="24" width="12" height="12" fill="black" />

                <rect x="10" y="110" width="40" height="40" fill="black" />
                <rect x="18" y="118" width="24" height="24" fill="white" />
                <rect x="24" y="124" width="12" height="12" fill="black" />

                {/* Matrix pixel elements */}
                <rect x="60" y="20" width="10" height="10" fill="black" />
                <rect x="80" y="20" width="10" height="20" fill="black" />
                <rect x="60" y="40" width="20" height="10" fill="black" />
                <rect x="20" y="60" width="10" height="20" fill="black" />
                <rect x="40" y="70" width="20" height="10" fill="black" />
                <rect x="70" y="70" width="20" height="20" fill="#006699" />
                <rect x="100" y="60" width="10" height="20" fill="black" />
                <rect x="120" y="70" width="20" height="10" fill="black" />
                <rect x="60" y="100" width="30" height="10" fill="black" />
                <rect x="100" y="100" width="10" height="30" fill="black" />
                <rect x="60" y="120" width="20" height="20" fill="black" />
                <rect x="120" y="120" width="20" height="20" fill="black" />
              </svg>
              <span className="text-[11px] font-bold text-stone-800 mt-2 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-stone-600" />
                Escaneie com seu App de Banco
              </span>
            </div>

            {/* Pix Copy and Paste Key */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                Chave Pix / Copia e Cola:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={createdOrder.pixKey}
                  className="flex-1 bg-stone-950 text-stone-300 text-xs px-3 py-2.5 rounded-lg border border-stone-700 font-mono select-all"
                />
                <button
                  type="button"
                  id="btn-copy-pix-key"
                  onClick={handleCopyPix}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    copiedPix
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700'
                  }`}
                >
                  {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Safe Delivery Instructions */}
            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1.5">
              <div className="font-bold text-stone-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instruções para receber no Tibia:</span>
              </div>
              <p>1. Faça a transferência Pix no valor de <strong>R$ {finalTotal.toFixed(2).replace('.', ',')}</strong>.</p>
              <p>2. Clique no botão abaixo para avisar nosso atendente no WhatsApp com seu char <strong>{buyerCharName}</strong>.</p>
              <p>3. Nosso entregador estará em <strong>{city}</strong> no Safe Trade.</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                id="btn-confirm-whatsapp-order"
                onClick={handleOpenWhatsAppOrder}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Já Paguei / Confirmar no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs font-semibold rounded-lg"
              >
                Voltar e alterar dados
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && createdOrder && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-stone-100">
              Pedido Confirmado!
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto">
              Nosso char de entrega já está a caminho de <strong>{city}</strong> para entregar suas BPs para o personagem <strong>{buyerCharName}</strong> no servidor <strong>{offer.server.toUpperCase()} 7.4</strong>.
            </p>

            <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 max-w-xs mx-auto">
              <div>Número do Pedido: <strong className="text-amber-400">#{createdOrder.id}</strong></div>
              <div>Tempo estimado de entrega: <strong className="text-emerald-400">{offer.deliveryTime}</strong></div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl"
            >
              Fechar Janela
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
