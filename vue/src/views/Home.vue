<template>
  <div style="padding: 10px;width: calc(100vh - 10px) ">
    <div style="margin: 10px">
      <!--     功能区域 -->
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px">
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin: 5px" @click="load">搜索</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称"
          sortable>
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          sortable>
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          sortable>
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          sortable>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small" >编辑
          </el-button>
          <el-popconfirm title="确定删除数据吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px" class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <!--        form后的名字和数据库对应-->
            <el-input v-model="form.username" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
            <el-radio v-model="form.sex" label="未知">未知</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  name: 'Home',
  components: {}
  , data() {
    return {
      form: {},
      dialogVisible: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: '',
      tableData: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/api/user", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      if (this.form.id) {
        request.put("/api/user", this.form).then(res => {
          console.log(res)
          if (res.code === "0") {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      } else {
        request.post("/api/user", this.form).then(res => {
          console.log(res)
          if (res.code === "0") {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      }
      // 刷新页面
      this.load()
      this.dialogVisible = false
    },
    add() {
      this.dialogVisible = true
      // 清空表单
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    // 改变每页数据量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    // 触发改编页码
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.load()
    },
    // 删除数据
    handleDelete(id) {
      console.log(id)
      request.delete("/api/user/" + id).then(res => {
        if (res.code === "0") {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        // 重新加载删除后数据
        this.load()
      })
    }
  }
}
</script>
