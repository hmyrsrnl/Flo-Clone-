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

  <div class="features-section">
    <div class="features-grid">
      <div class="feature free-shipping">
        <span class="feature-text">Kargo Bedava</span>
      </div>
      <div class="feature coupon-offer">
        <span class="feature-text">Kupon Fırsatı</span>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.image-wrapper {
  width: 100%;
  flex: 0 0 auto;
  background: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  max-height: 250px;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%; 
  max-height: 100%; 
  width: auto;
  height: auto;
  object-fit: contain;
}

.product-image {
  display: block;
  margin: 0 auto;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
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

.features-section {
  width: 100%; 
  display: flex; 
  justify-content: flex-start;
} 

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-top: 5px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  min-height: 50px;
}

.free-shipping {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.coupon-offer {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  color: #e65100;
  border: 1px solid #ffcc80;
}

.feature-text {
  font-size: 10px;
  font-weight: 700;
}
</style>