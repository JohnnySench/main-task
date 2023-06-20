<template>
    <div class="books-created-list">
        <div v-for="(book, i) in sortBySearchValue"
            :key="i">
        <v-card
            style="box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);"
            max-height="410px"
            max-width="270px"
            class="mx-auto py-6 px-6"
            width="344"
        >
        <div class="remove_item">
                <v-btn
                    class="btn_remove"
                     icon="$close" 
                     variant="text"
                     @click="deleteCreatedBook(i)">
                </v-btn>
            </div>
        <v-img
            :src="`${book.image}`"
            class="mx-auto"
            max-width="100px"
            height="150px"
            cover
        >
        </v-img>
      <v-card-title>
        {{book.title}}
      </v-card-title>
      
      <v-card-subtitle>
        {{book.author}}
      </v-card-subtitle>
      <v-card-subtitle>
        {{book.publish_year}}
      </v-card-subtitle>
      <v-card-title>
        {{ book.price }}.00 руб.
      </v-card-title>
      <v-btn    
            @click="editingBook(book.id)"
            type="button"
            color="blue"
            >Редактировать книгу
        </v-btn>
        
    </v-card> 
    </div>
    <PopupEdit :book="book" v-model="modelValue"/>
    <div class="filters">
            <h2>Фильтры по параметрам</h2>
            Выберите автора
            <FilterSelectDBL
                :categoryFilter="authorList"
                @selected="sortByAuthor"
                v-model="selectAuthor"
            />
            Выберите жанр
            <FilterSelectDBL
                :categoryFilter="genreList"
                @selected="sortByGenre"
                v-model="selectGenre"
            />
            Выберите год публикации
            <FilterSelectDBL
                :categoryFilter="yearList"
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
    
    </div>
    
</template>

<script>
import PopupEdit from '@/components/creation-book/PopupEdit.vue';
import FilterSelectDBL from '@/components/FilterSelectDBL.vue';
import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'CreatedBookList',
        data: () => ({
            modelValue: false,
            booksCreated: [],
            authorList: [],
            genreList: [],
            yearList: [],
            selectAuthor: '',
            selectGenre: '',
            selectYear: '',
            isShowYearSort: false,
            isShowPriceSort: false,
            book: {
                title: '',
                genre: '',
                publish_year: '',
                price: '',
                image: '',
                id: '',
                author: ''
            },
            index: ''
        }),
        components: {
            FilterSelectDBL,
            PopupEdit
        },
        computed: {
            ...mapGetters([
                'CREATED_BOOK',
                'SEARCH_VALUE',
            ]),
            sortByAuthor() {
                return [...this.booksCreated.filter(item => item.author.toLowerCase().includes(this.selectAuthor.toLowerCase()))]
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
            editingBook(i) {
                console.log(i);
                let sort = [];
                this.booksCreated.forEach(item => sort.push(item));
                sort = [...sort.sort((a, b) =>  a.id - b.id)]
                this.book.title = sort[i - 1].title;
                this.book.genre = sort[i - 1].genre;
                this.book.price = sort[i - 1].price;
                this.book.id = sort[i - 1].id;
                this.book.publish_year = sort[i - 1].publish_year;
                this.book.author = sort[i - 1].author;
                this.book.image = sort[i - 1].image;
                console.log(sort);
                console.log(i);
                console.log(this.book);
                if (!this.modelValue) {
                        this.modelValue = true;
                }
                
              
                
              
            },
            sortByPriceUp() {
                return [...this.booksCreated.sort((a, b) => +a.price - +b.price)]
            },
            sortByPriceDown() {
                return [...this.booksCreated.sort((a, b) => +b.price - +a.price)]
            },
            sortByYearUp() {
                return [...this.booksCreated.sort((a, b) => a.publish_year - b.publish_year)]
            },
            sortByYearDown() {
                return [...this.booksCreated.sort((a, b) => b.publish_year - a.publish_year)]
            },
            ...mapActions([
                'DELETE_CREATED_BOOK',
                'GET_CREATED_BOOK',
                'RESET_SEARCH_VALUE'
            ]), 
            deleteCreatedBook(i) {
                this.DELETE_CREATED_BOOK(i);
            },
        },
        async mounted() {
            await this.GET_CREATED_BOOK();
            await this.RESET_SEARCH_VALUE();
            this.booksCreated = this.CREATED_BOOK;
            this.sortByYearDown();
            this.booksCreated.forEach(item => {
                this.authorList.push(item.author)
                this.genreList.push(item.genre)
                this.yearList.push(item.publish_year)
            })
            this.authorList = [...new Set(this.authorList)]
            this.genreList = [...new Set(this.genreList)]
            this.yearList = [...new Set(this.yearList)]
                
        },

    }
</script>

<style scoped>
     .books-created-list {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        align-items: center;
    }
    .remove_item {
        text-align: right;
    }
    .filters {
        position: fixed;
        width: 275px;
        left: 20px;
        top: 210px;
        height: 100%;
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