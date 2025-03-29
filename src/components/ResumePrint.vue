<template>
  <div class="resume-container" :class="template">
    <!-- 经典模板 -->
    <div v-if="template === 'classic'" class="template-classic">
      <!-- 简历头部 -->
      <div class="resume-header">
        <h1 class="resume-name">{{ resumeData.basicInfo.name }}</h1>
        <h3 class="resume-position">{{ resumeData.basicInfo.position }}</h3>
        
        <div class="resume-contact">
          <p v-if="resumeData.basicInfo.gender || resumeData.basicInfo.age">
            <i class="el-icon-user"></i> 
            {{ resumeData.basicInfo.gender }}
            <span v-if="resumeData.basicInfo.gender && resumeData.basicInfo.age"> · </span>
            {{ resumeData.basicInfo.age }}岁
          </p>
          <p v-if="resumeData.basicInfo.email">
            <i class="el-icon-message"></i> {{ resumeData.basicInfo.email }}
          </p>
          <p v-if="resumeData.basicInfo.phone">
            <i class="el-icon-phone"></i> {{ resumeData.basicInfo.phone }}
          </p>
        </div>
      </div>

      <!-- 个人简介 -->
      <div v-if="resumeData.basicInfo.summary" class="resume-section">
        <h2 class="section-title">个人简介</h2>
        <div class="section-content">
          <p>{{ resumeData.basicInfo.summary }}</p>
        </div>
      </div>

      <!-- 工作经历 -->
      <div v-if="resumeData.workExperience && resumeData.workExperience.length > 0" class="resume-section">
        <h2 class="section-title">工作经历</h2>
        <div class="section-content">
          <div v-for="(work, index) in resumeData.workExperience" :key="'work-'+index" class="experience-item">
            <div class="item-header">
              <h3>{{ work.position }}</h3>
              <h4>{{ work.company }}</h4>
              <p class="time-range" v-if="work.timeRange">
                {{ formatDateRange(work.timeRange) }}
              </p>
            </div>
            <p class="item-description">{{ work.description }}</p>
          </div>
        </div>
      </div>

      <!-- 教育经历 -->
      <div v-if="resumeData.education && resumeData.education.length > 0" class="resume-section">
        <h2 class="section-title">教育经历</h2>
        <div class="section-content">
          <div v-for="(edu, index) in resumeData.education" :key="'edu-'+index" class="experience-item">
            <div class="item-header">
              <h3>{{ edu.school }}</h3>
              <h4>{{ edu.degree }} · {{ edu.major }}</h4>
              <p class="time-range" v-if="edu.timeRange">
                {{ formatDateRange(edu.timeRange) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能 -->
      <div v-if="resumeData.skills && resumeData.skills.length > 0" class="resume-section">
        <h2 class="section-title">技能</h2>
        <div class="section-content skills-section">
          <div v-for="(skill, index) in resumeData.skills" :key="'skill-'+index" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-level">
              <div 
                class="skill-bar" 
                :style="{ width: (skill.level * 20) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代模板 -->
    <div v-if="template === 'modern'" class="template-modern">
      <div class="modern-header">
        <div class="modern-name-title">
          <h1>{{ resumeData.basicInfo.name }}</h1>
          <div class="modern-separator"></div>
          <h2>{{ resumeData.basicInfo.position }}</h2>
        </div>
        <div class="modern-contact">
          <div v-if="resumeData.basicInfo.gender || resumeData.basicInfo.age" class="contact-item">
            <i class="el-icon-user"></i>
            <span>
              {{ resumeData.basicInfo.gender }}
              <span v-if="resumeData.basicInfo.gender && resumeData.basicInfo.age"> · </span>
              {{ resumeData.basicInfo.age }}岁
            </span>
          </div>
          <div v-if="resumeData.basicInfo.email" class="contact-item">
            <i class="el-icon-message"></i>
            <span>{{ resumeData.basicInfo.email }}</span>
          </div>
          <div v-if="resumeData.basicInfo.phone" class="contact-item">
            <i class="el-icon-phone"></i>
            <span>{{ resumeData.basicInfo.phone }}</span>
          </div>
        </div>
      </div>

      <div class="modern-body">
        <div class="modern-main">
          <!-- 个人简介 -->
          <div v-if="resumeData.basicInfo.summary" class="modern-section">
            <h3 class="modern-section-title">关于我</h3>
            <p class="modern-summary">{{ resumeData.basicInfo.summary }}</p>
          </div>

          <!-- 工作经历 -->
          <div v-if="resumeData.workExperience && resumeData.workExperience.length > 0" class="modern-section">
            <h3 class="modern-section-title">工作经历</h3>
            <div v-for="(work, index) in resumeData.workExperience" :key="'work-m-'+index" class="modern-experience">
              <div class="modern-experience-header">
                <div class="modern-experience-title">
                  <h4>{{ work.position }}</h4>
                  <h5>{{ work.company }}</h5>
                </div>
                <div class="modern-experience-date" v-if="work.timeRange">
                  {{ formatDateRange(work.timeRange) }}
                </div>
              </div>
              <p class="modern-experience-description">{{ work.description }}</p>
            </div>
          </div>

          <!-- 教育经历 -->
          <div v-if="resumeData.education && resumeData.education.length > 0" class="modern-section">
            <h3 class="modern-section-title">教育经历</h3>
            <div v-for="(edu, index) in resumeData.education" :key="'edu-m-'+index" class="modern-experience">
              <div class="modern-experience-header">
                <div class="modern-experience-title">
                  <h4>{{ edu.degree }} · {{ edu.major }}</h4>
                  <h5>{{ edu.school }}</h5>
                </div>
                <div class="modern-experience-date" v-if="edu.timeRange">
                  {{ formatDateRange(edu.timeRange) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modern-sidebar">
          <!-- 技能 -->
          <div v-if="resumeData.skills && resumeData.skills.length > 0" class="modern-section">
            <h3 class="modern-section-title">技能</h3>
            <div class="modern-skills">
              <div v-for="(skill, index) in resumeData.skills" :key="'skill-m-'+index" class="modern-skill">
                <span class="modern-skill-name">{{ skill.name }}</span>
                <div class="modern-skill-level">
                  <div class="modern-skill-dot" 
                       v-for="n in 5" 
                       :key="n" 
                       :class="{ active: n <= skill.level }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创意模板 -->
    <div v-if="template === 'creative'" class="template-creative">
      <div class="creative-sidebar">
        <div class="creative-photo">
          <!-- 照片占位符 -->
          <div class="photo-placeholder">
            <i class="el-icon-user"></i>
          </div>
        </div>
        
        <div class="creative-name">
          <h1>{{ resumeData.basicInfo.name }}</h1>
          <h2>{{ resumeData.basicInfo.position }}</h2>
        </div>
        
        <div class="creative-contact">
          <div v-if="resumeData.basicInfo.gender || resumeData.basicInfo.age" class="creative-contact-item">
            <i class="el-icon-user"></i>
            <span>
              {{ resumeData.basicInfo.gender }}
              <span v-if="resumeData.basicInfo.gender && resumeData.basicInfo.age"> · </span>
              {{ resumeData.basicInfo.age }}岁
            </span>
          </div>
          <div v-if="resumeData.basicInfo.email" class="creative-contact-item">
            <i class="el-icon-message"></i>
            <span class="email-text">{{ resumeData.basicInfo.email }}</span>
          </div>
          <div v-if="resumeData.basicInfo.phone" class="creative-contact-item">
            <i class="el-icon-phone"></i>
            <span>{{ resumeData.basicInfo.phone }}</span>
          </div>
        </div>
        
        <!-- 技能 -->
        <div v-if="resumeData.skills && resumeData.skills.length > 0" class="creative-skills">
          <h3 class="creative-section-title">技能</h3>
          <div v-for="(skill, index) in resumeData.skills" :key="'skill-c-'+index" class="creative-skill">
            <span class="creative-skill-name">{{ skill.name }}</span>
            <div class="creative-skill-bar">
              <div class="creative-skill-fill" :style="{ width: (skill.level * 20) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="creative-main">
        <!-- 个人简介 -->
        <div v-if="resumeData.basicInfo.summary" class="creative-section">
          <div class="creative-section-header">
            <i class="el-icon-user-solid"></i>
            <h3>关于我</h3>
          </div>
          <div class="creative-section-content">
            <p>{{ resumeData.basicInfo.summary }}</p>
          </div>
        </div>
        
        <!-- 工作经历 -->
        <div v-if="resumeData.workExperience && resumeData.workExperience.length > 0" class="creative-section">
          <div class="creative-section-header">
            <i class="el-icon-office-building"></i>
            <h3>工作经历</h3>
          </div>
          <div class="creative-section-content">
            <div class="creative-timeline">
              <div v-for="(work, index) in resumeData.workExperience" :key="'work-c-'+index" class="creative-timeline-item">
                <div class="creative-timeline-dot"></div>
                <div class="creative-timeline-content">
                  <h4>{{ work.position }}</h4>
                  <h5>{{ work.company }}</h5>
                  <div class="creative-date" v-if="work.timeRange">{{ formatDateRange(work.timeRange) }}</div>
                  <p class="creative-description">{{ work.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 教育经历 -->
        <div v-if="resumeData.education && resumeData.education.length > 0" class="creative-section">
          <div class="creative-section-header">
            <i class="el-icon-reading"></i>
            <h3>教育经历</h3>
          </div>
          <div class="creative-section-content">
            <div class="creative-timeline">
              <div v-for="(edu, index) in resumeData.education" :key="'edu-c-'+index" class="creative-timeline-item">
                <div class="creative-timeline-dot"></div>
                <div class="creative-timeline-content">
                  <h4>{{ edu.degree }} · {{ edu.major }}</h4>
                  <h5>{{ edu.school }}</h5>
                  <div class="creative-date" v-if="edu.timeRange">{{ formatDateRange(edu.timeRange) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 打印按钮 -->
    <div class="print-actions no-print">
      <el-button type="primary" @click="printResume">打印简历</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumePrint",
  props: {
    resumeData: {
      type: Object,
      required: true
    },
    template: {
      type: String,
      default: "classic"
    }
  },
  methods: {
    formatDateRange(dateRange) {
      if (!dateRange || !Array.isArray(dateRange)) return '';
      
      const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      };
      
      return `${formatDate(dateRange[0])} 至 ${formatDate(dateRange[1])}`;
    },
    printResume() {
      window.print();
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.resume-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  color: #333;
}

.print-actions {
  margin-top: 30px;
  text-align: center;
}

/* 经典模板样式 */
.template-classic .resume-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 20px;
}

.template-classic .resume-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50;
}

.template-classic .resume-position {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.template-classic .resume-contact {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.template-classic .resume-contact p {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.template-classic .resume-contact i {
  margin-right: 5px;
  color: #3498db;
}

.template-classic .resume-section {
  margin-bottom: 25px;
}

.template-classic .section-title {
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.template-classic .experience-item {
  margin-bottom: 20px;
}

.template-classic .item-header h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #34495e;
}

.template-classic .item-header h4 {
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.template-classic .time-range {
  font-size: 14px;
  color: #95a5a6;
  margin-bottom: 10px;
}

.template-classic .item-description {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
}

.template-classic .skills-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.template-classic .skill-item {
  width: 45%;
  margin-bottom: 10px;
}

.template-classic .skill-name {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.template-classic .skill-level {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.template-classic .skill-bar {
  height: 100%;
  background-color: #3498db;
}

/* 现代模板样式 */
.template-modern {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.template-modern .modern-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 3px solid #2980b9;
}

.template-modern .modern-name-title h1 {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.template-modern .modern-separator {
  width: 50px;
  height: 3px;
  background-color: #3498db;
  margin-bottom: 10px;
}

.template-modern .modern-name-title h2 {
  font-size: 18px;
  color: #7f8c8d;
  font-weight: 400;
}

.template-modern .modern-contact {
  text-align: right;
}

.template-modern .contact-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.template-modern .contact-item i {
  color: #3498db;
  margin-right: 8px;
}

.template-modern .modern-body {
  display: flex;
  gap: 30px;
}

.template-modern .modern-main {
  flex: 3;
}

.template-modern .modern-sidebar {
  flex: 1;
}

.template-modern .modern-section {
  margin-bottom: 30px;
}

.template-modern .modern-section-title {
  font-size: 20px;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 8px;
}

.template-modern .modern-section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #3498db;
}

.template-modern .modern-summary {
  line-height: 1.6;
}

.template-modern .modern-experience {
  margin-bottom: 20px;
}

.template-modern .modern-experience-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.template-modern .modern-experience-title h4 {
  font-size: 18px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 3px;
}

.template-modern .modern-experience-title h5 {
  font-size: 16px;
  color: #7f8c8d;
  font-weight: 400;
}

.template-modern .modern-experience-date {
  color: #95a5a6;
  font-size: 14px;
}

.template-modern .modern-experience-description {
  line-height: 1.6;
  font-size: 14px;
}

.template-modern .modern-skills {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-modern .modern-skill {
  margin-bottom: 8px;
}

.template-modern .modern-skill-name {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.template-modern .modern-skill-level {
  display: flex;
  gap: 4px;
}

.template-modern .modern-skill-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ecf0f1;
}

.template-modern .modern-skill-dot.active {
  background-color: #3498db;
}

/* 创意模板样式 */
.template-creative {
  display: flex;
  font-family: 'Montserrat', sans-serif;
  color: #333;
  background-color: #fff;
}

.template-creative .creative-sidebar {
  width: 35%;
  background-color: #2c3e50;
  color: #fff;
  padding: 30px 20px;
}

.template-creative .creative-main {
  width: 65%;
  padding: 30px;
}

.template-creative .creative-photo {
  text-align: center;
  margin-bottom: 20px;
}

.template-creative .photo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #34495e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.template-creative .photo-placeholder i {
  font-size: 50px;
  color: #ecf0f1;
}

.template-creative .creative-name {
  text-align: center;
  margin-bottom: 30px;
}

.template-creative .creative-name h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #ecf0f1;
}

.template-creative .creative-name h2 {
  font-size: 16px;
  font-weight: 400;
  color: #bdc3c7;
}

.template-creative .creative-contact {
  margin-bottom: 30px;
  padding: 0 5px;
}

.template-creative .creative-contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  word-break: break-all;
}

.template-creative .creative-contact-item i {
  width: 25px;
  min-width: 25px;
  color: #3498db;
  margin-right: 10px;
  margin-top: 3px;
}

.template-creative .creative-contact-item span {
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-size: 0.85em;
  line-height: 1.4;
  max-width: calc(100% - 35px);
}

.template-creative .email-text {
  word-break: break-word;
  hyphens: auto;
}

.template-creative .creative-skills {
  margin-top: 30px;
}

.template-creative .creative-section-title {
  font-size: 18px;
  color: #ecf0f1;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 8px;
  text-transform: uppercase;
  font-weight: 600;
}

.template-creative .creative-section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #3498db;
}

.template-creative .creative-skill {
  margin-bottom: 15px;
}

.template-creative .creative-skill-name {
  display: block;
  margin-bottom: 5px;
  font-weight: 400;
}

.template-creative .creative-skill-bar {
  height: 6px;
  background-color: #34495e;
  border-radius: 3px;
  overflow: hidden;
}

.template-creative .creative-skill-fill {
  height: 100%;
  background-color: #3498db;
}

.template-creative .creative-section {
  margin-bottom: 40px;
}

.template-creative .creative-section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.template-creative .creative-section-header i {
  font-size: 22px;
  color: #3498db;
  margin-right: 10px;
}

.template-creative .creative-section-header h3 {
  font-size: 20px;
  color: #2c3e50;
  text-transform: uppercase;
  font-weight: 600;
}

.template-creative .creative-section-content {
  line-height: 1.6;
  color: #555;
}

.template-creative .creative-timeline {
  position: relative;
}

.template-creative .creative-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px;
  width: 2px;
  background-color: #e0e0e0;
}

.template-creative .creative-timeline-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;
}

.template-creative .creative-timeline-dot {
  position: absolute;
  top: 5px;
  left: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #3498db;
  border: 2px solid #fff;
  z-index: 1;
}

.template-creative .creative-timeline-content h4 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.template-creative .creative-timeline-content h5 {
  font-size: 16px;
  font-weight: 400;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.template-creative .creative-date {
  font-size: 14px;
  color: #95a5a6;
  margin-bottom: 10px;
}

.template-creative .creative-description {
  font-size: 14px;
  line-height: 1.6;
}

/* 打印样式 */
@media print {
  .print-actions,
  .no-print {
    display: none !important;
  }
  
  body {
    background-color: #fff;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .resume-container {
    box-shadow: none;
    margin: 0;
    padding: 0;
    page-break-inside: avoid;
    page-break-after: auto;
    max-width: 100%;
  }
  
  /* 针对不同模板的打印优化 */
  .template-creative .creative-sidebar {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background-color: #2c3e50 !important;
    color: #fff !important;
  }
  
  .template-creative .creative-timeline::before,
  .template-creative .creative-timeline-dot,
  .template-modern .modern-separator,
  .template-modern .modern-section-title::after,
  .template-creative .creative-section-title::after,
  .template-creative .creative-skill-fill,
  .template-classic .skill-bar {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .template-modern .modern-header {
    break-after: avoid;
  }
  
  /* 确保颜色在打印中保持 */
  .template-creative .creative-section-header i,
  .template-creative .creative-contact-item i,
  .template-modern .contact-item i,
  .template-modern .modern-skill-dot.active,
  .template-classic .resume-contact i {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color: #3498db !important;
  }
}
</style> 