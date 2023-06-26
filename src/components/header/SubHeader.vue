<template>
    <div class="nav">
        <div class="logo">
            <router-link :to="{name: 'BooksList'}">
                <img :style="{
                            maxWidth: `${size}px`
                        }" 
                        src="@/assets/logobook.svg" 
                        alt="Логотип">
            </router-link>
        </div>

        <div class="input">
            <v-text-field
                class="search-book"
                v-model="search"
                variant="outlined"
                density="comfortable"
                label="Введите название книги"
                type="input"
                hide-details
                append-inner-icon="mdi-magnify"
            ></v-text-field>
            
        </div>
        <div class="search">
            <v-btn
                @click="searchValue(search)"
                color="red"
                class="btn ml-1"
            >
                Поиск
            </v-btn>
        </div>

        
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'SubHeader',
        props: {
            size: {
               type: Number,
               default: 250 
            }
        },
        data: () => ({
            search: ''
        }),
        methods: {
            ...mapActions([
                'GET_SEARCH_VALUE'
            ]),
            searchValue(value) {
                this.GET_SEARCH_VALUE(value)
            }
        },
        computed: {
            ...mapGetters([
                'SEARCH_VALUE'
            ])
        }
        
    }
</script>

<style scoped>

    .search {
        padding-right: 200px;
    }
    .btn {
        width: 90px !important;
        height: 48px !important;
    }
    .nav {
        display: grid;
        grid-template-columns: .5fr 1fr .5fr;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 876px) {
        .logo {
            display: none;
        }
        .btn {
            margin-top: 40px;
            width: 70px !important;
            max-height: 38px !important;
            font-size: 12px;
        }
        .input {
            margin-top: 40px;
            margin-left: 10px;
        }
        .nav {
            
            grid-template-columns: 1.5fr .5fr;
        }
        
    }
    @media screen and (max-width: 560px) {
        .nav {
            
            grid-template-columns: 1.5fr .5fr;
        }
        .search {
            padding-right: 20px;
        }
    }
</style>