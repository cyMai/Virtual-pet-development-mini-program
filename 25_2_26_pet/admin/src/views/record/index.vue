<template>
  <div class="app-container">
    <!-- <el-row :gutter="10" class="mb8">
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
    </el-row> -->

    <el-table v-loading="loading" :data="recordList">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="用户ID" align="center" prop="userId"/>
      <el-table-column label="宠物ID" align="center" prop="petId"/>
      <el-table-column label="专注名称" align="center" prop="focusName"/>
      <el-table-column label="专注时长(分钟)" align="center" prop="focusTime"/>
      <el-table-column label="获得经验" align="center" prop="expGained"/>
      <el-table-column label="创建时间" align="center" prop="createdTime"/>
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

    <!-- 添加或修改专注记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="宠物ID" prop="petId">
          <el-input v-model="form.petId" placeholder="请输入宠物ID"/>
        </el-form-item>
        <el-form-item label="专注名称" prop="focusName">
          <el-input v-model="form.focusName" placeholder="请输入专注名称"/>
        </el-form-item>
        <el-form-item label="专注时长" prop="focusTime">
          <el-input-number v-model="form.focusTime" :min="1" placeholder="请输入专注时长(分钟)"/>
        </el-form-item>
        <el-form-item label="获得经验" prop="expGained">
          <el-input-number v-model="form.expGained" :min="0" placeholder="请输入获得经验"/>
        </el-form-item>
        <!-- <el-form-item label="创建时间" prop="createdTime">
          <el-date-picker
              v-model="form.createdTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
          />
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
import {listRecord, getRecord, delRecord, addRecord, updateRecord} from "@/api/project/record";

export default {
  name: "Record",
  data() {
    return {
      loading: true,
      total: 0,
      recordList: [],
      title: "",
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        petId: null,
        focusName: null,
        focusTime: null,
        expGained: null,
        createdTime: null
      },
      form: {},
      rules: {
        userId: [
          {required: true, message: "用户ID不能为空", trigger: "blur"}
        ],
        petId: [
          {required: true, message: "宠物ID不能为空", trigger: "blur"}
        ],
        focusName: [
          {required: true, message: "专注名称不能为空", trigger: "blur"}
        ],
        focusTime: [
          {required: true, message: "专注时长不能为空", trigger: "blur"}
        ]
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
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        let list, start, end
        start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize
        end = start + this.queryParams.pageSize
        list = response.data.filter((item, index) => {
          return index >= start && index < end
        })
        this.recordList = list;
        this.total = response.data.length;
        this.loading = false;
      });
    },
    cancel() {
      this.open = false;
      this.reset();
    },
    reset() {
      this.form = {
        id: null,
        userId: null,
        petId: null,
        focusName: null,
        focusTime: null,
        expGained: null,
        createdTime: null
      };
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加专注记录";
    },
    handleUpdate(row) {
      this.reset();
      getRecord(row).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改专注记录";
      });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecord(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecord(this.form).then(response => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleDelete(row) {
      this.$confirm('是否确认删除该专注记录？').then(function () {
        return delRecord(row);
      }).then(() => {
        this.getList();
        this.$message.success("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
