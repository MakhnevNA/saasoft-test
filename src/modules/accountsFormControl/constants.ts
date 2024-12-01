import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import {
  AccountsFormControlTypeLabel,
  AccountsFormControlTypeValue
} from './types.ts';

export const accountTypes = [
  {
    label: AccountsFormControlTypeLabel[AccountsFormControlTypeValue.local],
    value: AccountsFormControlTypeValue.local
  },
  {
    label: AccountsFormControlTypeLabel[AccountsFormControlTypeValue.LDAP],
    value: AccountsFormControlTypeValue.LDAP
  }
];

export const initialAccountValue = {
  label: [{ text: '' }],
  type: AccountsFormControlTypeValue.local,
  login: '',
  password: ''
};

export const loginZodResolver = zodResolver(
  z.string().min(5, { message: 'Обязательное поле' })
);
