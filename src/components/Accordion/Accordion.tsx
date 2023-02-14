import { useState } from "react";
import {
  faChevronDown,
  faChevronUp,
  fas,
  IconPrefix,
  IconName,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AccordionProps,
  MAIN_LIGHT_COLOR,
  SECONDARY_LIGHT_COLOR,
  MAIN_DARK_FONT_COLOR,
} from "./AccordionProps";

import {
  AccordionsContainer,
  SingleAccordion,
  TitleContainer,
  AccordionTitle,
  AccordionSubtitle,
  AccordionBody,
} from "./accordionStyles";

library.add(fas, faChevronDown, faChevronUp);

const Accordion = ({
  accordionBody,
  show = "single",
  customIconExpanded,
  customIconClosed,
  iconColor,
  accordionBodyHeight = "100px",
  scroll = true,
  containerBackgroundColor = MAIN_LIGHT_COLOR,
  accordionBackgroundColor = "#fff",
  defaultIndex,
  defaultIndexes,
}: AccordionProps) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<
    boolean | number
  >(defaultIndex !== undefined ? defaultIndex : false);
  const [areAccordionsExpanded, setAreAccordionsExpanded] = useState<number[]>(
    defaultIndexes ? defaultIndexes : []
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
        return (
          <AccordionBody
            accordionBodyHeight={accordionBodyHeight}
            scroll={scroll}
          >
            {accordion()}
          </AccordionBody>
        );
      } else {
        return (
          <AccordionBody accordionBodyHeight="0" scroll={scroll}>
            {accordion()}
          </AccordionBody>
        );
      }
    } else {
      if (isAccordionExpanded === index) {
        return (
          <AccordionBody
            accordionBodyHeight={accordionBodyHeight}
            scroll={scroll}
          >
            {accordion()}
          </AccordionBody>
        );
      } else {
        return (
          <AccordionBody accordionBodyHeight="0" scroll={scroll}>
            {accordion()}
          </AccordionBody>
        );
      }
    }
  };

  const determineIcon = (index: number): undefined | [IconPrefix, IconName] => {
    if (show === "many") {
      if (areAccordionsExpanded.includes(index)) {
        if (customIconExpanded) {
          return ["fas", customIconExpanded];
        } else {
          return ["fas", "chevron-up"];
        }
      } else {
        if (customIconClosed) {
          return ["fas", customIconClosed];
        } else {
          return ["fas", "chevron-down"];
        }
      }
    } else if (show === "single" || show === undefined) {
      if (isAccordionExpanded === index) {
        if (customIconExpanded) {
          return ["fas", customIconExpanded];
        } else {
          return ["fas", "chevron-up"];
        }
      } else {
        if (customIconClosed) {
          return ["fas", customIconClosed];
        } else {
          return ["fas", "chevron-down"];
        }
      }
    }
  };

  return (
    <AccordionsContainer containerBackgroundColor={containerBackgroundColor}>
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
          accordionBackgroundColor={accordionBackgroundColor}
        >
          <>
            <TitleContainer
              onClick={
                accordion.disabled ? undefined : () => onAccordionToggle(index)
              }
            >
              <div
                style={{ display: "flex", gap: "30px", alignItems: "center" }}
              >
                <AccordionTitle>{accordion.title}</AccordionTitle>
                {accordion.subtitle && (
                  <AccordionSubtitle>{accordion.subtitle}</AccordionSubtitle>
                )}
              </div>
              <FontAwesomeIcon
                icon={determineIcon(index) || ["fas", "chevron-down"]}
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
