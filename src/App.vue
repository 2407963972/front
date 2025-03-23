<template>
  <div id="app" class="app-container" :class="{ 'dark-mode': darkMode }">
    <div class="background-effect"></div>
    
    <!-- 导航栏 -->
    <nav class="modern-navbar">
      <div class="navbar-brand">
        <i class="el-icon-document resume-icon"></i>
        <span>Resume Builder</span>
      </div>
      <div class="navbar-actions">
        <a href="javascript:void(0)" title="深色/浅色模式" class="navbar-action" @click="toggleDarkMode">
          <i :class="darkMode ? 'el-icon-sunny' : 'el-icon-moon'"></i>
        </a>
        <a href="javascript:void(0)" title="帮助" class="navbar-action">
          <i class="el-icon-question"></i>
        </a>
        <a href="javascript:void(0)" title="设置" class="navbar-action">
          <i class="el-icon-setting"></i>
        </a>
      </div>
    </nav>
    
    <div class="col-md-10 offset-md-1 content-wrapper">
      <div class="text-center mb-5">
        <h1 class="main-title"><span class="gradient-text">简历自动生成系统</span></h1>
        <p class="subtitle">轻松创建专业简历，展现你的职业魅力</p>
        <div class="buttons-container">
          <el-button type="primary" class="action-button" @click="generateResume">
            <i class="el-icon-view"></i> 生成简历
          </el-button>
          <el-button type="warning" class="action-button" @click="openInfoDialog">
            <i class="el-icon-edit"></i> 编辑个人信息
          </el-button>
          <el-button type="info" class="action-button" @click="openTemplateDialog">
            <i class="el-icon-picture-outline"></i> 选择模板
          </el-button>
        </div>
      </div>

      <el-dialog
        v-if="dialogVisible"
        title="编辑个人信息"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        :append-to-body="true"
        @open="handleDialogOpen"
        @closed="handleDialogClose"
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
          <el-button @click="closeInfoDialog">取 消</el-button>
          <el-button type="primary" @click="saveResumeData">保 存</el-button>
        </span>
      </el-dialog>

      <!-- 模板选择对话框，添加v-if确保未激活时完全不渲染 -->
      <el-dialog
        v-if="templateDialogVisible"
        title="选择简历模板"
        :visible.sync="templateDialogVisible"
        width="80%"
        :before-close="handleClose"
        :append-to-body="true"
        custom-class="template-dialog"
        center
        @open="handleDialogOpen"
        @closed="handleDialogClose"
      >
        <div class="template-grid">
          <div 
            v-for="template in templates" 
            :key="template.id" 
            class="template-card"
            :class="{ 'active': selectedTemplate === template.id }"
            @click="selectTemplate(template.id)"
          >
            <div class="template-preview">
              <img :src="template.preview" :alt="template.name" class="template-image" />
              <div class="template-overlay">
                <el-button 
                  type="primary" 
                  circle 
                  class="select-button"
                  v-if="selectedTemplate === template.id"
                >
                  <i class="el-icon-check"></i>
                </el-button>
              </div>
            </div>
            <div class="template-info">
              <h3>{{ template.name }}</h3>
              <p>{{ template.description }}</p>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="applyTemplate">应用模板</el-button>
        </span>
      </el-dialog>

      <!-- 简历预览 -->
      <div v-if="showResume" class="resume-preview mt-4">
        <div class="preview-header">
          <span class="preview-title">简历预览</span>
          <el-button size="small" type="primary" plain @click="printResume">
            <i class="el-icon-printer"></i> 打印
          </el-button>
        </div>
        <ResumePrint :resumeData="resumeData" :template="selectedTemplate" />
      </div>
    </div>
    
    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p>© 2023 简历自动生成系统 - 轻松创建专业简历</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ResumePrint from "./components/ResumePrint.vue";

export default {
  name: "App",
  components: {
    ResumePrint
  },
  data() {
    return {
      dialogVisible: false,
      templateDialogVisible: false,
      showResume: true, // 默认显示简历
      selectedTemplate: "creative", // 默认使用创意模板
      darkMode: false, // 默认使用浅色模式
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
          name: "张三",
          position: "前端开发工程师",
          email: "zhangsan@email.com",
          phone: "13800138000",
          summary: "拥有5年前端开发经验，精通HTML、CSS、JavaScript，熟悉Vue、React等前端框架，对用户体验和界面设计有深入了解。"
        },
        education: [
          {
            school: "北京大学",
            degree: "本科",
            major: "计算机科学与技术",
            timeRange: [new Date(2014, 8, 1), new Date(2018, 6, 1)]
          }
        ],
        workExperience: [
          {
            company: "XX科技有限公司",
            position: "前端开发工程师",
            description: "负责公司核心产品的前端开发工作，实现了多个关键功能模块；优化了网站性能，提升了用户体验；参与了多个项目的技术选型和架构设计。",
            timeRange: [new Date(2018, 7, 1), new Date(2023, 6, 1)]
          }
        ],
        skills: [
          {
            name: "JavaScript",
            level: 5
          },
          {
            name: "Vue.js",
            level: 4
          },
          {
            name: "HTML/CSS",
            level: 5
          },
          {
            name: "React",
            level: 3
          }
        ]
      }
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
    },
    generateResume() {
      this.showResume = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？未保存的数据将丢失")
        .then(() => {
          done();
          this.handleDialogClose();
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
      this.handleDialogClose();
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
      this.handleDialogClose();
      // 先保存，但不立即重新渲染
      const savedData = {
        resumeData: this.resumeData,
        selectedTemplate: this.selectedTemplate
      };
      localStorage.setItem("resumeData", JSON.stringify(savedData));
      this.$message({
        message: "模板已应用，数据已保存",
        type: "success"
      });
    },
    printResume() {
      window.print();
    },
    // 打开模板选择对话框
    openTemplateDialog() {
      this.templateDialogVisible = true;
      this.handleDialogOpen();
    },
    // 关闭模板对话框
    closeTemplateDialog() {
      this.templateDialogVisible = false;
      this.handleDialogClose();
    },
    // Dialog打开前阻止滚动
    handleDialogOpen() {
      document.body.style.overflow = 'hidden';
    },
    // Dialog关闭后恢复滚动
    handleDialogClose() {
      document.body.style.overflow = '';
      document.body.classList.remove('el-popup-parent--hidden');
      return true;
    },
    // 打开编辑个人信息对话框
    openInfoDialog() {
      this.dialogVisible = true;
      this.handleDialogOpen();
    },
    // 关闭编辑个人信息对话框
    closeInfoDialog() {
      this.dialogVisible = false;
      this.handleDialogClose();
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
          this.selectedTemplate = parsed.selectedTemplate || "creative";
        } else {
          // 兼容旧格式数据
          this.resumeData = parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
    
    // 加载深色模式设置
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === "true";
    }
    
    // 无论是否从本地存储加载，都显示简历
    this.showResume = true;
  }
};
</script>

<style>
/* 页面整体样式 */
.app-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
  padding: 0 0 80px 0;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  flex: 1;
  padding-top: 20px;
}

/* 导航栏样式 */
.modern-navbar {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  position: relative;
  z-index: 10;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: #3498db;
}

.resume-icon {
  font-size: 1.8rem;
  margin-right: 10px;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-actions {
  display: flex;
  gap: 15px;
}

.navbar-action {
  color: #7f8c8d;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.navbar-action:hover {
  color: #3498db;
  transform: scale(1.1);
}

/* 页脚样式 */
.app-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  text-align: center;
  margin-top: 50px;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 背景效果 */
.background-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(245, 243, 255, 0.8) 100%);
  z-index: -1;
}

.background-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0) 70%);
  border-radius: 50%;
  animation: float 20s infinite alternate ease-in-out;
}

.background-effect::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -30%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(155, 89, 182, 0.1) 0%, rgba(155, 89, 182, 0) 70%);
  border-radius: 50%;
  animation: float 15s infinite alternate-reverse ease-in-out;
}

/* 简历预览区域 */
.resume-preview {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: slideUp 0.8s ease-out forwards;
  position: relative;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #3498db;
}

.template-selector {
  margin: 20px 0;
}

/* 标题和副标题样式 */
.main-title {
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 2.8rem;
  font-weight: 700;
  position: relative;
  animation: fadeInDown 1.2s ease-out;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 25px;
  animation: fadeIn 1.5s ease-out;
}

.gradient-text {
  background: linear-gradient(45deg, #3498db, #9b59b6, #3498db);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 5s ease infinite;
  display: inline-block;
  padding: 0 10px;
  position: relative;
}

.gradient-text::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(90deg, transparent, #3498db, #9b59b6, #3498db, transparent);
  animation: lineGrow 2s ease-out forwards;
  transform-origin: center;
}

.buttons-container {
  opacity: 0;
  animation: fadeIn 1s ease-out 0.8s forwards;
  margin-top: 30px;
}

.action-button {
  margin: 0 10px;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.action-button i {
  margin-right: 5px;
}

/* 动画关键帧 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes lineGrow {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(5%, 5%) rotate(5deg);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Element UI 组件样式优化 */
.el-dialog {
  margin: 0 auto !important;
  max-width: 90%;
  max-height: 90vh;
  display: flex !important;
  flex-direction: column;
  position: relative;
  border-radius: 8px !important;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.el-dialog__header {
  padding: 15px 20px;
  background: linear-gradient(to right, #3498db, #9b59b6);
}

.el-dialog__title {
  color: white !important;
  font-weight: 500;
}

.el-dialog__body {
  padding: 25px;
  overflow: auto;
  max-height: 60vh;
}

.el-dialog__footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

.el-form-item__label {
  font-weight: 500;
}

.el-tabs__header {
  margin-bottom: 25px;
}

.el-tabs__item {
  font-weight: 500;
}

.el-tabs__item.is-active {
  color: #3498db;
}

.el-tabs__active-bar {
  background-color: #3498db;
}

@media print {
  .app-container {
    background: none;
    padding: 0;
  }
  
  .background-effect,
  .modern-navbar,
  .app-footer,
  .preview-header,
  .no-print {
    display: none !important;
  }
  
  .resume-preview {
    box-shadow: none;
    margin: 0;
    padding: 0;
    animation: none;
    border-radius: 0;
    max-width: 100%;
  }
  
  .el-button, 
  .text-center.mb-5,
  .main-title,
  .subtitle,
  .buttons-container {
    display: none !important;
  }
  
  .content-wrapper {
    padding: 0;
    max-width: 100% !important;
    margin: 0 !important;
  }

  .col-md-10.offset-md-1 {
    max-width: 100% !important;
    margin-left: 0 !important;
    padding: 0 !important;
  }

  html, body {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* 模板选择样式 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 20px;
}

.template-card {
  border: 2px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #3498db;
}

.template-card.active {
  border-color: #3498db;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.template-preview {
  position: relative;
  height: 0;
  padding-bottom: 140%;
  overflow: hidden;
  background-color: #f8f9fa;
  flex-grow: 1;
}

.template-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

.dark-mode .template-preview {
  background-color: #333;
}

.dark-mode .template-image {
  padding: 10px;
}

.template-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0);
}

.template-card.active .template-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}

.select-button {
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
  z-index: 10;
}

.template-card.active .select-button {
  opacity: 1;
  transform: scale(1);
}

.template-info {
  padding: 15px;
  text-align: center;
  flex-shrink: 0;
}

.template-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #2c3e50;
}

.template-info p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
}

/* 通用动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.2rem;
  }
  
  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    margin: 5px 0;
    width: 80%;
  }
  
  .template-grid {
    grid-template-columns: 1fr;
  }
  
  .modern-navbar {
    padding: 10px 15px;
  }
  
  .navbar-brand span {
    font-size: 1.2rem;
  }
}

/* 深色模式样式 */
.dark-mode {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

.dark-mode .background-effect {
  background: linear-gradient(135deg, rgba(25, 25, 35, 0.9) 0%, rgba(35, 35, 45, 0.9) 100%);
}

.dark-mode .modern-navbar {
  background-color: #2c2c2c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dark-mode .navbar-brand {
  color: #3498db;
}

.dark-mode .navbar-action {
  color: #bbb;
}

.dark-mode .navbar-action:hover {
  color: #3498db;
}

.dark-mode .main-title {
  color: #f5f5f5;
}

.dark-mode .subtitle {
  color: #bbb;
}

.dark-mode .resume-preview {
  background-color: #2c2c2c;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.dark-mode .preview-title {
  color: #3498db;
}

.dark-mode .preview-header {
  border-bottom: 1px solid #444;
  background-color: transparent;
  padding: 15px 20px;
  margin: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dark-mode .el-dialog {
  background-color: #2c2c2c;
  border: 1px solid #444;
}

.dark-mode .el-dialog__title,
.dark-mode .el-form-item__label {
  color: #f5f5f5;
}

.dark-mode .template-card {
  border-color: #444;
  background-color: #333;
}

.dark-mode .template-info {
  background-color: #333;
}

.dark-mode .template-info h3 {
  color: #f5f5f5;
}

.dark-mode .template-info p {
  color: #bbb;
}

.dark-mode .el-button:not(.el-button--primary) {
  border-color: #444;
  background-color: #333;
  color: #f5f5f5;
}

@media print {
  .dark-mode {
    background-color: #fff;
    color: #333;
  }
  
  .dark-mode .resume-preview {
    background-color: #fff;
  }
}

/* 模板对话框样式 */
.template-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.template-dialog .el-dialog__header {
  background: linear-gradient(to right, #3498db, #9b59b6);
  color: white;
  padding: 15px 20px;
  text-align: center;
}

.template-dialog .el-dialog__title {
  color: white;
  font-weight: 500;
}

.template-dialog .el-dialog__body {
  padding: 25px;
  overflow-y: auto;
  max-height: 70vh;
}

.template-dialog .el-dialog__footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

/* 处理Element UI对话框样式 */
.el-dialog__wrapper {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

/* 隐藏未激活的对话框 */
.el-dialog__wrapper[style*="display: none"] {
  display: none !important;
}

/* 修复模态背景 */
.v-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  opacity: 0.5 !important;
  background: #000 !important;
  z-index: 2000 !important;
}

/* 隐藏未激活的背景 */
.v-modal[style*="display: none"] {
  display: none !important;
}

/* 模板网格修复 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 992px) {
  .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .template-grid {
    grid-template-columns: 1fr;
  }
  
  .el-dialog {
    width: 95% !important;
    margin: 10px auto !important;
  }
}

/* 确保对话框默认不显示 */
body:not(.el-popup-parent--hidden) .el-dialog__wrapper:not(.is-visible),
body:not(.el-popup-parent--hidden) .v-modal {
  display: none !important;
}

/* 确保body没有多余的overflow:hidden */
body:not(.el-popup-parent--hidden) {
  overflow: auto !important;
}

/* 调整模板对话框的大小和布局 */
.template-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.template-dialog .el-dialog__body {
  padding: 25px;
  overflow-y: auto;
  max-height: 70vh;
}

/* 确保对话框内的模板网格能够适当显示 */
@media (min-width: 1200px) {
  .template-dialog .template-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .template-preview {
    padding-bottom: 150%; /* 更高的预览区域 */
  }
}

@media (max-width: 1199px) and (min-width: 768px) {
  .template-dialog .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .template-preview {
    padding-bottom: 160%;
  }
}

@media (max-width: 767px) {
  .template-dialog .template-grid {
    grid-template-columns: 1fr;
  }
  
  .template-preview {
    padding-bottom: 170%;
  }
}

/* 在黑夜模式下调整经典模板和现代模板的背景和文本颜色 */
.dark-mode .template-classic,
.dark-mode .template-modern {
  background-color: #fff !important;
  color: #333 !important;
}

/* 在黑夜模式下修复预览区域的背景色 */
.dark-mode .resume-preview {
  background-color: #2c2c2c;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  padding: 0;
  display: flex;
  flex-direction: column;
}

.dark-mode .resume-preview .resume-container {
  padding: 30px;
  margin-top: 0;
  background-color: #fff !important;
  color: #333 !important;
}

/* 保持经典模板和现代模板的某些元素颜色不变 */
.dark-mode .template-classic .resume-name,
.dark-mode .template-classic .section-title,
.dark-mode .template-classic .item-header h3,
.dark-mode .template-modern .modern-name-title h1,
.dark-mode .template-modern .modern-section-title,
.dark-mode .template-modern .modern-experience-title h4 {
  color: #2c3e50 !important;
}

.dark-mode .template-classic .resume-position,
.dark-mode .template-classic .item-header h4,
.dark-mode .template-classic .time-range,
.dark-mode .template-modern .modern-name-title h2,
.dark-mode .template-modern .modern-experience-title h5,
.dark-mode .template-modern .modern-experience-date {
  color: #7f8c8d !important;
}

/* 修复黑夜模式下的图标和元素颜色 */
.dark-mode .template-classic .resume-contact i,
.dark-mode .template-modern .contact-item i {
  color: #3498db !important;
}

.dark-mode .template-classic .skill-bar,
.dark-mode .template-modern .modern-separator,
.dark-mode .template-modern .modern-section-title::after,
.dark-mode .template-modern .modern-skill-dot.active {
  background-color: #3498db !important;
}

/* 保持创意模板的颜色方案 */
.dark-mode .template-creative .creative-sidebar {
  background-color: #2c3e50 !important;
  color: #fff !important;
}

.dark-mode .template-creative .creative-main {
  background-color: #fff !important;
  color: #333 !important;
}

.dark-mode .template-creative .creative-section-header i,
.dark-mode .template-creative .creative-contact-item i {
  color: #3498db !important;
}

.dark-mode .template-creative .creative-timeline-dot,
.dark-mode .template-creative .creative-section-title::after,
.dark-mode .template-creative .creative-skill-fill {
  background-color: #3498db !important;
}

/* 修复黑夜模式下预览头部区域 */
.dark-mode .preview-header {
  border-bottom: 1px solid #444;
  background-color: transparent;
  padding: 15px 20px;
  margin: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dark-mode .preview-title {
  color: #3498db !important;
  font-weight: 600;
  font-size: 18px;
}

/* 修复黑夜模式下打印按钮样式 */
.dark-mode .preview-header .el-button {
  color: #3498db;
  border-color: #3498db;
  background-color: transparent;
}

.dark-mode .preview-header .el-button:hover {
  color: #fff;
  background-color: #3498db;
  border-color: #3498db;
}
</style>
