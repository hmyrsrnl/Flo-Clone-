<template>
  <select 
    :value="selectedSize" 
    @change="$emit('size-change', $event.target.value)"
    class="size-selector"
  >
    <option 
      v-for="size in sizes" 
      :key="size" 
      :value="size"
    >
      {{ size }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'SizeSelector',
  props: {
    sizes: {
      type: Array,
      default: () => []
    },
    selectedSize: {
      type: String,
      default: ''
    }
  },
  emits: ['size-change']
}
</script>

<style scoped>
.size-selector {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  width: 100%;
}

.size-selector:focus {
  outline: none;
  border-color: #FF6600;
  box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.1);
}
</style>