<template>
  <div class="cart-items">
    <h2 class="section-title">Sepetim ({{ items.length }} Ürün)</h2>
    
    <div class="items-list">
      <div 
        v-for="item in items" 
        :key="item.id" 
        class="cart-item"
      >
    
        <div class="item-checkbox">
          <input 
            type="checkbox" 
            :checked="item.selected" 
            @change="toggleItemSelection(item.id)"
            class="checkbox"
          >
        </div>
        
        <div class="item-image cart-item-image">
          <ProductImage 
            :image-url="item.imageUrl" 
            :product-name="item.name"
          />
        </div>
        
        <div class="item-info">
          <h3 class="item-brand">{{ item.brand }}</h3>
          <p class="item-name">{{ item.name }}</p>
          <p class="item-shipping">
            <span class="shipping-badge">Ücretsiz Kargo</span>
          </p>
        </div>
        
        <div class="item-size">
          <SizeSelector
            :sizes="availableSizes"
            :selected-size="item.size"
            @size-change="(newSize) => updateSize(item.id, newSize)"
          />
        </div>
      
        <div class="item-quantity">
          <div class="quantity-selector">
            <button @click="decreaseQuantity(item.id)" class="qty-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="qty-btn">+</button>
          </div>
        </div>
       
        <div class="item-price">
          <span class="price">{{ formatPrice(item.price * item.quantity) }}</span>
          <span v-if="item.originalPrice > item.price" class="original-price">
            {{ formatPrice(item.originalPrice * item.quantity) }}
          </span>
        </div>
        
        <div class="item-remove">
          <button @click="removeItem(item.id)" class="remove-btn" title="Ürünü Sil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#888"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from '../atoms/ProductImage.vue'
import SizeSelector from '../atoms/SizeSelector.vue'

export default {
  name: 'CartItems',
  components: {
    ProductImage,
    SizeSelector
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update-quantity', 'remove-item', 'toggle-selection', 'update-size'],
  data() {
    return {
      availableSizes: ['36', '38', '40', '42', '44'] 
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('tr-TR', { 
        minimumFractionDigits: 2 
      }).format(price) + ' TL'
    },
    increaseQuantity(itemId) {
      this.$emit('update-quantity', { itemId, type: 'increase' })
    },
    decreaseQuantity(itemId) {
      this.$emit('update-quantity', { itemId, type: 'decrease' })
    },
    removeItem(itemId) {
      this.$emit('remove-item', itemId)
    },
    toggleItemSelection(itemId) {
      this.$emit('toggle-selection', itemId)
    },
    updateSize(itemId, newSize) {
      this.$emit('update-size', { itemId, size: newSize })
    }
  }
}
</script>

<style scoped>
.cart-items {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 1.3em;
  font-weight: 700;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 100px 1fr auto auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
}

.item-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.cart-item-image {
  width: 100px;
  height: 150px;
}

.cart-item-image .product-image {
  width: 100%;
  height: 100%;
}

.cart-item-image .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-brand {
  font-weight: 700;
  font-size: 1em;
  color: #333;
  margin: 0;
}

.item-name {
  margin: 0;
  color: #666;
  font-size: 0.9em;
  line-height: 1.4;
}

.item-shipping {
  margin: 0;
}

.shipping-badge {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.item-size {
  display: flex;
  justify-content: center;
  min-width: 100px;
}

.item-quantity {
  display: flex;
  justify-content: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px;
  background: white;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #333;
}

.qty-btn:hover {
  background: #e5e5e5;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 100px;
}

.price {
  font-weight: 700;
  color: #e74c3c;
  font-size: 1.1em;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9em;
}

.item-remove {
  display: flex;
  justify-content: center;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: #f5f5f5;
}

@media (max-width: 1024px) {
  .cart-item {
    grid-template-columns: auto 80px 1fr auto;
    grid-template-areas: 
      "checkbox image info remove"
      "checkbox image size quantity"
      "checkbox image price price";
    gap: 12px;
    padding: 12px;
  }
  
  .item-checkbox { grid-area: checkbox; }
  .item-image { grid-area: image; }
  .item-info { grid-area: info; }
  .item-size { grid-area: size; }
  .item-quantity { grid-area: quantity; }
  .item-price { 
    grid-area: price; 
    align-items: flex-start;
    margin-top: 8px;
  }
  .item-remove { grid-area: remove; }
  
  .cart-item-image {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 
      "checkbox info remove"
      "image size quantity"
      "image price price";
    gap: 10px;
  }
  
  .item-checkbox { grid-area: checkbox; }
  .item-image { grid-area: image; }
  .item-info { grid-area: info; }
  .item-size { grid-area: size; }
  .item-quantity { grid-area: quantity; }
  .item-price { 
    grid-area: price; 
    align-items: flex-start;
  }
  .item-remove { grid-area: remove; }
  
  .cart-item-image {
    width: 60px;
    height: 60px;
  }
  
  .section-title {
    font-size: 1.1em;
  }
}
</style>