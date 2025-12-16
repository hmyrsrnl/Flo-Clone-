<template>
  <header class="header">
    <div class="top-banner">
      <div class="container top-container">
        <span class="app-text">Mobil Uygulamayı <strong>Hemen İndir</strong></span>
        <div class="top-links">
          <a href="#">Kuponlarım</a>
          <span>|</span>
          <a href="#">Sipariş Takibi</a>
          <span>|</span>
          <a href="#">Kolay iade</a>
          <span>|</span>
          <a href="#">Müşteri Hizmetleri</a>
        </div>
      </div>
    </div>
    <div class="main-nav">
      <div class="container main-container">
        <div class="nav-left">
          <router-link to="/" class="logo">
            <img 
              src="@/assets/images/logo.svg" 
              alt="FLO" 
              class="logo-image"
            >
          </router-link>
          <nav class="main-categories">
            <router-link to="/category/kadin">Kadın</router-link>
            <router-link to="/category/erkek">Erkek</router-link>
            <router-link to="/category/cocuk">Çocuk</router-link>
          </nav>
        </div>

        <div class="search-section">
          <div class="search-box">
            <input type="text" placeholder="Örneğin: Bot" />
          </div>
        </div>

        <div class="nav-right">
          <router-link to="/login" class="icon-btn">
            <span>Giriş Yap</span>
          </router-link>
          <AccountDropdown>
            <template #trigger>
              <div class="icon-btn">
                <span>Hesabım</span>
              </div>
            </template>
          </AccountDropdown>

          <router-link to="/cart" class="icon-btn cart-btn">
            <span>Sepetim</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="sub-nav">
      <div class="container sub-container">
        <nav class="sub-categories">
          <MegaMenu 
            title="Ayakkabı" 
            :menu-data="menuData.ayakkabi" 
            
          />
          <MegaMenu 
            title="Spor" 
            :menu-data="menuData.spor" 
            :columns="6" 
          />
          <MegaMenu 
            title="Giyim" 
            :menu-data="menuData.giyim" 
            :columns="6" 
          />
          <MegaMenu 
            title="Çanta ve Aksesuar" 
            :menu-data="menuData.canta" 
            :columns="6" 
          />
          <MegaMenu 
            title="Markalar" 
            :menu-data="menuData.markalar" 
            :columns="6" 
          />
          <MegaMenu 
            title="İndirim" 
            :menu-data="menuData.indirim" 
            :columns="6" 
          />

          <router-link to="/products" class="simple-link">Tüm Kategoriler</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import AccountDropdown from './AccountDropdown.vue'
import MegaMenu from './MegaMenu.vue'
import { menuData } from '@/data/menuData.js'

export default {
  name: 'Header',
  components: {
    AccountDropdown,
    MegaMenu
  },
  setup() {
    const cartItemCount = computed(() => 1)

    return {
      cartItemCount,
      menuData
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px; 
  margin: 0 auto;
  padding: 0 20px; 
}

.header {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.top-banner {
  background: #f9f9f9;
  padding: 7px 0;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}

.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px; 
}

.top-links {
  display: flex;
  gap: 8px;
}

.sub-categories > *:not(.simple-link) {
  flex: 1;
  text-align: center;
  height: 100%;
}

a {
  text-decoration: none;
  color: #444;
}

.top-links a:hover {
  color: #FF6600;
}


.main-nav {
  padding: 10px 0;
  background: #fff;
}

.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  max-width: 1200px; 
  margin: 0 auto;
  padding: 0 20px; 
}

.logo h1 {
  color: #FF6600;
  font-size: 32px;
  font-weight: 900;
  margin: 0;
}

.main-categories {
  display: flex;
  gap: 25px;
  flex-shrink: 0;
}

.main-categories a {
  font-size: 17px;
  color: #222;
  font-weight: 500;
}

.main-categories a.router-link-active,
.main-categories a:hover {
  color: #FF6600;
}

.search-section {
  flex: 1;
  max-width: 600px;
   margin: 0 20px; 
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px 14px;
  border-radius: 8px;
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 15px;
}

.search-icon {
  margin-right: 8px;
  opacity: 0.8;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 18px;
   flex-shrink: 0;
}

.icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  color: #444;
  cursor: pointer;
  text-decoration: none;
}

.icon-btn:hover span {
  color: #FF6600;
}

.icon {
  font-size: 20px;
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: #FF6600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
}

.sub-nav {
  background: #fafafa;
  border-top: 1px solid #eee;
  padding: 15px 0;
}

.sub-categories {
  display: flex;
  align-items: center;
  gap: 35px;
  justify-content: flex-start;
  font-weight: 600;
  height: 40px;
  flex-wrap: nowrap; 
  min-width: max-content; 
}

.sub-categories > * {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
  flex-shrink: 0;
}

.sub-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.sub-categories a {
  color: #333;
  font-size: 15px;
  font-weight: 600; 
  
}

.sub-categories a:hover,
.sub-categories a.router-link-active {
  color: #FF6600;
  font-weight: 700;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-image {
  height: 40px; 
  width: auto; 
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 25px; 
  flex-shrink: 0;
}
</style>
