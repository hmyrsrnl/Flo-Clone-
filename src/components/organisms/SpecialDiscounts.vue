<template>
  <div class="special-discounts">
    <div class="section-header">
      <h2 class="section-title">Sepetine Özel İndirimler</h2>
      <div class="slider-controls">
        <button @click="prevSlide" class="slider-btn prev" :disabled="currentSlide === 0">
          ‹
        </button>
        <span class="slide-indicator">{{ currentSlide + 1 }}/{{ totalSlides }}</span>
        <button @click="nextSlide" class="slider-btn next" :disabled="currentSlide === totalSlides - 1">
          ›
        </button>
      </div>
    </div>
    
    <div class="slider-container">
      <div 
        class="slider-track" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(slide, slideIndex) in chunkedProducts" 
          :key="slideIndex"
          class="slide"
        >
          <div class="discount-products-grid">
            <div 
              v-for="product in slide" 
              :key="product.id" 
              class="discount-product-card"
            >
              <div class="product-brand">{{ product.brand }}</div>
              
              <div class="product-content">
                <div class="product-image-section special-discount-image">
                  <ProductImage 
                    :image-url="product.imageUrl" 
                    :product-name="product.name"
                    :hide-added-count="true"
                  />
                </div>
                
                <div class="product-details">
                  <p class="product-name">{{ product.name }}</p>
                  <p class="discount-badge">Sepetine Özel İndirim</p>
                  
                  <div class="price-section">
                    <span class="old-price">{{ formatPrice(product.originalPrice) }}</span>
                    <span class="current-price">{{ formatPrice(product.price) }}</span>
                  </div>
                </div>
                
                <div class="product-actions">
                  <div class="size-section">
                    <span class="size-label">Beden</span>
                    <SizeSelector 
                      :sizes="product.availableSizes"
                      :selected-size="product.selectedSize"
                      @size-change="(size) => handleSizeChange(product.id, size)"
                      class="size-selector"
                    />
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="small"
                    class="add-to-cart-btn"
                    @click="$emit('add-to-cart', product)"
                  >
                    Sepete Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="slider-dots">
      <button
        v-for="index in totalSlides"
        :key="index"
        :class="['slider-dot', { active: currentSlide === index - 1 }]"
        @click="goToSlide(index - 1)"
      />
    </div>
  </div>
</template>

<script>
import ProductImage from '../atoms/ProductImage.vue'
import SizeSelector from '../atoms/SizeSelector.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'SpecialDiscounts',
  components: {
    ProductImage,
    SizeSelector,
    Button
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    itemsPerSlide: {
      type: Number,
      default: 2
    }
  },
  emits: ['add-to-cart', 'size-change'],
  data() {
    return {
      currentSlide: 0
    }
  },
  computed: {
    chunkedProducts() {
      const chunks = []
      for (let i = 0; i < this.products.length; i += this.itemsPerSlide) {
        chunks.push(this.products.slice(i, i + this.itemsPerSlide))
      }
      return chunks
    },
    totalSlides() {
      return Math.ceil(this.products.length / this.itemsPerSlide)
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('tr-TR', { 
        minimumFractionDigits: 2 
      }).format(price) + ' TL'
    },
    handleSizeChange(productId, size) {
      this.$emit('size-change', { productId, size })
    },
    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    goToSlide(slideIndex) {
      this.currentSlide = slideIndex
    }
  }
}
</script>

<style scoped>
.special-discounts {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.section-title {
  margin: 0;
  font-size: 1.3em;
  font-weight: 700;
  color: #333;
}

.slider-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.slider-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #ccc;
}

.slider-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-indicator {
  font-size: 0.9em;
  color: #666;
  font-weight: 600;
}

.slider-container {
  overflow: hidden;
  border-radius: 8px;
  padding: 0 16px;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.slide {
  flex: 0 0 100%;
  min-width: 100%;
}

.discount-products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}

.discount-product-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
}

.product-brand {
  font-weight: 700;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 8px;
}

.product-content {
  display: flex;
  gap: 1px;
  align-items: flex-start;
}

/* DÜZELTİLMİŞ FOTOĞRAF STİLİ - KESİLME OLMASIN */
.special-discount-image {
  flex-shrink: 0;
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.special-discount-image .product-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.special-discount-image .image {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  border-radius: 6px;
  background: #f8f8f8;
}

.product-details {
  flex: 1;
}

.product-name {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 0.9em;
  line-height: 1.4;
}

.discount-badge {
  color: #e67e22;
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 8px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.85em;
}

.current-price {
  font-weight: 700;
  color: #e74c3c;
  font-size: 1em;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 100px;
}

.size-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.size-label {
  font-size: 0.8em;
  color: #666;
  font-weight: 500;
}

.size-selector {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
}

.add-to-cart-btn {
  width: 100%;
  font-size: 0.85em;
  padding: 8px 12px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.slider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #ddd;
  cursor: pointer;
  transition: background 0.3s ease;
}

.slider-dot.active {
  background: #FF6600;
}

.slider-dot:hover {
  background: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
  .discount-products-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .slider-controls {
    align-self: flex-end;
  }
  
  .product-content {
    flex-direction: column;
    gap: 10px;
  }
  
  .product-actions {
    flex-direction: row;
    width: 100%;
  }
  
  .size-section {
    flex: 1;
  }
  
  .add-to-cart-btn {
    flex: 1;
  }

  /* Mobilde fotoğraflar biraz daha büyük */
  .special-discount-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .special-discounts {
    padding: 16px;
  }
  
  .discount-product-card {
    padding: 12px;
  }
}
</style>