<template>
  <div id="app">
    <!-- 1. Header (Tüm Sayfalarda Sabit) -->
    <Header @show-login="switchToLogin" />

    <!-- 2. Ana İçerik Alanı: Sayfalar BURADA YÜKLENECEK -->
    <main class="main-content">
      <router-view :key="$route.fullPath" /> <!-- KRİTİK: Home, Products, Cart sayfaları buraya gelir -->
    </main>

    <!-- 3. Footer (Tüm Sayfalarda Sabit) -->
    <Footer />
    
    <!-- Modallar (Tüm Sayfaların Üzerinde) -->
    <!-- Not: AuthModal'a geçiş yapmanız, bu iki modalı yönetmeyi kolaylaştırır -->
    <LoginModal 
      :is-visible="showLoginModal"
      @close="showLoginModal = false"
      @login="handleLogin"
      @social-login="handleSocialLogin"
      @switch-to-signup="switchToSignup"
    />
    
    <SignupModal 
      :is-visible="showSignupModal"
      @close="showSignupModal = false"
      @signup-success="handleRegister"
      @switch-to-login="switchToLogin"
    />
  </div>
</template>

<script>

import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
import LoginForm from './components/molecules/LoginForm.vue'
import SignupForm from './components/molecules/SignupForm.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginForm,
    SignupForm
  },
  data() {
    return {
      showLoginForm: false,
      showSignupForm: false
    }
  },
  methods: {
    handleLogin(credentials) {
      console.log('Giriş yapılıyor:', credentials)
      this.showLoginForm = false
    },
    handleRegister(userData) {
      console.log('Üye olunuyor:', userData)
      this.showSignupForm = false
    },
    handleSocialLogin(provider) {
      console.log('Sosyal medya ile giriş:', provider)
    },
    // Modallar arasında geçiş
    switchToLogin() {
      this.showSignupForm = false
      this.showLoginForm = true
    },
    switchToSignup() {
      this.showLoginForm = false
      this.showSignupForm = true
    }
  }
}
</script>

<style>
/* ... stilleriniz ... */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
/* Sayfa içeriğinin tüm boşluğu doldurması için */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex-grow: 1; /* router-view'ın tüm içeriği kaplamasını sağlar */
}
</style>
