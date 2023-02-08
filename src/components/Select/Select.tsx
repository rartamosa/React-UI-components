import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { faChevronDown, fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SelectProps, SelectOption } from "./selectTypes";

import BasicContainer from "../Basic Components/BasicContainer";
import BasicInput from "../Basic Components/BasicInput";
import BasicContainerError from "../Basic Components/BasicContainerError";
import BasicCloseButton from "../Basic Components/BasicCloseButton";
import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";

library.add(fas, faChevronDown);

const Select = ({
  selectOptions,
  shouldCloseOnClear,
  placeholder,
  containerBorderColor,
  containerBorderWidth,
  componentSize,
  backgroundColor,
  isDisabled,
  errorBorderColor,
  iconColor,
  customIcon,
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

  const onSelectClear = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    const emptyOption = { id: "", name: "" };
    setSelectedOption(emptyOption);
    setSelectedOptionDraft(emptyOption);
    if (shouldCloseOnClear) {
      setAreSelectOptionsOpen(false);
    } else {
      setAreSelectOptionsOpen(true);
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

  const onSelectOptionsOpen = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    if (isDisabled) {
      setAreSelectOptionsOpen(false);
    } else {
      setAreSelectOptionsOpen(true);
    }
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
        style={{ justifyContent: "space-between" }}
      >
        <SelectedOption
          backgroundColor={isDisabled ? "#c8c8c8" : backgroundColor}
        >
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
            <BasicCloseButton
              onClick={onSelectClear}
              componentSize={componentSize}
            >
              &times;
            </BasicCloseButton>
          )}
        </SelectedOption>

        <FontAwesomeIcon
          icon={customIcon ? ["fas", customIcon] : ["fas", "chevron-down"]}
          color={iconColor || MAIN_DARK_FONT_COLOR}
          onClick={onSelectOptionsOpen}
          style={isDisabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
        />

        {areSelectOptionsOpen && (
          <Options
            backgroundColor={backgroundColor}
            componentSize={componentSize}
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

export const SelectedOption = styled.div<{
  backgroundColor?: string;
}>`
  height: 20px;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border: none;
  flex-grow: 1;
`;

export const Options = styled.ul<{
  backgroundColor?: string;
  componentSize?: "small" | "medium" | "large";
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
