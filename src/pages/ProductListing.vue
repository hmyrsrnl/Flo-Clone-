<template>
  <div class="product-listing-page">
    <div class="container">
      <div class="page-layout">
        <aside class="filter-sidebar">
          <ProductFilter 
            :categories="filterCategories"
            :max-price="maxPrice"
            @filter-change="handleFilterChange"
          />
        </aside>
        <main class="product-content">
          <div class="content-header">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <div class="results-info">
              <span>{{ filteredProducts.length }} ürün listeleniyor</span>
            </div>
          </div>
          
          <ProductGrid 
            :products="filteredProducts"
            @product-click="handleProductClick"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGrid from '@/components/organisms/ProductGrid.vue'
import ProductFilter from '@/components/molecules/ProductFilter.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

import reebok from '@/assets/images/product1.jpg'
import lumberjack from '@/assets/images/product2.jpg'
import nike from '@/assets/images/product3.jpg'
import kinetix from '@/assets/images/product4.jpg'
import lotto from '@/assets/images/product5.jpg'
import Lumberjack2 from '@/assets/images/product6.jpg'

export default {
  name: 'ProductListing',
  components: {
    ProductGrid,
    ProductFilter
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()

    const selectedCategories = ref([])
    const priceRange = ref([0, 10000])
    const sortBy = ref('newest')

    const allProducts = [
      {
        id: 1,
        name: 'Reebok VERSE Gri Kadın Koşu Ayakkabısı',
        imageUrl: reebok,
        oldprice: '3.499,99 TL',
        price: '2.799,99 TL',
        priceValue: 2799.99,
        rating: 4.7,
        reviewCount: 246,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Reebok',
        color: 'Gri'
      },
      {
        id: 2,
        name: 'Lumberjack CHUCK WMN 5FX Beyaz',
        imageUrl: lumberjack,
        price: '2.299,99 TL',
        priceValue: 2299.99,
        rating: 4.2,
        reviewCount: 451,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Lumberjack',
        color: 'Beyaz'
      },
      {
        id: 3,
        name: 'Nike WMNS INITIATOR Beyaz Kadın Sneaker',
        imageUrl: nike,
        price: '4.299,00 TL',
        priceValue: 4299.00,
        rating: 4.8,
        reviewCount: 189,
        addedCount: 2,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Nike',
        color: 'Beyaz'
      },
      {
        id: 4,
        name: 'Kinetix RIVAL PU W 5PR GRI Kadın Koşu Ayakkabısı',
        imageUrl: kinetix,
        price: '2.799,99 TL',
        priceValue: 2799.99,
        rating: 4.5,
        reviewCount: 262,
        addedCount: 3,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Kinetix',
        color: 'Gri'
      },
      {
        id: 5,
        name: 'Lotto VITTO WMN 4PR Pembe Kadın Koşu Ayakkabısı',
        imageUrl: lotto,
        price: '2.299,99 TL',
        priceValue: 2299.99,
        rating: 4.6,
        reviewCount: 324,
        addedCount: 4,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Lotto',
        color: 'Pembe'
      },
      {
        id: 6,
        name: 'Lumberjack CHUCK WMN 5FX Siyah Kadın Sneaker',
        imageUrl: Lumberjack2,
        price: '2.299,00 TL',
        priceValue: 2299.00,
        rating: 4.9,
        reviewCount: 198,
        addedCount: 5,
        features: ['Kargo Bedava', 'Kupon Fırsatı', '360 Görünüm'],
        category: 'kadin',
        brand: 'Lumberjack',
        color: 'Siyah'
      }
    ]

    const filterCategories = [
      { label: 'Ayakkabı', value: 'ayakkabi' },
      { label: 'Spor Giyim', value: 'spor-giyim' },
      { label: 'Günlük Giyim', value: 'gunluk-giyim' },
      { label: 'Aksesuar', value: 'aksesuar' },
      { label: 'Outdoor', value: 'outdoor' }
    ]

    const maxPrice = 10000

    const handleFilterChange = (filters) => {
      selectedCategories.value = filters.categories
      priceRange.value = filters.priceRange
      sortBy.value = filters.sortBy
    }

    const filteredProducts = computed(() => {
      let filtered = allProducts.filter(product => {
        if (props.category && product.category !== props.category) {
          return false
        }
        
        const price = product.priceValue
        if (price < priceRange.value[0] || price > priceRange.value[1]) {
          return false
        }
        
        if (selectedCategories.value.length > 0) {
          
        }
        
        return true
      })

      switch (sortBy.value) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'price-low':
          filtered.sort((a, b) => a.priceValue - b.priceValue)
          break
        case 'price-high':
          filtered.sort((a, b) => b.priceValue - a.priceValue)
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
        case 'popular':
          filtered.sort((a, b) => b.rating - a.rating)
          break
      }

      return filtered
    })

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
      filteredProducts,
      pageTitle,
      filterCategories,
      maxPrice,
      handleFilterChange,
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

.page-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.filter-sidebar {
  position: sticky;
  top: 20px;
}

.product-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.page-title {
  font-size: 1.8em;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.results-info {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .product-listing-page {
    padding: 15px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .page-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .filter-sidebar {
    position: static;
    order: 2;
  }
  
  .product-content {
    order: 1;
    padding: 16px;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .page-title {
    font-size: 1.5em;
  }
}
</style>