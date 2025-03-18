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

    <el-table v-loading="loading" :data="petList">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="用户编号" align="center" prop="userId"/>
      <el-table-column label="用户编号" align="center" prop="name"/>
      <el-table-column label="宠物类型" align="center" prop="type"/>
      <el-table-column label="等级" align="center" prop="level"/>
      <el-table-column label="心情值" align="center" prop="mood"/>
      <el-table-column label="经验值" align="center" prop="exp"/>
      <!-- <el-table-column label="当前穿戴的衣服Id" align="center" prop="currentClothesId"/>
      <el-table-column label="领养时间" align="center" prop="createdTime"/> -->
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


    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户编号"/>
        </el-form-item>
        <el-form-item label="宠物名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入宠物名称"/>
        </el-form-item>
        <el-form-item label="宠物类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择宠物类型">
            <el-option label="dog" value="dog"/>
            <el-option label="cat" value="cat"/>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-input v-model="form.level" placeholder="请输入等级"/>
        </el-form-item>
        <el-form-item label="心情值" prop="mood">
          <el-input v-model="form.mood" placeholder="请输入心情值"/>
        </el-form-item>
        <el-form-item label="经验值" prop="exp">
          <el-input v-model="form.exp" placeholder="请输入经验值"/>
        </el-form-item>
        <!-- <el-form-item label="当前穿戴的衣服Id" prop="currentClothesId">
          <el-input v-model="form.currentClothesId" placeholder="请输入当前穿戴的衣服Id"/>
        </el-form-item>
        <el-form-item label="领养时间" prop="createdTime">
          <el-input v-model="form.createdTime" placeholder="请输入领养时间"/>
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
import {listPet, getPet, delPet, addPet, updatePet} from "@/api/project/pet";

export default {
  name: "Pet",
  data() {
    return {
      loading: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      petList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        name: null,
        type: null,
        level: null,
        mood: null,
        exp: null,
        currentClothesId: null,
        createdTime: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listPet(this.queryParams).then(response => {
        let list, start, end
        start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize
        end = start + this.queryParams.pageSize
        list = response.data.filter((item, index) => {
          return index >= start && index < end
        })
        this.petList = list;
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
        userId: null,
        name: null,
        type: null,
        level: null,
        mood: null,
        exp: null,
        currentClothesId: null,
        createdTime: null
      };
      // this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加宠物";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getPet(row).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改宠物";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePet(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPet(this.form).then(response => {
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
        return delPet(row);
      }).then(() => {
        this.getList();
        this.$message.success("删除成功");
      }).catch(() => {
      });
    },
  }
};
</script>


