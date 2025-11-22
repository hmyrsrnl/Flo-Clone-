<template>
  <div class="input-container">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.input-container {
  width: 100%;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #FF6600;
}

.input::placeholder {
  color: #999;
}
</style>