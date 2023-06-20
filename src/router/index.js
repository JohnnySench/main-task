import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '@/components/books-list/BooksList.vue';
import Busket from '@/components/busket/Busket.vue'
import CreateBook from '@/components/creation-book/CreateBook.vue'


const routes = [
  {
    path: '/',
    name: 'BooksList',
    component: BooksList
  },
  {
    path: '/busket',
    name: 'Busket',
    component: Busket
  },
  {
    path: '/createBook',
    name: 'CreateBook',
    component: CreateBook
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
