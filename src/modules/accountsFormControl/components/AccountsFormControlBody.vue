<template>
  <div class="flex flex-1 flex-col gap-2.5">
    <div
      v-for="(account, idx) in props.allAccount"
      :key="account.id"
      class="flex items-center gap-4"
    >
      <prime-form
        ref="accountFormControlRef"
        class="flex w-full items-baseline gap-2.5"
        :validate-on-mount="['login', 'password']"
        :validate-on-value-update="false"
        :validate-on-blur="true"
        @submit="(event) => onFormSubmit(event)"
      >
        <form-field v-slot="$field" name="label" :resolver="labelResolver">
          <input-text
            type="text"
            placeholder="Метка"
            :value="convertArrayToStringWithDelimetr(account.label)"
            @input="(event) => convertLabelToArray(account, event)"
            @blur="hadleSubmit(idx)"
          />
          <prime-message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </prime-message>
        </form-field>

        <form-field name="type">
          <prime-select
            v-model="account.type"
            placeholder="Тип записи"
            option-label="label"
            option-value="value"
            class="w-40"
            :options="accountTypes"
            @change="resetPassword(account)"
            @blur="hadleSubmit(idx)"
          />
        </form-field>

        <div class="flex flex-1 gap-2.5">
          <form-field
            v-slot="$field"
            class="flex-1"
            name="login"
            :initial-value="account.login"
            :resolver="loginAndPasswordResolver"
          >
            <input-text
              v-model="account.login"
              type="text"
              placeholder="Логин"
              fluid
              @blur="hadleSubmit(idx)"
            />
            <prime-message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </prime-message>
          </form-field>

          <form-field
            v-if="account.type === 'local'"
            v-slot="$field"
            class="flex-1"
            name="password"
            :initial-value="account.password"
            :resolver="loginAndPasswordResolver"
          >
            <prime-password
              v-model="account.password"
              type="text"
              placeholder="Пароль"
              :feedback="false"
              toggle-mask
              fluid
              @blur="hadleSubmit(idx)"
            />
            <prime-message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </prime-message>
          </form-field>
        </div>
        <prime-button
          icon="pi pi-trash"
          type="button"
          :disabled="isDisableButton"
          severity="secondary"
          variant="text"
          size="large"
          @click="deleteAccount(account.id)"
        />
      </prime-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form as PrimeForm, FormField, FormSubmitEvent } from '@primevue/forms';
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
  labelResolver,
  loginAndPasswordResolver
} from '@/modules/accountsFormControl/constants.ts';
import { useAccountsFormControl } from '@/modules/accountsFormControl/services/accountsFormControl.service.ts';
import { IAccountsFormControl } from '@/modules/accountsFormControl/types.ts';
import { convertArrayToStringWithDelimetr } from '@/utils/convertArrayToStringWithDelimetr';

interface IAccountsFormControlBodyProps {
  allAccount: IAccountsFormControl[];
}

const props = defineProps<IAccountsFormControlBodyProps>();

const { accountFormControlRef, isDisableButton } = storeToRefs(
  useAccountsFormControl()
);
const { convertLabelToArray, deleteAccount, resetPassword, saveValidData } =
  useAccountsFormControl();

const hadleSubmit = (idx: number) => {
  accountFormControlRef.value[idx]?.onSubmit();
};

const onFormSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) return;

  saveValidData();
};
</script>
