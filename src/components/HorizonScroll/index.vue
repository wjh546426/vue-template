<template>
  <div class="scroll-container">
    <div :style="{ '--scroll-w': width + 'px', '--scroll-h': height + 'px' }" class="v-scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      resizeObserver: null,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.initResizeObserver()
  },
  methods: {
    initResizeObserver() {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.handleChange({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize
          });
        }
      });
      this.resizeObserver.observe(this.$el); // 监听组件根元素
    },

    destroyResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$el);
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },

    handleChange({width, height}) {
      this.width = width
      this.height = height
    }
  },
  beforeDestroy() {
    this.destroyResizeObserver();
  },

}
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  height: 100%;

  .v-scroll {
    width: var(--scroll-h);
    height: var(--scroll-w);
    position: relative;
    overflow: auto;
    transform-origin: left top;
    transform: translateY(var(--scroll-h)) rotate(-90deg);

    &::-webkit-scrollbar {
      display: none;
    }

    .content {
      width: var(--scroll-w);
      height: var(--scroll-h);
      position: absolute;
      top: 0;
      left: var(--scroll-h);
      transform-origin: left top;
      transform: rotate(90deg);
    }
  }
}
</style>
