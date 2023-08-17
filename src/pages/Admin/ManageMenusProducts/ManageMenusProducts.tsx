import { Box, Tab, Tabs } from "@mui/material";
import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";

import { CircleIcon } from "../../../components/CircleIcon";
import { ENDPOINTS } from "../../../utils/constants";
import HTTPService from "../../../services/httpService";
import { IProduct } from "../../../interfaces";
import { ProductCard } from "../../../components/ProductCard";
import { TabPanel } from "../../../components/TabPanel/TabPanel";
import styles from "./ManageMenusProducts.module.scss";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const ManageMenusProducts: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [productItems, setProductItems] = useState<IProduct[]>([]);

  useEffect(() => {
    getItem();
  }, []);

  const handleTabChange = (event: SyntheticEvent, tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  const getItem = async () => {
    const { data: items } = await HTTPService.get(ENDPOINTS.PRODUCTS);
    setProductItems(items);
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
          <div className={styles.productCards}>
            <ProductCard items={productItems} />
          </div>
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
