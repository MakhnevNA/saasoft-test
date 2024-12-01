<template>
  <div class="flex min-h-[18.75rem] w-[50rem] flex-col gap-5 bg-white p-5">
    <accounts-form-control-header @add-new-account="addNewAccount" />
    <accounts-form-control-info />
    <accounts-form-control-body
      v-if="allAccount && allAccount.length"
      :all-account="allAccount"
      @delete-account="deleteAccount"
      @set-all-account="setAllAccount"
    />
    <accounts-form-control-empty v-else />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAccountsFormControl } from '../accountsFormControl/services/accountsFormControl.service.ts';
import AccountsFormControlBody from '@/modules/accountsFormControl/components/AccountsFormControlBody.vue';
import AccountsFormControlEmpty from '@/modules/accountsFormControl/components/AccountsFormControlEmpty.vue';
import AccountsFormControlHeader from '@/modules/accountsFormControl/components/AccountsFormControlHeader.vue';
import AccountsFormControlInfo from '@/modules/accountsFormControl/components/AccountsFormControlInfo.vue';

const { allAccount } = storeToRefs(useAccountsFormControl());
const { getAllAccount, addNewAccount, deleteAccount, setAllAccount } =
  useAccountsFormControl();

onMounted(() => {
  getAllAccount();
});
</script>

<style scoped>
.input-field {
  width: 130px;
}
</style>
