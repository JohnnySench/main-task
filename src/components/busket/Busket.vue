<template>
    <div>
        <h1>{{busketItem.length ? 'Корзина': 'Корзина пуста'}}</h1>
        <RouterLink :to="{name: 'BooksList'}">
            <v-btn
                class="btn-main"
                variant="outlined"
            >На главную</v-btn>
        </RouterLink>
        <BusketItem 
            v-for="(book, index) in sortBySearchValue"
            :busket="book"
            :key="book.article"
            @deleteFromBasket="deleteBook(index)"
            @decrement="decrementCount(index)"
            @increment="incrementCount(index)"
        >
        </BusketItem>
        <v-row v-if="BUSKET.length"
             style="align-items: center;"
            class="mt-4">
            <v-col cols="3">
                <v-text-field
                    hideDetails
                    label="Введите промокод"
                    type="text"
                    variant="outlined"
                    max-width
                >
                </v-text-field>
            </v-col>
            <v-col cols="3">
                <v-btn
                    class="px-10"
                    color="blue"
                    minHeight="56px"
                >
                    Применить
                 </v-btn>
            </v-col>
            <v-col>
                <h2>Итоговая сумма: {{ increaseTotal }}.00 руб.</h2>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import BusketItem from '@/components/busket/BusketItem.vue';
import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'Busket',
        data:() => ({
            total: 0,
            busketItem: []
        }),
        components: {
            BusketItem
        },
        methods: {
            ...mapActions([
                'REMOVE_FROM_BUSKET',
                'DECREMENT_BUSKET',
                'INCREMENT_BUSKET'
            ]),
            deleteBook(index) {
                this.REMOVE_FROM_BUSKET(index)
            },
            decrementCount(index) {
                this.DECREMENT_BUSKET(index);
            },
            incrementCount(index) {
                this.INCREMENT_BUSKET(index);
            }
            
        },
        computed: {
            sortBySearchValue() {
                return this.busketItem.filter(item => item.title.toLowerCase().includes(this.SEARCH_VALUE.toLowerCase()))
            },  
            ...mapGetters([
                'BUSKET',
                'SEARCH_VALUE'
            ]),
            increaseTotal() {
                let res = 0;

                this.busketItem.forEach(item => {
                    res += item.price * item.count
                })
                return res;
            }
            
        },
        mounted() {
            this.busketItem = this.BUSKET;
        }
        
    }
</script>

<style  scoped>
    .btn-main {
        position: fixed;
        top: 200px;
        right: 70px;
    }
</style>