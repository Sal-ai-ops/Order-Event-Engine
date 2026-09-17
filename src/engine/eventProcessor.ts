import { OrderEvent } from '../types/events';
import { EngineResult, OrderState, AttentionReportItem } from '../types/order';

export function processEvents(events: OrderEvent[]): EngineResult {
  const orders = new Map<string, OrderState>();
  const attentionItems: AttentionReportItem[] = [];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  for (const event of sortedEvents) {
    if (event.type === 'ORDER_CREATED') {
      orders.set(event.orderId, {
        id: event.orderId,
        status: 'CREATED',
        isPaid: false,
        paymentCount: 0,
        processedEvents: [event],
        isDelivered: false,
      });
    }
  }

  return { orders, attentionItems };
}