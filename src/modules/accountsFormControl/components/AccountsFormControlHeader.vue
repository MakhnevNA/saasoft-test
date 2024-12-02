<template>
  <div class="flex items-center gap-2.5">
    <h3 class="text-xl font-semibold">Учетные записи</h3>
    <prime-button
      icon="pi pi-plus"
      type="button"
      :disabled="isDisableButton"
      severity="secondary"
      variant="outlined"
      size="small"
      @click="addNewAccount"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Button as PrimeButton } from 'primevue';
import { useAccountsFormControl } from '../services/accountsFormControl.service';

const { addNewAccount } = useAccountsFormControl();
const { isDisableButton } = storeToRefs(useAccountsFormControl());
</script>
