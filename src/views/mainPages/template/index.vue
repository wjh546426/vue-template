<template>
  <div class="global__container">
    <transition name="slide-left">
      <div v-if="isLeftPanelVisible" class="left-layout">
        <div class="layout-content">

        </div>
      </div>
    </transition>
    <transition name="slide-right">
      <div v-if="isRightPanelVisible" class="right-layout">
        <transition name="slide-right">
          <div class="layout-content">

          </div>
        </transition>
      </div>
    </transition>

    <ul :class="isSidePanelsVisible ? 'slide-box-enter' : 'slide-box-leave'" class="button-box">
      <li :class="{ active: isVideoVisible }" @click="toggleVideoVisibility()">视频监控</li>
      <li @click="toggleSidePanels()">
        <template v-if="!isSidePanelsVisible">两侧收起</template>
        <template v-else>两侧显示</template>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  name: "index",
  components: {},
  data() {
    return {
      isSidePanelsVisible: false,
      isVideoVisible: false,
      isLeftPanelVisible: true,
      isRightPanelVisible: true,
    }
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {

    toggleSidePanels() {
      this.isSidePanelsVisible = !this.isSidePanelsVisible
      this.isLeftPanelVisible = !this.isLeftPanelVisible;
      this.isRightPanelVisible = !this.isRightPanelVisible;
    },

    toggleVideoVisibility() {
      this.isVideoVisible = !this.isVideoVisible
      if (this.isVideoVisible) {
        // 添加标点
      } else {
        // 清理标点
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.global__container {

  .left-layout {
    position: absolute;
    left: 0;
    top: 0;
    background: url("../../../assets/images/main/layout_left.png") no-repeat;
    background-size: 100% 100%;
    width: 527px;
    height: 100%;
    transform-origin: top left;
    pointer-events: none;

    .layout-content {
      width: 350px;
      height: calc(100% - 130px);
      position: absolute;
      left: 22px;
      top: 105px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.1);
      pointer-events: auto;
    }
  }

  .right-layout {
    position: absolute;
    right: 0;
    top: 0;
    width: 527px;
    height: 100%;
    background: url("../../../assets/images/main/latout_right.png") no-repeat;
    background-size: 100% 100%;
    transform-origin: top right;
    pointer-events: none;

    .layout-content {
      position: absolute;
      right: 22px;
      top: 105px;
      width: 350px;
      height: calc(100% - 130px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.1);
      pointer-events: auto;
    }

  }

  .button-box {
    width: 106px;
    height: 70px;
    position: fixed;
    right: 400px;
    bottom: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9;

    li {
      width: 100%;
      height: 29px;
      background: url('../../../assets/images/main/button_default.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-size: 18px;
      font-style: italic;
      color: #ffffff;
      line-height: 29px;
      cursor: pointer;
    }

    .active {
      background: url('../../../assets/images/main/button_active.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .slide-box-enter {
    transform: translateX(360px);
    transition: transform 0.3s ease;
  }

  .slide-box-leave {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

}
</style>
