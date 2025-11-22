import { ref, watch, computed } from 'vue';

// Sepet verisini reaktif olarak tutan merkezi değişken
const cartItems = ref([]);

// localStorage anahtarı
const STORAGE_KEY = 'my-ecom-cart';

// Sayfa yüklendiğinde sepet verisini Local Storage'dan yükle
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
        cartItems.value = JSON.parse(storedCart);
    }
};

// İlk yükleme
loadCartFromStorage();

export function useCart() {
    // cartItems her değiştiğinde bu veriyi Local Storage'a kaydet
    watch(cartItems, (newCart) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
    }, { deep: true });

    const addToCart = (product, selectedSize) => {
        // Ürünün sepette olup olmadığını kontrol et (ürün ID'si ve bedeni aynıysa)
        const existingItem = cartItems.value.find(
            item => item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
            // Zaten varsa sadece miktarı artır
            existingItem.quantity += 1;
        } else {
            // Yeni ürün ekle
            cartItems.value.push({
                ...product,
                selectedSize: selectedSize,
                quantity: 1
            });
        }
    };

    const removeFromCart = (productId, selectedSize) => {
        cartItems.value = cartItems.value.filter(
            item => !(item.id === productId && item.selectedSize === selectedSize)
        );
    };

    const updateQuantity = (productId, selectedSize, newQuantity) => {
        const item = cartItems.value.find(
            item => item.id === productId && item.selectedSize === selectedSize
        );
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
        }
    };

    // Sepetteki toplam ürün sayısını hesapla
    const totalItems = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Sepet toplam fiyatı
    const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    const clearCart = () => {
        cartItems.value = [];
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        cartTotal,
        clearCart
    };
}