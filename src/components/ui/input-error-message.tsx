import { twMerge } from "tailwind-merge";

interface IProps {
  msg?: string;
  key?: string;
  className?: string;
}
const InputErrorMessage = ({ msg, className }: IProps) => {
  return msg ? (
    <span className={twMerge("block pt-2 text-sm text-red-700", className)}>
      {msg}
    </span>
  ) : null;
};

export default InputErrorMessage;
