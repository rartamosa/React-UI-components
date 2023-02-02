import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { SelectProps, SelectOption } from "./selectTypes";

import BasicContainer from "../Basic Components/BasicContainer";
import BasicInput from "../Basic Components/BasicInput";
import BasicContainerError from "../Basic Components/BasicContainerError";
import BasicCloseButton from "../Basic Components/BasicCloseButton";

const Select = ({
  selectOptions,
  placeholder,
  shouldCloseOnClear,
  containerBorderColor,
  containerBorderWidth,
  componentSize,
  backgroundColor,
  isDisabled,
  errorBorderColor,
  optionsContainerPosition,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState({ id: "", name: "" });
  const [selectedOptionDraft, setSelectedOptionDraft] = useState({
    id: "",
    name: "",
  });
  const [areSelectOptionsOpen, setAreSelectOptionsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onWindowClick = () => setAreSelectOptionsOpen(false);
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const onOptionSelect = (option: SelectOption): void => {
    setSelectedOption(option);
    setSelectedOptionDraft(option);
    setAreSelectOptionsOpen(false);
  };

  const onSelectClear = (): void => {
    const emptyOption = { id: "", name: "" };
    setSelectedOption(emptyOption);
    setSelectedOptionDraft(emptyOption);
    if (shouldCloseOnClear) {
      setAreSelectOptionsOpen(false);
    }
  };

  const onOptionDraftSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      const matchingOption = selectOptions.find(
        (option) => option.name === selectedOptionDraft.name
      );
      if (matchingOption) {
        setSelectedOption(selectedOptionDraft);
        setAreSelectOptionsOpen(false);
      } else {
        setSelectedOptionDraft(selectedOption);
      }
    } else {
      setError(true);
    }
  };

  const onOptionDraftChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newOptionDraft = {
      ...selectedOptionDraft,
      name: event.target.value,
    };
    setSelectedOptionDraft(newOptionDraft);
  };

  const onSelectOptionsOpen = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    event.stopPropagation();
    setAreSelectOptionsOpen(true);
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
        isDisabled={isDisabled}
      >
        <SelectedOption backgroundColor={backgroundColor}>
          <BasicInput
            value={selectedOptionDraft.name}
            onKeyUp={onOptionDraftSubmit}
            onChange={onOptionDraftChange}
            placeholder={placeholder || "Type..."}
            onClick={onSelectOptionsOpen}
            componentSize={componentSize}
            backgroundColor={backgroundColor}
            disabled={isDisabled}
          />
          {selectedOption.name && (
            <BasicCloseButton onClick={onSelectClear}>&times;</BasicCloseButton>
          )}
        </SelectedOption>
        {areSelectOptionsOpen && (
          <Options
            backgroundColor={backgroundColor}
            componentSize={componentSize}
            optionsContainerPosition={optionsContainerPosition}
          >
            {selectOptions
              .filter((option) =>
                option.name
                  .toLowerCase()
                  .includes(selectedOptionDraft.name.toLowerCase())
              )
              .map((option) => (
                <li key={option.id} onClick={() => onOptionSelect(option)}>
                  {option.name}
                </li>
              ))}
          </Options>
        )}
      </BasicContainer>
    </div>
  );
};

export default Select;

// ${(props) => props.inputSx && css`
// ${props.inputSx}
// `}

export const SelectedOption = styled.div<{
  backgroundColor?: string;
}>`
  height: 20px;
  margin-bottom: -1px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;

export const Options = styled.ul<{
  backgroundColor?: string;
  componentSize?: "small" | "medium" | "large";
  optionsContainerPosition?: "left" | "top" | "right" | "bottom";
}>`
  padding: 10px;
  left: 0;
  top: 43px;
  max-height: 102px;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      top: 21px;
      padding: 5px;
      max-height: 67px;
      min-height: 67px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
    css`
      top: 65px;
      padding: 15px;
      max-height: 157px;
      min-height: 157px;
    `}
    ${(props) =>
    props.optionsContainerPosition === "top" &&
    css`
      top: -101px;
    `}
    ${(props) =>
    props.optionsContainerPosition === "top" &&
    props.componentSize === "small" &&
    css`
      top: -66px;
    `}
    ${(props) =>
    props.optionsContainerPosition === "top" &&
    props.componentSize === "large" &&
    css`
      top: -156px;
    `}
    ${(props) =>
    props.optionsContainerPosition === "right" &&
    css`
      left: 299px;
      top: -50%;
    `}
    ${(props) =>
    props.optionsContainerPosition === "right" &&
    props.componentSize === "small" &&
    css`
      left: 149px;
      top: -100%;
    `}
    ${(props) =>
    props.optionsContainerPosition === "right" &&
    props.componentSize === "large" &&
    css`
      left: 449px;
      top: -75%;
    `}
    ${(props) =>
    props.optionsContainerPosition === "left" &&
    css`
      left: -299px;
      top: -50%;
    `}
    ${(props) =>
    props.optionsContainerPosition === "left" &&
    props.componentSize === "small" &&
    css`
      left: -149px;
      top: -100%;
    `}
    ${(props) =>
    props.optionsContainerPosition === "left" &&
    props.componentSize === "large" &&
    css`
      left: -449px;
      top: -75%;
    `}
  overflow-x: auto;
  width: inherit;
  border: 1px solid #000;
  margin: 0;
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  li {
    list-style-type: none;
    cursor: pointer;
    ${(props) =>
      props.componentSize === "small" &&
      css`
        line-height: 11px;
      `}
    ${(props) =>
      props.componentSize === "large" &&
      css`
        line-height: 25px;
      `}
  }
`;
