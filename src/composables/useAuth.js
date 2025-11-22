import { ref } from 'vue';

/**
 * useAuth: Kullanıcı kimlik doğrulama durumunu yöneten temel Composable.
 * Firebase/API entegrasyonu daha sonra buraya gelecektir.
 */
export function useAuth() {
  // Kullanıcının oturum açmış olup olmadığını tutar
  const isAuthenticated = ref(false); 
  
  // Kullanıcı objesini tutar
  const user = ref(null); 

  const login = (username, password) => {
    // Şimdilik sadece simülasyon
    console.log(`[Auth]: Giriş denemesi: ${username}`);
    isAuthenticated.value = true;
    user.value = { id: 1, name: 'FLO User' };
    return Promise.resolve(true);
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
}