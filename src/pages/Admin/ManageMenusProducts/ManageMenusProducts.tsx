import { Box, Tabs, Tab } from "@mui/material";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import { CircleIcon } from "../../../components/CircleIcon";
import { TabPanel } from "../../../components/TabPanel/TabPanel";
import { MealList } from "../ProductComposition/MealList";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const ManageMenusProducts: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: SyntheticEvent, tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  const renderAddButton = () => {
    return (
      <CircleIcon
        onClick={() => {
          // tabIndex === 1 ? null : null;
        }}
      />
    );
  };

  const renderTabs = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="MENU" {...a11yProps(0)} />
            <Tab label="PRODUCT" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          Menu
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          Product
        </TabPanel>
      </Box>
    );
  };
  return (
    <>
      {renderTabs()}
      {renderAddButton()}
    </>
  );
};
