export type SelectOption = {
  id: string;
  name: string;
};

export type SelectProps = {
  selectOptions: SelectOption[];
  placeholder?: string;
  shouldCloseOnClear: boolean;
  containerBorderColor?: string;
  containerBorderWidth?: string;
  componentSize?: "small" | "medium" | "large";
  backgroundColor?: string;
  isDisabled?: boolean;
  errorBorderColor?: string;
  optionsContainerPosition?: "left" | "top" | "right" | "bottom";
};
