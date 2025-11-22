<template>
  <div class="campaign-slider-container">
    <div 
      class="campaign-slider"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="(campaign, index) in campaigns"
        :key="index"
        class="campaign-slide"
      >
        <img 
          :src="campaign.image" 
          :alt="campaign.title || 'Kampanya'"
          class="campaign-slide-image"
          @click="handleCampaignClick(campaign)"
        >
      </div>
    </div>

    <div class="campaign-slider-dots">
      <button
        v-for="(_, index) in campaigns"
        :key="index"
        :class="['campaign-slider-dot', { 'campaign-slider-dot--active': currentSlide === index }]"
        @click="goToSlide(index)"
      >
        <span class="sr-only">Kampanya {{ index + 1 }}</span>
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CampaignSlider',
  props: {
    campaigns: {
      type: Array,
      required: true,
      default: () => []
    },
    autoSlide: {
      type: Boolean,
      default: true
    },
    slideInterval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      currentSlide: 0,
      autoSlideInterval: null
    }
  },
  methods: {
    goToSlide(slideIndex) {
      this.currentSlide = slideIndex
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.campaigns.length
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.campaigns.length - 1 : this.currentSlide - 1
    },
    startAutoSlide() {
      if (this.autoSlide && this.campaigns.length > 1) {
        this.autoSlideInterval = setInterval(this.nextSlide, this.slideInterval)
      }
    },
    pauseAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval)
        this.autoSlideInterval = null
      }
    },
    handleCampaignClick(campaign) {
      this.$emit('campaign-click', campaign)
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeUnmount() {
    this.pauseAutoSlide()
  },
  emits: ['campaign-click']
}
</script>

<style scoped>
.campaign-slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  margin: 20px 0;
  cursor: pointer;
}

.campaign-slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.campaign-slide {
  min-width: 100%;
  flex-shrink: 0;
  flex: 0 0 100%;
}

.campaign-slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 16px;
  
}

.campaign-slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.campaign-slider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.campaign-slider-dot--active {
  background-color: #FF6600;
  transform: scale(1.2);
}

.campaign-slider-dot:hover {
  background-color: #FF6600;
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .campaign-slide-image {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .campaign-slider-container {
    margin: 15px 0;
    border-radius: 12px;
  }
  
  .campaign-slide-image {
    height: 250px;
    border-radius: 12px;
  }
  
  .campaign-slider-dots {
    bottom: 15px;
  }

}

@media (max-width: 480px) {
  .campaign-slide-image {
    height: 200px;
  }
  
  .campaign-slider-dots {
    bottom: 10px;
  }
  
  .campaign-slider-dot {
    width: 6px;
    height: 6px;
  }

}
</style>