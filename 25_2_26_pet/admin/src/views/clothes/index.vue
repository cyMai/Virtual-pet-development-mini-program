<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
        >新增
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="clothesList">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="金币价格" align="center" prop="price"/>
      <!-- <el-table-column label="购买此衣服的用户" align="center" prop="userIds"/> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :page-sizes="[10,20,50]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
    />


    <!-- 添加或修改橱窗管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="金币价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入金币价格"/>
        </el-form-item>
        <!-- <el-form-item label="购买此衣服的用户" prop="userIds">
          <el-input v-model="form.userIds" placeholder="请输入购买此衣服的用户"/>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listClothes, getClothes, delClothes, addClothes, updateClothes} from "@/api/project/clothes";

export default {
  name: "Clothes",
  data() {
    return {
      loading: true,
      // 总条数
      total: 0,
      // 橱窗管理表格数据
      clothesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        price: null,
        userIds: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          {required: true, message: "编号不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handlePageChange(currentPage) {
      this.queryParams.pageNum = currentPage
      this.getList()
    },
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize
      this.getList()
    },
    /** 查询橱窗管理列表 */
    getList() {
      this.loading = true;
      listClothes(this.queryParams).then(response => {
        let list, start, end
        start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize
        end = start + this.queryParams.pageSize
        list = response.data.filter((item, index) => {
          return index >= start && index < end
        })
        this.clothesList = list;
        this.total = response.data.length;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        price: null,
        userIds: null
      };
      // this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加橱窗管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getClothes(row).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改橱窗管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateClothes(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addClothes(this.form).then(response => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除？').then(function () {
        return delClothes(row);
      }).then(() => {
        this.getList();
        this.$message.success("删除成功");
      }).catch(() => {
      });
    },
  }
};
</script>


