export type EventType =
  | 'ORDER_CREATED'
  | 'PAYMENT_RECEIVED'
  | 'ORDER_CONFIRMED'
  | 'ORDER_SHIPPED'
  | 'ORDER_DELIVERED';

export interface OrderEvent {
  id: string;
  orderId: string;
  type: EventType;
  timestamp: string;
}