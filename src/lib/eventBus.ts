// src/lib/eventBus.ts

type EventHandler = (data?: unknown) => void;

class EventBus {
  private events: { [key: string]: EventHandler[] };

  constructor() {
    this.events = {};
  }

  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  emit(event: string, data?: unknown): void {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(data));
    }
  }
}

const eventBus = new EventBus();
export default eventBus;