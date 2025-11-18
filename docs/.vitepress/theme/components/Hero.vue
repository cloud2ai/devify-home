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
      <div class="hero-stack px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div class="hero-header max-w-3xl text-center flex flex-col items-center w-full">
          <div class="mb-4 lg:mb-5" v-if="badge">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {{ badge }}
            </span>
          </div>

          <h1 class="hero-title text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight" v-html="formattedTitle"></h1>
          <p v-if="heroSubtitle" class="hero-subtitle text-base sm:text-lg md:text-xl text-gray-600">
            {{ heroSubtitle }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center cta-buttons-container">
            <a
              :href="primaryButtonLink"
              class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {{ primaryButtonText }}
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              :href="secondaryButtonLink"
              class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 transition-colors duration-200"
            >
              {{ secondaryButtonText }}
            </a>
          </div>
        </div>

        <div class="hero-visual w-full">
          <div v-if="carouselSlides && carouselSlides.length > 0">
            <Carousel :slides="carouselSlides" :autoplay="true" :interval="5000" :overlay-points="points" />
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

// Format title: keep single line when possible
const formattedTitle = computed(() => props.title || '')
const heroSubtitle = computed(() => (props.subtitle || '').trim())

// Format subtitle - remove the process flow part
</script>

<style scoped>
.hero-wrapper {
  min-height: auto;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-stack {
  max-width: 1180px;
  margin: 0 auto;
  gap: 1.1rem;
}

.hero-header {
  gap: 0.85rem;
  margin-top: -0.5rem;
}

.hero-title {
  word-break: keep-all;
  white-space: normal;
}

.hero-subtitle {
  margin-top: 0.5rem;
  color: #4b5563;
  line-height: 1.5;
  max-width: 760px;
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

@media (max-width: 640px) {
  .hero-wrapper {
    min-height: auto;
    padding-top: 1rem;
    padding-bottom: 1.25rem;
  }

  .hero-stack {
    gap: 0.8rem;
  }

  .hero-header {
    gap: 0.4rem;
  }

  .hero-title {
    font-size: 1.8rem;
    line-height: 1.25;
  }

  .hero-subtitle {
    display: block;
    font-size: 0.95rem;
    line-height: 1.45;
    padding: 0 0.25rem;
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
