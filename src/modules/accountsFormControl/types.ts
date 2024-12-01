export const AccountsFormControlTypeValue = {
  local: 'local',
  LDAP: 'LDAP'
} as const;

export const AccountsFormControlTypeLabel = {
  [AccountsFormControlTypeValue.local]: 'Локальная',
  [AccountsFormControlTypeValue.LDAP]: 'LDAP'
} as const;

export interface IAccountsFormControlLabelTypes {
  text: string;
}

export interface IAccountsFormControl {
  id: string;
  label: IAccountsFormControlLabelTypes[];
  type: keyof typeof AccountsFormControlTypeValue;
  login: string;
  password: string | null;
}

export const isIAccountsFormControl = (
  data: unknown
): data is IAccountsFormControl => {
  return (
    typeof data === 'object' && data !== null && 'id' in data && 'type' in data
  );
};
