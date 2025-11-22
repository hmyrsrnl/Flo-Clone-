<template>
  <div class="rating-stars">
    <span class="rating-value">{{ rating }}</span>
    <div class="stars">
      <span 
        v-for="star in 5" 
        :key="star" 
        :class="['star', { 'filled': star <= Math.floor(rating) }]"
      >
        ★
      </span>
    </div>
    <span class="review-count">({{ reviewCount }})</span>
  </div>
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 5
    },
    reviewCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9em;
}

.rating-value {
  font-weight: 600;
  color: #333;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  color: #ddd;
  font-size: 0.9em;
}

.star.filled {
  color: #FFA500;
}

.review-count {
  color: #666;
  font-size: 0.85em;
}

.comment-icon {
  font-size: 0.9em;
}
</style>