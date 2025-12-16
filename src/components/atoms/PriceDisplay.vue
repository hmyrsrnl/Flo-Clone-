<template>
  <div class="price-display">
    <div class="current">{{ formatPrice(price) }}</div>
    <div v-if="features && features.length" class="features">
      <span v-for="(f,i) in features" :key="i" class="feature">{{ f }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PriceDisplay',
  props: {
    price: { type: [Number,String], required: true },
  },
  methods: {
    formatPrice(p) { 
      if (typeof p === 'string') {
        return p; 
      }
      const n = Number(p) || 0; 
      return new Intl.NumberFormat('tr-TR', { minimumFractionDigits:2 }).format(n) + ' TL';
    }
  }
}
</script>

<style scoped>
.price-display { 
  display:flex; 
  flex-direction:column; 
  align-items:flex-start; 
  gap:6px; 
}

.current { 
  font-size:16px; 
  font-weight:800; 
  color:#e74c3c; 
}

.features { 
  display:flex; 
  gap:6px; 
  flex-direction:column; 
  align-items:flex-end; 
}

.feature { 
  font-size:12px; 
  color:#00b14f; 
  font-weight:600; 
}
</style>
