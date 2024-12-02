import { IAccountsFormControlLabelTypes } from '@/modules/accountsFormControl/types.ts';

export const convertArrayToStringWithDelimetr = (
  arr: IAccountsFormControlLabelTypes[],
  delimiter = '; '
) => {
  return arr?.map((item) => item.text).join(delimiter);
};
