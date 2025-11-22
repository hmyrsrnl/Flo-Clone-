<template>
  <form class="signup-form" @submit.prevent="handleSubmit">

    <div class="login-header">
      <h2>Merhaba,</h2>
      <p>Giriş yap veya Hesap Oluştur, fırsatları kaçırma!</p>
    </div>

    <div class="tab-buttons">
      <router-link 
        to="/login"
        :class="['tab-button', activeTab === 'login' ? 'active' : '']"
        @click="activeTab = 'login'"
      >
        Giriş Yap
      </router-link>
      <button 
        to="/signup" 
        :class="['tab-button', activeTab === 'register' ? 'active' : '']"
        @click="activeTab = 'register'"
      >
        Üye Ol
      </button>
    </div>
    
    <div class="form-group">
      <label class="form-label">Telefon Numarası</label>
      <div class="phone-input-group">
        <div class="country-code">0 (</div>
        <Input
          placeholder="___"
          v-model="form.phonePart1"
          class="phone-part"
          maxlength="3"
        />
        <div class="country-code">)</div>
        <Input
          placeholder="______"
          v-model="form.phonePart2"
          class="phone-part"
          maxlength="6"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">E-Posta Adresi</label>
      <Input
        type="email"
        placeholder="E-posta adresinizi giriniz"
        v-model="form.email"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Şifre</label>
      <Input
        type="password"
        placeholder="Şifrenizi giriniz"
        v-model="form.password"
      />
      <div class="password-hint">
        Lütfen en az 8 karakter; 1 büyük harf ve 1 rakam giriniz.
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Cinsiyet</label>
      <div class="gender-group">
        <Button 
          type="button"
          :class="['gender-button', form.gender === 'female' ? 'active' : '']"
          @click="form.gender = 'female'"
        >
          KADIN
        </Button>
        <Button 
          type="button"
          :class="['gender-button', form.gender === 'male' ? 'active' : '']"
          @click="form.gender = 'male'"
        >
          ERKEK
        </Button>
      </div>
    </div>

    <div class="checkbox-group">
      <Checkbox v-model="form.kvkk1">
        Kampanya ve iletişim verilerinin tercih ettiğim iletişim bilgilerine 
        e-posta, sms, vb. ticari elektronik ileti gönderilmesi amaçlıyla 
        işlenmesini kabul ediyorum.
      </Checkbox>
      
      <Checkbox v-model="form.kvkk2" class="complex-checkbox">
        Kampanya, iletişim, müşteri işlem ve pazarlama verilerinin
        profilleme ve analiz faaliyetleri kapsamında işlenmesi dahil 
        olmak üzere pazarlama, segmentasyon ve CRM süreçlerinin 
        yürütülmesi amacıyla işlenmesini kabul ediyorum.
      </Checkbox>

      <div class="kvkk-info">
        Kişisel verilerinizin FLO Mağazacılık ve Pazarlama A.Ş. 
        tarafından işlenmesine yönelik bilgilendirme metnine 
        <a href="#" class="kvkk-link">buradan</a> ulaşabilirsiniz.
        "Üye Ol" butonuna basarak Üyelik Sözleşmesi'ni kabul ediyorsunuz.
      </div>
    </div>

    <Button 
      type="submit" 
      variant="primary" 
      size="large" 
      :fullWidth="true"
      :disabled="!isFormValid"
      class="submit-button"
    >
      ÜYE OL
    </Button>

    <div class="social-signup">
      <div class="social-buttons">
        <Button 
          variant="outline" 
          size="large" 
          :fullWidth="true"
          class="social-button google-button"
        >
          <span class="social-icon"></span>
          Google ile Kayıt Ol
        </Button>
        
        <Button 
          variant="outline" 
          size="large" 
          :fullWidth="true"
          class="social-button apple-button"
        >
          <span class="social-icon"></span>
          Apple ile Kayıt Ol
        </Button>
        
        <Button 
          variant="outline" 
          size="large" 
          :fullWidth="true"
          class="social-button facebook-button"
        >
          <span class="social-icon"></span>
          Facebook ile Kayıt Ol
        </Button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'
import Checkbox from '../atoms/Checkbox.vue'

export default {
  name: 'SignupForm',
  components: {
    Input,
    Button,
    Checkbox
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const form = ref({
      phonePart1: '',
      phonePart2: '',
      email: '',
      password: '',
      gender: '',
      kvkk1: false,
      kvkk2: false
    })

    const isFormValid = computed(() => {
      return (
        form.value.phonePart1 &&
        form.value.phonePart2 &&
        form.value.email &&
        form.value.password &&
        form.value.gender &&
        form.value.kvkk1 &&
        form.value.kvkk2
      )
    })

    const handleSubmit = () => {
      if (isFormValid.value) {
        const fullPhone = `0 (${form.value.phonePart1}) ${form.value.phonePart2}`
        const formData = {
          ...form.value,
          phone: fullPhone
        }
        emit('submit', formData)
      }
    }

    return {
      form,
      isFormValid,
      handleSubmit,
      activeTab:'register'
    }
  }
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

.signup-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.phone-input-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.country-code {
  color: #666;
  font-size: 14px;
  white-space: nowrap;
}

.phone-part {
  flex: 1;
}

.password-hint {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  line-height: 1.4;
}

.gender-group {
  display: flex;
  gap: 16px;
}

.gender-button {
  flex: 5;
  padding: 12px;
  border: 1px solid #ddd;
  background: #f8f8f8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.gender-button.active {
  background: #FF6600;
  background-color: #FF6600;
  color: white;
  font-weight: 600;
}

.gender-button:hover:not(.active) {
  background: #f0f0f0;
  border-color: #ccc;
}

.checkbox-group {
  margin-bottom: 24px;
}

.complex-checkbox {
  margin-top: 12px;
}

.checkbox-content {
  line-height: 1.4;
}

.checkbox-text {
  font-size: 14px;
  color: #333;
}

.kvkk-info {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.kvkk-link {
  color: #FF6600;
  text-decoration: none;
}

.kvkk-link:hover {
  text-decoration: underline;
}

.submit-button {
  margin-bottom: 14px;
}

.social-signup {
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