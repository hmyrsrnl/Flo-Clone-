<template>
  <div 
    class="mega-menu" 
    ref="menuRef"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <div class="menu-trigger">
      <slot name="trigger">
        <span>{{ title }}</span>
      </slot>
    </div>

    <div 
      v-if="isOpen && menuData" 
      class="mega-menu-content"
    >
      <div class="menu-grid">
        <div 
          class="menu-column" 
          v-for="(column, index) in mainColumns" 
          :key="`column-${index}`"
        >
          <h4 v-if="column.title" class="column-title">{{ column.title }}</h4>
          <div class="column-items">
            <a 
              v-for="(item, itemIndex) in column.items" 
              :key="`item-${itemIndex}`" 
              href="#" 
              class="menu-item"
            >
              {{ item }}
            </a>
          </div>
        </div>
        <div 
          v-if="hasBrands" 
          class="menu-column brands-section"
        >
          <h4 class="column-title">Popüler Markalar</h4>
          <div class="brands-grid">
            <a 
              v-for="(brand, brandIndex) in menuData.brands" 
              :key="`brand-${brandIndex}`" 
              href="#" 
              class="brand-item"
            >
              {{ brand }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  menuData: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)
const menuRef = ref(null)


const hasBrands = computed(() => {
  return props.menuData.brands && props.menuData.brands.length > 0
})

const mainColumns = computed(() => {
  return props.menuData.columns.filter(column => column.title !== 'Popüler Markalar')
})

let closeTimeout = null

const openMenu = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  isOpen.value = true
}

const closeMenu = () => {
  closeTimeout = setTimeout(() => {
    isOpen.value = false
  }, 150)
}
</script>

<style scoped>
.mega-menu {
  position: relative;
  display: inline-block;
}

.menu-trigger {
  padding: 8px 16px;
  cursor: pointer;
  color: #333;
  font-weight: 600;
  font-size: 15px;
  transition: color 0.2s;
}

.menu-trigger:hover {
  color: #FF6600;
}

.mega-menu-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: calc(1200px - 40px);
  min-width: 1000px;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.2s ease;
  text-align: left; 
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
}

.menu-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #FF6600;
}

.column-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  padding: 4px 0;
  line-height: 1.4;
}

.menu-item:hover {
  color: #FF6600;
}

.brands-section {
  grid-column: span 2;
}

.brands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-auto-rows: auto;
  gap: 8px;
}

.brand-item {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  padding: 8px 12px;
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
}

.brand-item:hover {
  color: #FF6600;
  background: #fff5f0;
  border-color: #FF6600;
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>