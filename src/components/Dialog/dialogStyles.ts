import styled from "styled-components";

export const AlertDialogWindow = styled.div`
  width: 400px;
  height: 300px;
  background-color: #fff;
  z-index: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 10px;
  height: auto;
  min-height: 120px;
  margin: 30px;
  box-sizing: border-box;
`;

export const AlertDialogHeader = styled.h5<{ dialogHeader: string }>`
  font-size: 20px;
  margin: 10px 0;
  align-self: start;
`;

export const AlertDialogBody = styled.span<{ dialogBody: string }>`
  font-size: 15px;
`;

export const AlertDialogFooter = styled.div`
  display: flex;
  align-self: end;
  gap: 20px;
  margin-top: 20px;
`;
