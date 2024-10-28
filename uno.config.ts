import { defineConfig, presetUno, presetWind } from "unocss";
import { presetAnimations } from "unocss-preset-animations";

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetAnimations()
  ]
});
