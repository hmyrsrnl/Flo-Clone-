<template>
  <label :class="['radio-container', { disabled }]">
    <input
      type="radio"
      :value="value"
      :checked="isChecked"
      @change="$emit('update:modelValue', value)"
      :disabled="disabled"
      class="radio-input"
    />
    <span :class="['radio-custom', { checked: isChecked }]"></span>
    <span class="radio-label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isChecked() {
      return this.modelValue === this.value
    }
  }
}
</script>

<style scoped>
.radio-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.radio-container.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.radio-custom.checked {
  border-color: #FF6600;
  background-color: #FF6600;
}

.radio-custom.checked::after {
  content: '';
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
}

.radio-label {
  color: #333;
}

.radio-container:hover 
.radio-custom:not(.checked) {
  border-color: #ccc;
}

.radio-container.disabled 
.radio-custom {
  background-color: #f5f5f5;
  border-color: #eee;
}
</style>