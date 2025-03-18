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

    <el-table v-loading="loading" :data="userList">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="账号" align="center" prop="userAccount"/>
      <el-table-column label="密码" align="center" prop="userPassword"/>
      <el-table-column label="权限" align="center" prop="userPermissions"/>
      <el-table-column label="头像" align="center" prop="userPic" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.userPic">暂无图像</div>
          <div v-else>
            <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.userPic"
                :preview-src-list="[scope.row.userPic]">
            </el-image>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="userNickname"/>
      <!-- <el-table-column label="年龄" align="center" prop="userAge"/>
      <el-table-column label="性别" align="center" prop="userSex"/> -->
      <el-table-column label="总专注时长(分钟)" align="center" prop="totalFocusTime"/>
      <el-table-column label="金币" align="center" prop="coins"/>
      <el-table-column label="最高分" align="center" prop="maxScore"/>
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


    <!-- 添加或修改用户管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="form.userAccount" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="form.userPassword" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="权限" prop="userPermissions">
          <el-input v-model="form.userPermissions" placeholder="请输入权限"/>
        </el-form-item>
        <el-form-item label="头像" prop="userPic">
          <image-upload v-model="form.userPic"></image-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="userNickname">
          <el-input v-model="form.userNickname" placeholder="请输入姓名"/>
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="userAge">
          <el-input v-model="form.userAge" placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="form.userSex" placeholder="请选择性别">
            <el-option label="请更改此处代码添加选项" value=""/>
          </el-select>
        </el-form-item> -->
        <el-form-item label="总专注时长(分钟)" prop="totalFocusTime">
          <el-input v-model="form.totalFocusTime" placeholder="请输入总专注时长(分钟)"/>
        </el-form-item>
        <el-form-item label="金币" prop="coins">
          <el-input v-model="form.coins" placeholder="请输入金币"/>
        </el-form-item>
        <el-form-item label="最高分" prop="maxScore">
          <el-input v-model="form.maxScore" placeholder="请输入最高分"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listUser, getUser, delUser, addUser, updateUser} from "@/api/project/user";

export default {
  name: "User",
  data() {
    return {
      loading: true,
      // 总条数
      total: 0,
      // 用户管理表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userAccount: null,
        userPassword: null,
        userPermissions: null,
        userPic: null,
        userNickname: null,
        userAge: null,
        userSex: null,
        totalFocusTime: null,
        coins: null,
        maxScore: null
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
    /** 查询用户管理列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        let list, start, end
        start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize
        end = start + this.queryParams.pageSize
        list = response.data.filter((item, index) => {
          return index >= start && index < end
        })
        this.userList = list;
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
        userAccount: null,
        userPassword: null,
        userPermissions: null,
        userPic: null,
        userNickname: null,
        userAge: null,
        userSex: null,
        totalFocusTime: null,
        coins: null,
        maxScore: null
      };
      // this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getUser(row).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUser(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
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
        return delUser(row);
      }).then(() => {
        this.getList();
        this.$message.success("删除成功");
      }).catch(() => {
      });
    },
  }
};
</script>


