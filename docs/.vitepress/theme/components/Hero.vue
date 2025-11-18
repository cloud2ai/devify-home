<template>
  <div class="hero-wrapper relative overflow-hidden py-8 md:py-12 lg:py-16">
    <!-- Animated background -->
    <div class="hero-background"></div>

    <!-- Decorative elements -->
    <div class="hero-decoration">
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-circle decoration-circle-2"></div>
      <div class="decoration-circle decoration-circle-3"></div>
    </div>

    <div class="hero-container relative z-10">
      <div class="hero-grid grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-end px-4 sm:px-6 lg:px-8">
        <!-- Left Column: Content -->
        <div class="hero-content text-center lg:text-left lg:col-span-2 flex flex-col justify-between">
          <!-- Badge -->
          <div class="mb-4 lg:mb-6 flex justify-center lg:justify-start" v-if="badge">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {{ badge }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight" v-html="formattedTitle"></h1>

          <!-- Subtitle / Points -->
          <div class="mb-6 lg:mb-8">
            <div v-if="points && points.length > 0" class="space-y-3">
              <div
                v-for="(point, index) in points"
                :key="index"
                class="flex items-start text-base sm:text-lg md:text-lg lg:text-lg text-gray-700"
              >
                <div class="flex-shrink-0 mr-3 mt-0.5">
                  <svg
                    v-if="point.icon === 'unified'"
                    class="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <svg
                    v-else-if="point.icon === 'ai'"
                    class="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <svg
                    v-else-if="point.icon === 'search'"
                    class="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <svg
                    v-else-if="point.icon === 'process'"
                    class="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="flex-1">{{ point.text }}</span>
              </div>
            </div>
            <div v-else>
              <p class="text-lg sm:text-xl md:text-xl lg:text-xl text-gray-600 mb-2 lg:mb-3 leading-relaxed" v-html="formattedSubtitle"></p>
              <p class="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-semibold text-gray-900 leading-tight" v-html="formattedProcessFlow"></p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-3 lg:mb-8 cta-buttons-container">
            <a
              :href="primaryButtonLink"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl min-h-[40px]"
            >
              {{ primaryButtonText }}
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              :href="secondaryButtonLink"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 transition-colors duration-200 min-h-[40px]"
            >
              {{ secondaryButtonText }}
            </a>
          </div>

          <!-- Key Features Pills -->
          <div class="flex flex-wrap gap-3 justify-center lg:justify-start" v-if="features && features.length > 0">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white border border-gray-200 text-gray-700"
            >
              <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ feature }}
            </div>
          </div>
        </div>

        <!-- Right Column: Carousel/Image -->
        <div class="hero-visual relative lg:mt-0 mt-0 lg:order-last lg:col-span-3">
          <div v-if="carouselSlides && carouselSlides.length > 0">
            <Carousel :slides="carouselSlides" :autoplay="true" :interval="5000" />
          </div>
          <div v-else-if="imageSrc" class="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <img
              :src="imageSrc"
              :alt="imageAlt"
              class="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Carousel from './Carousel.vue'

const props = defineProps({
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  points: {
    type: Array,
    default: () => []
  },
  primaryButtonText: {
    type: String,
    default: 'Get Started'
  },
  primaryButtonLink: {
    type: String,
    default: '#'
  },
  secondaryButtonText: {
    type: String,
    default: 'Learn More'
  },
  secondaryButtonLink: {
    type: String,
    default: '#'
  },
  imageSrc: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: 'Product screenshot'
  },
  features: {
    type: Array,
    default: () => []
  },
  carouselSlides: {
    type: Array,
    default: () => []
  }
})

// Format title for mobile display
// Add line break after "聊天记录" on mobile devices
const formattedTitle = computed(() => {
  if (props.title.includes('聊天记录 AI 智能助手')) {
    return props.title.replace('聊天记录 AI 智能助手', '聊天记录<br class="sm:hidden"> AI 智能助手')
  }
  return props.title
})

// Format subtitle - remove the process flow part
const formattedSubtitle = computed(() => {
  const subtitle = props.subtitle || ''
  // Remove the process flow part "选择 → 转发 → 轻松完成！" from subtitle
  if (subtitle && subtitle.includes('选择 → 转发 → 轻松完成！')) {
    return subtitle.replace(/\s*选择 → 转发 → 轻松完成！\s*/, '')
  }
  return subtitle
})

// Format process flow - extract and format the process flow part
const formattedProcessFlow = computed(() => {
  const subtitle = props.subtitle || ''
  // Extract the process flow part "选择 → 转发 → 轻松完成！"
  if (subtitle && subtitle.includes('选择 → 转发 → 轻松完成！')) {
    const processMatch = subtitle.match(/选择 → 转发 → 轻松完成！/)
    if (processMatch) {
      return processMatch[0]
    }
  }
  return ''
})
</script>

<style scoped>
.hero-wrapper {
  min-height: auto;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-grid {
  max-width: 1280px;
  margin: 0 auto;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  opacity: 0.08;
  z-index: 0;
}

.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.2), transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.hero-decoration {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  filter: blur(40px);
  animation: float 20s ease-in-out infinite;
}

.decoration-circle-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.decoration-circle-2 {
  width: 400px;
  height: 400px;
  bottom: -15%;
  left: -5%;
  animation-delay: 5s;
}

.decoration-circle-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 50%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@media (max-width: 1024px) {
  .hero-wrapper {
    min-height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .hero-visual {
    margin-top: 0;
  }

  .cta-buttons-container {
    margin-bottom: 0.75rem;
  }
}

@media (max-width: 640px) {
  .hero-wrapper {
    min-height: auto;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .decoration-circle {
    filter: blur(30px);
  }

  .decoration-circle-1 {
    width: 300px;
    height: 300px;
  }

  .decoration-circle-2 {
    width: 250px;
    height: 250px;
  }

  .decoration-circle-3 {
    width: 200px;
    height: 200px;
  }
}
</style>
