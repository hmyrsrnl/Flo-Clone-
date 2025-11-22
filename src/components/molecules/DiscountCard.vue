<template>
  <div class="discount-card">
    <img :src="product.imageUrl" :alt="product.name" />
    <div class="info">
      <div class="brand">{{ product.brand }}</div>
      <div class="title">{{ product.name }}</div>
      <div class="prices">
        <span class="old">{{ formatPrice(product.oldPrice) }}</span>
        <span class="new">{{ formatPrice(product.newPrice) }}</span>
      </div>
      <Button variant="primary" size="small">Sepete Ekle</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'DiscountCard',
  components: { Button },
  props: {
    product: { type: Object, required: true }
  },
  methods: {
    formatPrice(p) {
      return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(p) + ' TL'
    }
  }
}
</script>

<style scoped>
.discount-card { width: 220px; background:white; border-radius:10px; padding:12px; display:flex; gap:10px; align-items:center; box-shadow:0 1px 4px rgba(0,0,0,0.04); flex-shrink:0; }
.discount-card img { width:72px; height:72px; object-fit:cover; border-radius:8px; }
.info { display:flex; flex-direction:column; gap:6px; }
.brand { font-size:12px; color:#888; }
.title { font-size:13px; color:#222; font-weight:600; }
.prices { display:flex; gap:8px; align-items:center; }
.old { text-decoration:line-through; color:#aaa; font-size:12px; }
.new { color:#e74c3c; font-weight:700; font-size:14px; }
</style>
