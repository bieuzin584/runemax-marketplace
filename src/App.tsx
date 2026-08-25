/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ServerId, ItemCategory, TradeOffer, OrderDetails, SellRuneSubmission } from './types';
import { 
  SERVERS_DATA, 
  INITIAL_OFFERS, 
  REVIEWS_DATA, 
  LIVE_TICKER_FEED,
  DEFAULT_PIX_KEY,
  DEFAULT_WHATSAPP
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { MarketTicker } from './components/MarketTicker';
import { ServerSelector } from './components/ServerSelector';
import { OfferCard } from './components/OfferCard';
import { OrderModal } from './components/OrderModal';
import { SellRuneModal } from './components/SellRuneModal';
import { RuneCalculatorModal } from './components/RuneCalculatorModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ReviewsSection } from './components/ReviewsSection';
import { soundFx } from './utils/audio';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  Award, 
  ArrowRight, 
  HelpCircle,
  MessageSquare,
  Sparkles,
  Plus,
  Coins,
  PackageCheck,
  CheckCircle2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { UhRuneSprite, SdRuneSprite, GfbRuneSprite, GoldCoinsSprite } from './utils/tibiaSprites';

export default function App() {
  // State
  const [servers] = useState(SERVERS_DATA);
  const [offers, setOffers] = useState<TradeOffer[]>(() => {
    const saved = localStorage.getItem('rune_market_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [selectedServer, setSelectedServer] = useState<ServerId>('all');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sell' | 'buy'>('all'); // sell = we sell BPs, buy = we buy from makers

  // Pix and WhatsApp settings
  const [pixKey, setPixKey] = useState<string>(() => {
    return localStorage.getItem('rune_market_pix_key') || DEFAULT_PIX_KEY;
  });
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    return localStorage.getItem('rune_market_whatsapp') || DEFAULT_WHATSAPP;
  });

  // Modal States
  const [activeOrderModalOffer, setActiveOrderModalOffer] = useState<TradeOffer | null>(null);
  const [orderModalQuantity, setOrderModalQuantity] = useState<number>(1);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellModalPrefillOffer, setSellModalPrefillOffer] = useState<TradeOffer | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Orders and Submissions History
  const [recentOrders, setRecentOrders] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('rune_market_recent_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('rune_market_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('rune_market_pix_key', pixKey);
  }, [pixKey]);

  useEffect(() => {
    localStorage.setItem('rune_market_whatsapp', whatsappNumber);
  }, [whatsappNumber]);

  useEffect(() => {
    localStorage.setItem('rune_market_recent_orders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  // Filter offers
  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      // Server match
      if (selectedServer !== 'all' && offer.server !== selectedServer) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'all' && offer.category !== selectedCategory) {
        return false;
      }
      // Tab filter (Vender para nós / Comprar de nós)
      if (activeTab === 'sell' && offer.tradeType !== 'sell') {
        return false;
      }
      if (activeTab === 'buy' && offer.tradeType !== 'buy') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = offer.title.toLowerCase().includes(q);
        const matchRune = offer.runeType.toLowerCase().includes(q);
        const matchServer = offer.server.toLowerCase().includes(q);
        if (!matchTitle && !matchRune && !matchServer) return false;
      }
      return true;
    });
  }, [offers, selectedServer, selectedCategory, activeTab, searchQuery]);

  // Handlers
  const handleOpenOrderModal = (offer: TradeOffer, quantity: number) => {
    soundFx.playClick();
    setActiveOrderModalOffer(offer);
    setOrderModalQuantity(quantity);
  };

  const handleOpenSellModalWithOffer = (offer: TradeOffer) => {
    soundFx.playClick();
    setSellModalPrefillOffer(offer);
    setIsSellModalOpen(true);
  };

  const handleOrderCompleted = (newOrder: OrderDetails) => {
    setRecentOrders((prev) => [newOrder, ...prev.slice(0, 19)]);
  };

  const handleSellSubmission = (submission: SellRuneSubmission) => {
    console.log('Nova submissão de maker:', submission);
  };

  const handleUpdateOfferPrice = (id: string, newPriceBrl: number, newStock: number) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, priceBrl: newPriceBrl, stockBps: newStock } : off))
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Real-time Live Market Ticker */}
      <MarketTicker items={LIVE_TICKER_FEED} />

      {/* Main Navigation Header */}
      <Navbar
        servers={servers}
        activeServer={selectedServer}
        onSelectServer={(srv) => {
          soundFx.playClick();
          setSelectedServer(srv);
        }}
        onOpenCalculator={() => {
          soundFx.playClick();
          setIsCalculatorOpen(true);
        }}
        onOpenSellModal={() => {
          soundFx.playClick();
          setSellModalPrefillOffer(null);
          setIsSellModalOpen(true);
        }}
        onOpenAdmin={() => {
          soundFx.playClick();
          setIsAdminOpen(true);
        }}
        whatsappNumber={whatsappNumber}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Server & Category Selector & Search Bar */}
        <ServerSelector
          servers={servers}
          selectedServer={selectedServer}
          onSelectServer={(srv) => {
            soundFx.playClick();
            setSelectedServer(srv);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            soundFx.playClick();
            setSelectedCategory(cat);
          }}
          totalOffersCount={filteredOffers.length}
        />

        {/* Trade Type Filter Tabs (GGMAX Anúncios / Vender para Nós) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#202738] pb-3">
          <div className="flex items-center gap-2 bg-[#121622] p-1.5 rounded-2xl border border-[#232a3c] w-full sm:w-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('all');
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Todos os Anúncios ({offers.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('sell');
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'sell'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UhRuneSprite size={14} />
              <span>Comprar BPs (Pronta Entrega)</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('buy');
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'buy'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Compramos de Makers</span>
            </button>
          </div>

          {/* Quick Info Badge */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Operadores Online no Safe Trade Thais/Carlin/Venore</span>
          </div>
        </div>

        {/* Product Offers Grid */}
        {filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onOpenOrderModal={handleOpenOrderModal}
                onOpenSellModalWithOffer={handleOpenSellModalWithOffer}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#121622] border border-[#202738] rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171c2b] border border-[#2b354d] flex items-center justify-center text-blue-400">
              <UhRuneSprite size={32} />
            </div>
            <h3 className="text-lg font-bold text-white">Nenhum anúncio encontrado para esses filtros</h3>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Tente selecionar outro servidor ou limpar sua busca de termos para visualizar os estoques disponíveis.
            </p>
            <button
              onClick={() => {
                setSelectedServer('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-500 transition shadow-md"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* 3 Pillars / Safety Guarantee Banner (GGMAX style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-[#121622] border border-[#202738] rounded-2xl p-5 space-y-2 hover:border-blue-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Safe Trade no Depot Oficial</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Entrega 100% segura através do sistema nativo de Safe Trade no Depot de Thais, Carlin ou Venore com parcel protegido.
            </p>
          </div>

          <div className="bg-[#121622] border border-[#202738] rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Pix Automático & Instantâneo</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pague com QR Code Pix Copy & Paste ou receba seu dinheiro em segundos caso venda sua produção de runas.
            </p>
          </div>

          <div className="bg-[#121622] border border-[#202738] rounded-2xl p-5 space-y-2 hover:border-indigo-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Entrega Média em 5 a 15 Minutos</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Estoque próprio constante em Miracle 7.4, Mythera 7.4 e DeusOLD 7.4 com aviso direto no WhatsApp da equipe.
            </p>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <ReviewsSection reviews={REVIEWS_DATA} />

        {/* FAQ Section */}
        <section className="bg-[#121622]/90 border border-[#202738] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Perguntas Frequentes (FAQ)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#0e111a] p-4 rounded-xl border border-[#1e2536] space-y-1.5">
              <h4 className="font-bold text-blue-300">Como funciona a entrega das BPs de UH e Runas?</h4>
              <p className="text-stone-400 leading-relaxed">
                Após a confirmação do pagamento Pix, o pedido é enviado automaticamente para o WhatsApp do time com todos os dados do seu char e cidade. Nosso entregador encontra você no Safe Trade ou envia via Parcel Seguro.
              </p>
            </div>

            <div className="bg-[#0e111a] p-4 rounded-xl border border-[#1e2536] space-y-1.5">
              <h4 className="font-bold text-blue-300">Como vendo minhas BPs de Druid/Sorcerer Maker?</h4>
              <p className="text-stone-400 leading-relaxed">
                Clique no botão <strong>"Vender Runas"</strong>, informe a quantidade de BPs que você produziu, seu char e sua Chave Pix. Nós compramos em lote e transferimos o Pix imediatamente.
              </p>
            </div>

            <div className="bg-[#0e111a] p-4 rounded-xl border border-[#1e2536] space-y-1.5">
              <h4 className="font-bold text-blue-300">Quais servidores 7.4 são atendidos?</h4>
              <p className="text-stone-400 leading-relaxed">
                Atendemos ativamente <strong>Miracle 7.4</strong>, <strong>Mythera 7.4</strong> e <strong>DeusOLD 7.4</strong> com estoque dedicado e pronta entrega para cada um.
              </p>
            </div>

            <div className="bg-[#0e111a] p-4 rounded-xl border border-[#1e2536] space-y-1.5">
              <h4 className="font-bold text-blue-300">Como o WhatsApp do time recebe o pedido?</h4>
              <p className="text-stone-400 leading-relaxed">
                Assim que você gera o pedido e conclui o Pix, uma mensagem formatada com o código do pedido, servidor, nome do personagem e cidade de entrega é enviada diretamente para o WhatsApp dos nossos entregadores.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer (GGMAX marketplace style) */}
      <footer className="bg-[#0a0c10] border-t border-[#1a1f2b] py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141822] border border-blue-500/40 flex items-center justify-center">
              <UhRuneSprite size={20} />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">Rune<span className="text-amber-400">MAX</span> 7.4</span>
              <p className="text-[10px] text-stone-400">Marketplace oficial de runas e moedas Tibia 7.4</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button onClick={() => setSelectedServer('miracle')} className="hover:text-blue-400 transition">Miracle 7.4</button>
            <button onClick={() => setSelectedServer('mythera')} className="hover:text-emerald-400 transition">Mythera 7.4</button>
            <button onClick={() => setSelectedServer('deusold')} className="hover:text-amber-400 transition">DeusOLD 7.4</button>
            <button onClick={() => setIsCalculatorOpen(true)} className="hover:text-blue-400 transition">Calculadora</button>
            <button onClick={() => setIsSellModalOpen(true)} className="hover:text-blue-400 transition">Vender Runas</button>
          </div>

          <div className="text-[10px] text-stone-600">
            © 2026 RuneMAX Tibia 7.4 • Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Order Modal (Buy Flow with Pix and WhatsApp) */}
      <OrderModal
        offer={activeOrderModalOffer}
        initialQuantity={orderModalQuantity}
        onClose={() => setActiveOrderModalOffer(null)}
        onOrderCompleted={handleOrderCompleted}
        pixKey={pixKey}
        whatsappNumber={whatsappNumber}
      />

      {/* Maker Sell Modal */}
      <SellRuneModal
        isOpen={isSellModalOpen}
        onClose={() => {
          setIsSellModalOpen(false);
          setSellModalPrefillOffer(null);
        }}
        onSubmit={handleSellSubmission}
        preselectedOffer={sellModalPrefillOffer}
        whatsappNumber={whatsappNumber}
      />

      {/* Rune Calculator & Combo Simulator Modal */}
      <RuneCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        servers={servers}
      />

      {/* Admin Settings & Stock Management Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        offers={offers}
        onUpdateOfferPrice={handleUpdateOfferPrice}
        pixKey={pixKey}
        onChangePixKey={setPixKey}
        whatsappNumber={whatsappNumber}
        onChangeWhatsappNumber={setWhatsappNumber}
      />

      {/* Floating WhatsApp Support Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => {
          soundFx.playClick();
          const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de atendimento para comprar/vender BPs de Runas 7.4.')}`;
          window.open(url, '_blank');
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold rounded-full shadow-2xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageSquare className="w-5 h-5 fill-stone-950 text-stone-950" />
        <span className="text-xs">Atendimento WhatsApp</span>
      </button>

    </div>
  );
}
