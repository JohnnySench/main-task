<template>
    <div>
        <h1>Создай свою книгу</h1>
        <RouterLink :to="{name: 'BooksList'}">
            <v-btn
                class="btn-main"
                variant="outlined"
            >На главную</v-btn>
        </RouterLink>

        <div class="text-center mt-4">
            <v-btn
                color="blue"
            >
            Create Book

                <v-dialog
                    v-model="dialog"
                    activator="parent"
                    width="auto"
                >
                    <v-card>
                        <v-sheet width="500" class="mx-auto px-6 py-6">
                            <v-form @submit.prevent>
                                <v-text-field
                                    class="mb-2"
                                    variant="outlined"
                                    v-model="info.title"
                                    label="Введите название книги"
                                ></v-text-field>
                                <v-text-field
                                class="mb-2"
                                    variant="outlined"
                                    v-model="info.genre"
                                    label="Введите жанр вашей книги"
                                ></v-text-field>
                                <v-text-field
                                    class="mb-2"
                                    variant="outlined"
                                    v-model="info.author"
                                    label="Введите свои инициалы"
                                ></v-text-field>
                                <v-text-field
                                    class="mb-2"
                                    type="number"
                                    variant="outlined"
                                    v-model="info.publish_year"
                                    label="Введите год реализации вашей книги"
                                ></v-text-field>
                                <v-text-field
                                    class="mb-2"
                                    type="number"
                                    variant="outlined"
                                    v-model="info.price"
                                    label="Введите желаемую цену вашей книги"
                                ></v-text-field>
                                <v-text-field
                                    class="mb-2"
                                    variant="outlined"
                                    v-model="info.image"
                                    label="Введите ссылку на обложку или воспользуйтесь стандартной"
                                ></v-text-field>
                                <v-btn 
                                    type="submit" 
                                    block 
                                    class="mt-2"
                                    @click="createBook">Submit</v-btn>
                            </v-form>
                        </v-sheet>
                        <v-card-actions>
                            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn>
        </div>
        <CreateBookList/>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import CreateBookList from '@/components/creation-book/CreateBookList.vue';
import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'CreateBook',
        components: {
            CreateBookList
        },  
        data: () => ({
            info: {
                title: '',
                genre: '',
                publish_year: '',
                image: 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png',
                author: '',
                price: '',
                
            },
            dialog: false,
        }),
        setup () {
            return { v$: useVuelidate() }
        },
        validations() {
            return {
                info: {
                    title: {required},
                    genre: {required},
                    publish_year: {required},
                    author: {required},
                    price: {required},
                },
            }
        },  
        methods: {
            async createBook() {
                const result = await this.v$.$validate();
                if (!result) {
                    console.log('IsValid');
                    return
                } else {
                    this.POST_CREATED_BOOK(this.info);
                    this.dialog = false
                }
                
                
               
            },
            ...mapActions([
                'POST_CREATED_BOOK'
            ])
        },
        computed: {
            ...mapGetters([
                'CREATED_BOOK'
            ])
        }
        
    }
</script>

<style scoped>
    .btn-main {
        position: fixed;
        top: 200px;
        right: 70px;
    }
</style>