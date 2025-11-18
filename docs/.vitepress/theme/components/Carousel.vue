<template>
  <div class="carousel-wrapper relative">
    <!-- Carousel Container -->
    <div class="carousel-container relative overflow-hidden rounded-xl shadow-2xl border border-gray-200 bg-white">
      <!-- Slides -->
      <div
        class="carousel-slides"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
        >
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-auto"
            loading="lazy"
          />
          <div v-if="slide.title || slide.description" class="carousel-caption">
            <h3 v-if="slide.title" class="carousel-title">{{ slide.title }}</h3>
            <p v-if="slide.description" class="carousel-description">{{ slide.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        v-if="slides.length > 1"
        @click="previousSlide"
        class="carousel-nav carousel-nav-prev"
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-if="slides.length > 1"
        @click="nextSlide"
        class="carousel-nav carousel-nav-next"
        aria-label="Next slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
    validator: (slides) => {
      if (!Array.isArray(slides) || slides.length === 0) {
        return true
      }
      return slides.every(slide => slide && slide.image && slide.alt)
    }
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000 // 5 seconds
  },
  loop: {
    type: Boolean,
    default: true
  }
})

const currentIndex = ref(0)
let autoplayTimer = null

const nextSlide = () => {
  if (!props.slides || props.slides.length === 0) return
  if (props.loop) {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length
  } else {
    currentIndex.value = Math.min(currentIndex.value + 1, props.slides.length - 1)
  }
  resetAutoplay()
}

const previousSlide = () => {
  if (!props.slides || props.slides.length === 0) return
  if (props.loop) {
    currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
  } else {
    currentIndex.value = Math.max(currentIndex.value - 1, 0)
  }
  resetAutoplay()
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
  if (props.autoplay && props.slides.length > 1) {
    autoplayTimer = setInterval(() => {
      nextSlide()
    }, props.interval)
  }
}

onMounted(() => {
  if (props.autoplay && props.slides.length > 1) {
    resetAutoplay()
  }
})

onUnmounted(() => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
})
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
}

.carousel-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 550px;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f9fafb;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1.5rem;
  color: white;
}

.carousel-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.carousel-description {
  font-size: 0.875rem;
  opacity: 0.9;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.carousel-nav:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav-prev {
  left: 1rem;
}

.carousel-nav-next {
  right: 1rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.carousel-indicator.active {
  background: white;
  width: 24px;
  border-radius: 5px;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .carousel-container {
    aspect-ratio: 4 / 3;
    max-height: 400px;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
  }

  .carousel-nav-prev {
    left: 0.5rem;
  }

  .carousel-nav-next {
    right: 0.5rem;
  }

  .carousel-caption {
    padding: 1rem;
  }

  .carousel-title {
    font-size: 1rem;
  }

  .carousel-description {
    font-size: 0.75rem;
  }
}
</style>
