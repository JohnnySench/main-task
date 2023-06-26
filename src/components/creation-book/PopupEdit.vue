<template>
        <div v-if="modelValue" class="wrapper">
            <v-sheet width="450" class="mx-auto py-6 px-6">
              
                <v-form @submit.prevent>
                    <v-text-field
                        variant="outlined"
                        v-model="book.title"
                        label="Измените название книги"
                    ></v-text-field>
            
                    <v-text-field
                    variant="outlined"
                        v-model="book.genre"
                        label="Измените жанр книги"
                    ></v-text-field>
                    <v-text-field
                    variant="outlined"
                        v-model="book.price"
                        label="Измените цену книги"
                    ></v-text-field>
                    <v-text-field
                    variant="outlined"
                        v-model="book.publish_year"
                        label="Измените год публикации"
                    ></v-text-field>
                    <v-text-field
                    variant="outlined"
                        v-model="book.image"
                        label="Измените путь к обложке"
                    ></v-text-field>
                    <v-text-field
                    variant="outlined"
                        v-model="book.author"
                        label="Измените автора"
                    ></v-text-field>
                    <div class="actions_btn">
                        <v-btn type="submit" block @click="closeAndPatch">Сохранить изменения</v-btn>
                        <v-btn type="button" @click="this.$emit('update:modelValue', false)">Отмена</v-btn>
                    </div>
                 
                </v-form>
             </v-sheet>
        </div>
        
    
  </template>

<script>
import { mapActions } from 'vuex';
    export default {
        name: 'PopupEdit',
        data: () => ({
        }),
        props: {
            modelValue: {
                type: Boolean
            },
            book: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            ...mapActions([
                'SET_EDITING_BOOK',
                'GET_CREATED_BOOK'
            ]),
            async closeAndPatch() {
                await this.SET_EDITING_BOOK(this.book)
                    .then(res => {
                        this.$emit('update:modelValue',false);
                        location.reload(); 
                    })
                    
                
            
                
                    
            }
        }
    }
</script>

<style scoped>
    .wrapper {

        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .2);
    }
    .actions_btn {
        display: grid;
        grid-template-columns: 1fr .5fr;
        align-items: center;
        justify-content: space-between;
        grid-gap: 15px;
    }
</style>