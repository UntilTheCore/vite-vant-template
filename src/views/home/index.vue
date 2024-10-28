<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useCounterStore } from "@/store/conunterStore";

const counterStore = useCounterStore();

defineOptions({
  name: "Home"
});

const state = reactive({});

onMounted(() => {

});
</script>

<template>
  <div class="home">
    <div class="home-wrap">
      <div class="mb-4 text-6">store: {{ counterStore.counter }}</div>
      <van-button
        type="primary"
        @click.stop="counterStore.increment()"
      >
        increment
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
}
</style>
