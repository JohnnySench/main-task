<template>
    <div>
        <div class="wrapper-filter">
            <v-select
                class="filter-select mb-2"
                hide-details=""
                variant="outlined"
                v-model="modelValue"
                :items="categoryFilter"
                density="compact"
            ></v-select>
            <div class="actions-btns">
                <v-btn 
                    class="btn"
                    density="comfortable"
                    color="blue"
                    type="button"
                    @click="this.$emit('update:modelValue', modelValue)"
                    >Применить
                </v-btn>
                <v-btn
                    density="comfortable"
                    class="btn ml-2"
                    color="red"
                    type="button"
                    @click="this.$emit('update:modelValue', '')"
                    >x
                </v-btn>
            </div>
        </div>
      
    </div>
</template>

<script>
    export default {
        name: 'FilterSelect',
        data: () => ({
            modelValue: ''
        }),
        props: {
            categoryFilter: {
                type: Array,
                default: () => []
            },
        }
}
</script>

<style scoped>
    .actions-btns {
        display: flex;
    }
    @media screen and (max-width: 876px) {
        .filter-select {
            width: 150px;
        }
        .btn {
            max-width: 50px;
            font-size: 8px;
        }
        
    }
    @media screen and (max-width: 560px) {
        .wrapper-filter {
            display: none;
        }
        
    }
</style>