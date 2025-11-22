<template>
  <div 
    class="campaign-card"
    :style="{ 
      backgroundImage: `url(${imageUrl})`,
      height: height,
      backgroundSize: backgroundSize
    }"
    @click="$emit('cardClick')"
  >
  </div>
</template>

<script>
export default {
  name: 'CampaignCard',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '200px'
    },
    backgroundSize: {
      type: String,
      default: 'cover' 
    }
  },
  emits: ['cardClick']
}
</script>

<style scoped>
.campaign-card {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.campaign-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>