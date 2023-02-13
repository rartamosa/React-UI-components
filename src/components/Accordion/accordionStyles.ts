import styled from "styled-components";

import { MAIN_LIGHT_COLOR } from "./AccordionProps";

export const AccordionsContainer = styled.div<{
  containerBackgroundColor?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${(props) => props.containerBackgroundColor};
  padding: 10px;
  border-radius: 8px;
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SingleAccordion = styled.div<{
  key: string;
  accordionBackgroundColor?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${MAIN_LIGHT_COLOR};
  background-color: ${(props) => props.accordionBackgroundColor};
  padding: 10px;
  border-radius: 8px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  gap: 30px;
`;

export const AccordionTitle = styled.h3`
  margin: 0;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const AccordionSubtitle = styled.span`
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const AccordionBody = styled.div<{
  accordionBodyHeight?: string;
  scroll?: boolean;
}>`
  cursor: default;
  max-height: ${(props) => props.accordionBodyHeight};
  overflow-y: ${(props) => (props.scroll ? "scroll" : "hidden")};
  transition: max-height 0.3s;
`;
