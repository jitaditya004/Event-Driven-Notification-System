import { EventEmitter } from "events"

type EventPayloads = {
  USER_REGISTERED: { userId: string }
}

class TypedEventBus extends EventEmitter {
  emit<K extends keyof EventPayloads>(event: K, payload: EventPayloads[K]) {
    return super.emit(event, payload)
  }

  on<K extends keyof EventPayloads>(
    event: K,
    listener: (payload: EventPayloads[K]) => void
  ) {
    return super.on(event, listener)
  }
}

export const eventBus = new TypedEventBus()