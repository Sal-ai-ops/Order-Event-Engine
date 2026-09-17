import { OrderEvent } from './events';

export type OrderStatus = 'UNCREATED' | 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';

export interface OrderState {
  id: string;
  status: OrderStatus;
  isPaid: boolean;
  paymentCount: number;
  processedEvents: OrderEvent[];
  isDelivered: boolean;
}

export type AttentionCategory =
  | 'UNPAID_ORDER'
  | 'PAID_BUT_UNCONFIRMED'
  | 'DUPLICATE_PAYMENT'
  | 'INVALID_SEQUENCE'
  | 'EVENT_AFTER_DELIVERY'
  | 'UNKNOWN_ORDER_EVENT';

export interface AttentionReportItem {
  orderId: string;
  category: AttentionCategory;
  message: string;
  relatedEventId?: string;
}

export interface EngineResult {
  orders: Map<string, OrderState>;
  attentionItems: AttentionReportItem[];
}