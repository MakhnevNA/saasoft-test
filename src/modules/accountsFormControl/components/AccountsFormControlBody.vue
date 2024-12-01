<template>
  <div class="flex flex-1 flex-col gap-2.5">
    <div
      v-for="account in props.allAccount"
      :key="account.id"
      class="flex items-center gap-4"
    >
      <prime-form ref="accountFormControlRef" class="flex w-full gap-2.5">
        <form-field
          v-slot="$field"
          name="label"
          initial-value=""
          :resolver="() => void 0"
        >
          <input-text
            type="text"
            placeholder="Метка"
            :v-model="convertArrayToString(account.label)"
          />
          <prime-message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</prime-message
          >
        </form-field>
        <form-field
          v-slot="$field"
          name="firstname"
          initial-value=""
          :resolver="() => void 0"
        >
          <prime-select
            v-model="account.type"
            :options="accountTypes"
            option-label="label"
            class="input-field"
            placeholder="Тип записи"
          />
          <prime-message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</prime-message
          >
        </form-field>
        <div class="flex flex-1 gap-2.5">
          <form-field
            v-slot="$field"
            class="flex-1"
            name="login"
            initial-value=""
            :resolver="loginZodResolver"
          >
            <input-text
              v-model="account.login"
              type="text"
              placeholder="Логин"
              fluid
              @blur="onFormSubmit"
            />
            <prime-message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</prime-message
            >
          </form-field>
          <form-field
            v-if="account.login.length > 3"
            v-slot="$field"
            class="flex-1"
            name="password"
            initial-value=""
            :resolver="() => void 0"
          >
            <prime-password
              v-model="account.password"
              type="text"
              placeholder="Password"
              :feedback="false"
              toggle-mask
              fluid
              @blur="onFormSubmit"
            />
            <!--   v-model="account.password" -->
            <prime-message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</prime-message
            >
          </form-field>
        </div>
      </prime-form>
      <prime-button
        icon="pi pi-trash"
        type="button"
        severity="secondary"
        variant="text"
        size="large"
        @click="deleteAccount(account.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form as PrimeForm, FormField } from '@primevue/forms';
import { storeToRefs } from 'pinia';
import {
  InputText,
  Password as PrimePassword,
  Button as PrimeButton,
  Message as PrimeMessage,
  Select as PrimeSelect
} from 'primevue';
import {
  accountTypes,
  loginZodResolver
} from '@/modules/accountsFormControl/constants.ts';
import { useAccountsFormControl } from '@/modules/accountsFormControl/services/accountsFormControl.service.ts';
import { IAccountsFormControl } from '@/modules/accountsFormControl/types.ts';
import { convertArrayToString } from '@/utils/convertArrayToString.ts';

interface IAccountsFormControlBodyProps {
  allAccount: IAccountsFormControl[];
}

const props = defineProps<IAccountsFormControlBodyProps>();

const { accountFormControlRef } = storeToRefs(useAccountsFormControl());

const onFormSubmit = () => {
  if (!accountFormControlRef.value[0].valid) return;

  console.log(accountFormControlRef.value[0].valid);

  setAllAccount();
};

const emit = defineEmits<{
  (event: 'deleteAccount', id: string): void;
  (event: 'setAllAccount'): void;
}>();

const deleteAccount = (id: string) => {
  emit('deleteAccount', id);
};

const setAllAccount = () => {
  emit('setAllAccount');
};
</script>
