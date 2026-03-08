interface IProps {
  msg?: string;
  key?: string;
}
const InputErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="pt-2 block text-red-700 text-sm">{msg}</span>
  ) : null;
};

export default InputErrorMessage;
