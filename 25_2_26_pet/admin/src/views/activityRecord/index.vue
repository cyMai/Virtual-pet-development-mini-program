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

    <el-table v-loading="loading" :data="activityRecordList">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="宠物ID" align="center" prop="petId"/>
      <el-table-column label="用户ID" align="center" prop="userId"/>
      <el-table-column label="活动类型" align="center" prop="type"/>
      <el-table-column label="心情值变化" align="center" prop="mood"/>
      <el-table-column label="创建时间" align="center" prop="createdTime"/>
      <el-table-column label="描述" align="center" prop="description"/>
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

    <!-- 添加或修改活动记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="宠物ID" prop="petId">
          <el-input v-model="form.petId" placeholder="请输入宠物ID"/>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="活动类型" prop="type">
          <el-input v-model="form.type" placeholder="请输入活动类型"/>
        </el-form-item>
        <el-form-item label="心情值变化" prop="mood">
          <el-input v-model="form.mood" placeholder="请输入心情值变化"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入描述"/>
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
import {listActivityRecord, getActivityRecord, delActivityRecord, addActivityRecord, updateActivityRecord} from "@/api/project/activityRecord";

export default {
  name: "ActivityRecord",
  data() {
    return {
      loading: true,
      total: 0,
      activityRecordList: [],
      title: "",
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        petId: null,
        userId: null,
        type: null,
        mood: null,
        createdTime: null,
        description: null
      },
      form: {},
      rules: {
        petId: [
          {required: true, message: "宠物ID不能为空", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "用户ID不能为空", trigger: "blur"}
        ],
        type: [
          {required: true, message: "活动类型不能为空", trigger: "blur"}
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
      listActivityRecord(this.queryParams).then(response => {
        let list, start, end
        start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize
        end = start + this.queryParams.pageSize
        list = response.data.filter((item, index) => {
          return index >= start && index < end
        })
        this.activityRecordList = list;
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
        petId: null,
        userId: null,
        type: null,
        mood: null,
        createdTime: null,
        description: null
      };
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加活动记录";
    },
    handleUpdate(row) {
      this.reset();
      getActivityRecord(row).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改活动记录";
      });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityRecord(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivityRecord(this.form).then(response => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleDelete(row) {
      this.$confirm('是否确认删除该活动记录？').then(function () {
        return delActivityRecord(row);
      }).then(() => {
        this.getList();
        this.$message.success("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
