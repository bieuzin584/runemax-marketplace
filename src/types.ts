export type ServerId = 'all' | 'miracle' | 'mythera' | 'deusold';

export type ItemCategory = 'all' | 'rune_uh' | 'rune_sd' | 'rune_gfb' | 'rune_hmm' | 'rune_explo' | 'runes_other' | 'fluid' | 'gold' | 'items';

export type TradeType = 'sell' | 'buy'; // 'sell' = we are selling to players, 'buy' = we buy from rune makers

export interface BulkDiscount {
  minQty: number;
  discountPercent: number;
}

export interface TradeOffer {
  id: string;
  title: string;
  category: ItemCategory;
  runeType: string;
  server: 'miracle' | 'mythera' | 'deusold';
  tradeType: TradeType;
  priceBrl: number; // R$ per unit/BP
  priceGoldKk?: number; // In-game KKs or K equivalent
  stockBps: number;
  minOrder: number;
  unitLabel: string; // e.g. "BP (2.000 cargas / 20 BPs)" or "100k Gold"
  chargesInfo?: string; // e.g. "1x charge / 20x bps" or "Custom server standard"
  deliveryTime: string; // e.g. "5 - 15 min"
  sellerName: string;
  sellerRating: number;
  salesCount: number;
  description: string;
  isInstantDelivery: boolean;
  featured?: boolean;
  bulkDiscounts: BulkDiscount[];
  lastUpdated: string;
}

export interface ServerInfo {
  id: 'miracle' | 'mythera' | 'deusold';
  name: string;
  subtitle: string;
  version: string;
  status: 'online' | 'high_demand' | 'maintenance';
  estimatedPlayers: number;
  goldRate: string;
  highlightText: string;
  color: string;
  popularRunes: string[];
}

export interface OrderItem {
  offer: TradeOffer;
  quantity: number;
  customNotes?: string;
}

export interface OrderDetails {
  id: string;
  offerId: string;
  itemTitle: string;
  server: 'miracle' | 'mythera' | 'deusold';
  quantity: number;
  unitPriceBrl: number;
  discountPercent: number;
  totalPriceBrl: number;
  buyerCharName: string;
  city: string;
  tradeMethod: 'depot_safe_trade' | 'parcel' | 'guild_hall';
  contactWhatsapp: string;
  contactDiscord?: string;
  pixKey: string;
  pixCode: string;
  status: 'pending_payment' | 'verifying' | 'delivering' | 'completed';
  createdAt: string;
}

export interface SellRuneSubmission {
  id: string;
  server: 'miracle' | 'mythera' | 'deusold';
  runeType: string;
  quantityBps: number;
  expectedPriceBrl: number;
  makerCharName: string;
  city: string;
  whatsapp: string;
  pixKeyToReceive: string;
  notes?: string;
  submittedAt: string;
}

export interface Review {
  id: string;
  author: string;
  charLevel?: string;
  server: 'miracle' | 'mythera' | 'deusold';
  itemBought: string;
  rating: number;
  comment: string;
  dateAgo: string;
  verified: boolean;
}

export interface LiveMarketTickerItem {
  id: string;
  text: string;
  timeAgo: string;
  server: 'miracle' | 'mythera' | 'deusold';
  type: 'buy' | 'sell';
}
