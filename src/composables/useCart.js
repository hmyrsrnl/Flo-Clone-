import { ref, watch, computed } from 'vue';
const cartItems = ref([]);
const STORAGE_KEY = 'my-ecom-cart';
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
        cartItems.value = JSON.parse(storedCart);
    }
};

loadCartFromStorage();

export function useCart() {
    watch(cartItems, (newCart) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
    }, { deep: true });

    const addToCart = (product, selectedSize) => {
        const existingItem = cartItems.value.find(
            item => item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
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

    const totalItems = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    });
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