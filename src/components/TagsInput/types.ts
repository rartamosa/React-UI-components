type TagSuggestion = {
  _id: string;
  name: string;
  color: string;
};

export type TagInputProps = {
  tags: string[];
  onTagAdd: (tag: string) => void;
  tagsSuggestions: TagSuggestion[];
  onTagRemove: (tag: string) => void;
  containerBorderColor?: string;
  containerBorderWidth?: string;
  //   sx?:
};
