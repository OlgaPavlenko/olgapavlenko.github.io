import { Box, Typography } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface ITabPanelProps {
  index: number;
  value: number;
  children: ReactNode;
}
interface ICustomTabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: ICustomTabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const TabPanel: FunctionComponent<ITabPanelProps> = ({
  value,
  index,
  children,
}) => {
  return (
    <CustomTabPanel value={value} index={index}>
      {children}
    </CustomTabPanel>
  );
};
