<!-- views/Login/Login.vue -->
<template>
  <div class="login-page">
    <div class="login-container">
      <LoginForm 
        @login="handleLogin"
        @social-login="handleSocialLogin"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/molecules/LoginForm.vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  setup() {
    const router = useRouter()
    const { login, socialLogin } = useAuth()
    
    const handleLogin = async (credentials) => {
      try {
        await login(credentials)
        router.push('/')
      } catch (error) {
        console.error('Login error:', error)
      }
    }
    
    const handleSocialLogin = async (provider) => {
      try {
        await socialLogin(provider)
        router.push('/')
      } catch (error) {
        console.error('Social login error:', error)
      }
    }
    
    return {
      handleLogin,
      handleSocialLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}
</style>