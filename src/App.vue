<template>
  <div id="app">
    <div class="col-md-8 offset-md-2">
      <table class="table caption-top table-hover">
        <caption class="text-center">
          <h1>学生管理系统</h1>
          <el-button type="primary" @click="getStudents"
            >获取学生信息</el-button
          >
          <el-button type="warning" @click="dialogVisible = true"
            >添加学生</el-button
          >

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div>添加学生信息</div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addStudent">添加</el-button>
            </span>
            <div><span>学号</span><input v-model="newStudent.number" /></div>
            <div><span>姓名</span><input v-model="newStudent.name" /></div>
            <div>
              <span>年龄</span><input v-model.number="newStudent.age" />
            </div>
            <div>
              <span>语文</span><input v-model.number="newStudent.chi" />
            </div>
            <div>
              <span>数学</span><input v-model.number="newStudent.math" />
            </div>
            <div>
              <span>英语</span><input v-model.number="newStudent.eng" />
            </div>
          </el-dialog>
        </caption>
        <thead>
          <tr>
            <th scope="col">学号</th>
            <th scope="col">姓名</th>
            <th scope="col">年龄</th>
            <th scope="col">语文</th>
            <th scope="col">数学</th>
            <th scope="col">英语</th>
            <th scope="col">操作</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Student
            v-for="student in students_of_page"
            :key="student.id"
            :student="student"
          ></Student>
        </tbody>
      </table>
<div class="text-center"> 
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="prev_page">上一页</el-button>
        <el-button type="primary" @click="next_page"
          >下一页<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-button-group>
</div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    Student,
  },
  data() {
    return {
      page: 1,
      students: [],
      dialogVisible: false,
      newStudent: {
        number: "",
        name: "",
        age: "",
        chi: "",
        math: "",
        eng: "",
      },
    };
  },
  methods: {
    getStudents() {
      axios({
        url: "http://localhost:8080/students",
        method: "GET",
      })
        .then((res) => {
          console.log(res);
          this.students = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    addStudent() {
      axios({
        url: "http://localhost:8080/add",
        method: "POST",
        data: this.newStudent,
      })
        .then((res) => {
          console.log(res);
          this.getStudents();
          this.dialogVisible = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    next_page() {
      this.page++;
    },
    prev_page() {
      this.page--;
    },
  },
  computed: {
    students_of_page() {
      return this.students.slice(this.page * 5 - 5, this.page * 5);
    },
  },
};
</script>

<style>
</style>
