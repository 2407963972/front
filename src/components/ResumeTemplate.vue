<template>
  <div class="resume-template">
    <h3 class="template-title">{{ template.name }}</h3>
    <p>{{ template.description }}</p>
    <div class="template-preview">
      <img :src="template.preview" alt="模板预览" class="img-fluid">
    </div>
    <div class="template-actions">
      <el-button type="primary" size="small" @click="selectTemplate">使用此模板</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeTemplate",
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectTemplate() {
      this.$emit('select', this.template.id);
    }
  }
};
</script>

<style scoped>
.resume-template {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.resume-template:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.template-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.template-preview {
  margin: 15px 0;
  overflow: hidden;
  border-radius: 5px;
}

.template-preview img {
  width: 100%;
  transition: transform 0.3s ease;
}

.resume-template:hover .template-preview img {
  transform: scale(1.05);
}

.template-actions {
  display: flex;
  justify-content: center;
}
</style>