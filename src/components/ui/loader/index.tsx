import "./loader.css";
interface IProps {
  borderColor?: string;
}
export default function Loader({ borderColor = "#fff" }: IProps) {
  return (
    <span
      style={{
        border: `3px solid ${borderColor}`,
        borderBottomColor: "transparent",
      }}
      className="loader"
    ></span>
  );
}
