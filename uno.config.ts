import { defineConfig, presetUno, presetWind } from "unocss";
import { presetAnimations } from "unocss-preset-animations";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetAnimations(),
    presetRemToPx({
      // 这里为什么要设置基础字体大小？看下面这篇文章
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 10
    })
  ]
});
