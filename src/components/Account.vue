<script setup lang="ts">
import { useAccountsStore } from '@/store/accounts';
import type { AccountType, LocalAccount } from '@/types/accounts';
import { defineEmits, defineProps, reactive, ref } from 'vue';

const { data } = defineProps<{ data: LocalAccount }>();
const emits = defineEmits<{
  deleteAccount: [id: string | number];
}>();
const accountsStore = useAccountsStore();

const showPassword = ref(false);
const inputErrors = reactive({
  login: '',
  password: '',
});

function inputCompleteHandler() {
  let isValid = true;

  if (!data.login) {
    inputErrors.login = 'Обязательно';
    isValid = false;
  }
  if (data.type === 'Local' && !data.password) {
    inputErrors.password = 'Обязательно';
    isValid = false;
  }

  if (isValid) {
    accountsStore.save(data);
  }
}

function cleaarErrors(event: Event) {
  const name = (event.target as HTMLInputElement).name;
  if (name in inputErrors) {
    inputErrors[name as keyof typeof inputErrors] = '';
  }
}

// const selectData: AccountType[] = ['Local', 'LDAP'];
const selectData: { title: string; value: AccountType }[] = [
  { title: 'Локальный', value: 'Local' },
  { title: 'LDAP', value: 'LDAP' },
];
</script>

<template>
  <li class="account-data">
    <VTextarea
      name="marks"
      v-model="data.marks"
      variant="outlined"
      rows="1"
      auto-grow
      maxlength="50"
      @blur="inputCompleteHandler"
    />
    <VSelect
      name="type"
      v-model="data.type"
      variant="outlined"
      item-title="title"
      item-value="value"
      :items="selectData"
      @update:model-value="inputCompleteHandler"
    />
    <VTextField
      name="login"
      v-model="data.login"
      variant="outlined"
      maxlength="100"
      :style="data.type === 'LDAP' ? 'grid-column: auto / span 2' : ''"
      @blur="inputCompleteHandler"
      @input="cleaarErrors"
      :error-messages="inputErrors.login"
    />
    <VTextField
      name="password"
      v-if="data.type === 'Local'"
      v-model="data.password"
      variant="outlined"
      maxlength="100"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
      @blur="inputCompleteHandler"
      @input="cleaarErrors"
      :error-messages="inputErrors.password"
    />
    <VBtn
      icon="mdi-trash-can-outline"
      variant="text"
      size="large"
      @click="emits('deleteAccount', data.id)"
    />
  </li>
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
