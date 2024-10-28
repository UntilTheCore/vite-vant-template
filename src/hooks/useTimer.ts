type TimerOption = {
  immediate?: boolean // 控制在调用 start 时，先立即执行后再开始轮询
  interval?: number // 轮询间隔
};

const defaultInterval = 60 * 1000;
export function useTimer(option: TimerOption = {}) {
  const { interval = defaultInterval, immediate = true } = option;
  const timer = ref();
  const cb = ref<() => void>();

  /**
   * 开始前总是会先停止之前的轮训，然后再开始
   */
  function start() {
    stop();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    immediate && cb.value && cb.value();
    timer.value = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cb.value && cb.value();
    }, interval);
  }

  function stop() {
    if(timer && timer.value) {
      clearInterval(timer.value);
      timer.value = 0;
    }
  }

  /**
   * 绑定执行回调
   * @param callback - 执行回调
   * @param option - 执行参数
   * @param option.start - 绑定后立即执行
   */
  function bind(callback: () => void, option?: {start: boolean;}) {
    const { start: _start = false } = option || {};
    cb.value = callback;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    _start && start();
  }


  return {
    bind,
    start,
    stop
  };
}
