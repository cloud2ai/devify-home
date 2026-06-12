<template>
  <div class="sp-wrapper">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="sp-grid">
        <div v-for="(item, i) in items" :key="i" class="sp-item">
          <div class="sp-icon">
            <component :is="'span'" v-html="item.icon"></component>
          </div>
          <div class="sp-text">
            <div class="sp-value">{{ item.value }}</div>
            <div class="sp-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.sp-wrapper {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 0;
}

.sp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 1rem;
}

@media (min-width: 640px) {
  .sp-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  .sp-item:not(:last-child) {
    border-right: 1px solid #e2e8f0;
  }
}

.sp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.sp-icon {
  font-size: 1.75rem;
  line-height: 1;
}

.sp-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.02em;
  line-height: 1;
}

.sp-label {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.4;
}
</style>
