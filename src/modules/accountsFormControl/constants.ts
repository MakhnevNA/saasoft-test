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
