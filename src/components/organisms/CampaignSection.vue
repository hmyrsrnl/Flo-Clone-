<template>
  <div class="campaign-section container">
   
    <CampaignSlider 
      :campaigns="sliderCampaigns"
      :auto-slide="true"
      :slide-interval="4000"
      @campaign-click="handleSliderClick"
      class="campaign-slider-section"
    />
 
    <div class="mini-campaigns-grid">
      <CampaignCard 
        :image-url="campaign1"
        height="80px"
        background-size="contain"
        @cardClick="goToCampaign('/campaign/flovoo')"
      />
      <CampaignCard 
        :image-url="campaign2"
        height="80px"
        background-size="contain"
        @cardClick="goToCampaign('/new-arrivals')"
      />
    </div>

    <div class="main-campaign-banner">
      <CampaignCard 
        :image-url="campaign5"
        height="350px"
        @cardClick="goToCampaign('/bir-alana-bir-bedava')"
      />
    </div>

    <div class="discount-campaigns">
      <CampaignCard 
        v-for="(campaign, index) in discountCampaigns"
        :key="index"
        :image-url="campaign.imageUrl"
        height="180px"
        @cardClick="goToCampaign(campaign.link)"
      />
    </div>
  
  </div>
</template>

<script>
import CampaignCard from '../molecules/CampaignCard.vue';
import CampaignSlider from './CampaignSlider.vue';
import { useRouter } from 'vue-router'; 


import campaign1 from '@/assets/images/campaign1.jpg';
import campaign2 from '@/assets/images/campaign2.jpg';
import campaign3 from '@/assets/images/campaign3.jpg';
import campaign4 from '@/assets/images/campaign4.jpg';
import campaign5 from '@/assets/images/campaign5.jpg';
import campaign6 from '@/assets/images/campaign6.jpg';


import slider1 from '@/assets/images/campaignslider1.jpg';
import slider2 from '@/assets/images/campaignslider2.jpg';


export default {
  name: 'CampaignSection',
  components: {
    CampaignCard,
    CampaignSlider
  },
  setup() {
    const router = useRouter();

    const goToCampaign = (link) => {
      router.push(link);
    };

    const handleSliderClick = (campaign) => {
      router.push(campaign.link);
    };

    const sliderCampaigns = [
      { 
        image: slider1, 
        title: 'Özel Kampanya 1', 
        link: '/campaign/campaignslider1' 
      },
      { 
        image: slider2, 
        title: 'Özel Kampanya 2', 
        link: '/campaign/campaignslider2' 
      },
    ];

    const discountCampaigns = [
      {
        imageUrl: campaign3,
        link: '/campaign/mont-indirim'
      },
      {
        imageUrl: campaign4,
        link: '/campaign/indirim'
      }
    ];

    return {
      sliderCampaigns,
      handleSliderClick,
      floParaImage: campaign1, 
      campaign1,
      campaign2,
      campaign3,
      campaign4,  
      campaign5,
      campaign6,
      discountCampaigns,
      goToCampaign
    };
  }
}
</script>

<style scoped>
.campaign-section {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.campaign-slider-section {
  margin-bottom: 30px;
}

.main-campaign-banner {
  margin-bottom: 25px;
}

.main-campaign-banner .campaign-card {
  height: 350px;
  border-radius: 12px;
}

.mini-campaigns-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.mini-campaigns-grid .campaign-card {
  height: 120px;
}

.discount-campaigns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.discount-campaigns .campaign-card {
  height: 180px;
}

.category-campaigns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.category-campaigns .campaign-card {
  height: 140px;
}

@media (max-width: 768px) {
  .campaign-section {
    padding: 15px 0;
  }
  
  .campaign-slider-section {
    margin-bottom: 20px;
  }
  
  .main-campaign-banner .campaign-card {
    height: 150px;
  }
  
  .mini-campaigns-grid,
  .discount-campaigns,
  .category-campaigns {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .mini-campaigns-grid .campaign-card {
    height: 100px;
  }
  
  .discount-campaigns .campaign-card {
    height: 140px;
  }
  
  .category-campaigns .campaign-card {
    height: 120px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .main-campaign-banner .campaign-card {
    height: 120px;
  }
  
  .mini-campaigns-grid .campaign-card {
    height: 80px;
  }
  
  .discount-campaigns .campaign-card {
    height: 120px;
  }
  
  .category-campaigns .campaign-card {
    height: 100px;
  }
}
</style>