import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { TagInputProps } from "./types";

import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";

const TagInput = ({
  tags,
  onTagAdd,
  // eslint-disable-next-line
  tagsSuggestions,
  onTagRemove,
  containerBorderColor,
  containerBorderWidth,
  size,
  tagsSuggestionsBorderColor,
  tagsSuggestionsBorderWidth,
  backgroundColor,
  placeholder,
  tagsFontColor,
  errorBorderColor,
  isDisabled,
  tagsSuggestionsContainerPosition,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [internalTagsSuggestions, setInternalTagsSuggestions] = useState(
    tagsSuggestions.filter((tag) => !tags.includes(tag._id))
  );
  const [error, setError] = useState(false);

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
      } else {
        setError(true);
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
    <div style={{ position: "relative" }}>
      {error && (
        <ErrorInputContainer errorBorderColor={errorBorderColor} size={size} />
      )}

      <TagsInputContainer
        containerBorderColor={containerBorderColor}
        containerBorderWidth={containerBorderWidth}
        size={size}
        backgroundColor={backgroundColor}
        isDisabled={isDisabled || false}
      >
        {tags.map((tagID) => {
          const currentTag = tagsSuggestions.find(
            (tagToShow) => tagToShow._id === tagID
          );
          return (
            <TagsInputContainerSingleTag
              style={{ backgroundColor: currentTag?.color }}
              key={tagID}
              size={size}
              tagsFontColor={tagsFontColor}
            >
              {currentTag?.name}
              <TagsInputContainerSingleTagClose
                onClick={() => handleTagRemove(tagID)}
                size={size}
              >
                &times;
              </TagsInputContainerSingleTagClose>
            </TagsInputContainerSingleTag>
          );
        })}
        <TagsInputContainerInput
          // size={size} //TODO
          backgroundColor={backgroundColor}
          disabled={isDisabled || false}
          value={inputValue}
          placeholder={placeholder || "Type..."}
          ref={inputRef}
          onChange={(event) => setInputValue(event.target.value)}
          onClick={(event) => {
            setIsSuggestionsOpen(true);
            event.stopPropagation();
          }}
          onKeyPress={onFormSubmit}
        />

        {isSuggestionsOpen && internalTagsSuggestions.length > 0 && (
          <TagsInputContainerSuggestions
            size={size}
            tagsSuggestionsBorderColor={tagsSuggestionsBorderColor}
            tagsSuggestionsBorderWidth={tagsSuggestionsBorderWidth}
            backgroundColor={backgroundColor}
            tagsSuggestionsContainerPosition={tagsSuggestionsContainerPosition}
          >
            {internalTagsSuggestions
              .filter((tag) =>
                tag.name.toLowerCase().startsWith(inputValue.toLowerCase())
              )
              .map((tag) => (
                <TagsInputContainerSingleTag
                  style={{ backgroundColor: tag.color }}
                  key={tag._id}
                  onClick={() => handleTagAdd(tag._id)}
                  size={size}
                  tagsFontColor={tagsFontColor}
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
  size?: "small" | "medium" | "large"; // "md" is the default size
  backgroundColor?: string;
  isDisabled?: boolean;
}>`
  width: 300px;
  height: 44px;
  padding: 8px;
  gap: 8px;
  font-size: 14px;
  ${(props) =>
    props.size === "small" &&
    css`
      width: 150px;
      height: 22px;
      padding: 4px;
      gap: 4px;
      font-size: 7px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      width: 450px;
      height: 66px;
      padding: 12px;
      gap: 12px;
      font-size: 21px;
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      background-color: #c8c8c8 !important;
    `}  
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: 8px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.02em;
  box-sizing: border-box;
  display: flex;
  overflow-y: scroll;
  border: ${(props) => props.containerBorderWidth || "1px"} solid
    ${(props) => props.containerBorderColor || "#333"};
`;

export const ErrorInputContainer = styled.div<{
  errorBorderColor?: string;
  containerBorderWidth?: string;
  size?: "small" | "medium" | "large";
}>`
  width: 300px;
  height: 44px;
  padding: 8px;
  gap: 8px;
  font-size: 14px;
  ${(props) =>
    props.size === "small" &&
    css`
      width: 150px;
      height: 22px;
      padding: 4px;
      gap: 4px;
      font-size: 7px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      width: 450px;
      height: 66px;
      padding: 12px;
      gap: 12px;
      font-size: 21px;
    `}  
  border: ${(props) => props.containerBorderWidth || "1px"} solid
    ${(props) => props.errorBorderColor || "#333"};
  z-index: 1;
  position: absolute;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const TagsInputContainerSingleTag = styled.span<{
  size?: "small" | "medium" | "large";
  tagsFontColor?: string;
}>`
  padding: 6px 12px;
  gap: 4px;
  ${(props) =>
    props.size === "small" &&
    css`
      padding: 3px 6px;
      gap: 2px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      padding: 9px 18px;
      gap: 6px;
    `}
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: capitalize;
  white-space: nowrap;
  color: ${(props) => props.tagsFontColor || MAIN_DARK_FONT_COLOR};
`;

export const TagsInputContainerSingleTagClose = styled.span<{
  size?: "small" | "medium" | "large";
}>`
  font-size: 21px;
  align-self: self-end;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 11px;
      align-self: center;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 32px;
      align-self: center;
    `}
  justify-self: flex-end;
  cursor: pointer;
`;

export const TagsInputContainerInput = styled.input<{
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  isDisabled?: boolean;
}>`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 7px;
      line-height: 8px;
      letter-spacing: -0.03em;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 21px;
      line-height: 24px;
      letter-spacing: -0.01em;
    `}
  font-weight: 700;
  border: none;
  outline: none;
  max-width: 100%;
  min-width: 15%;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  &:disabled {
    background-color: #c8c8c8;
  }
`;

export const TagsInputContainerSuggestions = styled.div<{
  size?: "small" | "medium" | "large";
  tagsSuggestionsBorderColor?: string;
  tagsSuggestionsBorderWidth?: string;
  backgroundColor?: string;
  tagsSuggestionsContainerPosition?: "left" | "top" | "right" | "bottom"; //bottom is the default value
}>`
  top: 43px;
  width: 300px;
  padding: 15px 8px;
  gap: 8px;
  max-height: 100px;
  ${(props) =>
    props.size === "small" &&
    css`
      top: 21px;
      width: 150px;
      padding: 7.5px 4px;
      gap: 4px;
      max-height: 50px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      top: 65px;
      width: 450px;
      padding: 21px 12px;
      gap: 12px;
      max-height: 150px;
    `}
    left: 1px;
  ${(props) =>
    props.tagsSuggestionsContainerPosition === "top" &&
    css`
      top: -99px;
      left: 0;
    `}
  ${(props) =>
    props.tagsSuggestionsContainerPosition === "top" &&
    props.size === "small" &&
    css`
      top: -49px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "top" &&
    props.size === "large" &&
    css`
      top: -149px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "right" &&
    css`
      top: -29px;
      left: 299px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "right" &&
    props.size === "small" &&
    css`
      left: 149px;
      top: -15px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "right" &&
    props.size === "large" &&
    css`
      left: 449px;
      top: -44px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "left" &&
    css`
      top: -29px;
      left: -299px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "left" &&
    props.size === "small" &&
    css`
      top: -15px;
      left: -149px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "left" &&
    props.size === "large" &&
    css`
      left: -449px;
      top: -44px;
    `}
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${(props) => props.tagsSuggestionsBorderWidth || "1px"} solid
    ${(props) => props.tagsSuggestionsBorderColor || "#333"};
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;

//TODO ${props => ({...props.sx})}
