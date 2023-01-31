type TagSuggestion = {
  _id: string;
  name: string;
  color: string;
};

export type HorizontalPosition = "left" | "center" | "right";
export type VerticalPosition = "top" | "center" | "bottom";

export type TagInputProps = {
  tags: string[];
  onTagAdd: (tag: string) => void;
  tagsSuggestions: TagSuggestion[];
  onTagRemove: (tag: string) => void;
  containerBorderColor?: string;
  containerBorderWidth?: string;
  size?: "small" | "medium" | "large";
  tagsSuggestionsBorderColor?: string;
  tagsSuggestionsBorderWidth?: string;
  backgroundColor?: string;
  placeholder?: string;
  tagsFontColor?: string;
  errorBorderColor?: string;
  isDisabled?: boolean;
  tagsSuggestionsContainerPosition?: "left" | "top" | "right" | "bottom";

  //   sx?:
};
