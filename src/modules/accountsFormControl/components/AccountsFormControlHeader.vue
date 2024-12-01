<template>
  <div class="flex items-center gap-2.5">
    <h3 class="text-xl font-semibold">Учетные записи</h3>
    <prime-button
      icon="pi pi-plus"
      type="button"
      severity="secondary"
      variant="outlined"
      size="small"
      @click="addNewAccount"
    />
  </div>
</template>

<script setup lang="ts">
import { Button as PrimeButton } from 'primevue';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (event: 'addNewAccount'): void;
}>();

const addNewAccount = () => {
  emit('addNewAccount');
};
</script>
