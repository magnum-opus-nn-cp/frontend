export class SingleTimeoutManager {
  timeout: NodeJS.Timeout | null = null;

  public set(cb: null | (() => void), time?: number) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.timeout = null;
      cb && cb();
    }, time);
  }

  public setDelay(time: number) {
    return this.set(null, time);
  }

  public clear() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  public active() {
    return this.timeout;
  }
}
