<template>
    <div class="books-item">
        <v-card
            height="400px"
            max-width="250px"
            class="card-book mx-auto py-3 px-3"
        >
          <v-img
              :src="`${bookData.image}`"
              class="card-book-img mx-auto"
              max-width="100px"
              height="200px"
          >
          </v-img>
          <v-card-title class="card-book-title">
            {{bookData.title}}
          </v-card-title>
          <v-card-subtitle class="card-book-author">
            {{bookData.author}}
          </v-card-subtitle>
          <v-card-title class="card-book-price">
            {{ bookData.price }}.00 руб.
          </v-card-title>
          <v-btn 
            class="card-book-btn"
            v-if="bookData.available"
            color="blue"
            @click="onAddBookToBusket"
          >
            Добавить в корзину
          </v-btn>
          <v-card-title v-else class="card-book-title">
            Нет в наличии
          </v-card-title>
        </v-card>

    </div>
</template>

<script>
    export default {
        name: 'BooksListItem',
        props: {
            bookData: {
                type: Object,
                default:() => {}  
            }
        },
        methods: {
          onAddBookToBusket() {
            this.$emit('onAddBookToBusket', this.bookData)
          }
        },
        mounted() {
            this.bookData['count'] = 1;
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 876px) {
        .card-book {
          height: 320px !important;
          max-width: 200px !important;
        }
        .card-book-img {
          max-width: 70px !important;
          height: 150px !important;
        }
        .card-book-title {
          font-size: 16px;
        }
        .card-book-author {
          font-size: 13px;
        }
        .card-book-price {
          font-size: 13px;
        }
        .card-book-btn {
          font-size: 12px;
        }
    }
</style>