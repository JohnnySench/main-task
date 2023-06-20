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
                width="90px"
                height="48px"
                color="red"
                class="ml-2"
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
    .nav {
        display: grid;
        grid-template-columns: .5fr 1fr .5fr;
        align-items: center;
        justify-content: center;
    }
</style>