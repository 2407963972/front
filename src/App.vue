<template>
  <div id="app">
    <div class="col-md-10 offset-md-1">
      <div class="text-center mb-4">
        <h1>简历自动生成系统</h1>
        <el-button type="primary" @click="generateResume">生成简历</el-button>
        <el-button type="warning" @click="dialogVisible = true">编辑个人信息</el-button>
        <el-button type="info" @click="templateDialogVisible = true">选择模板</el-button>
      </div>

      <el-dialog
        title="编辑个人信息"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form :model="resumeData" label-width="100px">
          <el-tabs>
            <el-tab-pane label="基本信息">
              <el-form-item label="姓名">
                <el-input v-model="resumeData.basicInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="resumeData.basicInfo.position"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="resumeData.basicInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="resumeData.basicInfo.phone"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input type="textarea" v-model="resumeData.basicInfo.summary" rows="4"></el-input>
              </el-form-item>
            </el-tab-pane>
            
            <el-tab-pane label="教育经历">
              <div v-for="(edu, index) in resumeData.education" :key="'edu-'+index" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h4>教育经历 #{{ index + 1 }}</h4>
                  <el-button type="danger" size="mini" @click="removeEducation(index)">删除</el-button>
                </div>
                <el-form-item label="学校名称">
                  <el-input v-model="edu.school"></el-input>
                </el-form-item>
                <el-form-item label="学位">
                  <el-input v-model="edu.degree"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                  <el-input v-model="edu.major"></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="edu.timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <el-button type="primary" @click="addEducation">添加教育经历</el-button>
            </el-tab-pane>
            
            <el-tab-pane label="工作经历">
              <div v-for="(work, index) in resumeData.workExperience" :key="'work-'+index" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h4>工作经历 #{{ index + 1 }}</h4>
                  <el-button type="danger" size="mini" @click="removeWorkExperience(index)">删除</el-button>
                </div>
                <el-form-item label="公司名称">
                  <el-input v-model="work.company"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                  <el-input v-model="work.position"></el-input>
                </el-form-item>
                <el-form-item label="工作描述">
                  <el-input type="textarea" v-model="work.description" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="work.timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <el-button type="primary" @click="addWorkExperience">添加工作经历</el-button>
            </el-tab-pane>
            
            <el-tab-pane label="技能">
              <div v-for="(skill, index) in resumeData.skills" :key="'skill-'+index" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h4>技能 #{{ index + 1 }}</h4>
                  <el-button type="danger" size="mini" @click="removeSkill(index)">删除</el-button>
                </div>
                <el-form-item label="技能名称">
                  <el-input v-model="skill.name"></el-input>
                </el-form-item>
                <el-form-item label="熟练度">
                  <el-rate v-model="skill.level" :max="5"></el-rate>
                </el-form-item>
              </div>
              <el-button type="primary" @click="addSkill">添加技能</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveResumeData">保 存</el-button>
        </span>
      </el-dialog>

      <!-- 模板选择对话框 -->
      <el-dialog
        title="选择简历模板"
        :visible.sync="templateDialogVisible"
        width="60%"
      >
        <div class="template-selector">
          <div class="row">
            <div class="col-md-4" v-for="(template, index) in templates" :key="index">
              <ResumeTemplate 
                :template="template" 
                @select="selectTemplate" 
              />
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="templateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="applyTemplate">应 用</el-button>
        </span>
      </el-dialog>

      <!-- 简历预览 -->
      <div v-if="showResume" class="resume-preview mt-4">
        <ResumePrint :resumeData="resumeData" :template="selectedTemplate" />
      </div>
    </div>
  </div>
</template>

<script>
import ResumePrint from "./components/ResumePrint.vue";
import ResumeTemplate from "./components/ResumeTemplate.vue";

export default {
  name: "App",
  components: {
    ResumePrint,
    ResumeTemplate
  },
  data() {
    return {
      dialogVisible: false,
      templateDialogVisible: false,
      showResume: false,
      selectedTemplate: "classic", // 默认模板
      templates: [
        {
          id: "classic",
          name: "经典简历",
          description: "简洁大方的经典风格",
          preview: require('./assets/images/classic-template.jpg')
        },
        {
          id: "creative",
          name: "创意简历",
          description: "富有创意的个性化简历",
          preview: require('./assets/images/creative-template.jpg')
        },
        {
          id: "modern",
          name: "现代简历",
          description: "时尚现代的设计风格",
          preview: require('./assets/images/modern-template.jpg')
        }
      ],
      resumeData: {
        basicInfo: {
          name: "",
          position: "",
          email: "",
          phone: "",
          summary: ""
        },
        education: [],
        workExperience: [],
        skills: []
      }
    };
  },
  methods: {
    generateResume() {
      this.showResume = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？未保存的数据将丢失")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    saveResumeData() {
      // 保存数据到本地存储
      const savedData = {
        resumeData: this.resumeData,
        selectedTemplate: this.selectedTemplate
      };
      localStorage.setItem("resumeData", JSON.stringify(savedData));
      this.$message({
        message: "简历数据已保存",
        type: "success"
      });
      this.dialogVisible = false;
      this.showResume = true;
    },
    addEducation() {
      this.resumeData.education.push({
        school: "",
        degree: "",
        major: "",
        timeRange: ""
      });
    },
    removeEducation(index) {
      this.resumeData.education.splice(index, 1);
    },
    addWorkExperience() {
      this.resumeData.workExperience.push({
        company: "",
        position: "",
        description: "",
        timeRange: ""
      });
    },
    removeWorkExperience(index) {
      this.resumeData.workExperience.splice(index, 1);
    },
    addSkill() {
      this.resumeData.skills.push({
        name: "",
        level: 3
      });
    },
    removeSkill(index) {
      this.resumeData.skills.splice(index, 1);
    },
    selectTemplate(templateId) {
      this.selectedTemplate = templateId;
    },
    applyTemplate() {
      this.templateDialogVisible = false;
      this.saveResumeData();
    }
  },
  created() {
    // 尝试从本地存储加载简历数据
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.resumeData) {
          this.resumeData = parsed.resumeData;
          this.selectedTemplate = parsed.selectedTemplate || "classic";
        } else {
          // 兼容旧格式数据
          this.resumeData = parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
  }
};
</script>

<style>
.resume-preview {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.template-selector {
  margin: 20px 0;
}

@media print {
  .resume-preview {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
  
  .el-button, 
  .text-center.mb-4 {
    display: none;
  }
}
</style>
