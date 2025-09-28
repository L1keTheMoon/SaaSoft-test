<script setup lang="ts">
import Account from '@/components/Account.vue';
import { useAccountsStore } from '@/store/accounts';
import type { LocalAccount } from '@/types/accounts';
import { onMounted, ref } from 'vue';

const accountsStore = useAccountsStore();
const loaclAccounts = ref<LocalAccount[]>([]);

function addNewAccount() {
  loaclAccounts.value.push({
    id: crypto.randomUUID(),
    login: '',
    marks: '',
    password: '',
    type: 'Local',
  });
}

function deleteAccount(id: string | number) {
  loaclAccounts.value = loaclAccounts.value.filter(el => el.id !== id);
  if (typeof id === 'string') {
    accountsStore.remove(id);
  }
}

onMounted(() => {
  loaclAccounts.value = accountsStore.accounts.map(el => ({
    ...el,
    marks: el.marks.map(el => el.text).join(';') || '',
    password: el.password || '',
  }));
});

const titles = ['Метки', 'Тип записи', 'Логин', 'Пароль'];
</script>

<template>
  <form>
    <div class="form-header">
      <h1>Учетные записи</h1>
      <VBtn
        variant="outlined"
        icon="mdi-plus"
        size="x-large"
        style="border-radius: 8px"
        @click="addNewAccount"
      />
    </div>
    <div class="help">
      <VIcon icon="mdi-help-circle-outline" size="x-large" />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>
    <div class="title">
      <p v-for="item in titles" :key="item">
        {{ item }}
      </p>
    </div>
    <ul class="accounts">
      <Account
        v-for="item in loaclAccounts"
        :key="item.id"
        :data="item"
        @deleteAccount="deleteAccount"
      />
    </ul>
  </form>
</template>

<style scoped>
.form-header {
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

.accounts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
