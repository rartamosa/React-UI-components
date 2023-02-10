import { useState } from "react";
import styled, { css } from "styled-components";
import {
  faChevronDown,
  faChevronUp,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AccordionProps,
  MAIN_LIGHT_COLOR,
  SECONDARY_LIGHT_COLOR,
  MAIN_DARK_FONT_COLOR,
} from "./AccordionProps";

library.add(fas, faChevronDown, faChevronUp);

const Accordion = ({
  accordionBody,
  show = "single",
  customIcon,
  iconColor,
}: AccordionProps) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<
    boolean | number
  >(false);
  const [areAccordionsExpanded, setAreAccordionsExpanded] = useState<number[]>(
    []
  );

  const onSingleAccordionOpen = (index: number): void => {
    if (isAccordionExpanded === index) {
      setIsAccordionExpanded(true);
    } else {
      setIsAccordionExpanded(index);
    }
  };

  const onManyAccordionsOpen = (index: number): void => {
    if (areAccordionsExpanded.includes(index)) {
      setAreAccordionsExpanded(
        areAccordionsExpanded.filter((item) => item !== index)
      );
    } else {
      setAreAccordionsExpanded([...areAccordionsExpanded, index]);
    }
  };

  const onAccordionToggle = (index: number): void => {
    if (show === "many") {
      onManyAccordionsOpen(index);
    } else if (show === "single") {
      onSingleAccordionOpen(index);
    }
  };

  const determineOpen = (
    index: number,
    accordion: () => React.ReactNode
  ): JSX.Element | null => {
    if (show === "many") {
      if (areAccordionsExpanded.includes(index)) {
        return <AccordionBody>{accordion()}</AccordionBody>;
      } else {
        return null;
      }
    } else {
      if (isAccordionExpanded === index) {
        return <AccordionBody>{accordion()}</AccordionBody>;
      } else {
        return null;
      }
    }
  };

  return (
    <AccordionsContainer>
      {accordionBody.map((accordion, index) => (
        <SingleAccordion
          key={accordion.id}
          style={
            accordion.disabled
              ? {
                  cursor: "not-allowed",
                  backgroundColor: SECONDARY_LIGHT_COLOR,
                }
              : { cursor: "pointer" }
          }
        >
          <>
            <TitleContainer onClick={() => onAccordionToggle(index)}>
              <AccordionTitle>{accordion.title}</AccordionTitle>
              <FontAwesomeIcon
                icon={
                  customIcon ? ["fas", customIcon] : ["fas", "chevron-down"]
                }
                // icon={
                //   isAccordionExpanded
                //     ? ["fas", "chevron-up"]
                //     : ["fas", "chevron-down"]
                // }
                color={iconColor || MAIN_DARK_FONT_COLOR}
                style={
                  accordion.disabled
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
              />
            </TitleContainer>

            {determineOpen(index, accordion.children)}
          </>
        </SingleAccordion>
      ))}
    </AccordionsContainer>
  );
};

export default Accordion;

export const AccordionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${MAIN_LIGHT_COLOR};
  padding: 10px;
  border-radius: 8px;
  width: 60%;
`;

export const SingleAccordion = styled.div<{
  key: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${MAIN_LIGHT_COLOR};
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const AccordionTitle = styled.h3`
  margin: 0;
`;

export const AccordionBody = styled.div``;
