<template>
  <div class="signup-page">
    <div class="signup-container">
      <SignupForm 
        @submit="handleRegister"
      />
    </div>
  </div>
</template>

<script>
import SignupForm from '@/components/molecules/SignupForm.vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'SignupPage',
  components: {
    SignupForm
  },
  setup() {
    const router = useRouter()
    const { register } = useAuth()
    
    const handleRegister = async (userData) => {
      try {
        await register(userData)
        router.push('/')
      } catch (error) {
        console.error('Register error:', error)
      }
    }
    
    return {
      handleRegister
    }
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.signup-container {
  width: 100%;
  max-width: 400px;
}
</style>