<template>
  <div class="product-card" @click="$emit('product-click', product)">
    <ProductImage 
      :image-url="product.imageUrl"
      :product-name="product.name"
      :added-count="product.addedCount"
    />
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      
      <RatingStars 
        :rating="product.rating"
        :review-count="product.reviewCount"
        class="rating-section"
      />
      
      <hr class="divider">
      
      <PriceDisplay 
        :price="product.price"
        :features="product.features"
      />
    </div>
  </div>
</template>

<script>
import ProductImage from '../atoms/ProductImage.vue'
import RatingStars from '../atoms/RatingStars.vue'
import PriceDisplay from '../atoms/PriceDisplay.vue'

export default {
  name: 'ProductCard',
  components: {
    ProductImage,
    RatingStars,
    PriceDisplay
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: '',
        imageUrl: '',
        price: 0,
        rating: 0,
        reviewCount: 0,
        addedCount: 0,
        features: []
      })
    }
  },
  emits: ['product-click']
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-name {
  font-size: 1em;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-section {
  margin: 4px 0;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 8px 0;
}
</style>