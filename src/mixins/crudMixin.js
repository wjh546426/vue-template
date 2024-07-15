import {deleteAction, getAction} from "../api/requestor.js";

export const crudMixin = {
    data() {
        return {
            form: {},
            tableData: [],
            size: 10,
            current: 1,
            total: 0,
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // 加载数据
        loadData() {
            if (!this.url.list) return this.$message.error('url.list未传入')
            const {dateRange = [], ...otherData} = this.form;
            const params = {
                size: this.size,
                current: this.current,
                startTime: dateRange[0],
                endTime: dateRange[1],
                // 将其他表单数据项合并到params中
                ...otherData
            };
            getAction(this.url.list, params).then(res => {
                if (res.data.code === 200) {
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },

        // 查询
        handleQuery() {
            this.current = 1;
            this.loadData();
        },
        // 重置
        handleReset() {
            this.current = 1;
            this.form = {};
            this.loadData();
        },

        // 添加
        handleAdd(title) {
            this.$refs.editor.openDialog(title)
        },
        // 编辑
        handleEdit(title, record) {
            this.$refs.editor.openDialog(title, record)
        },
        // 删除
        handleDelete(id) {
            if (!this.url.delete) return this.$message.error('url.delete未传入')
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 执行删除操作
                deleteAction(this.url.delete, {id: id}).then(res => {
                    if (res.data.code === 200) {
                        this.loadData()
                        this.$message({type: 'success', message: '删除成功!'});
                    } else {
                        this.$message({type: 'error', message: '删除失败!'});
                    }
                })
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除'});
            });
        },

        // 每页显示数量变更
        handleSizeChange(val) {
            this.size = val
            this.loadData()
        },
        // 当前页变更
        handleCurrentChange(val) {
            this.current = val
            this.loadData()
        }
    }
};
