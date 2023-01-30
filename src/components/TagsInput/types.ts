type TagSuggestion = {
  _id: string;
  name: string;
  color: string;
};

export type TagInputProps = {
  tags: string[]; //v1
  // tags: Array<{ _id: string }>; //v2
  onTagAdd: (tag: string) => void;
  tagsSuggestions: TagSuggestion[];
  onTagRemove: (tag: string) => void;
};
