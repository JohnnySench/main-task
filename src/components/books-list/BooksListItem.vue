<template>
    <div class="books-item">
        <v-card
          max-height="400px"
          max-width="270px"
          class="mx-auto py-6 px-6"
          width="344"
        >
        <v-img
            :src="`${book_data.image}`"
            class="mx-auto"
            max-width="100px"
            height="200px"
            cover
        >
        </v-img>
  
      <v-card-title>
        {{book_data.title}}
      </v-card-title>
  
      <v-card-subtitle>
        {{book_data.author}}
      </v-card-subtitle>
      <v-card-title>
        {{ book_data.price }}.00 руб.
      </v-card-title>
      <v-btn 
        v-if="book_data.available"
        color="blue"
        @click="addToBusket"
      >
        Добавить в корзину
      </v-btn>
      <v-card-title v-else>
        Нет в наличии
      </v-card-title>

    </v-card>

    </div>
</template>

<script>
    export default {
        name: 'BooksListItem',
        props: {
            book_data: {
                type: Object,
                default:() => {}  
            }
        },
        methods: {
          addToBusket() {
            this.$emit('addBookToBusket', this.book_data)
          }
        },
        mounted() {
            this.book_data['count'] = 1;
        }
    }
</script>

<style scoped>
    
</style>