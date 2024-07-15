<template>
  <div style="border: 1px solid #ccc;">
    <!-- 工具栏 -->
    <Toolbar
        :defaultConfig="toolbarConfig"
        :editor="editor"
        style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
        v-model="html"
        :defaultConfig="editorConfig"
        style="height: 400px; overflow-y: hidden;"
        @onChange="onChange"
        @onCreated="onCreated"
    />
  </div>
</template>

<!--<wang-editor :disabled="disabled" :value.sync="test"  @change="onChange"></wang-editor>
onChange(value) {
  console.log(value)
}-->

<script>
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  name: '',
  components: {Editor, Toolbar},
  props: {
    value: {
      type: String,
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 400
    }
  },
  data() {
    return {
      editor: null,
      html: this.value,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            server: "http://appimg.hlx.com/digital-sanitation-service/file/upload",
            fieldName: 'file', //默认wangeditor-uploaded-image
            headers: {
              // TOKEN: getToken()
            },
            withCredentials: true,
          }
        }
      }
    }
  },
  watch: {
    disabled(value) {
      const editor = this.editor
      if (editor == null) return
      value ? editor.disable() : editor.enable()
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      this.$emit('change', editor.getHtml()) // onChange 时获取编辑器最新内容
    },
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
