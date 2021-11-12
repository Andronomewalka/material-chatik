import { Box } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { BoxTypeMap, SxProps, Theme } from "@mui/system";
import { ChildrenProp } from "utils/childrenProp";

interface BoxContainerProp extends ChildrenProp {
  sx?: SxProps<Theme>;
}

const BoxContainer: React.FC<BoxContainerProp> = ({ children, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" height="100%" {...props}>
      {children}
    </Box>
  );
};

export default BoxContainer;
