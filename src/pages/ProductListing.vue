<!-- pages/ProductListing.vue -->
<template>
  <div class="product-listing-page">
    <div class="container">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <ProductGrid 
        :products="displayedProducts"
        @product-click="handleProductClick"
      />
    </div>
  </div>
</template>

<script>
import ProductGrid from '@/components/organisms/ProductGrid.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

// 📸 Resim import'ları
import reebok from '@/assets/images/product1.jpg'
import lumberjack from '@/assets/images/product2.jpg'
import nike from '@/assets/images/product3.jpg'
import kinetix from '@/assets/images/product4.jpg'
import lotto from '@/assets/images/product5.jpg'
import Lumberjack2 from '@/assets/images/product6.jpg'

export default {
  name: 'ProductListing',
  components: {
    ProductGrid
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()

    // Tüm ürünler
    const allProducts = [
      {
        id: 1,
        name: 'Reebok VERSE Gri Kadın Koşu Ayakkabısı',
        imageUrl: reebok,
        oldprice: '3.499,99 TL',
        price: '2.799,99 TL',
        rating: 4.7,
        reviewCount: 246,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      },
      {
        id: 2,
        name: 'Lumberjack CHUCK WMN 5FX Beyaz',
        imageUrl: lumberjack,
        price: '2.299,99 TL',
        rating: 4.2,
        reviewCount: 451,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      },
      {
        id: 3,
        name: 'Nike WMNS INITIATOR Beyaz Kadın Sneaker',
        imageUrl: nike,
        price: '4.299,00 TL',
        rating: 4.8,
        reviewCount: 189,
        addedCount: 2,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      },
      {
        id: 4,
        name: 'Kinetix RIVAL PU W 5PR GRI Kadın Koşu Ayakkabısı',
        imageUrl: kinetix,
        price: '2.799,99 TL',
        rating: 4.5,
        reviewCount: 262,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      },
      {
        id: 5,
        name: 'Lotto VITTO WMN 4PR Pembe Kadın Koşu Ayakkabısı',
        imageUrl: lotto,
        price: '2.299,99 TL',
        rating: 4.6,
        reviewCount: 324,
        addedCount: 4,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      },
      {
        id: 6,
        name: 'Lumberjack CHUCK WMN 5FX Siyah Kadın Sneaker',
        imageUrl: Lumberjack2,
        price: '2.299,00 TL',
        rating: 4.9,
        reviewCount: 198,
        addedCount: 5,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin'
      }

    ]

    // Gösterilecek ürünleri belirle
    const displayedProducts = computed(() => {
      if (!props.category) {
        return allProducts // Ana sayfada TÜM ürünler
      }
      return allProducts.filter(product => product.category === props.category)
    })

    // Sayfa başlığı
    const pageTitle = computed(() => {
      const titles = {
        'kadin': 'Kadın Ürünleri',
        'erkek': 'Erkek Ürünleri', 
        'cocuk': 'Çocuk Ürünleri',
        'ayakkabi': 'Ayakkabı',
        'spor': 'Spor Ürünleri',
        'giyim': 'Giyim',
        'canta-aksesuar': 'Çanta ve Aksesuar',
        'markalar': 'Markalar',
        'indirim': 'İndirimli Ürünler'
      }
      return titles[props.category] || 'Öne Çıkan Ürünler'
    })

    const handleProductClick = (product) => {
      router.push(`/product/${product.id}`)
    }

    return {
      displayedProducts,
      pageTitle,
      handleProductClick
    }
  }
}
</script>

<style scoped>
.product-listing-page {
  padding: 20px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 1.8em;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .product-listing-page {
    padding: 15px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .page-title {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
}
</style>