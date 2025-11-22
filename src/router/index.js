import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Cart from '../pages/Cart.vue'
import Signup from '../pages/Signup.vue'
import ProductListing from '../pages/ProductListing.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true 
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true 
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
   {
    path: '/products',
    name: 'Products',
    component: ProductListing
  },
  {
    path: '/category/:category',
    name: 'CategoryProducts',
    component: ProductListing
  },
  {
    path: '/category/kadin',
    name: 'WomenCategory',
    component: ProductListing,
    props: { category: 'kadin' }
  },
  {
    path: '/category/erkek', 
    name: 'MenCategory',
    component: ProductListing,
    props: { category: 'erkek' }
  },
  {
    path: '/category/cocuk',
    name: 'KidsCategory', 
    component: ProductListing,
    props: { category: 'cocuk' }
  },
  {
    path: '/category/ayakkabi',
    name: 'ShoesCategory',
    component: ProductListing,
    props: { category: 'ayakkabi' }
  },
  {
    path: '/category/spor',
    name: 'SportsCategory',
    component: ProductListing, 
    props: { category: 'spor' }
  },
  {
    path: '/category/giyim',
    name: 'ClothingCategory',
    component: ProductListing,
    props: { category: 'giyim' }
  },
  {
    path: '/category/canta-aksesuar',
    name: 'BagAccessoryCategory',
    component: ProductListing,
    props: { category: 'canta-aksesuar' }
  },
  {
    path: '/category/markalar',
    name: 'BrandsCategory',
    component: ProductListing,
    props: { category: 'markalar' }
  },
  {
    path: '/category/indirim',
    name: 'DiscountCategory',
    component: ProductListing,
    props: { category: 'indirim' }
  },
  {
    path: '/profile',
    name : 'UserProfile',
    component: Profile 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router