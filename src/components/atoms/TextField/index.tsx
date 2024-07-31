import { InputHTMLAttributes, forwardRef } from "react";
import * as S from "./style"

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = forwardRef((props: Props, ref) => {
  return (
    <div>
      <label htmlFor={props.id} data-testid="labelTest">{props.label}</label>
      <S.Input {...props} ref={ref} />
      <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
    </div>
  );
});

export default TextField;
