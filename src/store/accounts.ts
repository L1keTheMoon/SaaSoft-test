import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account, AccountData } from '../types/types';

export const useAccountsStore = defineStore('accounts', () => {
  let accounts = ref<Account[]>([]);

  function add() {
    accounts.value.push({ id: crypto.randomUUID() });
  }

  function change(id: string, newData: AccountData) {
    accounts.value = accounts.value.map(el => {
      if (el.id !== id) {
        return el;
      } else {
        return { id, data: newData };
      }
    });
    saveInStorage();
  }

  function remove(id: string) {
    const removeIndex = accounts.value.findIndex(el => el.id === id)
    const removed = accounts.value.splice(removeIndex, 1);
    if (removed[0]?.data) {
      saveInStorage();
    }
  }

  function saveInStorage() {
    sessionStorage.setItem('accounts', JSON.stringify(accounts.value.filter(el => el.data)));
  }

  function checkSavedData() {
    const stringifiedData = sessionStorage.getItem('accounts');
    if (stringifiedData) {
      const savedAccounts = JSON.parse(stringifiedData) as Account[];
      accounts.value.push(...savedAccounts);
    }
  }
  checkSavedData();

  return { accounts, add, change, remove };
});
