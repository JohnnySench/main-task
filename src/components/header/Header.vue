<template>
    <v-toolbar density="compact" color="gray">
      <template v-slot:prepend>
        <div class="text-h6">
            <a 
                class="help-url" 
                href="/"
            >support@my.shop.book</a>
        </div>
      </template>
      <v-divider
        class="ms-3"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn variant="text">Вход</v-btn>
        <v-divider 
            vertical
            inset
        ></v-divider>
        <v-btn variant="text">Регистрация</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </template>
<script>
    export default {
        name: 'Header'
    }
</script>

<style scoped>
    .help-url {
        text-decoration: none;
    }
</style>