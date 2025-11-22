<template>
  <div class="product-detail-page">
    <div class="container">
      <nav class="breadcrumb">
        <span>Anasayfa</span>
        <span>/</span>
        <span>Ayakkabı</span>
        <span>/</span>
        <span>Sneaker</span>
        <span>/</span>
        <span>Klasik Sneaker</span>
        <span>/</span>
        <span class="current">{{ product.name }}</span>
      </nav>

      <div class="product-detail">
        <div class="product-gallery">
          <div class="gallery-grid">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="gallery-item"
            >
              <img :src="image" :alt="`${product.name} - Görsel ${index + 1}`" />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          
          <div class="rating-favorite">
            <div class="rating">
              <RatingStars 
                  :rating="product.rating"
                  :review-count="product.reviewCount"
              />
            </div>
            <div class="favorite-info">
              <span class="favorite-badge">Sevilen Ürün!</span>
              <span class="favorite-count">{{ product.favoriteCount }} kişi favoriledi</span>
            </div>
          </div>

          <div class="prices">
            <span class="original-price">{{ product.originalPrice }} TL</span>
            <span class="current-price">{{ product.price }} TL</span>
          </div>

          <div class="installment-info">
            <p>Aylık {{ product.monthlyPayment }} TL'den başlayan {{ product.installmentCount }} aya varan taksitlerle</p>
            <div class="bank-logos">
              <span class="bank-logo">Akbank</span>
              <span class="bank-logo">World</span>
            </div>
          </div>

          <hr class="divider">

          <div v-if="product.colors && product.colors.length > 0" class="color-selection">
            <h3>Renk: {{ product.color }}</h3>
            <p>{{ product.colors.length }} farklı renk</p>
            <div class="color-options">
              <div 
                v-for="color in product.colors" 
                :key="color.id"
                :class="['color-option', { 'selected': product.id === color.productId }]"
                @click="goToColorPage(color)"
              >
                <div class="color-image">
                  <img :src="color.image" :alt="color.name" />
                </div>
                <span class="color-name">{{ color.name }}</span>
              </div>
            </div>
          </div>

          <div class="size-selection">
            <h3>Beden:</h3>
            <div class="size-options">
              <button 
                v-for="size in product.sizes" 
                :key="size" 
                :class="['size-option', { 'selected': selectedSize === size }]"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="add-to-cart-section">
            <button class="add-to-cart-btn" @click="addToCart" :disabled="!selectedSize">
              Sepete Ekle
            </button>
            <p class="wishlist-count">{{ product.wishlistCount }} kişi sepete ekledi</p>
          </div>

          <div class="shipping-info">
            <p>Tahmini Kargoya Teslimat: {{ product.estimatedDelivery }}</p>
          </div>
        </div>
      </div>

      <div class="product-tabs">
        <div class="tab-nav">
          <button class="tab-btn active">Ürün Açıklamaları</button>
          <button class="tab-btn">Son Değerlendirmeler</button>
        </div>
        
        <div class="tab-content">
          <div class="tab-pane">
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RatingStars from '@/components/atoms/RatingStars.vue'
import { useCart } from '@/composables/useCart'



// Görsel importları
import image1 from '@/assets/images/product2.jpg'
import image2 from '@/assets/images/product2.1.jpg'
import image3 from '@/assets/images/product2.2.jpg'
import image4 from '@/assets/images/product2.3.jpg'
import image6 from '@/assets/images/product6.jpg'
import image7 from '@/assets/images/product6.1.jpg'
import image8 from '@/assets/images/product6.2.jpg'
import image9 from '@/assets/images/product6.3.jpg'
import image10 from '@/assets/images/product1.jpg'
import image11 from '@/assets/images/product1.1.jpg'
import image12 from '@/assets/images/product1.2.jpg'
import image13 from '@/assets/images/product1.3.jpg'
import image14 from '@/assets/images/product1.4.jpg'

export default {
  name: 'ProductDetail',
  components: { RatingStars },
  props: ['id'],
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const { addToCart } = useCart()
    
    const product = ref({})
    const selectedSize = ref(null)

    // Tüm ürün verileri
    const allProducts = [
      {
        id: 1,
        productId: 1,
        name: 'Reebok VERSE Gri Kadın Koşu Ayakkabısı',
        color: 'Gri',
        images: [image10, image11, image12, image13, image14],
        originalPrice: '2.990,00',
        price: '2.799,99',
        rating: 4.7,
        reviewCount: 19,
        favoriteCount: 1270,
        wishlistCount: 1270,
        sizes: ['36', '37', '38', '39', '40'],
        estimatedDelivery: '22 - 24 Kasım',
        monthlyPayment: '383,33',
        installmentCount: 6,
        description: 'Reebok VERSE Gri renk klasik tasarımı ve dayanıklı yapısıyla her tarza uygun.',
        colors: [] // Reebok için renk seçeneği yok
      },
      {
        id: 2,
        productId: 2,
        name: 'Lumberjack CHUCK WMN SFX Beyaz Kadın Sneaker',
        color: 'Beyaz',
        images: [image1, image2, image3, image4],
        originalPrice: '2.690,00',
        price: '2.299,99',
        rating: 4.7,
        reviewCount: 19,
        favoriteCount: 1270,
        wishlistCount: 1270,
        sizes: ['36', '37', '38', '39', '40'],
        estimatedDelivery: '22 - 24 Kasım',
        monthlyPayment: '383,33',
        installmentCount: 6,
        description: 'Lumberjack Chuck Beyaz renk klasik tasarımı ve dayanıklı yapısıyla her tarza uygun.',
        colors: [ 
          { id: 1, name: 'Beyaz', image: image1, productId: 2, url: '/product/2' },
          { id: 2, name: 'Siyah', image: image6, productId: 6, url: '/product/6' }
        ]
      },
      {
        id: 6,
        productId: 6,
        name: 'Lumberjack CHUCK WMN SFX Siyah Kadın Sneaker',
        color: 'Siyah',
        images: [image6, image7, image8, image9],
        originalPrice: '2.690,00',
        price: '2.299,99',
        rating: 4.5,
        reviewCount: 23,
        favoriteCount: 980,
        wishlistCount: 980,
        sizes: ['36', '37', '38', '39', '40'],
        estimatedDelivery: '22 - 24 Kasım',
        monthlyPayment: '383,33',
        installmentCount: 6,
        description: 'Lumberjack Chuck Siyah renk klasik tasarımı ve dayanıklı yapısıyla her tarza uygun.',
        colors: [ 
          { id: 1, name: 'Beyaz', image: image1, productId: 2, url: '/product/2' },
          { id: 2, name: 'Siyah', image: image6, productId: 6, url: '/product/6' }
        ]
      }
    ]

    const goToColorPage = (color) => {
      console.log('Renk seçildi:', color)
      // Seçilen renge göre ilgili ürün sayfasına yönlendir
      router.replace(color.url)
    }

   // GÜNCELLENMİŞ SEPETE EKLEME FONKSİYONU
    const addToCartAndRedirect = () => {
      if (!selectedSize.value) {
        alert('Lütfen beden seçiniz!')
        return
      }
      
      // Sepete ekle
      addToCart(product.value, selectedSize.value)
      
      // Sepet sayfasına yönlendir
      router.push('/cart')
    }

    const loadProduct = (productId) => {
      const foundProduct = allProducts.find(p => p.id === productId)
      if (foundProduct) {
        product.value = foundProduct
        selectedSize.value = null 
      } else {
        router.push('/')
      }
    }

    onMounted(() => {
      const productId = parseInt(route.params.id)
      loadProduct(productId)
    })

    return {
      product,
      selectedSize,
      goToColorPage,
      addToCart: addToCartAndRedirect
    }
  }
}
</script>

<style scoped>
/* Stiller de rating-favorite kısmındaki son düzenlemeler geri alındı. */

.product-detail-page {
  padding: 20px 0;
  background: white;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  display: flex;
  gap: 8px;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.breadcrumb .current {
  color: #333;
  font-weight: 500;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.product-gallery {
  display: flex;
  flex-direction: column;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
}

.gallery-item {
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  padding: 10px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 200px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.product-info {
  padding: 20px 0;
}

.product-title {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.3;
}

.rating-favorite {
  margin-bottom: 20px;
}

/* Eski rating stilleri geri getirildi */
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating-value {
  font-weight: 700;
  color: #333;
}

.stars {
  color: #FFA500;
}

.review-count {
  color: #666;
  font-size: 0.9em;
}

.favorite-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-badge {
  color: #e74c3c;
  font-weight: 500;
}

.favorite-count {
  color: #666;
  font-size: 0.9em;
}

.prices {
  margin-bottom: 20px;
}

.original-price {
  font-size: 1.2em;
  color: #999;
  text-decoration: line-through;
  margin-right: 10px;
}

.current-price {
  font-size: 2em;
  font-weight: 700;
  color: #e74c3c;
}

.installment-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.installment-info p {
  margin: 0 0 10px 0;
  color: #333;
  font-weight: 500;
}

.bank-logos {
  display: flex;
  gap: 10px;
}

.bank-logo {
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
  border: 1px solid #ddd;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 25px 0;
}

.color-selection {
  margin-bottom: 25px;
}

.color-selection h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.color-options {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: translateY(-2px);
}

.color-option.selected {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.color-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e5e5;
  margin-bottom: 8px;
}

.color-option.selected .color-image {
  border-color: #e74c3c;
}

.color-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.color-name {
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

.color-option.selected .color-name {
  color: #e74c3c;
  font-weight: 600;
}

.size-selection {
  margin-bottom: 25px;
}

.size-selection h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.size-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-option {
  padding: 10px 15px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.size-option:hover {
  border-color: #999;
}

.size-option.selected {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.add-to-cart-section {
  margin-bottom: 20px;
}

.add-to-cart-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #c0392b;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.wishlist-count {
  text-align: center;
  color: #666;
  font-size: 0.9em;
  margin: 0;
}

.shipping-info {
  background: #e8f5e8;
  padding: 12px 15px;
  border-radius: 6px;
  border-left: 4px solid #27ae60;
  margin-bottom: 25px;
}

.shipping-info p {
  margin: 0;
  color: #2e7d32;
  font-weight: 500;
}

.product-tabs {
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  border-bottom-color: #e74c3c;
  color: #e74c3c;
  font-weight: 600;
}

.tab-pane {
  padding: 20px 0;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .color-options {
    gap: 10px;
  }
  
  .color-image {
    width: 50px;
    height: 50px;
  }
}
</style>