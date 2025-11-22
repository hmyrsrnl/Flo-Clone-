<template>
  <div class="home">
    <!-- Slider - Sadece resimler -->
    <HeroSlider
      :slides="sliderData"
      :auto-slide="true"
      :slide-interval="5000"
    />

    <!-- Kampanyalar Bölümü -->
    <CampaignSection />
  </div>
    
</template>

<script>
import HeroSlider from '../components/organisms/HeroSlider.vue'
import CampaignSection from '../components/organisms/CampaignSection.vue'
import slider1 from '../assets/images/slider1.jpg'
import slider2 from '../assets/images/slider2.jpg'
import slider3 from '../assets/images/slider3.jpg'

export default {
  name: 'HomePage',
  components: {
    HeroSlider,
    CampaignSection
  },
  data() {
    return {
      sliderData: [
        {
          imageUrl: slider1,
          link: '/categories/sonbahar'
        },
        {
          imageUrl: slider2,
          link: '/categories/flo-para'
        },
        {
          imageUrl: slider3,
          link: '/categories/mont-polar'
        }
      ]
    }
  },
  methods: {
    goToProducts() {
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
.home {
  flex: 1;
}

/* Hero Bölümü Stilleri */
.hero {
  background: linear-gradient(135deg, #FF6600, #E55A00);
  color: white;
  padding: 80px 0;
  text-align: center;
  margin-top: 0;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #FF6600;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }
  
  .hero h1 {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 20px;
  }
  
  .hero h1 {
    font-size: 28px;
  }
}
</style>