<template>
  <div class="product-filter">
    <div class="filter-section">
      <h4 class="filter-title">Kategoriler</h4>
      <div class="filter-options">
        <label v-for="category in categories" :key="category.value" class="filter-option">
          <input
            type="checkbox"
            :value="category.value"
            v-model="selectedCategories"
            @change="handleFilterChange"
          >
          <span class="checkmark"></span>
          {{ category.label }}
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Fiyat Aralığı</h4>
      <div class="price-range">
        <input
          type="range"
          min="0"
          :max="maxPrice"
          v-model="priceRange[0]"
          @change="handlePriceChange"
          class="price-slider"
        >
        <input
          type="range"
          min="0"
          :max="maxPrice"
          v-model="priceRange[1]"
          @change="handlePriceChange"
          class="price-slider"
        >
        <div class="price-values">
          <span>{{ priceRange[0] }} TL</span>
          <span>{{ priceRange[1] }} TL</span>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Sıralama</h4>
      <select v-model="sortBy" @change="handleSortChange" class="sort-select">
        <option value="name">İsme Göre (A-Z)</option>
        <option value="price-low">Fiyat (Düşük-Yüksek)</option>
        <option value="price-high">Fiyat (Yüksek-Düşük)</option>
        <option value="newest">En Yeniler</option>
        <option value="popular">Popüler</option>
      </select>
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
    },
    maxPrice: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      selectedCategories: [],
      priceRange: [0, this.maxPrice],
      sortBy: 'newest'
    }
  },
  methods: {
    handleFilterChange() {
      this.$emit('filter-change', {
        categories: this.selectedCategories,
        priceRange: this.priceRange,
        sortBy: this.sortBy
      })
    },
    handlePriceChange() {
      this.handleFilterChange()
    },
    handleSortChange() {
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
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
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
}

.price-range {
  position: relative;
}

.price-slider {
  width: 100%;
  margin: 8px 0;
}

.price-values {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.sort-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: #FF6600;
}
</style>