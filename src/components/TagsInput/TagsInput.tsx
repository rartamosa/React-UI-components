import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { TagInputProps } from "./tagsInputTypes";

import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";
import BasicContainer from "../Basic Components/BasicContainer";
import BasicInput from "../Basic Components/BasicInput";
import BasicContainerError from "../Basic Components/BasicContainerError";
import BasicCloseButton from "../Basic Components/BasicCloseButton";

const TagInput = ({
  tags,
  onTagAdd,
  // eslint-disable-next-line
  tagsSuggestions,
  onTagRemove,
  containerBorderColor,
  containerBorderWidth,
  componentSize,
  tagsSuggestionsBorderColor,
  tagsSuggestionsBorderWidth,
  backgroundColor,
  placeholder,
  tagsFontColor,
  errorBorderColor,
  isDisabled, // TODO ten props powinien blokować wszystko, równiez mozliwość usuwania tagów
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
      // TODO to jest case sensitive, zmienić to
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
        <BasicContainerError
          errorBorderColor={errorBorderColor}
          componentSize={componentSize}
        />
      )}

      <BasicContainer
        containerBorderColor={containerBorderColor}
        containerBorderWidth={containerBorderWidth}
        componentSize={componentSize}
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
              componentSize={componentSize}
              tagsFontColor={tagsFontColor}
            >
              {currentTag?.name}
              <BasicCloseButton
                onClick={() => handleTagRemove(tagID)}
                componentSize={componentSize}
              >
                &times;
              </BasicCloseButton>
            </TagsInputContainerSingleTag>
          );
        })}
        <BasicInput
          componentSize={componentSize}
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
            componentSize={componentSize}
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
                  componentSize={componentSize}
                  tagsFontColor={tagsFontColor}
                >
                  {tag.name}
                </TagsInputContainerSingleTag>
              ))}
          </TagsInputContainerSuggestions>
        )}
      </BasicContainer>
    </div>
  );
};

export default TagInput;

export const TagsInputContainerSingleTag = styled.span<{
  componentSize?: "small" | "medium" | "large";
  tagsFontColor?: string;
}>`
  padding: 6px 12px;
  gap: 4px;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      padding: 3px 6px;
      gap: 2px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
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

export const TagsInputContainerSuggestions = styled.div<{
  componentSize?: "small" | "medium" | "large";
  tagsSuggestionsBorderColor?: string;
  tagsSuggestionsBorderWidth?: string;
  backgroundColor?: string;
  tagsSuggestionsContainerPosition?: "left" | "top" | "right" | "bottom";
}>`
  top: 43px;
  width: 300px;
  padding: 15px 8px;
  gap: 8px;
  max-height: 100px;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      top: 21px;
      width: 150px;
      padding: 7.5px 4px;
      gap: 4px;
      max-height: 50px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
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
    props.componentSize === "small" &&
    css`
      top: -49px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "top" &&
    props.componentSize === "large" &&
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
    props.componentSize === "small" &&
    css`
      left: 149px;
      top: -15px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "right" &&
    props.componentSize === "large" &&
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
    props.componentSize === "small" &&
    css`
      top: -15px;
      left: -149px;
    `}
    ${(props) =>
    props.tagsSuggestionsContainerPosition === "left" &&
    props.componentSize === "large" &&
    css`
      left: -449px;
      top: -44px;
    `}
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${(props) => props.tagsSuggestionsBorderWidth || "1px"} solid
    ${(props) => props.tagsSuggestionsBorderColor || MAIN_DARK_FONT_COLOR};
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;
