import path, { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import autoprefixer from "autoprefixer";
import viewport from "postcss-mobile-forever";

const htmlPlugin = (appName: string) => {
  return {
    name: "html-transform",
    transformIndexHtml (html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${ appName }</title>`
      );
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const appName = env.VITE_APP_NAME ? env.VITE_APP_NAME : "";
  return {
    base: "./",
    plugins: [
      vue(),
      htmlPlugin(appName),
      UnoCSS(),
      Components({
        // 指定组件位置，默认是src/components
        dirs: ["src/components", "src/views/**/components"],
        // ui库解析器
        extensions: ["vue"],
        // 配置文件生成位置
        dts: "src/unplugin/components.d.ts",
        // 搜索子目录
        deep: true,
        resolvers: [VantResolver()]
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: "src/unplugin/auto-import.d.ts",
        resolvers: [VantResolver()]
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      })
    ],
    // https://esbuild.github.io/api/#drop
    // https://github.com/vitejs/vite/discussions/7920#discussioncomment-2709119
    // https://www.google.com/search?q=vite+drop+console&sxsrf=ALiCzsa6WkY53gPLDvBTLVTfM7zaLJ1tjw%3A1662651252168&source=hp&ei=dAsaY9qpB4b70ATE85j4DQ&iflsig=AJiK0e8AAAAAYxoZhMtc6cBdw95TnMDcXKsgc3Hi7NqR&ved=0ahUKEwjas5LKwoX6AhWGPZQKHcQ5Bt8Q4dUDCAc&uact=5&oq=vite+drop+console&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEMsBOgUIABCABDoFCC4QgAQ6CwguEIAEEMcBENEDOgQIIxAnUABYkBVg0RZoAHAAeACAAYgDiAGXCpIBBTItMi4ymAEAoAEBoAEC&sclient=gws-wiz
    /**
     * Replace rollup-plugin-terser with drop of esbuild
     * 用 esbuild.drop 替换 rollup-plugin-terser
     */
    esbuild: {
      drop: (() => {
        return env.NODE_ENV === "production" ? ["console", "debugger"] : [];
      })()
    },
    server: {
      proxy: {
        "/api": {
          target: "http://172.xx.xxx.xx/xxxxxxx/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src")
        }
      ]
    },
    define: {
      "process.env": process.env
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            appSelector: "#app",
            viewportWidth: 375,
            maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              "van-tabbar",
              "van-popup"
            ],
            border: true
          })
        ]
      }
    }
  };
});
