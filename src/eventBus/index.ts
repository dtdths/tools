interface eventNode {
  context?:any,
  // callback: Function,
}
interface eventNodeLink {
  tail: eventNode,
  next: eventNode | null,
}

// 为什么事件队列不用数组用链表： 链表插入、删除效率更高

export class Events {
  private callbacks?: Record<string, eventNodeLink>
  static eventSplitter = /\s+/

  constructor(opts?:any) {
    this.callbacks = opts?.callbacks ?? {}
  }

  on(eventName: String, callback: Function, context: any): this {
    let event, node, tail, list
    if (!callback) {
      return this
    }
    const eventList = eventName.split(Events.eventSplitter)
    this.callbacks ||= {}
    const calls = this.callbacks
    while ((event = eventList.shift())) {
      list = calls[event]
      node = list ? list.tail : {}
      node.next = tail = {}
      node.context = context
      node.callback = callback
      calls[event] = {
        tail,
        next: list ? list.next : node
      }
    }
    return this
  }

  once(events: string, callback: Function, context: any) {
    const wrapper = (...args: any) => {
      callback.apply(this, args)
      this.off(events, wrapper, context)
    }

    this.on(events, wrapper, context)

    return this
  }

  off(events: string, callback: Function, context: any) {
    let event, calls, node, tail, cb, ctx
    if (!(calls = this.callbacks)) {
      return this
    }
    if (!(events || callback || context)) {
      delete this.callbacks
      return this
    }
    const eventList = events ? events.split(Events.eventSplitter) : Object.keys(calls)
    while ((event = eventList.shift())) {
      node = calls[event]
      delete calls[event]
      if (!node || !(callback || context)) {
        continue
      }
      tail = node.tail
      while ((node = node.next) !== tail) {
        cb = node.callback
        ctx = node.context
        if ((callback && cb !== callback) || (context && ctx !== context)) {
          this.on(event, cb, ctx)
        }
      }
    }
    return this
  }

  trigger(events: string) {
    let event, node, calls, tail
    if (!(calls = this.callbacks)) {
      return this
    }
    const eventList = events.split(Events.eventSplitter)
    const rest = [].slice.call(arguments, 1)
    while ((event = eventList.shift())) {
      if ((node = calls[event])) {
        tail = node.tail
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, rest)
        }
      }
    }
    return this
  }
}