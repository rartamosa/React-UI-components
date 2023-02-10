import styled, { css } from "styled-components";
import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";

export const TagsInputContainerSingleTag = styled.span<{
  componentSize?: "small" | "medium" | "large";
  tagsFontColor?: string;
  isDisabled?: boolean;
}>`
  padding: 6px 12px;
  gap: 4px;
  height: fit-content;
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
  ${(props) =>
    props.isDisabled &&
    css`
      color: #333;
      cursor: not-allowed;
    `}
`;

export const TagsInputContainerSuggestions = styled.div<{
  componentSize?: "small" | "medium" | "large";
  tagsSuggestionsBorderColor?: string;
  tagsSuggestionsBorderWidth?: string;
  backgroundColor?: string;
  tagsSuggestionsContainerPosition?: "left" | "top" | "right" | "bottom";
  mobileTagsSuggestionsContainerPosition?: "top" | "bottom;";
}>`
  top: 43px;
  width: 300px;
  padding: 15px 8px;
  gap: 8px;
  height: 100px;
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
  @media (max-width: 768px) {
    ${(props) =>
      props.tagsSuggestionsContainerPosition === "top" &&
      css`
        top: -99px;
      `}
  }
`;
