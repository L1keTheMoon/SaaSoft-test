<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
import { useAccountsStore } from '../store/accounts';
import type { AccountData, AccountType, InputAccountData } from '../types/types';

const { id, data = null } = defineProps<{ id: string; data?: AccountData }>();
const accountsStore = useAccountsStore();

const showPassword = ref(false);
const inputData = reactive<InputAccountData>({
  login: data?.login || '',
  marks: data?.marks.map(el => el.text).join(';') || '',
  password: data?.password || '',
  type: data?.type || 'Локальная',
});
const inputErrors = reactive({
  login: '',
  password: '',
});

function inputCompleteHandler() {
  let isValid = true;
  if (!inputData.login) {
    inputErrors.login = 'Обязательно';
    isValid = false;
  }
  if (inputData.type === 'Локальная' && !inputData.password) {
    inputErrors.password = 'Обязательно';
    isValid = false;
  }

  if (isValid) {
    accountsStore.change(id, {
      ...inputData,
      marks: inputData.marks.split(';').map(el => ({ text: el })),
      password: inputData.type === 'Локальная' ? inputData.password : null,
    });
  }
}

function cleaarErrors(event: Event) {
  const name = (event.target as HTMLInputElement).name;
  if (name in inputErrors) {
    inputErrors[name as keyof typeof inputErrors] = '';
  }
}

const selectData: AccountType[] = ['Локальная', 'LDAP'];
</script>

<template>
  <form class="account-data">
    <VTextarea
      variant="outlined"
      name="marks"
      rows="1"
      auto-grow
      v-model="inputData.marks"
      maxlength="50"
      @blur="inputCompleteHandler"
    />
    <VSelect
      variant="outlined"
      name="type"
      :items="selectData"
      v-model="inputData.type"
      @update:model-value="inputCompleteHandler"
    />
    <VTextField
      variant="outlined"
      name="login"
      v-model="inputData.login"
      maxlength="100"
      :style="inputData.type === 'LDAP' ? 'grid-column: auto / span 2' : ''"
      @blur="inputCompleteHandler"
      :error-messages="inputErrors.login"
      @input="cleaarErrors"
    />
    <VTextField
      variant="outlined"
      name="password"
      v-show="inputData.type === 'Локальная'"
      v-model="inputData.password"
      maxlength="100"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
      @blur="inputCompleteHandler"
      :error-messages="inputErrors.password"
      @input="cleaarErrors"
    />
    <VBtn
      @click="accountsStore.remove(id)"
      icon="mdi-trash-can-outline"
      variant="text"
      size="large"
    />
  </form>
</template>

<style scoped>
.account-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
}

.account-data > div {
  height: fit-content;
}
</style>
