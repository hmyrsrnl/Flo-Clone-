<template>
  <div class="cart-page">
    <div class="cart-container">
      <!-- Sol Taraf -->
      <div class="left-column">
        <!-- Sepetteki Ürünler -->
        <CartItems 
          :items="cartItems"
          @update-quantity="handleUpdateQuantity"
          @remove-item="handleRemoveItem"
        />
        
        <!-- Özel İndirimler -->
        <SpecialDiscounts 
          :products="specialDiscountProducts"
          @add-to-cart="handleAddToCart"
          @size-change="handleSizeChange"
        />
      </div>
      
      <!-- Sağ Taraf - Sipariş Özeti -->
      <div class="right-column">
        <CartSummary 
          :summary-data="cartSummary"
          :item-count="cartItems.length"
          @checkout="handleCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CartItems from '@/components/organisms/CartItems.vue'
import SpecialDiscounts from '@/components/organisms/SpecialDiscounts.vue'
import CartSummary from '@/components/organisms/CartSummary.vue'
import { computed, onMounted } from 'vue' 
import { useCart } from '@/composables/useCart'
import product1 from '@/assets/images/product1.jpg'
import product2 from '@/assets/images/product2.jpg'
import product4 from '@/assets/images/product4.jpg'
import product3 from '@/assets/images/product3.jpg'   
import product5 from '@/assets/images/product5.jpg' 


export default {
  name: 'Cart',
  components: {
    CartItems,
    SpecialDiscounts,
    CartSummary
  },
  data() {
    return {
      // SEPETTEKİ ÜRÜNLER - görseldeki gibi 1 ürün var
      cartItems: [
        {
          id: 2,
          brand: 'Lumberjack',
          name: ' CHUCK WMN 5FX Beyaz Kadın Sneaker',
          imageUrl: product2,
          price: 2299.99,
          originalPrice: 2299.99,
          quantity: 1,
          color: 'Beyaz',
          size: '38'
        }
      ],
      // ÖZEL İNDİRİMLER - görseldeki gibi 3 ürün
      specialDiscountProducts: [
        {
          id: 1,
          brand: 'Reebok',
          name: 'VERSE Gri Kadın Koşu Ayakkabısı',
          imageUrl: product1,
          price: 2799.99,
          addedCount: 143,
          availableSizes: ['38', '39', '40', '41', '42'],
          selectedSize: '39'
        },
        {
          id: 3,
          brand: 'Nike',
          name: 'WMNS INITIATOR Beyaz Kadın Sneaker',
          imageUrl: product3,
          price: 4299.99,
          addedCount: 67,
          availableSizes: ['39', '40', '41', '42'],
          selectedSize: '40'
        },
        {
          id: 4,
          brand: 'Kinetix',
          name: 'RIVAL PU W 5PR GRI Kadın Koşu Ayakkabısı',
          imageUrl: product4,
          price: 2799.99,
          addedCount: 89,
          availableSizes: ['37', '38', '39', '40'],
          selectedSize: '38'
        },
        
      ],
      cartSummary: {
        subtotal: 2399.99,
        discount: 0,
        shipping: 0,
        total: 2399.99
      }
    }
  },
  methods: {
    handleUpdateQuantity({ itemId, type }) {
      const item = this.cartItems.find(item => item.id === itemId)
      if (item) {
        if (type === 'increase') {
          item.quantity++
        } else if (type === 'decrease' && item.quantity > 1) {
          item.quantity--
        }
        this.updateCartSummary()
      }
    },
    handleRemoveItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId)
      this.updateCartSummary()
    },
    handleAddToCart(product) {
      // Özel indirimden ürün sepete ekleme
      const newItem = {
        id: Date.now(),
        brand: product.brand,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        originalPrice: product.price,
        quantity: 1,
        color: 'Standart',
        size: product.selectedSize
      }
      this.cartItems.push(newItem)
      this.updateCartSummary()
    },
    handleSizeChange({ productId, size }) {
      const product = this.specialDiscountProducts.find(p => p.id === productId)
      if (product) {
        product.selectedSize = size
      }
    },
    handleCheckout() {
      console.log('Sepet onaylandı')
      // Ödeme sayfasına yönlendirme
    },
    updateCartSummary() {
      const subtotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      this.cartSummary = {
        subtotal: subtotal,
        discount: 0,
        shipping: subtotal > 1750 ? 0 : 69.99,
        total: subtotal + (subtotal > 1750 ? 0 : 69.99)
      }
    }
  },
  mounted() {
    this.updateCartSummary()
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.left-column {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-column {
  grid-column: 2;
  position: sticky;
  top: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .cart-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .left-column,
  .right-column {
    grid-column: 1;
  }
  
  .right-column {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 16px;
  }
  
  .cart-container {
    gap: 16px;
  }
}
</style>