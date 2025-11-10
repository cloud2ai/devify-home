<template>
  <div id="pricing" class="pricing-wrapper relative py-16 md:py-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Pricing Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          :class="[
            'pricing-card flex flex-col',
            plan.featured ? 'featured ring-2 ring-primary-600' : 'bg-white'
          ]"
        >
          <!-- Featured Badge -->
          <div v-if="plan.featured" class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span class="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-primary-600 text-white shadow-lg">
              {{ featuredLabel }}
            </span>
          </div>

          <!-- Plan Name -->
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ plan.name }}
          </h3>

          <!-- Plan Description -->
          <p class="text-sm text-gray-600 mb-6 min-h-[2.5rem]">
            {{ plan.description }}
          </p>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-4xl font-bold text-gray-900">
                {{ plan.price }}
              </span>
              <span class="text-gray-600 ml-2">
                {{ plan.period }}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <a
            :href="plan.buttonLink"
            :class="[
              'block w-full text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 mb-6 min-h-[44px] flex items-center justify-center',
              plan.featured
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            ]"
          >
            {{ plan.buttonText }}
          </a>

          <!-- Features List -->
          <ul class="space-y-3 flex-grow">
            <li
              v-for="(feature, fIndex) in plan.features"
              :key="fIndex"
              class="flex items-start"
            >
              <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-700" v-html="feature"></span>
            </li>
          </ul>

          <!-- Additional Info (always rendered for alignment) -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-xs text-gray-500 min-h-[2.5rem] flex items-center">
              {{ plan.additionalInfo || '\u00A0' }}
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ or Additional Info -->
      <div v-if="note" class="mt-8 text-center">
        <p class="text-gray-600">
          {{ note }}
        </p>
      </div>

      <!-- Hint for detailed comparison below -->
      <div v-if="comparisonHint" class="mt-8 text-center">
        <p class="text-sm text-gray-500 animate-bounce">
          {{ comparisonHint }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  featuredLabel: {
    type: String,
    default: 'Popular'
  },
  plans: {
    type: Array,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  comparisonHint: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.pricing-wrapper {
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
}

.pricing-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.03) 0%, transparent 50%);
  z-index: 0;
}

.pricing-card {
  @apply relative rounded-xl p-8 shadow-lg transition-all duration-300;
  background: white;
  border: 2px solid transparent;
}

.pricing-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pricing-card:hover::before {
  opacity: 1;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
}

.pricing-card.featured {
  transform: scale(1.05);
  border-color: #6366f1;
  background: linear-gradient(to bottom, #ffffff 0%, #faf5ff 100%);
}

.pricing-card.featured::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  z-index: -1;
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
  box-shadow: 0 30px 60px -15px rgba(99, 102, 241, 0.35);
}

@media (max-width: 1024px) {
  .pricing-card.featured {
    transform: scale(1);
  }

  .pricing-card.featured:hover {
    transform: translateY(-8px);
  }
}

@media (max-width: 640px) {
  .pricing-card {
    @apply p-6;
  }
}
</style>
