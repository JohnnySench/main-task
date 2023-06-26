<template>
    <div>
        <div class="filters">
            <h2>Фильтры по параметрам</h2>
            <div class="wrapper-filters">
                <span class="type-sort">Выберите автора</span>
                <FilterSelectDBL
                    :categoryFilter="aut"
                    @selected="sortByAuthor"
                    v-model="selectAuthor"
                />
            </div>
            <div class="wrapper-filters">
                <span class="type-sort">Выберите жанр</span>
                <FilterSelectDBL
                    :categoryFilter="gen"
                    @selected="sortByGenre"
                    v-model="selectGenre"
                />
            </div>
            <div class="wrapper-filters">
                <span class="type-sort">Выберите год публикации</span>
                <FilterSelectDBL
                    class="filter_year"
                    :categoryFilter="year"
                    @selected="sortByYear"
                    v-model="selectYear"
                />
            </div>
        </div>
        <div class="sort">
            <div class="sort-by-price">
                <h3 style="cursor: pointer;" @click="isShowPriceSort = !isShowPriceSort">Сортировка по цене</h3>
                <button v-if="isShowPriceSort" type="button" @click="sortByPriceUp">Сначала недорогие</button>
                <button v-if="isShowPriceSort" type="button" @click="sortByPriceDown">Сначала дорогие</button>
            </div>
    
            <div class="sort-by-year">
                <h3 style="cursor: pointer;" @click="isShowYearSort = !isShowYearSort">Сортировка по году</h3>
                <button v-if="isShowYearSort" type="button" @click="sortByYearUp">Сначала старые</button>
                <button v-if="isShowYearSort" type="button" @click="sortByYearDown">Сначала новые</button>
            </div>
        </div>
       
        <div class="actions-btns">
            <RouterLink :to="{name: 'Busket'}">
                <v-btn
                    prepend-icon="mdi-cart"
                    class="btn-busket"
                    variant="outlined"
                >Корзина: {{ BUSKET.length }}</v-btn>
                <v-btn
                    prepend-icon="mdi-cart"
                    class="btn-busket-small"
                    variant="outlined"
                ></v-btn>
            </RouterLink>
            <RouterLink :to="{name: 'CreateBook'}">
                <v-btn
                    prepend-icon="mdi-book-edit"
                    class="btn-create-book"
                    variant="outlined"
                >Создай книгу</v-btn>
                <v-btn
                    prepend-icon="mdi-book-edit"
                    class="btn-create-book-small"
                    variant="outlined"
                ></v-btn>
            </RouterLink>
        </div>
        
        
        <div class="books-list">
            
            <BooksListItem 
                v-for="book in sortBySearchValue"
                :bookData="book"
                :key="book.article"
                @onAddBookToBusket="addBookToBusket"
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
            addBookToBusket(data) {
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
    .btn-create-book-small {
        display: none;
    }
    .btn-busket-small {
        display: none;
        position: absolute;
        right: 10px;
        top: 150px;
    }
    .books-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;
        align-items: center;
    }
    .filters {
        overflow: hidden;
        position: fixed;
        max-width: 205px;
        left: 10px;
        top: 200px;
        height: 100%;
    }
    .btn-create-book {
        position: fixed;
        right: 10px;
        top: 200px;
    }
    .btn-busket {
        position: fixed;
        right: 10px;
        top: 250px;
    }
    .sort {
        position: fixed;
        top: 300px;
        right: 10px;
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
    @media screen and (max-width: 1330px){
        .filters {
            left: 25%;
            position: absolute;
            display: flex;
            overflow: visible;
        }
        .filters h2 {
            display: none;
        }
        .books-list {
            margin-top: 200px;
        }
        .wrapper-filters {
            display: flex;
            flex-direction: column;
            margin-right: 10px;
        }
        .sort {
            position: absolute;
            top: 325px;
            right: 10%;
        }
        .btn-create-book {
           display: none;
        }
        .btn-busket {
            
            display: none;
        }
        .btn-busket-small {
            display: block;
            color: black;
        }
        .btn-create-book-small {
            display: block;
            position: absolute;
            right: 10px;
            top: 100px;
            color: black;
        }
    }
    @media screen and (max-width: 876px) {
        .filters {
            left: 10%;
            position: absolute;
            display: flex;
            overflow: visible;
        }
        .books-list {
            margin: 300px auto 0;
            max-width: 400px;
            grid-template-columns: 1fr 1fr;
        }
        .type-sort {
            font-size: 12px;
        }
        .btn-busket {
            font-size: 12px;
        }
        
        .btn-busket {
            display: none;
        }
        
        .btn-create-book {
            display: none;
        }
    }
    @media screen and (max-width: 560px) {
        .type-sort {
            display: none;
        }
        .books-list {
            margin: 150px auto 0;
            max-width: 400px;
            grid-template-columns: 1fr 1fr;
        }
        .sort {
            top: 155px;
        }
        .btn-busket-small {
            
            top: 150px;
            right: 70%;
        }
        .btn-create-book-small {
            top: 190px;
            right: 70%;
        }
        .sort {
            font-size: 12px;
        }
        
    }
       
</style>