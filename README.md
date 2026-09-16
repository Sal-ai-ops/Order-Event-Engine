# Order-Event-Engine
## System Architecture & Business Logic

### Core Lifecycle
An order transitions through the following standard sequential states:
1. `ORDER_CREATED` → Status: `CREATED`
2. `PAYMENT_RECEIVED` → `isPaid = true`
3. `ORDER_CONFIRMED` → Status: `CONFIRMED`
4. `ORDER_SHIPPED` → Status: `SHIPPED`
5. `ORDER_DELIVERED` → Status: `DELIVERED`

---

### Attention Triggers
The engine monitors incoming streams and flags six operational conditions requiring human intervention:

* **UNPAID_ORDER:** An order has reached `CONFIRMED` or `SHIPPED` status without a `PAYMENT_RECEIVED` event.
* **PAID_BUT_UNCONFIRMED:** Payment was received, but the order remains in `CREATED` status without confirmation.
* **DUPLICATE_PAYMENT:** An order receives more than one `PAYMENT_RECEIVED` event.
* **INVALID_SEQUENCE:** An event arrives out of lifecycle order (e.g., `ORDER_SHIPPED` before `ORDER_CONFIRMED`).
* **EVENT_AFTER_DELIVERY:** Any event arrives after an order has already transitioned to `DELIVERED`.
* **UNKNOWN_ORDER_EVENT:** An event is received for an `orderId` that has no prior `ORDER_CREATED` history.

---

### Error Handling & Processing Strategy
1. **Chronological Sorting:** All raw input events are sorted by their ISO-8601 `timestamp` prior to processing to handle network delays.
2. **Resilient State Aggregation:** Valid lifecycle events mutate order state. Invalid or out-of-order events emit an attention flag while preserving valid historical state.
3. **Quarantine:** Events for unknown orders (`UNKNOWN_ORDER_EVENT`) are flagged in the report without polluting the valid order state pool.