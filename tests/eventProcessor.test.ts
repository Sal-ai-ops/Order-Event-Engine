import { describe, it, expect } from 'vitest';
import { processEvents } from '../src/engine/eventProcessor';
import { OrderEvent } from '../src/types/events';

describe('Event Processing Engine', () => {
  it('processes an ORDER_CREATED event correctly', () => {
    const events: OrderEvent[] = [
      {
        id: 'evt-101',
        orderId: 'ORD-001',
        type: 'ORDER_CREATED',
        timestamp: '2026-09-01T09:00:00Z',
      },
    ];

    const result = processEvents(events);

    const order = result.orders.get('ORD-001');
    expect(order).toBeDefined();
    expect(order?.status).toBe('CREATED');
    expect(order?.isPaid).toBe(false);
  });
});