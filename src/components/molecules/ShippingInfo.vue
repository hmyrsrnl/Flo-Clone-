<template>
  <div class="shipping-info">
    <div class="shipping-header">
      <h5>{{ title }}</h5>
      <span class="delivery-date">{{ deliveryDate }}</span>
    </div>
    <p class="shipping-description">{{ description }}</p>
    <div class="size-selector">
      <span>Beden:</span>
      <select v-model="selectedSize" class="size-dropdown">
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
      </select>
    </div>
    <div class="price-section">
      <span class="price">{{ formatPrice(price) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingInfo',
  props: {
    title: String,
    description: String,
    deliveryDate: String,
    price: { type: Number, default: 0 }
  },
  data() { return { selectedSize: '37' } },
  methods: {
    formatPrice(price) { return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(price) + ' TL' }
  }
}
</script>

<style scoped>
.shipping-info { font-size:13px; color:#444; }
.shipping-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
.shipping-header h5 { margin:0; font-size:14px; }
.delivery-date { color:#888; font-size:12px; }
.shipping-description { color:#777; margin:6px 0; }
.size-selector { display:flex; gap:8px; align-items:center; margin-bottom:8px; }
.size-dropdown { padding:6px; border-radius:6px; border:1px solid #ddd; background:#fff; }
.price { color:#e74c3c; font-weight:700; }
</style>
