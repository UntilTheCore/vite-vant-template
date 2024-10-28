<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="getStyle"
  >
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  iconClass: {
    type: String,
    required: false,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "1em"
  },
  width: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  }
});

const symbolId = computed(() => `#${ props.prefix }-${ props.iconClass }`);

const getStyle = computed(() => {
  const style = {};
  if(props.width && props.height) {
    style.width = props.width;
    style.height = props.height;
  } else if (props.size) {
    style.width = props.size;
    style.height = props.size;
  }

  if (props.color) {
    style.color = props.color;
  }
  return style;
});
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  outline: none;
  fill: currentcolor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
</style>
