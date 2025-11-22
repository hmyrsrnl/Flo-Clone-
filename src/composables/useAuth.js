import { ref } from 'vue';

export function useAuth() {
  const isAuthenticated = ref(false); 
  
  const user = ref(null); 

  const login = (username, password) => {
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