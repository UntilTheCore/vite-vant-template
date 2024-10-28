import type { getFilterResponse } from "@/store/utils/mixin";

declare module "vue" {
  export interface VNode {
    destroy?: any
  }

  /**
   * Costom Instance.
   * proxy._t
   *
   */
  interface ComponentCustomProperties {
  }
}

declare module "axios" {
  /**
   * Costom Axios Field.
   */
  export interface AxiosRequestConfig {
    redirect?: string
    /**
     * 是否将response驼峰转译, 默认不转为 false
     */
    needCamelCase?: boolean
  }
}

declare module "pinia" {
  /**
   * Costom Pinia Field.
   */
  export interface PiniaCustomProperties {
    filterResponse: typeof getFilterResponse
  }
}

declare module "vue-router" {
  // export interface RouteRecordRaw {
  //   icon?: 'string'
  // }
  export interface RouteMeta {
    title?: string
  }
}

declare global {
  interface RenderComponent {
    data?: any
    component?: any
  }
  type ComponentOriginOptions = {
    title: string
    headerIcon?: string
    maxHeight?: number | string | "auto"
  };
}
export { };
