export interface MultiselectOption {
  id?: string | number;
  description?: string;
  value?: string;
}

export interface MultiselectForm {
  groupFormName: string;
  placeholder?: string;
  label?: string;
  options: MultiselectOption[];
  select?: MultiselectOption[];
  disabledInput?: boolean;
  validatorNumber?: number;
  idButton: string;
  idDropdown: string;
}
