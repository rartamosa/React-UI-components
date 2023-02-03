import { IconName } from "@fortawesome/fontawesome-svg-core";

export type SelectOption = {
  id: string;
  name: string;
};

export type SelectProps = {
  selectOptions: SelectOption[];
  shouldCloseOnClear: boolean;
  placeholder?: string;
  containerBorderColor?: string;
  containerBorderWidth?: string;
  componentSize?: "small" | "medium" | "large";
  backgroundColor?: string;
  isDisabled?: boolean;
  errorBorderColor?: string;
  iconColor?: string;
  customIcon?: IconName;
};
