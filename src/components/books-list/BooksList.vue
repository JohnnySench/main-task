<template>
    <div>
        <div class="filters">
            <h2>Фильтры по параметрам</h2>
            Выберите автора
            <FilterSelectDBL
                :categoryFilter="aut"
                @selected="sortByAuthor"
                v-model="selectAuthor"
            />
            Выберите жанр
            <FilterSelectDBL
                :categoryFilter="gen"
                @selected="sortByGenre"
                v-model="selectGenre"
            />
            Выберите год публикации
            <FilterSelectDBL
                :categoryFilter="year"
                @selected="sortByYear"
                v-model="selectYear"
            />
        </div>
        <div class="sort">
            <div class="sort-by-price">
                <h2 style="cursor: pointer;" @click="isShowPriceSort = !isShowPriceSort">Сортировка по цене</h2>
                <button v-if="isShowPriceSort" type="button" @click="sortByPriceUp">Сначала недорогие</button>
                <button v-if="isShowPriceSort" type="button" @click="sortByPriceDown">Сначала дорогие</button>
            </div>
    
            <div class="sort-by-year">
                <h2 style="cursor: pointer;" @click="isShowYearSort = !isShowYearSort">Сортировка по году</h2>
                <button v-if="isShowYearSort" type="button" @click="sortByYearUp">Сначала старые</button>
                <button v-if="isShowYearSort" type="button" @click="sortByYearDown">Сначала новые</button>
            </div>
        </div>
       
        
        <RouterLink :to="{name: 'Busket'}">
            <v-btn
                class="btn-busket"
                variant="outlined"
            >Корзина: {{ BUSKET.length }}</v-btn>
        </RouterLink>
        <RouterLink :to="{name: 'CreateBook'}">
            <v-btn
                class="btn-create-book"
                variant="outlined"
            >Создай книгу</v-btn>
        </RouterLink>
        
        <div class="books-list">
            
            <BooksListItem 
                v-for="book in sortBySearchValue"
                :book_data="book"
                :key="book.article"
                @addBookToBusket="addToBusket"
            >
            </BooksListItem>
        </div>
        
    </div>
</template>

<script>
import FilterSelectDBL from '@/components/FilterSelectDBL.vue';
import BooksListItem from '@/components/books-list/BooksListItem.vue';
import { mapGetters, mapActions } from 'vuex';
    export default {
        name:'BooksList',
        components: {
            BooksListItem,
            FilterSelectDBL,
            
        },
        data:() => ({
            year: [],
            gen: [],
            aut: [],
            searchBook: [],
            selectAuthor: '',
            selectGenre: '',
            selectYear: '',
            isShowYearSort: false,
            isShowPriceSort: false,
            search: ''

        }),
        computed: {
            ...mapGetters([
                'LIBRARY',
                'BUSKET',
                'SEARCH_VALUE'
            ]),
            sortByAuthor() {
                return [...this.searchBook.filter(item => item.author.toLowerCase().includes(this.selectAuthor.toLowerCase()))]
            },
            sortByGenre() {
                return [...this.sortByAuthor.filter(item => item.genre.toLowerCase().includes(this.selectGenre.toLowerCase()))]
            },
            sortByYear() {
                return [...this.sortByGenre.filter(item => item.publish_year.toLowerCase().includes(this.selectYear.toLowerCase()))]
            },
            sortBySearchValue() {
                return this.sortByYear.filter(item => item.title.toLowerCase().includes(this.SEARCH_VALUE.toLowerCase()))
            },


            
        },  
        methods: {
            sortByPriceUp() {
                return [...this.searchBook.sort((a, b) => +a.price - +b.price)]
            },
            sortByPriceDown() {
                return [...this.searchBook.sort((a, b) => +b.price - +a.price)]
            },
            sortByYearUp() {
                return [...this.searchBook.sort((a, b) => a.publish_year - b.publish_year)]
            },
            sortByYearDown() {
                return [...this.searchBook.sort((a, b) => b.publish_year - a.publish_year)]
            },
            ...mapActions([
                'GET_BOOK_FROM_API',
                'ADD_TO_BUSKET'
            ]),
            addToBusket(data) {
                this.ADD_TO_BUSKET(data);
            },
        },
        async mounted() {
           await this.GET_BOOK_FROM_API();
           this.searchBook = this.LIBRARY;
           this.sortByYearDown();
           this.LIBRARY.forEach(item => {
                this.aut.push(item.author)
                this.gen.push(item.genre)
                this.year.push(item.publish_year)
           })
           this.aut = [...new Set(this.aut)]
           this.gen = [...new Set(this.gen)]
           this.year = [...new Set(this.year)]

        }

    }
</script>

<style scoped>
    .books-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        align-items: center;
    }
    .filters {
        position: fixed;
        width: 275px;
        left: 20px;
        top: 200px;
        height: 100%;
    }
    .btn-create-book {
        position: fixed;
        right: 70px;
        top: 200px;
    }
    .btn-busket {
        position: fixed;
        right: 70px;
        top: 250px;
    }
    .sort {
        position: fixed;
        top: 300px;
        right: 40px;
        display: flex;
        flex-direction: column;
    }
    .sort-by-price {
        display: flex;
        flex-direction: column;
    }
    .sort-by-year {
        display: flex;
        flex-direction: column;
    }
</style>