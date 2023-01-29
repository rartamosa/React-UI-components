import React, { useState, useEffect } from "react";

const Select = ({ selectOptions, placeholder, shouldCloseOnClear }) => {
  const [selectedOption, setSelectedOption] = useState({ id: "", name: "" });
  const [selectedOptionDraft, setSelectedOptionDraft] = useState({
    id: "",
    name: "",
  });
  const [areSelectOptionsOpen, setAreSelectOptionsOpen] = useState(false);

  useEffect(() => {
    const onWindowClick = () => setAreSelectOptionsOpen(false);
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const onOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionDraft(option);
    setAreSelectOptionsOpen(false);
  };

  const onSelectClear = () => {
    const emptyOption = { id: "", name: "" };
    setSelectedOption(emptyOption);
    setSelectedOptionDraft(emptyOption);
    if (shouldCloseOnClear) {
      setAreSelectOptionsOpen(false);
    }
  };

  const onOptionDraftSubmit = (event) => {
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
    }
  };

  const onOptionDraftChange = (event) => {
    const newOptionDraft = {
      ...selectedOptionDraft,
      name: event.target.value,
    };
    setSelectedOptionDraft(newOptionDraft);
  };

  const onSelectOptionsOpen = (event) => {
    event.stopPropagation();
    setAreSelectOptionsOpen(true);
  };

  return (
    <div className="select-box__container">
      <div className="select-box__selected-option">
        <input
          value={selectedOptionDraft.name}
          onKeyUp={onOptionDraftSubmit}
          onChange={onOptionDraftChange}
          placeholder={placeholder}
          onClick={onSelectOptionsOpen}
        />
        {selectedOption.name && <span onClick={onSelectClear}>&#10005;</span>}
      </div>
      {areSelectOptionsOpen && (
        <ul className="select-box__options">
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
        </ul>
      )}
    </div>
  );
};

export default Select;
