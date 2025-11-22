<template>
  <div class="product-filter">
    <div class="filter-section">
      <h4 class="filter-title">Önceki Filtrelerimiz</h4>
      <div class="filter-options">
        <label class="filter-option">
          <input
            type="checkbox"
            value="lumberjack"
            v-model="selectedFilters.previous"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          Lumberjack
        </label>
      </div>
    </div>
    <div class="filter-section">
      <button class="clear-filters" @click="clearAllFilters">
        <span class="clear-icon">×</span>
        Tüm Filtreleri Temizle
      </button>
    </div>
    <div class="filter-section">
      <div class="filter-header">
        <h4 class="filter-title">Kategori</h4>
        <button class="show-more">Daha Fazla Göster</button>
      </div>
      <div class="filter-options">
        <label v-for="category in categories" :key="category.value" class="filter-option">
          <input
            type="checkbox"
            :value="category.value"
            v-model="selectedFilters.categories"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          {{ category.label }}
        </label>
      </div>
      <button class="apply-selection">Seçimi Uygula</button>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Cinsiyet</h4>
      <div class="filter-options">
        <label class="filter-option">
          <input
            type="checkbox"
            value="kadin"
            v-model="selectedFilters.gender"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          Kadın
        </label>
        <label class="filter-option">
          <input
            type="checkbox"
            value="erkek"
            v-model="selectedFilters.gender"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          Erkek
        </label>
        <label class="filter-option">
          <input
            type="checkbox"
            value="cocuk"
            v-model="selectedFilters.gender"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          Çocuk
        </label>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Beden</h4>
      <div class="size-options">
        <button 
          v-for="size in sizes" 
          :key="size"
          :class="['size-option', { active: selectedFilters.sizes.includes(size) }]"
          @click="toggleSize(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Marka</h4>
      <div class="filter-options">
        <label v-for="brand in brands" :key="brand.value" class="filter-option">
          <input
            type="checkbox"
            :value="brand.value"
            v-model="selectedFilters.brands"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          {{ brand.label }}
        </label>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Renk</h4>
      <div class="color-options">
        <button 
          v-for="color in colors" 
          :key="color.value"
          :class="['color-option', { active: selectedFilters.colors.includes(color.value) }]"
          :style="{ backgroundColor: color.code }"
          @click="toggleColor(color.value)"
        >
          <span class="color-check" v-if="selectedFilters.colors.includes(color.value)">✓</span>
        </button>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Dış Malzeme</h4>
      <div class="filter-options">
        <label v-for="material in materials" :key="material.value" class="filter-option">
          <input
            type="checkbox"
            :value="material.value"
            v-model="selectedFilters.materials"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          {{ material.label }}
        </label>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Satıcı</h4>
      <div class="filter-options">
        <label class="filter-option">
          <input
            type="checkbox"
            value="trendyol"
            v-model="selectedFilters.sellers"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          Trendyol
        </label>
      </div>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Fiyat Aralığı</h4>
      <div class="price-inputs">
        <input
          type="number"
          placeholder="En az"
          v-model.number="priceRange[0]"
          @change="handlePriceChange"
          class="price-input"
        >
        <span class="price-separator">-</span>
        <input
          type="number"
          placeholder="En çok"
          v-model.number="priceRange[1]"
          @change="handlePriceChange"
          class="price-input"
        >
      </div>
      <button class="apply-price" @click="applyPriceRange">Uygula</button>
    </div>
    <div class="filter-section">
      <h4 class="filter-title">Puan Filtreleme</h4>
      <div class="rating-options">
        <label v-for="rating in ratings" :key="rating.value" class="filter-option">
          <input
            type="checkbox"
            :value="rating.value"
            v-model="selectedFilters.ratings"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          <div class="stars">
            <span v-for="star in 5" :key="star" class="star">
              {{ star <= rating.value ? '★' : '☆' }}
            </span>
          </div>
          <span class="rating-text">{{ rating.text }}</span>
        </label>
      </div>
    </div>
    <div class="filter-section">
      <label class="filter-option coupon-option">
        <input
          type="checkbox"
          v-model="selectedFilters.coupon"
          @change="handleFilterChange"
        >
        <span class="checkmark"></span>
        Kuponlu Ürünler
      </label>
    </div>
    <div class="filter-section">
      <label class="filter-option shipping-option">
        <input
          type="checkbox"
          v-model="selectedFilters.freeShipping"
          @change="handleFilterChange"
        >
        <span class="checkmark"></span>
        Kargo Bedava
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFilter',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedFilters: {
        previous: [],
        categories: [],
        gender: [],
        sizes: [],
        brands: [],
        colors: [],
        materials: [],
        sellers: [],
        ratings: [],
        coupon: false,
        freeShipping: false
      },
      priceRange: [0, 10000],
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
      brands: [
        { label: 'Nike', value: 'nike' },
        { label: 'Adidas', value: 'adidas' },
        { label: 'Puma', value: 'puma' },
        { label: 'Reebok', value: 'reebok' },
        { label: 'Lumberjack', value: 'lumberjack' },
        { label: 'Kinetix', value: 'kinetix' },
        { label: 'Lotto', value: 'lotto' }
      ],
      colors: [
        { value: 'beyaz', code: '#FFFFFF' },
        { value: 'siyah', code: '#000000' },
        { value: 'gri', code: '#808080' },
        { value: 'pembe', code: '#FFC0CB' },
        { value: 'mavi', code: '#0000FF' },
        { value: 'kırmızı', code: '#FF0000' },
        { value: 'yeşil', code: '#008000' },
        { value: 'sarı', code: '#FFFF00' }
      ],
      materials: [
        { label: 'Deri', value: 'deri' },
        { label: 'Süet', value: 'suet' },
        { label: 'Kumaş', value: 'kumas' },
        { label: 'Sentetik', value: 'sentetik' }
      ],
      ratings: [
        { value: 5, text: '5 Yıldız' },
        { value: 4, text: '4 Yıldız ve üzeri' },
        { value: 3, text: '3 Yıldız ve üzeri' },
        { value: 2, text: '2 Yıldız ve üzeri' }
      ]
    }
  },
  methods: {
    handleFilterChange() {
      this.$emit('filter-change', {
        ...this.selectedFilters,
        priceRange: this.priceRange
      })
    },
    handlePriceChange() {

    },
    applyPriceRange() {
      this.handleFilterChange()
    },
    toggleSize(size) {
      const index = this.selectedFilters.sizes.indexOf(size)
      if (index > -1) {
        this.selectedFilters.sizes.splice(index, 1)
      } else {
        this.selectedFilters.sizes.push(size)
      }
      this.handleFilterChange()
    },
    toggleColor(color) {
      const index = this.selectedFilters.colors.indexOf(color)
      if (index > -1) {
        this.selectedFilters.colors.splice(index, 1)
      } else {
        this.selectedFilters.colors.push(color)
      }
      this.handleFilterChange()
    },
    clearAllFilters() {
      this.selectedFilters = {
        previous: [],
        categories: [],
        gender: [],
        sizes: [],
        brands: [],
        colors: [],
        materials: [],
        sellers: [],
        ratings: [],
        coupon: false,
        freeShipping: false
      }
      this.priceRange = [0, 10000]
      this.handleFilterChange()
    }
  },
  emits: ['filter-change']
}
</script>

<style scoped>
.product-filter {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.filter-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.filter-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.show-more {
  font-size: 12px;
  color: #FF6600;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  padding: 4px 0;
}

.filter-option input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.filter-option input:checked + .checkmark {
  background: #FF6600;
  border-color: #FF6600;
}

.filter-option input:checked + .checkmark::after {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
}

.clear-filters {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters:hover {
  border-color: #FF6600;
  color: #FF6600;
}

.clear-icon {
  font-size: 16px;
  font-weight: bold;
}

.apply-selection,
.apply-price {
  width: 100%;
  background: #FF6600;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.3s ease;
}

.apply-selection:hover,
.apply-price:hover {
  background: #e55a00;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.size-option {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-option.active {
  background: #FF6600;
  color: white;
  border-color: #FF6600;
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-option {
  width: 32px;
  height: 32px;
  border: 2px solid #f0f0f0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.color-option.active {
  border-color: #FF6600;
}

.color-check {
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.price-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 2px;
}

.price-input:focus {
  outline: none;
  border-color: #FF6600;
}

.price-separator {
  color: #666;
  font-size: 14px;
}

.rating-options .filter-option {
  align-items: flex-start;
}

.stars {
  display: flex;
  gap: 2px;
  margin-right: 8px;
}

.star {
  font-size: 14px;
  color: #FFD700;
}

.rating-text {
  font-size: 13px;
  color: #666;
}

.coupon-option,
.shipping-option {
  font-weight: 600;
  color: #333;
}

.coupon-option input:checked + .checkmark,
.shipping-option input:checked + .checkmark {
  background: #FF6600;
  border-color: #FF6600;
}
</style>