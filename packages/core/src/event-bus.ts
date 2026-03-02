export type EventHandler = (payload: unknown) => void;

export class EventBus {
  private readonly listeners = new Map<string, Set<EventHandler>>();

  on(key: string, handler: EventHandler): void {
    let set = this.listeners.get(key);
    if (!set) {
      set = new Set();
      this.listeners.set(key, set);
    }
    set.add(handler);
  }

  off(key: string, handler?: EventHandler): void {
    if (!handler) {
      this.listeners.delete(key);
      return;
    }
    this.listeners.get(key)?.delete(handler);
  }

  emit(key: string, payload?: unknown): void {
    const set = this.listeners.get(key);
    if (!set) return;
    for (const handler of set) {
      handler(payload);
    }
  }

  clear(): void {
    this.listeners.clear();
  }

  static buildKey(component: string, event: string): string {
    return `${component}:${event}`;
  }
}
