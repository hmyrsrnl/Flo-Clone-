<!-- components/atoms/Checkbox.vue -->
<template>
  <label :class="['checkbox-container', { disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :disabled="disabled"
      class="checkbox-input"
    />
    <span :class="['checkbox-custom', { checked: modelValue }]">
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  line-height: 1.4;
}

.checkbox-container.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-custom.checked {
  border-color: #FF6600;
  background-color: #FF6600;
}

.checkbox-label {
  color: #333;
  flex: 1;
}

.checkbox-container:hover .checkbox-custom:not(.checked) {
  border-color: #ccc;
}

.checkbox-container.disabled .checkbox-custom {
  background-color: #f5f5f5;
  border-color: #eee;
}
</style>