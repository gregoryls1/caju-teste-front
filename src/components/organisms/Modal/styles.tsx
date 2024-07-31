import { styled } from "styled-components";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 380px;
  background-color: #fff;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  padding: 12px 28px 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 8px 8px 0 0;
  span {
    color: #000;
    padding-top: 0;
    cursor: pointer;
  }
`;

export const Body = styled.div`
  padding: 20px 0px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: end;
  button {
    margin-left: 4px;
  }
`;
