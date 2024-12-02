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

export const loginAndPasswordResolver = zodResolver(
  z
    .string()
    .optional()
    .superRefine((value, ctx) => {
      if (!value?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Обязательное поле'
        });
        return;
      }

      if (value.length > 100) {
        ctx.addIssue({
          code: 'custom',
          message: 'Максимум 100 символов'
        });
      }
    })
);

export const labelResolver = zodResolver(
  z
    .string()
    .optional()
    .superRefine((value, ctx) => {
      const currentLength = value?.replace(/\s/g, '').length;

      if (!value || value.trim() === '') {
        return;
      }

      if (currentLength && currentLength > 50) {
        ctx.addIssue({
          code: 'custom',
          message: 'Максимум 50 символов.'
        });
      }

      if (!/^([\wа-яА-ЯёЁ]+)(; [\wа-яА-ЯёЁ]+)*$/.test(value.trim())) {
        ctx.addIssue({
          code: 'custom',
          message: 'Неверный формат'
        });
      }
    })
);
