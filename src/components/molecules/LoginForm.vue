<template>
  <div class="login-form">
    
    <div class="login-header">
      <h2>Merhaba,</h2>
      <p>Giriş yap veya Hesap Oluştur, fırsatları kaçırma!</p>
    </div>

    <div class="tab-buttons">
      <button 
        :class="['tab-button', activeTab === 'login' ? 'active' : '']"
        @click="activeTab = 'login'"
      >
        Giriş Yap
      </button>
      <router-link 
        to="/signup" 
        :class="['tab-button', activeTab === 'register' ? 'active' : '']"
        @click="activeTab = 'register'"
      >
        Üye Ol
      </router-link>
    </div>

    <div v-if="activeTab === 'login'" class="form-content">
      <div class="input-group">
        <Input 
          v-model="loginData.email"
          placeholder="E-Posta Adresi veya Telefon"
          class="form-input"
        />
      </div>
      
      <Button 
        @click="handleLogin" 
        variant="primary" 
        size="large" 
        class="full-width login-btn"
      >
        GİRİŞ YAP
      </Button>

      <!-- Sosyal Medya Girişleri -->
      <div class="social-login">
        <div class="divider">
          <span>veya</span>
        </div>
          
        <div class="social-buttons">
            <Button 
              @click="socialLogin('google')" 
              variant="outline" 
              size="medium" 
              class="social-button google-button"
            >
              <span class="social-icon"></span>
              Google ile Giriş Yap
            </Button>
            
            <Button 
              @click="socialLogin('apple')" 
              variant="outline" 
              size="medium" 
              class="social-button apple-button"
            >
              <span class="social-icon"></span>
              Apple ile Giriş Yap
            </Button>
            
            <Button 
              @click="socialLogin('facebook')" 
              variant="outline" 
              size="medium" 
              class="social-button facebook-button"
            >
              <span class="social-icon"></span>
              Facebook ile Giriş Yap
            </Button>
        </div>
      </div>
      <!-- Gizlilik Notu -->
      <p class="privacy-note">
        Kişisel verileriniz Aydınlatma Metni uyarınca işlenecektir. 
        Üçüncü taraf hesabınızla giriş yapmanız halinde Üyelik Sözleşmesi uygulanacaktır.
      </p>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'LoginForm',
  components: {
    Input,
    Button
  },
  data() {
    return {
      activeTab: 'login',
      loginData: {
        email: ''
      }
    }
  },
  methods: {
    handleLogin() {
      this.$emit('login', this.loginData)
    },
    socialLogin(provider) {
      this.$emit('social-login', provider)
    }
  },
  emits: ['login', 'social-login']
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h2 {
  color: #000;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.tab-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid #e0e0e0;
}

.tab-button {
  background: #f8f8f8;
  border: none;
  padding: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-button.active {
  background: white;
  color: #FF6600;
  font-weight: 600;
}

.tab-button:hover:not(.active) {
  background: #f0f0f0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  margin-bottom: 8px;
}

.form-input {
  margin-bottom: 0;
}

.login-btn {
  margin: 8px 0;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
}

.divider {
  text-align: center;
  position: relative;
  margin: 10px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
  position: relative;
  z-index: 2;
}

.privacy-note {
  font-size: 12px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-top: 20px;
}

.full-width {
  width: 100%;
}

.social-login {
  margin-top: 14px;
}

.social-buttons {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  height: 70px;
  font-size: 12px;
}

.google-button {
  border-color: #db4437;
  color: #db4437;
}

.google-button:hover:not(:disabled) {
  background-color: #f8eae9;
}

.apple-button {
  border-color: #000;
  color: #000;
}

.apple-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.facebook-button {
  border-color: #1877f2;
  color: #1877f2;
}

.facebook-button:hover:not(:disabled) {
  background-color: #eef4ff;
}
</style>