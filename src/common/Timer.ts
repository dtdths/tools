class Timer {

  // 是否在计时
  counting = false

  // 定时器id
  #tid = null

  // 开始时间戳
  #startTime

  // 剩余时间
  #remain

  // 结束时间戳
  #endTime

  // 精度是否到毫秒
  #millisecond = false

  // 事件队列
  #eventMap = {
    // change: [],
    // finish: [],
  }

  static simpleTick(cb) {
    return setTimeout(cb, 30);
  }

  static clearSimpleTick(tid) {
    clearTimeout(tid);
  }

  /**
   * 秒数是否相同
   * @param {*} time1 毫秒数
   * @param {*} time2 毫秒数
   * @returns
   */
  static isSameSecond(time1, time2) {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
  }

  static parseTimeData(time) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  static padZero(num, targetLength = 2) {
    let str = `${num  }`;

    while (str.length < targetLength) {
      str = `0${  str}`;
    }

    return str;
  }

  /**
   * 定时器
   * @param opt.startTime 启动时间
   * @param opt.remain 持续时间
   * @param opt.millisecond 是否开启毫秒-false
   */
  constructor(opt) {
    this.stop();
    this.initOption(opt);
    this.start();
  }

  initOption(opt) {
    this.#millisecond = opt.millisecond || false;
    this.setRemain(opt.remain || 0);
    this.#startTime = opt.startTime || Date.now();
    this.#endTime = this.#startTime + this.#remain;
  }

  /**
   * 开始
   * @param {*} opt
   * @returns
   */
  start(opt) {
    if (this.counting) return;
    if (opt) {
      // 重置，暂停-开启后不会跳跃
      this.initOption({
        startTime: this.#startTime,
        remain: this.#remain,
        millisecond: this.#millisecond,
        ...opt
      });
    }
    this.counting = true;
    this.tick();
  }

  stop() {
    this.counting = false;
    Timer.clearSimpleTick(this.#tid);
  }

  tick() {
    this.#tid = Timer.simpleTick(() => {
      const remain = this.getRemain();

      // 开始
      if (this.#startTime <= Date.now()) {
        if (this.#millisecond) {
          this.setRemain(remain);
        } else
          // 精度：秒 变化 || 结束计时
          if (!Timer.isSameSecond(remain, this.#remain) || remain === 0) {
            this.setRemain(remain);

        }
      }
      // 继续执行
      if (this.#remain > 0) {
        this.tick()
      }
    });
  }

  setRemain(remain) {
    // 修改剩余时间
    this.#remain = remain;
    const timeData = Timer.parseTimeData(remain);

    this.emit('change', timeData);

    // 剩余时间=0， 结束
    if (remain === 0) {
      this.stop();
      this.emit('finish');
    }
  }

  /**
   * 获取剩余时间毫秒数
   * @returns
   */
  getRemain() {
    if (this.#millisecond) {
      return Math.max(this.#endTime - Date.now(), 0);
    }
    return Math.max(Math.floor((this.#endTime - Date.now()) / 1000) * 1000, 0)
  }

  /**
   * 监听事件
   * @param {*} event 事件 change|finish
   * @param {*} cb 回调
   */
  on(event, cb) {
    if (this.#eventMap[event]?.length) {
      this.#eventMap[event].push(cb);
    } else {
      this.#eventMap[event] = [cb];
    }

  }

  emit(event, parms) {
    if (!this.#eventMap[event]?.length) return;
    this.#eventMap[event].forEach(cb => cb(parms));
  }

  off(event, cb) {
    if (!this.#eventMap[event]?.length) return;
    for (let i = 0; i < this.#eventMap[event].length; i += 1) {
      if (this.#eventMap[event][i] === cb) {
        this.#eventMap[event].splice(i, 1);
        break;
      }
    }
  }

  destory() {
    Timer.clearSimpleTick(this.#tid);
    this.#tid = null;
    this.#eventMap = {};
  }
}


export default Timer;
