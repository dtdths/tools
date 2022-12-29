import delay from "./delay"

class LoopRequest {
  // 是否执行
  isRuning = true;
  // 回调
  callback
  // 间隔
  timeout
  constructor(options?: {
    timeout?: number
    callback?: Function
  }) {
    this.timeout = options?.timeout || 2000;
    this.callback = options?.callback;
    this.start();
  }

  async start() {
    this.isRuning = true;
    while(this.isRuning) {
      await delay(this.timeout);
      // (() => {
        if (this.isRuning) {
          this.callback?.();
        }
      // })()
    }
  }

  stop() {
    this.isRuning = false;
  }
}

export default LoopRequest;