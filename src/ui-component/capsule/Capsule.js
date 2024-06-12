import { styled } from "@mui/material/styles";
import theme from "../../themes";

const CustomCapsule = styled("div")(({ theme, bgcolor }) => ({
  backgroundColor: getBackgroundColor(theme, bgcolor),
  color: getColor(theme, bgcolor),
  borderRadius: 5,
  padding: "3px 6px",
  display: "inline-block",
  fontSize: 12,
  fontWeight: 500,
}));

const getBackgroundColor = (theme, bgcolor) => {
  switch (bgcolor) {
    case "blue":
      return "#9bcef7";
    case "orange":
      return "#ffc09f";
    case "green":
      return "#adf7b6";
    case "yellow":
      return "#ffee93";
    case "red":
      return "#fc9294";
    case "dark":
      return "#81848e";

    default:
      return "transparent";
  }
};

const getColor = (theme, bgcolor) => {
  switch (bgcolor) {
    case "blue":
      return "#008cff";
    case "orange":
      return "#f25913";
    case "green":
      return "#11bf56";
    case "yellow":
      return "#dbad08";
    case "red":
      return "#db1111";
    case "dark":
      return "#e5e5e5";
    default:
      return "transparent";
  }
};

export default function Capsule(props) {
  const { label, bgcolor } = props;

  return (
    <CustomCapsule theme={theme} bgcolor={bgcolor}>
      {label}
    </CustomCapsule>
  );
}
