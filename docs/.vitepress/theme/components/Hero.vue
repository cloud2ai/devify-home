<template>
  <div class="hero-wrapper relative overflow-hidden py-16 md:py-24 lg:py-32">
    <!-- Animated background -->
    <div class="hero-background"></div>

    <!-- Decorative elements -->
    <div class="hero-decoration">
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-circle decoration-circle-2"></div>
      <div class="decoration-circle decoration-circle-3"></div>
    </div>

    <div class="hero-container relative z-10">
      <div class="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Badge -->
        <div class="mb-6" v-if="badge">
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {{ badge }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            :href="primaryButtonLink"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            {{ primaryButtonText }}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          <a
            :href="secondaryButtonLink"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 transition-colors duration-200 min-h-[44px]"
          >
            {{ secondaryButtonText }}
          </a>
        </div>

        <!-- Screenshot/Demo -->
        <div class="relative mt-12" v-if="imageSrc">
          <div class="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <img
              :src="imageSrc"
              :alt="imageAlt"
              class="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Key Features Pills -->
        <div class="mt-12 flex flex-wrap gap-3 justify-center" v-if="features && features.length > 0">
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
    </div>
  </div>
</template>

<script setup>
defineProps({
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
    required: true
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
  }
})
</script>

<style scoped>
.hero-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
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
