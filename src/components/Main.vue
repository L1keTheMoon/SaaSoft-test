<script setup lang="ts">
import Account from './Account.vue';

const titles = ['Метки', 'Тип записи', 'Логин', 'Пароль'];
</script>

<template>
  <header class="header">
    <h1>Учетные записи</h1>
    <VBtn variant="outlined" icon="mdi-plus" size="x-large" style="border-radius: 8px" />
  </header>
  <div class="help">
    <VIcon icon="mdi-help-circle-outline" size="x-large" />
    Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
  </div>
  <div class="title">
    <p v-for="item in titles" :key="item">
      {{ item }}
    </p>
  </div>
  <ul>
    <Account />
  </ul>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}

.help {
  background-color: lightblue;
  margin: 32px 0;
  padding: 4px 8px;
  border-radius: 6px;
}

.title {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 56px;
  color: gray;
  margin-bottom: 8px;
}
</style>
