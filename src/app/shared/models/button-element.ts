import { VariantIcon } from "./variant-icon";

export interface ButtonElement {
  name?: string;
  icon?: ButtonIcon;
  type?: string;
  path?: string;
  tooltip?: string;
}

export interface ButtonIcon {
  marginTop?: string;
  variant: VariantIcon;
}
