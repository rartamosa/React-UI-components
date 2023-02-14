import React, { useState, useEffect } from "react";
import { faChevronDown, fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SelectProps, SelectOption } from "./selectTypes";

import BasicContainer from "../Basic Components/BasicContainer";
import BasicInput from "../Basic Components/BasicInput";
import BasicContainerError from "../Basic Components/BasicContainerError";
import BasicCloseButton from "../Basic Components/BasicCloseButton";
import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";
import { SelectedOption, Options } from "./selectStyles";

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
    setError(false);
  };

  const onSelectClear = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    const emptyOption = { id: "", name: "" };
    setSelectedOption(emptyOption);
    setSelectedOptionDraft(emptyOption);
    setError(false);
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
        setError(false);
      } else {
        setSelectedOptionDraft(selectedOption);
        setError(false);
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
    setError(false);
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
