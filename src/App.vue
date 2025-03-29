<template>
  <div id="app" class="app-container" :class="{ 'dark-mode': darkMode }">
    <!-- 添加开屏动画 -->
    <div class="splash-screen" v-if="showSplash">
      <div class="splash-icon-container">
        <div class="splash-icon">
          <i class="el-icon-document"></i>
        </div>
        <div class="splash-glow"></div>
      </div>
      <div class="splash-title">简历生成器</div>
    </div>

    <div class="background-effect">
      <!-- 背景中保留的图标 -->
      <div class="background-icon" v-if="!showSplash">
        <div class="icon-glow"></div>
      </div>

      <!-- 左侧装饰线 -->
      <div class="decorative-lines left-lines" v-if="!showSplash">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
        <div class="line line-4"></div>
        <div class="line line-5"></div>
      </div>

      <!-- 右侧装饰线 -->
      <div class="decorative-lines right-lines" v-if="!showSplash">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
        <div class="line line-4"></div>
        <div class="line line-5"></div>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <div class="back-to-top" @click="backToTop" v-show="showBackToTop">
      <i class="el-icon-arrow-up"></i>
    </div>

    <!-- 导航栏 -->
    <nav class="modern-navbar">
      <div class="container">
        <div class="navbar-brand">
          <i class="el-icon-document resume-icon"></i>
          <span>Resume Builder</span>
        </div>
        
        <!-- 添加侧边导航栏 -->
        <div class="sidebar-nav">
          <div class="nav-item" @click="scrollToSection('preview-section')">
            <i class="el-icon-view"></i>
            <span>简历预览</span>
          </div>
          <div class="nav-item" @click="scrollToSection('ai-enhance-section')">
            <i class="el-icon-edit"></i>
            <span>AI润色</span>
          </div>
          <div class="nav-item" @click="scrollToSection('job-sites-section')">
            <i class="el-icon-position"></i>
            <span>投放简历</span>
          </div>
          <div class="nav-item" @click="scrollToSection('score-card-section')">
            <i class="el-icon-data-analysis"></i>
            <span>简历评分</span>
          </div>
        </div>
        
        <div class="navbar-actions">
          <a
            href="javascript:void(0)"
            title="深色/浅色模式"
            class="navbar-action"
            @click="toggleDarkMode"
          >
            <i :class="darkMode ? 'el-icon-sunny' : 'el-icon-moon'"></i>
          </a>
          <a href="javascript:void(0)" title="帮助" class="navbar-action">
            <i class="el-icon-question"></i>
          </a>
          <a href="javascript:void(0)" title="设置" class="navbar-action">
            <i class="el-icon-setting"></i>
          </a>
        </div>
      </div>
    </nav>

    <div class="col-md-10 offset-md-1 content-wrapper">
      <div class="text-center mb-5">
        <h1 class="main-title">
          <span class="gradient-text">简历自动生成系统</span>
        </h1>
        <p class="subtitle">轻松创建专业简历，展现你的职业魅力</p>
        <div class="buttons-container">
          <el-button
            type="primary"
            class="action-button"
            @click="generateResume"
          >
            <i class="el-icon-view"></i> 生成简历
          </el-button>
          <el-button
            type="warning"
            class="action-button"
            @click="openInfoDialog"
          >
            <i class="el-icon-edit"></i> 编辑个人信息
          </el-button>
          <el-button
            type="info"
            class="action-button"
            @click="openTemplateDialog"
          >
            <i class="el-icon-picture-outline"></i> 选择模板
          </el-button>
        </div>
      </div>

      <!-- 简历预览 -->
      <div v-if="showResume" id="preview-section" class="resume-preview mt-4">
        <div class="preview-header">
          <span class="preview-title">简历预览</span>
          <el-button size="small" type="primary" plain @click="printResume">
            <i class="el-icon-printer"></i> 打印
          </el-button>
        </div>
        <ResumePrint :resumeData="resumeData" :template="selectedTemplate" />
      </div>

      <!-- AI润色与扩写卡片 -->
      <el-card
        v-if="showResume"
        id="ai-enhance-section"
        class="mt-4 ai-enhance-card no-print"
      >
        <div slot="header" class="clearfix">
          <span class="font-weight-bold">想试试AI润色并且扩写简历？</span>
          <el-tooltip content="利用AI技术优化简历内容" placement="top">
            <i class="el-icon-question ml-2"></i>
          </el-tooltip>
        </div>
        <div class="p-3">
          <div class="ai-enhance-content">
            <div class="mb-3">
              <p>智能简历润色与扩写助手可以帮助您：</p>
              <ul>
                <li>优化简历语言表达，使其更专业、更吸引人</li>
                <li>根据职位需求扩展简历内容，突出相关技能和经验</li>
                <li>改进简历结构，提高可读性和传达效率</li>
                <li>智能分析并提供专业化建议，提升简历竞争力</li>
              </ul>
            </div>
            <div class="text-center">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openAIEnhancer"
                class="enhance-btn"
              >
                使用AI润色与扩写
              </el-button>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 招聘网站卡片 -->
      <el-card
        v-if="showResume"
        id="job-sites-section"
        class="mt-4 job-sites-card no-print"
      >
        <div slot="header" class="clearfix">
          <span class="font-weight-bold job-sites-title">现在动手，投放简历！</span>
          <el-tooltip content="前往主流招聘网站投递简历" placement="top">
            <i class="el-icon-question ml-2"></i>
          </el-tooltip>
        </div>
        <div class="p-3">
          <div class="job-sites-content">
            <div class="mb-3">
              <p>精选国内主流招聘网站，助您快速找到理想工作：</p>
            </div>
            <div class="job-sites-grid">
              <el-tooltip
                content="国内老牌综合性招聘平台，覆盖全行业职位，提供简历优化、线上招聘会等服务，适合白领及专业人士。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.zhaopin.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>智联招聘</span>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="职位分类清晰，搜索功能强大，支持职业规划指导和行业资讯，尤其适合中高端岗位求职者。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.51job.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>前程无忧</span>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="以直接对话老板为特色，沟通效率高，覆盖互联网、科技等行业，适合年轻求职者和新兴领域人才。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.zhipin.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>BOSS直聘</span>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="专注于中高端人才招聘，提供猎头服务和行业论坛，适合高管、技术专家等职业人群。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.liepin.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>猎聘网</span>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="聚焦互联网行业，涵盖技术、产品、设计等岗位，社区功能丰富，适合互联网从业者。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.lagou.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>拉勾网</span>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="专注蓝领招聘，覆盖建筑、物流、家政等领域，提供实时岗位更新和工资保障服务。"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  @click="openJobSite('https://www.yupao.com')"
                  class="job-site-btn"
                >
                  <i class="el-icon-position"></i> <span>鱼泡网</span>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 简历评分卡片 -->
      <!-- 简历评分卡片 -->
      <div v-if="showResume" class="score-card mt-4 no-print">
        <div class="score-header">
          <h3 class="score-title">简历评分</h3>
          <el-tooltip
            content="根据简历完整度和内容质量自动评分"
            placement="top"
          >
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <div class="score-content">
          <div class="score-main">
            <div class="score-circle">
              <el-progress
                type="circle"
                :percentage="resumeScore.total"
                :color="getScoreColor(resumeScore.total)"
                :stroke-width="10"
                :width="120"
              >
                <template #default="{ percentage }">
                  <div class="score-text">
                    <span class="score-number">{{ percentage }}</span>
                    <span class="score-label">分</span>
                  </div>
                </template>
              </el-progress>
            </div>
            <div class="score-details">
              <div class="detail-item">
                <span class="detail-label">基本信息</span>
                <el-progress
                  :percentage="resumeScore.details.basicInfo * 4"
                  :color="getScoreColor(resumeScore.details.basicInfo * 4)"
                  :show-text="false"
                  :stroke-width="8"
                  :width="120"
                >
                </el-progress>
                <span class="detail-score"
                  >{{ resumeScore.details.basicInfo }}/25</span
                >
              </div>
              <div class="detail-item">
                <span class="detail-label">教育经历</span>
                <el-progress
                  :percentage="resumeScore.details.education * 4"
                  :color="getScoreColor(resumeScore.details.education * 4)"
                  :show-text="false"
                  :stroke-width="8"
                  :width="120"
                >
                </el-progress>
                <span class="detail-score"
                  >{{ resumeScore.details.education }}/25</span
                >
              </div>
              <div class="detail-item">
                <span class="detail-label">工作经历</span>
                <el-progress
                  :percentage="resumeScore.details.workExperience * 4"
                  :color="getScoreColor(resumeScore.details.workExperience * 4)"
                  :show-text="false"
                  :stroke-width="8"
                  :width="120"
                >
                </el-progress>
                <span class="detail-score"
                  >{{ resumeScore.details.workExperience }}/25</span
                >
              </div>
              <div class="detail-item">
                <span class="detail-label">技能</span>
                <el-progress
                  :percentage="resumeScore.details.skills * 4"
                  :color="getScoreColor(resumeScore.details.skills * 4)"
                  :show-text="false"
                  :stroke-width="8"
                  :width="120"
                >
                </el-progress>
                <span class="detail-score"
                  >{{ resumeScore.details.skills }}/25</span
                >
              </div>
            </div>
          </div>
          <div class="analysis-section">
            <div class="industry-analysis">
              <h4>行业竞争力分析</h4>
              <div class="analysis-content">
                <div
                  v-for="(item, index) in industryAnalysisData"
                  :key="index"
                  class="analysis-item"
                >
                  <div class="analysis-label">{{ item.name }}</div>
                  <el-progress
                    :percentage="item.value"
                    :color="getScoreColor(item.value)"
                    :stroke-width="10"
                    :show-text="true"
                  >
                  </el-progress>
                </div>
              </div>
            </div>
            <div class="career-path">
              <h4>职业发展路径</h4>
              <div class="career-path-content">
                <div class="career-steps">
                  <div
                    v-for="(item, index) in careerPathData"
                    :key="index"
                    class="career-step"
                  >
                    <div
                      class="step-dot"
                      :class="{
                        active:
                          item.value <=
                          careerPathData[getCurrentCareerLevel()].value,
                      }"
                    ></div>
                    <div class="step-label">{{ item.name }}</div>
                    <div class="step-value">{{ item.value }}%</div>
                  </div>
                </div>
                <div class="current-position">
                  当前发展阶段：{{
                    careerPathData[getCurrentCareerLevel()].name
                  }}
                  <div class="position-progress">
                    <el-progress
                      :percentage="
                        careerPathData[getCurrentCareerLevel()].value
                      "
                      :color="'#3498db'"
                      :stroke-width="8"
                    >
                    </el-progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="resumeScore.suggestions.length > 0"
            class="score-suggestions"
          >
            <h4>优化建议</h4>
            <ul>
              <li
                v-for="(suggestion, index) in resumeScore.suggestions"
                :key="index"
              >
                <i class="el-icon-warning-outline"></i>
                {{ suggestion }}
              </li>
            </ul>
          </div>
          <div class="score-criteria">
            <h4>评分标准说明</h4>
            <div class="criteria-grid">
              <div class="criteria-section">
                <h5>基本信息 (25分)</h5>
                <ul>
                  <li>姓名 (5分)</li>
                  <li>性别 (5分)</li>
                  <li>年龄 (5分)</li>
                  <li>职位 (5分)</li>
                  <li>邮箱 (5分)</li>
                  <li>电话 (5分)</li>
                  <li>个人简介 (5分，需50字以上)</li>
                </ul>
              </div>
              <div class="criteria-section">
                <h5>教育经历 (25分)</h5>
                <ul>
                  <li>学校名称 (5分)</li>
                  <li>学位 (5分)</li>
                  <li>专业 (5分)</li>
                  <li>起止时间 (5分)</li>
                  <li>多个教育经历可累计</li>
                </ul>
              </div>
              <div class="criteria-section">
                <h5>工作经历 (25分)</h5>
                <ul>
                  <li>公司名称 (5分)</li>
                  <li>职位名称 (5分)</li>
                  <li>工作描述 (5分，需50字以上)</li>
                  <li>起止时间 (5分)</li>
                  <li>多个工作经历可累计</li>
                </ul>
              </div>
              <div class="criteria-section">
                <h5>技能评分 (25分)</h5>
                <ul>
                  <li>技能名称 (5分)</li>
                  <li>熟练度3星以上 (5分)</li>
                  <li>多个技能可累计</li>
                  <li>根据职位推荐必要技能</li>
                </ul>
              </div>
            </div>
          </div>
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
              <el-form-item label="性别">
                <el-radio-group v-model="resumeData.basicInfo.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                  <el-radio label="其他">其他</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input-number
                  v-model="resumeData.basicInfo.age"
                  :min="16"
                  :max="100"
                ></el-input-number>
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
                <el-input
                  type="textarea"
                  v-model="resumeData.basicInfo.summary"
                  rows="4"
                ></el-input>
              </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="教育经历">
              <div
                v-for="(edu, index) in resumeData.education"
                :key="'edu-' + index"
                class="mb-3"
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h4>教育经历 #{{ index + 1 }}</h4>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="removeEducation(index)"
                    >删除</el-button
                  >
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
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <el-button type="primary" @click="addEducation"
                >添加教育经历</el-button
              >
            </el-tab-pane>

            <el-tab-pane label="工作经历">
              <div
                v-for="(work, index) in resumeData.workExperience"
                :key="'work-' + index"
                class="mb-3"
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h4>工作经历 #{{ index + 1 }}</h4>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="removeWorkExperience(index)"
                    >删除</el-button
                  >
                </div>
                <el-form-item label="公司名称">
                  <el-input v-model="work.company"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                  <el-input v-model="work.position"></el-input>
                </el-form-item>
                <el-form-item label="工作描述">
                  <el-input
                    type="textarea"
                    v-model="work.description"
                    rows="4"
                  ></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="work.timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <el-button type="primary" @click="addWorkExperience"
                >添加工作经历</el-button
              >
            </el-tab-pane>

            <el-tab-pane label="技能">
              <div
                v-for="(skill, index) in resumeData.skills"
                :key="'skill-' + index"
                class="mb-3"
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h4>技能 #{{ index + 1 }}</h4>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="removeSkill(index)"
                    >删除</el-button
                  >
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
            :class="{ active: selectedTemplate === template.id }"
            @click="selectTemplate(template.id)"
          >
            <div class="template-preview">
              <img
                :src="template.preview"
                :alt="template.name"
                class="template-image"
              />
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
    ResumePrint,
  },
  data() {
    return {
      dialogVisible: false,
      templateDialogVisible: false,
      showResume: false,
      selectedTemplate: "creative",
      darkMode: false,
      showSplash: true,
      showBackToTop: false,
      resumeScore: {
        total: 0,
        details: {
          basicInfo: 0,
          education: 0,
          workExperience: 0,
          skills: 0,
        },
        suggestions: [],
      },
      templates: [
        {
          id: "classic",
          name: "经典简历",
          description: "简洁大方的经典风格",
          preview: require("./assets/images/classic-template.jpg"),
        },
        {
          id: "creative",
          name: "创意简历",
          description: "富有创意的个性化简历",
          preview: require("./assets/images/creative-template.jpg"),
        },
        {
          id: "modern",
          name: "现代简历",
          description: "时尚现代的设计风格",
          preview: require("./assets/images/modern-template.jpg"),
        },
      ],
      resumeData: {
        basicInfo: {
          name: "张三",
          gender: "男",
          age: 28,
          position: "前端开发工程师",
          email: "zhangsan@email.com",
          phone: "13800138000",
          summary:
            "拥有5年前端开发经验，精通HTML、CSS、JavaScript，熟悉Vue、React等前端框架，对用户体验和界面设计有深入了解。",
        },
        education: [
          {
            school: "XX大学",
            degree: "本科",
            major: "计算机科学与技术",
            timeRange: [new Date(2014, 8, 1), new Date(2018, 6, 1)],
          },
        ],
        workExperience: [
          {
            company: "XX科技有限公司",
            position: "前端开发工程师",
            description:
              "负责公司核心产品的前端开发工作，实现了多个关键功能模块；优化了网站性能，提升了用户体验；参与了多个项目的技术选型和架构设计。",
            timeRange: [new Date(2018, 7, 1), new Date(2023, 6, 1)],
          },
        ],
        skills: [
          {
            name: "JavaScript",
            level: 5,
          },
          {
            name: "Vue.js",
            level: 4,
          },
          {
            name: "HTML/CSS",
            level: 5,
          },
          {
            name: "React",
            level: 3,
          },
        ],
      },
      industryAnalysisData: [
        { name: "学历水平", value: 70 },
        { name: "工作经验", value: 80 },
        { name: "技能储备", value: 90 },
        { name: "专业相关度", value: 70 },
        { name: "职位匹配度", value: 75 },
      ],
      careerPathData: [
        { name: "初级", value: 20 },
        { name: "中级", value: 50 },
        { name: "高级", value: 80 },
        { name: "专家", value: 100 },
      ],
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
    calculateIndustryAnalysis() {
      // 计算学历水平分数
      let educationScore = 0;
      this.resumeData.education.forEach((edu) => {
        if (edu.degree) {
          switch (edu.degree.toLowerCase()) {
            case "博士":
              educationScore = 100;
              break;
            case "硕士":
              educationScore = 85;
              break;
            case "本科":
              educationScore = 70;
              break;
            case "大专":
              educationScore = 55;
              break;
            default:
              educationScore = 40;
          }
        }
      });

      // 计算工作经验分数
      const workExperience = this.resumeData.workExperience.length;
      const workScore = Math.min(workExperience * 25, 100);

      // 计算技能储备分数
      const skills = this.resumeData.skills.length;
      const skillScore = Math.min(skills * 20, 100);

      // 计算专业相关度
      let majorScore = 70; // 默认相关度

      // 计算职位匹配度
      let positionScore = 75; // 默认匹配度

      // 更新分析数据
      this.industryAnalysisData = [
        { name: "学历水平", value: educationScore },
        { name: "工作经验", value: workScore },
        { name: "技能储备", value: skillScore },
        { name: "专业相关度", value: majorScore },
        { name: "职位匹配度", value: positionScore },
      ];
    },
    calculateResumeScore() {
      const score = {
        total: 0,
        details: {
          basicInfo: 0,
          education: 0,
          workExperience: 0,
          skills: 0,
        },
        suggestions: [],
      };

      // 基本信息评分 (25分)
      const basicInfo = this.resumeData.basicInfo;
      if (basicInfo.name) score.details.basicInfo += 5;
      if (basicInfo.gender) score.details.basicInfo += 5;
      if (basicInfo.age) score.details.basicInfo += 5;
      if (basicInfo.position) score.details.basicInfo += 5;
      if (basicInfo.email) score.details.basicInfo += 5;
      if (basicInfo.phone) score.details.basicInfo += 5;
      if (basicInfo.summary && basicInfo.summary.length > 50)
        score.details.basicInfo += 5;

      if (score.details.basicInfo < 25) {
        score.suggestions.push(
          "完善基本信息，包括姓名、性别、年龄、职位、联系方式和个人简介"
        );
      }

      // 教育经历评分 (25分)
      const education = this.resumeData.education;
      if (education && education.length > 0) {
        education.forEach((edu) => {
          if (edu.school) score.details.education += 5;
          if (edu.degree) score.details.education += 5;
          if (edu.major) score.details.education += 5;
          if (edu.timeRange) score.details.education += 5;
        });
        score.details.education = Math.min(score.details.education, 25);
      } else {
        score.suggestions.push("添加教育经历信息");
      }

      // 工作经历评分 (25分)
      const workExperience = this.resumeData.workExperience;
      if (workExperience && workExperience.length > 0) {
        workExperience.forEach((work) => {
          if (work.company) score.details.workExperience += 5;
          if (work.position) score.details.workExperience += 5;
          if (work.description && work.description.length > 50)
            score.details.workExperience += 5;
          if (work.timeRange) score.details.workExperience += 5;
        });
        score.details.workExperience = Math.min(
          score.details.workExperience,
          25
        );
      } else {
        score.suggestions.push("添加工作经历信息");
      }

      // 技能评分 (25分)
      const skills = this.resumeData.skills;
      if (skills && skills.length > 0) {
        skills.forEach((skill) => {
          if (skill.name) score.details.skills += 5;
          if (skill.level >= 3) score.details.skills += 5;
        });
        score.details.skills = Math.min(score.details.skills, 25);
      } else {
        score.suggestions.push("添加技能信息");
      }

      // 计算总分
      score.total = Object.values(score.details).reduce((a, b) => a + b, 0);

      // 根据职位类型添加技能建议
      const position = basicInfo.position
        ? basicInfo.position.toLowerCase()
        : "";
      if (position.includes("前端") || position.includes("frontend")) {
        if (!skills.some((s) => s.name.toLowerCase().includes("javascript"))) {
          score.suggestions.push("建议添加JavaScript相关技能");
        }
        if (
          !skills.some(
            (s) =>
              s.name.toLowerCase().includes("vue") ||
              s.name.toLowerCase().includes("react")
          )
        ) {
          score.suggestions.push("建议添加Vue.js或React等前端框架技能");
        }
      } else if (position.includes("后端") || position.includes("backend")) {
        if (
          !skills.some(
            (s) =>
              s.name.toLowerCase().includes("java") ||
              s.name.toLowerCase().includes("python")
          )
        ) {
          score.suggestions.push("建议添加Java或Python等后端开发技能");
        }
      }

      this.resumeScore = score;

      // 计算行业竞争力分析
      this.calculateIndustryAnalysis();

      // 更新职业发展路径
      const major = this.resumeData.education[0]?.major || "未填写专业";
      this.careerPathData = [
        { name: "初级", value: 20 },
        { name: "中级", value: 50 },
        { name: "高级", value: 80 },
        { name: "专家", value: 100 },
      ];
    },
    saveResumeData() {
      // 保存数据到本地存储
      const savedData = {
        resumeData: this.resumeData,
        selectedTemplate: this.selectedTemplate,
      };
      localStorage.setItem("resumeData", JSON.stringify(savedData));

      // 更新评分
      this.calculateResumeScore();

      this.$message({
        message: "简历数据已保存",
        type: "success",
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
        timeRange: "",
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
        timeRange: "",
      });
    },
    removeWorkExperience(index) {
      this.resumeData.workExperience.splice(index, 1);
    },
    addSkill() {
      this.resumeData.skills.push({
        name: "",
        level: 3,
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
        selectedTemplate: this.selectedTemplate,
      };
      localStorage.setItem("resumeData", JSON.stringify(savedData));
      this.$message({
        message: "模板已应用，数据已保存",
        type: "success",
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
      document.body.style.overflow = "hidden";
    },
    // Dialog关闭后恢复滚动
    handleDialogClose() {
      document.body.style.overflow = "";
      document.body.classList.remove("el-popup-parent--hidden");
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
    },
    // 获取评分颜色
    getScoreColor(score) {
      if (score >= 80) return "#67C23A";
      if (score >= 60) return "#E6A23C";
      return "#F56C6C";
    },
    getCurrentCareerLevel() {
      // 这里应该实现一个逻辑来确定当前的发展阶段
      // 例如，可以根据工作经验的长度来判断
      return Math.min(this.resumeData.workExperience.length - 1, 3);
    },
    openAIEnhancer() {
      window.open(
        "https://2407963972.github.io/xinghuo-main/dist/index",
        "_blank"
      );
    },
    openJobSite(url) {
      window.open(url, "_blank");
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // 计算元素距离顶部的偏移量
        const headerOffset = 80; // 导航栏高度
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // 使用window.scrollTo实现平滑滚动
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    handleScroll() {
      // 当滚动位置超过200px时显示回到顶部按钮
      this.showBackToTop = window.pageYOffset > 200;
    },
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

    // 初始化评分
    this.calculateResumeScore();

    // 控制开屏动画
    setTimeout(() => {
      // 先添加发光效果
      const splashIcon = document.querySelector(".splash-icon");
      if (splashIcon) {
        splashIcon.classList.add("glow");
      }

      // 1秒后开始翻转动画
      setTimeout(() => {
        const splashIconContainer = document.querySelector(
          ".splash-icon-container"
        );
        if (splashIconContainer) {
          splashIconContainer.classList.add("flip");

          // 翻转后1秒开始淡出动画
          setTimeout(() => {
            splashIconContainer.classList.add("fade");
          }, 1000);
        }
      }, 1000);

      // 4秒后隐藏开屏动画，此时背景图标会显示
      setTimeout(() => {
        this.showSplash = false;
      }, 4000);
    }, 500);

    // 初始化滚动监听器
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    // 在组件挂载后立即执行一次滚动监听
    this.handleScroll();
  },
  beforeDestroy() {
    // 移除滚动监听器
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
/* 开屏动画样式 */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeOutSplash 0.5s ease-out 3.5s forwards;
}

.splash-icon-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.8s ease-out, opacity 1s ease-out;
}

.splash-icon-container.flip {
  transform: translateY(-50px) scaleX(-1);
}

.splash-icon-container.fade {
  transform: translateY(0px) scaleX(-1) scale(5);
  opacity: 0.15;
  transition: transform 1.5s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 1.5s ease-out;
}

.splash-icon {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transition: all 0.8s ease-out;
}

.splash-icon.glow {
  box-shadow: 0 0 30px rgba(52, 152, 219, 0.8), 0 0 50px rgba(155, 89, 182, 0.5);
}

.splash-icon i {
  font-size: 60px;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.splash-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 25px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  z-index: 1;
  animation: glowPulse 1.5s ease-in-out infinite alternate;
}

.splash-title {
  margin-top: 30px;
  font-size: 28px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeOutTitle 0.5s ease-out 2.5s forwards;
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
}

@keyframes fadeOutSplash {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes fadeOutTitle {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

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
  padding-top: 80px;
}

/* 导航栏样式 */
.modern-navbar {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
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
  background: linear-gradient(
    135deg,
    rgba(240, 248, 255, 0.8) 0%,
    rgba(245, 243, 255, 0.8) 100%
  );
  z-index: -2;
}

.background-effect::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(52, 152, 219, 0.1) 0%,
    rgba(52, 152, 219, 0) 70%
  );
  border-radius: 50%;
  animation: float 20s infinite alternate ease-in-out;
  z-index: -1;
}

.background-effect::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -30%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle,
    rgba(155, 89, 182, 0.1) 0%,
    rgba(155, 89, 182, 0) 70%
  );
  border-radius: 50%;
  animation: float 15s infinite alternate-reverse ease-in-out;
  z-index: -1;
}

/* 背景中保留的图标 */
.background-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='512' height='512'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgba(52, 152, 219, 0.4);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgba(155, 89, 182, 0.4);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23grad)' d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  opacity: 0;
  animation: fadeInBackground 1.5s ease-out forwards;
  filter: drop-shadow(0 0 30px rgba(52, 152, 219, 0.3));
  z-index: -1;
  pointer-events: none;
}

/* 装饰线样式 */
.decorative-lines {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90%;
  top: 5%;
  opacity: 0;
  animation: fadeInLines 0.5s ease-out forwards;
  z-index: 0;
}

.left-lines {
  left: 20px;
  animation-delay: 0.2s;
}

.right-lines {
  right: 20px;
  animation-delay: 0.4s;
}

.decorative-lines .line {
  background: linear-gradient(
    90deg,
    rgba(52, 152, 219, 0.8),
    rgba(155, 89, 182, 0.8)
  );
  height: 4px;
  border-radius: 2px;
  margin: 25px 0;
  box-shadow: 0 0 12px rgba(52, 152, 219, 0.6);
  transform-origin: left center;
}

.right-lines .line {
  background: linear-gradient(
    90deg,
    rgba(155, 89, 182, 0.8),
    rgba(52, 152, 219, 0.8)
  );
  transform-origin: right center;
}

/* 各条线的长度和动画延迟不同 */
.left-lines .line-1 {
  width: 120px;
  animation: slideLeftLine 1.2s ease-out forwards;
  animation-delay: 0.2s;
}

.left-lines .line-2 {
  width: 90px;
  animation: slideLeftLine 1s ease-out forwards;
  animation-delay: 0.3s;
}

.left-lines .line-3 {
  width: 150px;
  animation: slideLeftLine 1.4s ease-out forwards;
  animation-delay: 0.1s;
}

.left-lines .line-4 {
  width: 100px;
  animation: slideLeftLine 1.1s ease-out forwards;
  animation-delay: 0.4s;
}

.left-lines .line-5 {
  width: 110px;
  animation: slideLeftLine 1.3s ease-out forwards;
  animation-delay: 0.25s;
}

.right-lines .line-1 {
  width: 120px;
  animation: slideRightLine 1.2s ease-out forwards;
  animation-delay: 0.2s;
}

.right-lines .line-2 {
  width: 90px;
  animation: slideRightLine 1s ease-out forwards;
  animation-delay: 0.3s;
}

.right-lines .line-3 {
  width: 150px;
  animation: slideRightLine 1.4s ease-out forwards;
  animation-delay: 0.1s;
}

.right-lines .line-4 {
  width: 100px;
  animation: slideRightLine 1.1s ease-out forwards;
  animation-delay: 0.4s;
}

.right-lines .line-5 {
  width: 110px;
  animation: slideRightLine 1.3s ease-out forwards;
  animation-delay: 0.25s;
}

@keyframes fadeInLines {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideLeftLine {
  0% {
    transform: translateX(150px) scaleX(1.5);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateX(0) scaleX(1);
    opacity: 0.9;
  }
}

@keyframes slideRightLine {
  0% {
    transform: translateX(-150px) scaleX(1.5);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateX(0) scaleX(1);
    opacity: 0.9;
  }
}

/* 媒体查询调整线条长度 */
@media (max-width: 768px) {
  .left-lines .line,
  .right-lines .line {
    width: 60px !important;
  }
}

/* 黑暗模式下的线条样式 */
.dark-mode .decorative-lines .line {
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.6);
}

/* 图标光晕效果 */
.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(52, 152, 219, 0.08) 0%,
    rgba(155, 89, 182, 0.05) 60%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: -1;
  animation: pulseGlow 4s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.8;
  }
}

@keyframes fadeInBackground {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 0.65;
    transform: scale(1);
  }
}

/* 响应式调整背景图标 */
@media (max-width: 768px) {
  .background-icon {
    background-size: 120%;
  }

  .icon-glow {
    width: 100%;
    height: 100%;
  }
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
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent,
    #3498db,
    #9b59b6,
    #3498db,
    transparent
  );
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
  .no-print,
  .score-card {
    display: none !important;
  }

  .resume-preview {
    box-shadow: none;
    margin: 0;
    padding: 0;
    animation: none;
    border-radius: 0;
    max-width: 100%;
    background-color: white !important;
  }

  .resume-preview .resume-container {
    padding: 0;
    margin: 0;
    background-color: white !important;
  }

  .el-button,
  .text-center.mb-5,
  .main-title,
  .subtitle,
  .buttons-container {
    display: none !important;
  }

  .content-wrapper {
    padding: 0 !important;
    max-width: 100% !important;
    margin: 0 !important;
  }

  .col-md-10.offset-md-1 {
    max-width: 100% !important;
    margin-left: 0 !important;
    padding: 0 !important;
  }

  html,
  body {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background-color: white !important;
  }

  /* 确保深色模式下打印时背景为白色 */
  .dark-mode {
    background-color: white !important;
  }

  .dark-mode .resume-preview,
  .dark-mode .resume-container {
    background-color: white !important;
    color: #333 !important;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
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
  background: linear-gradient(
    135deg,
    rgba(25, 25, 35, 0.9) 0%,
    rgba(35, 35, 45, 0.9) 100%
  );
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
    background-color: white !important;
    color: #333 !important;
  }

  .dark-mode .resume-preview {
    background-color: white !important;
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

/* 评分卡片样式 */
.score-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  animation: slideUp 0.8s ease-out forwards;
}

.score-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.score-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  margin-right: 10px;
}

.score-header i {
  color: #909399;
  cursor: help;
}

.score-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.score-main {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.score-circle {
  flex-shrink: 0;
}

.score-text {
  text-align: center;
}

.score-number {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.score-label {
  font-size: 14px;
  color: #909399;
  margin-left: 4px;
}

.score-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.detail-label {
  width: 80px;
  color: #606266;
  font-size: 14px;
}

.detail-score {
  width: 45px;
  text-align: right;
  color: #606266;
  font-size: 14px;
}

.score-suggestions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.score-suggestions h4 {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.score-suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.score-suggestions li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  margin-bottom: 10px;
  font-size: 14px;
}

.score-suggestions i {
  color: #e6a23c;
}

/* 深色模式适配 */
.dark-mode .score-card {
  background: #2c2c2c;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.dark-mode .score-header {
  border-bottom-color: #3a3a3a;
}

.dark-mode .score-title {
  color: #ecf0f1;
}

.dark-mode .score-header i {
  color: #bdc3c7;
}

.dark-mode .score-number {
  color: #ecf0f1;
}

.dark-mode .score-label {
  color: #bdc3c7;
}

.dark-mode .detail-label,
.dark-mode .detail-score {
  color: #bdc3c7;
}

.dark-mode .score-suggestions {
  border-top-color: #3a3a3a;
}

.dark-mode .score-suggestions h4 {
  color: #ecf0f1;
}

.dark-mode .score-suggestions li {
  color: #bdc3c7;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .score-main {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .score-details {
    width: 100%;
  }

  .detail-item {
    flex-wrap: wrap;
  }

  .detail-label {
    width: 100%;
  }
}

/* 评分标准样式更新 */
.score-criteria {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #eee;
}

.score-criteria h4 {
  font-size: 16px;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.criteria-section {
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(238, 238, 238, 0.1);
}

.criteria-section h5 {
  font-size: 14px;
  color: #3498db;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.criteria-section h5::before {
  content: "";
  width: 4px;
  height: 14px;
  background: #3498db;
  border-radius: 2px;
}

.criteria-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.criteria-section li {
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 15px;
  position: relative;
}

.criteria-section li:last-child {
  margin-bottom: 0;
}

.criteria-section li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3498db;
  opacity: 0.6;
}

/* 深色模式适配 */
.dark-mode .score-criteria {
  background: rgba(255, 255, 255, 0.03);
  border-color: #3a3a3a;
}

.dark-mode .score-criteria h4 {
  color: #ecf0f1;
  border-bottom-color: #3a3a3a;
}

.dark-mode .criteria-section {
  border-color: rgba(255, 255, 255, 0.1);
}

.dark-mode .criteria-section li {
  color: #bdc3c7;
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .criteria-grid {
    grid-template-columns: 1fr;
  }

  .criteria-section {
    padding: 12px;
  }

  .score-criteria {
    padding: 15px;
  }
}

/* 分析部分样式 */
.analysis-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #eee;
}

.industry-analysis,
.career-path {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  min-height: 300px;
}

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.analysis-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.analysis-label {
  font-size: 14px;
  color: #606266;
}

.career-path-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.career-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.career-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.step-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #dcdfe6;
  border: 2px solid #fff;
  transition: all 0.3s ease;
}

.step-dot.active {
  background: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
}

.step-label {
  font-size: 14px;
  color: #606266;
}

.step-value {
  font-size: 12px;
  color: #909399;
}

.current-position {
  text-align: center;
  color: #606266;
  font-size: 14px;
}

.position-progress {
  margin-top: 10px;
}

/* 深色模式适配 */
.dark-mode .analysis-section {
  background: rgba(255, 255, 255, 0.03);
  border-color: #3a3a3a;
}

.dark-mode .analysis-label,
.dark-mode .step-label {
  color: #ecf0f1;
}

.dark-mode .step-value {
  color: #bdc3c7;
}

.dark-mode .career-line {
  background: #3a3a3a;
}

.dark-mode .step-dot {
  border-color: #2c2c2c;
  background: #3a3a3a;
}

.dark-mode .current-position {
  color: #ecf0f1;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .analysis-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .career-steps {
    padding: 15px 0;
  }

  .step-label {
    font-size: 12px;
  }

  .step-value {
    font-size: 10px;
  }
}

/* AI润色与扩写卡片样式 */
.ai-enhance-card {
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: slideUp 0.8s ease-out forwards;
}

.ai-enhance-content {
  font-size: 14px;
}

.ai-enhance-content ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.ai-enhance-content li {
  margin-bottom: 8px;
  line-height: 1.5;
  position: relative;
}

.ai-enhance-content li::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3498db;
  opacity: 0.6;
}

.enhance-btn {
  transition: all 0.3s ease;
  padding: 10px 20px;
}

.enhance-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 暗黑模式适配 */
.dark-mode .ai-enhance-card {
  background-color: #2c2c2c;
}

.dark-mode .ai-enhance-content {
  color: #dcdfe6;
}

.dark-mode .ai-enhance-content li::before {
  background: #3498db;
}

/* 添加暗黑模式下卡片标题的彩色样式 */
.dark-mode .ai-enhance-card .el-card__header .font-weight-bold {
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .ai-enhance-content {
    font-size: 13px;
  }
}

/* 招聘网站卡片样式 */
.job-sites-card {
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: slideUp 0.8s ease-out forwards;
}

.job-sites-content {
  font-size: 14px;
}

.job-sites-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.job-site-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;
}

.job-site-btn i {
  margin-right: 8px;
}

.job-site-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 深色模式适配 */
.dark-mode .job-sites-card {
  background-color: #2c2c2c;
}

.dark-mode .job-sites-content {
  color: #dcdfe6;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .job-sites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .job-sites-grid {
    grid-template-columns: 1fr;
  }
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.btn-content i {
  margin-right: 8px;
  flex-shrink: 0;
}

.job-site-btn {
  padding: 8px 12px;
  width: 90%;
  max-width: 150px;
}

.job-sites-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 20px;
  justify-items: center;
  align-items: center;
}

/* 侧边导航栏样式 */
.sidebar-nav {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: #555;
}

.nav-item:hover {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
  transform: translateY(-2px);
}

.nav-item i {
  margin-right: 8px;
  font-size: 16px;
}

.nav-item span {
  font-size: 14px;
  font-weight: 500;
}

/* 深色模式下侧边导航样式 */
.dark-mode .nav-item {
  color: #dcdfe6;
}

.dark-mode .nav-item:hover {
  background-color: rgba(52, 152, 219, 0.2);
  color: #7db9e8;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .sidebar-nav {
    margin-left: 15px;
  }
  
  .nav-item {
    margin-right: 10px;
    padding: 6px 10px;
  }
  
  .nav-item span {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .sidebar-nav {
    display: none; /* 在小屏幕上隐藏导航栏 */
  }
}

/* 扩展现有的导航栏样式 */
.modern-navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* 回到顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1001;
  opacity: 0.8;
}

.back-to-top:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  opacity: 1;
}

/* 深色模式下回到顶部按钮 */
.dark-mode .back-to-top {
  background-color: #2c3e50;
  color: #ecf0f1;
}

/* 显示回到顶部按钮 */
.show-back-to-top {
  opacity: 1;
  pointer-events: auto;
}

/* 添加招聘网站卡片标题在黑夜模式下的样式 */
.dark-mode .job-sites-title {
  color: #409EFF;
  font-weight: 600;
}
</style>

