import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "./ProgressCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
const StatBox = ({
  title,
  tooltip = "",
  subtitle,
  icon,
  color,
  progress,
  increase,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={"#fff"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={2}
      borderRadius={2}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
    >
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#333", fontSize: "25px" }}
            >
              {title}
              <>
                {" "}
                {tooltip && (
                  <Tooltip TransitionComponent={Zoom} title={tooltip} arrow>
                    <IconButton>
                      <ContactSupportIcon color="gray" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            </Typography>
          </Box>
          <Box>{icon}</Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{ fontSize: "15px" }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
