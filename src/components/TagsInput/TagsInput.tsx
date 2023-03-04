import React, { useState, useEffect, useRef } from "react";

import { TagInputProps } from "./tagsInputTypes";

import BasicContainer from "../Basic Components/BasicContainer";
import BasicInput from "../Basic Components/BasicInput";
import BasicContainerError from "../Basic Components/BasicContainerError";
import BasicCloseButton from "../Basic Components/BasicCloseButton";
import {
  TagsInputContainerSingleTag,
  TagsInputContainerSuggestions,
} from "./tagsInputStyles";

const TagInput = ({
  tags,
  onTagAdd,
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && inputRef.current) {
      containerRef.current.scrollLeft = inputRef.current.offsetLeft;
    }
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
      const matchingTag = tagsSuggestions.find((tag) =>
        tag.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      const existingTag = tags.find((tag) => tag === matchingTag?._id);
      if (matchingTag && !existingTag) {
        onTagAdd(matchingTag._id);
        setInternalTagsSuggestions(
          internalTagsSuggestions.filter((tag) => tag._id !== matchingTag._id)
        );
      } else {
        setError(true);
        setInputValue("");
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
        ref={containerRef}
      >
        {tags.map((tagID) => {
          const currentTag = tagsSuggestions.find(
            (tagToShow) => tagToShow._id === tagID
          );
          return (
            <TagsInputContainerSingleTag
              style={
                isDisabled
                  ? { backgroundColor: "#808080" }
                  : { backgroundColor: currentTag?.color }
              }
              key={tagID}
              componentSize={componentSize}
              tagsFontColor={tagsFontColor}
              isDisabled={isDisabled || false}
            >
              {currentTag?.name}
              <BasicCloseButton
                onClick={isDisabled ? undefined : () => handleTagRemove(tagID)}
                componentSize={componentSize}
                style={
                  isDisabled ? { cursor: "not-allowed" } : { cursor: "pointer" }
                }
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
