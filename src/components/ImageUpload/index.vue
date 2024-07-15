<template>
  <div>
    <el-upload
        :action="action"
        :class="{'hidden-upload': hiddenUpload}"
        :file-list="fileList"
        :headers="headers"
        :limit="limit"
        :on-error="handleError"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        list-type="picture-card"
        multiple>
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>

    <!-- 上传提示 -->
    <!--    <div v-if="showTip" slot="tip" class="el-upload__tip">
          请上传
          <template v-if="fileSize"> 大小不超过 <b styles="color: #f56c6c">{{ fileSize }}MB</b></template>
          <template v-if="fileType"> 格式为 <b styles="color: #f56c6c">{{ fileType.join("/") }}</b></template>
          的文件
        </div>-->

    <el-image-viewer
        v-if="viewerVisible"
        :on-close="handleViewerClose"
        :url-list="[imageUrl]"
        :z-index="5000">
    </el-image-viewer>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer"
import {getToken} from "@/utils/func.js";

export default {
  name: "ImageUpload",
  components: {ElImageViewer},
  props: {
    value: {
      type: [String, Array],
      default: () => []
    },

    // 上传地址
    action: {
      type: String,
      default: process.env.VUE_APP_BASE_API + '/file/uploadMinio'
    },

    // 图片前缀
    prefix: {
      type: String,
      default: process.env.VUE_APP_RESOURCE_URL
    },

    //上传请求头
    headers: {
      type: Object,
      default: () => ({token: getToken()})
    },

    // 上传数量限制
    limit: {
      type: Number,
    },

    // 手动控制上传框隐藏
    readOnly: {
      type: Boolean,
      default: false
    },

    /*-----------------------------分割线----------------------------*/
    /* // 大小限制(MB)
     fileSize: {
       type: Number,
       default: 5,
     },

     // 文件类型, 例如['png', 'jpg', 'jpeg']
     fileType: {
       type: Array,
       default: () => ["png", "jpg", "jpeg"],
     },

    /*-----------------------------分割线----------------------------*/

  },
  computed: {
    // 处理后的文件列表
    fileList: {
      get() {
        let result = [];
        if (typeof this.value === 'string') {
          result = this.parseStringToList(this.value);
        } else if (Array.isArray(this.value)) {
          result = this.value.map(this.normalizeItem).filter(Boolean);
        } else {
          console.error('Invalid value for fileList:', this.value);
        }
        this.updateHiddenUpload(result);
        return result;
      },
      set(val) {
        const result = val.map(item => ({
          name: item.name,
          url: item.response ? item.response.data : this.removePrefix(item.url)
        }))
        this.$emit('input', JSON.stringify(result));
      }
    },

    /*-----------------------------分割线----------------------------*/


  },
  data() {
    return {
      hiddenUpload: false, // 是否隐藏上传框

      imageUrl: '', // 当前查看的图片 URL
      viewerVisible: false, // 查看器是否可见
    };
  },
  methods: {
    handleError() {
      this.$message.error('上传失败，请重新上传');
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    handlePreview(file) {
      try {
        if (file && file.url) {
          this.imageUrl = file.url;
          this.viewerVisible = true;
        } else {
          new Error('Invalid file or file URL');
        }
      } catch (error) {
        console.error('Error in handlePreview:', error.message);
      }
    },
    handleViewerClose() {
      this.viewerVisible = false
    },

    handleRemove(file, fileList) {
      this.fileList = fileList
    },

    handleSuccess(res, file, fileList) {
      if (fileList.every(item => item.status === 'success')) {
        this.fileList = fileList
      }
    },


    /*------------------------------ 分割线 ------------------------------*/

    updateHiddenUpload(fileList) {
      if (this.readOnly) return this.hiddenUpload = this.readOnly;
      this.hiddenUpload = fileList.length >= this.limit;
    },


    parseStringToList(value) {
      try {
        const parsedList = JSON.parse(value)
        return parsedList.map(this.normalizeItem).filter(Boolean);
      } catch (error) {
        console.error('Invalid JSON string:', error);
        return [];
      }
    },

    normalizeItem(item) {
      if (typeof item === 'string') {
        return {name: '', url: this.processImageUrl(item)};
      } else if (typeof item === 'object' && item.url) {
        return {name: item.name || '', url: this.processImageUrl(item.url)};
      } else {
        console.error('Invalid item:', item);
        return undefined;
      }
    },

    processImageUrl(url) {
      if (/^(https?:)?\/\//.test(url)) {
        return url;
      } else {
        // 如果imageUrl不是完整的URL，则拼接上前缀
        return `${this.prefix}${url}`;
      }
    },

    removePrefix(url) {
      // 检查图片 URL 是否包含前缀
      if (url.startsWith(this.prefix)) {
        // 移除前缀部分并返回剩余的 URL
        return url.slice(this.prefix.length);
      } else {
        // 如果图片 URL 不包含前缀，则直接返回原始 URL
        return url;
      }
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .hidden-upload {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
