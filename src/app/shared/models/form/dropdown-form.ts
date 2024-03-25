export interface SelectOption {
  id?: string | number;
  description?: string;
  value?: string;
}

export interface DropdownForm {
  groupFormName: string;
  placeholder?: string;
  label?: string;
  options: SelectOption[];
  select?: SelectOption;
  disabledInput?: boolean;
  validatorNumber?: number;
}
