<template>
    <div class="main-wrapper">
            <RouterView></RouterView>
    </div>
</template>

<script>
    export default {
        name: 'MainWrapper',
        components: {
        }
    }
</script>

<style scoped>
    .main-wrapper {
        max-width: 900px;
        margin: 20px auto;
    }
</style>