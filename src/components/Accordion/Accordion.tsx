import { useState } from "react";
import styled, { css } from "styled-components";

import { AccordionProps, AccordionData } from "./AccordionProps";

const Accordion = ({ accordionBody }: AccordionProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div>
      {accordionBody.map((accordion) => (
        <AccordionsContainer key={accordion.id}>
          <SingleAccordion>{accordion.children()}</SingleAccordion>
        </AccordionsContainer>
      ))}
    </div>
  );
};

export default Accordion;

export const AccordionsContainer = styled.div`
  display: flex;
`;

export const SingleAccordion = styled.div`
  display: flex;
`;
