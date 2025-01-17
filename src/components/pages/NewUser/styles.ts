import styled from "styled-components";
import { _IconButtonStyled } from "~/components/atoms/Buttons/IconButton";
import Button from "~/components/atoms/Buttons";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${_IconButtonStyled} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button} {
    align-self: flex-end;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${Button} {
    align-self: flex-end;
  }
`;
