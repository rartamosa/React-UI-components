import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { TagInputProps } from "./types";

const TagInput = ({
  tags,
  onTagAdd,
  // eslint-disable-next-line
  tagsSuggestions,
  onTagRemove,
  containerBorderColor,
  containerBorderWidth,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [internalTagsSuggestions, setInternalTagsSuggestions] = useState(
    tagsSuggestions.filter((tag) => !tags.includes(tag._id))
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ inline: "end" });
  }, [tags]);

  useEffect(() => {
    const clickHandler = () => setIsSuggestionsOpen(false);
    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  const inputFocus = () => {
    inputRef.current?.focus();
  };

  const onFormSubmit = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      const matchingTag = tagsSuggestions.find(
        (tag) => tag.name === inputValue
      );
      const existingTag = tags.find((tag) => tag === matchingTag?._id);
      if (matchingTag && !existingTag) {
        onTagAdd(matchingTag._id);
        setInternalTagsSuggestions(
          internalTagsSuggestions.filter((tag) => tag._id !== matchingTag._id)
        );
      }
      setInputValue("");
    }
  };

  const handleTagAdd = (tagToAddID: string): void => {
    onTagAdd(tagToAddID);
    setInternalTagsSuggestions(
      internalTagsSuggestions.filter((tag) => tag._id !== tagToAddID)
    );
    setInputValue("");
    inputFocus();
  };

  const handleTagRemove = (tagToRemoveID: string): void => {
    onTagRemove(tagToRemoveID);
    const removedTag = tagsSuggestions.find((tag) => tag._id === tagToRemoveID);
    if (removedTag) {
      setInternalTagsSuggestions([...internalTagsSuggestions, removedTag]);
    }
    inputFocus();
  };

  return (
    <div>
      <TagsInputContainer
        containerBorderColor={containerBorderColor}
        containerBorderWidth={containerBorderWidth}
      >
        {tags.map((tagID) => {
          const currentTag = tagsSuggestions.find(
            (tagToShow) => tagToShow._id === tagID
          );
          return (
            <TagsInputContainerSingleTag
              style={{ backgroundColor: currentTag?.color }}
              key={tagID}
            >
              {currentTag?.name}
              <TagsInputContainerSingleTagClose
                onClick={() => handleTagRemove(tagID)}
              >
                &times;
              </TagsInputContainerSingleTagClose>
            </TagsInputContainerSingleTag>
          );
        })}
        <TagsInputContainerInput
          value={inputValue}
          placeholder="Type..."
          ref={inputRef}
          onChange={(event) => setInputValue(event.target.value)}
          onClick={(event) => {
            setIsSuggestionsOpen(true);
            event.stopPropagation();
          }}
          onKeyPress={onFormSubmit}
        />
        {isSuggestionsOpen && internalTagsSuggestions.length > 0 && (
          <TagsInputContainerSuggestions>
            {internalTagsSuggestions
              .filter((tag) =>
                tag.name.toLowerCase().startsWith(inputValue.toLowerCase())
              )
              .map((tag) => (
                <TagsInputContainerSingleTag
                  style={{ backgroundColor: tag.color }}
                  key={tag._id}
                  onClick={() => handleTagAdd(tag._id)}
                >
                  {tag.name}
                </TagsInputContainerSingleTag>
              ))}
          </TagsInputContainerSuggestions>
        )}
      </TagsInputContainer>
    </div>
  );
};

export default TagInput;

export const TagsInputContainer = styled.div<{
  containerBorderColor?: string;
  containerBorderWidth?: string;
}>`
  width: 300px;
  height: 44px;
  background-color: #fff;
  border: 1px solid var(--font-color);
  border-radius: 8px;
  padding: 8px;
  font-family: "Karla";
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  overflow-y: scroll;
  border: ${(props) => props.containerBorderWidth || "1px"} solid
    ${(props) => props.containerBorderColor || "#000"};
`;

export const TagsInputContainerSingleTag = styled.span`
  font-family: "Red Hat Display";
  padding: 6px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  text-transform: capitalize;
  white-space: nowrap;
`;
export const TagsInputContainerSingleTagClose = styled.span`
  font-size: 21px;
  justify-self: flex-end;
  align-self: self-end;
  cursor: pointer;
`;
export const TagsInputContainerInput = styled.input`
  font-family: "Red Hat Display";
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  border: none;
  outline: none;
  max-width: 100%;
  min-width: 15%;
`;
export const TagsInputContainerSuggestions = styled.div`
  position: absolute;
  top: 21px;
  left: 1px;
  background-color: var(--light-background-color);
  width: 300px;
  padding: 15px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid var(--font-color);
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 100px;
  overflow-x: auto;
`;
