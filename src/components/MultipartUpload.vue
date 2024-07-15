<template>
  <el-card header="文件分片上传" style="width: 80%; margin: 80px auto">
    <el-upload
        :action="uploadUrl"
        :before-upload="handleBeforeUpload"
        :on-progress="handleUploadProgress"
        :on-success="handleUploadSuccess"
        drag
        multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-card>
</template>

<script>
import SparkMD5 from 'spark-md5'
import {axios} from "../api/interceptor.js";

export default {
  name: "MultipartUpload",
  data() {
    return {
      uploadUrl: '/api/upload', // 文件上传接口地址
      chunkSize: 5 * 1024 * 1024, // 分片大小，这里设置为5MB
    }
  },
  methods: {
    handleBeforeUpload(file) {
      // 检查文件是否已经上传过，如果已上传则直接返回
      if (this.checkFileExist(file)) {
        return false;
      }
      // 分片上传需要将文件切割成多个块
      this.sliceFile(file);
    },
    async sliceFile(file) {
      const fileSize = file.size;
      let start = 0;
      let end = Math.min(this.chunkSize, fileSize);
      let index = 0;

      while (start < fileSize) {
        const chunk = file.slice(start, end);
        await this.uploadChunk(chunk, index, file);
        start = end;
        end = Math.min(start + this.chunkSize, fileSize);
        index++;
      }
    },
    async uploadChunk(chunk, index, file, retryCount = 3) {
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('index', index);
      formData.append('filename', file.name);

      try {
        const response = await this.$axios.post(this.uploadUrl, formData, {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // 更新进度条
            this.$emit('uploadProgress', percent);
          },
        })
        const result = response.data;
        if (result.success) {
          // 分片上传成功
          this.$emit('chunkUploaded', {index, filename: file.name});
        }
      } catch (error) {
        console.error('上传失败：', error);

        if (retryCount > 0) {
          // 重试上传
          await this.uploadChunk(chunk, index, file, retryCount - 1);
        } else {
          // 重试次数超过限制，处理上传失败的逻辑
          console.error('上传失败：', error);
        }
      }


    },
    handleUploadProgress(event, file) {
      // 处理整个文件上传的进度
      const percent = Math.round((event.loaded * 100) / event.total);
      this.$emit('uploadProgress', percent);
      console.log(file, percent)
    },
    handleUploadSuccess(response, file) {
      console.log(file)
      // 处理文件上传成功的回调
      if (response.success) {
        // 上传成功
        this.$emit('uploadSuccess', response.data);
      }
    },
    async checkFileExist(file) {
      const spark = new SparkMD5.ArrayBuffer()
      spark.append(file)
      const fileHash = spark.end()
      console.log(fileHash)
      const response = await axios.get('', {data: {fileHash})
      if
        return false;
    },
    },
  }
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  width: 100%;

  .el-upload-dragger {
    width: 100%;
  }
}
</style>
