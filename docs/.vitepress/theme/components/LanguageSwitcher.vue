<template>
  <div class="language-switcher" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="language-button"
      :title="currentLang === 'zh-CN' ? '切换语言' : 'Switch Language'"
    >
      <!-- Language icon -->
      <svg
        class="language-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <!-- Current language flag -->
      <span class="language-flag">{{ currentFlag }}</span>
      <!-- Dropdown arrow -->
      <svg
        class="dropdown-arrow"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="dropdown-menu">
        <a
          v-for="lang in languages"
          :key="lang.code"
          :href="lang.link"
          class="dropdown-item"
          :class="{ 'active': currentLang === lang.code }"
          @click="isOpen = false"
        >
          <span class="item-flag">{{ lang.flag }}</span>
          <span class="item-label">{{ lang.label }}</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isOpen = ref(false)
const dropdownRef = ref(null)

const languages = [
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳', link: '/zh/' },
  { code: 'en-US', label: 'English', flag: '🇺🇸', link: '/en/' }
]

const currentLang = computed(() => {
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  if (path.startsWith('/zh')) return 'zh-CN'
  if (path.startsWith('/en')) return 'en-US'
  return 'zh-CN'
})

const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === currentLang.value)
  return lang ? lang.flag : '🌐'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  margin-left: 1rem;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  font-size: 0.875rem;
  color: #4b5563;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-button:hover {
  color: #2563eb;
}

.language-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.language-flag {
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.dropdown-arrow {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.375rem;
  min-width: 8rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0;
  z-index: 50;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.active {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 500;
}

.item-flag {
  font-size: 1rem;
  line-height: 1;
  width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-label {
  flex: 1;
}
</style>
