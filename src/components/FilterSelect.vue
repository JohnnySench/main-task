<template>
    <div>
        <v-col
            cols
        >
        <v-select
            variant="outlined"
            clearable
            v-model="select"
            :items="categoryFilter"
            density="comfortable"
            
    ></v-select>
    <v-btn 
        color="blue"
        type="button"
        @click="this.$emit('selected', select)"
        >Применить
    </v-btn>
        </v-col>
      
    </div>
</template>

<script>
    export default {
        name: 'FilterSelect',
        data: () => ({
            select: '',
        }),
        props: {
            categoryFilter: {
                type: Array,
                default: () => []
            }
        }
}
</script>

<style scoped>

</style>