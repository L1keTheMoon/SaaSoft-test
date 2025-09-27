<script setup lang='ts'>
import { ref } from 'vue';

const showPassword = ref(false);
const selectData = ['Локальная', 'LDAP'];
</script>

<template>
  <li class='account-data'>
    <VTextarea variant='outlined' rows='1' auto-grow model-value='dawawd' />
    <VSelect variant='outlined' :items='selectData' :model-value='selectData[0]' />
    <VTextField variant='outlined' />
    <VTextField variant='outlined' :append-inner-icon='showPassword ? "mdi-eye" : "mdi-eye-off"'
      :type='showPassword ? "text" : "password"' class='input-group--focused'
      @click:append-inner='showPassword = !showPassword' />
    <VBtn icon='mdi-trash-can-outline' variant='text' size='large' />
  </li>
</template>

<style scoped>
.account-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
}

.account-data>div {
  height: fit-content;
}
</style>