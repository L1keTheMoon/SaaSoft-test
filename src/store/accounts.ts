import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Account, LocalAccount } from '@/types/accounts';

export const useAccountsStore = defineStore('accounts', () => {
  let accounts = ref<Account[]>([]);

  function save(newAccount: LocalAccount) {
    const accountIndex = accounts.value.findIndex(el => el.id === newAccount.id);
    if (accountIndex > -1) {
      accounts.value[accountIndex] = parseLocalAccount(newAccount);
    } else {
      accounts.value.push(parseLocalAccount(newAccount));
    }
    saveInStorage();
  }

  function remove(id: string) {
    const removeIndex = accounts.value.findIndex(el => el.id === id);
    if (removeIndex > -1) {
      accounts.value.splice(removeIndex, 1);
      saveInStorage();
    }
  }

  function saveInStorage() {
    sessionStorage.setItem('accounts', JSON.stringify(accounts.value));
  }

  function parseLocalAccount(localAccount: LocalAccount): Account {
    return {
      ...localAccount,
      login: localAccount.login.trim(),
      marks: localAccount.marks.split(';').map(el => ({ text: el.trim() })),
      password: localAccount.type === 'Local' ? localAccount.password : null,
    }
  }

  function loadSavedData() {
    const stringifiedData = sessionStorage.getItem('accounts');
    if (stringifiedData) {
      const savedAccounts = JSON.parse(stringifiedData) as Account[];
      accounts.value.push(...savedAccounts);
    }
  }
  loadSavedData();

  return { accounts, save, remove };
});
