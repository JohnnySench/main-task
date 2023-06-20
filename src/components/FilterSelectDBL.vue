<template>
    <div>
        <v-col
            cols
        >
        <v-select
            class="mb-2"
            hide-details=""
            variant="outlined"
            v-model="modelValue"
            :items="categoryFilter"
            density="comfortable"
            
    ></v-select>
    <div class="actions-btns">
        <v-btn 
        color="blue"
        type="button"
        @click="this.$emit('update:modelValue', modelValue)"
        >Применить
    </v-btn>
    <v-btn 
        class="ml-4"
        color="red"
        type="button"
        @click="this.$emit('update:modelValue', '')"
        >Отмена
    </v-btn>
    </div>
    
        </v-col>
      
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
</style>