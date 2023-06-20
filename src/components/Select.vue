<template>
    <div class="select">
        <p
            class="title"
            @click="areOptionsVisible = !areOptionsVisible"
        >Select</p>
        <div class="options"
            v-if="areOptionsVisible"    
        >
            <p
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
            >{{ option.name }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Select',
        props: {
            options: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            areOptionsVisible: false
        }),
        methods: {
            selectOption(option) {
                console.log(option);
            }
        }
    }
</script>

<style scoped>
    .select {
        top: 300px;
        position: relative;
        width: 200px;
        cursor: pointer;
    }
    .select p {
        margin: 0;
    }
    .options {
        border: 1px solid #aeaeae;
        position: absolute;
        top: 20px;
        right: 0;
        width: 100%;
    }
    .options p:hover {
        background-color: #e7e7e7;
    }
</style>