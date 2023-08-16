import { Box, Tabs, Tab, TextField } from "@mui/material";
import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./ProductComposition.module.scss";
import { Modal } from "../../../components/Modal/Modal";
import { TabPanel } from "../../../components/TabPanel/TabPanel";
import { ENDPOINTS } from "../../../utils/constants";
import HTTPService from "../../../services/httpService";
import { MealList } from "./MealList";
import { IMeal } from "../../../interfaces";
import { CircleIcon } from "../../../components/CircleIcon/CircleIcon";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProductComposition: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [openAllergenModal, setOpenAllergenModal] = useState(false);
  const [allergens, setAllergens] = useState([]);
  const [ingredients, setIngredients] = useState<IMeal[]>([]);
  const [modalInputValue, setModalInputValue] = useState("");
  const [selectedMealId, setSelectedMealId] = useState(0);

  const getAllergens = async () => {
    const { data: allergens } = await HTTPService.get(ENDPOINTS.ALLERGENS);

    setAllergens(allergens);
  };
  const getIngredients = async () => {
    const { data: ingredients } = await HTTPService.get(ENDPOINTS.INGREDIENTS);

    setIngredients(ingredients);
  };

  useEffect(() => {
    getAllergens();
    getIngredients();
  }, []);

  const addNewAllergen = async (allergen: string) => {
    const response = await HTTPService.post(ENDPOINTS.ALLERGENS, {
      name: allergen,
    });
    if (!response.data) return;
    getAllergens();
  };

  const addNewIngredient = async (ingredient: string) => {
    const response = await HTTPService.post(ENDPOINTS.INGREDIENTS, {
      name: ingredient,
    });
    if (!response.data) return;
    getIngredients();
  };

  const onDeleteAllergen = async (id: number) => {
    await HTTPService.delete(ENDPOINTS.ALLERGENS + "/" + id);
    getAllergens();
  };
  const onUpdateAllergen = async (item: IMeal) => {
    await HTTPService.patch(ENDPOINTS.ALLERGENS + "/" + item.id, item);
    getAllergens();
  };
  const onUpdateIngredient = async (item: IMeal) => {
    await HTTPService.patch(ENDPOINTS.INGREDIENTS + "/" + item.id, item);
    getIngredients();
  };

  const onDeleteIngredient = async (id: number) => {
    await HTTPService.delete(ENDPOINTS.INGREDIENTS + "/" + id);
    getIngredients();
  };

  const handleTabChange = (event: SyntheticEvent, tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  const handleUpdateItem = ({ name, id }: IMeal) => {
    setModalInputValue(name);
    setSelectedMealId(id);
    if (tabIndex === 0) {
      setOpenAllergenModal(true);
    } else {
      setOpenIngredientModal(true);
    }
  };

  const handleOkIngredientModal = () => {
    console.log("zhzg");
    if (selectedMealId !== 0) {
      onUpdateIngredient({ name: modalInputValue, id: selectedMealId });
    } else {
      addNewIngredient(modalInputValue);
    }
    setOpenIngredientModal(false);
    setModalInputValue("");
    setSelectedMealId(0);
  };

  const handleCancelIngredientModal = () => {
    setOpenIngredientModal(false);
    setModalInputValue("");
    setSelectedMealId(0);
  };
  const handleOkAllergenModal = () => {
    console.log("zhzg22");
    if (selectedMealId !== 0) {
      onUpdateAllergen({ name: modalInputValue, id: selectedMealId });
    } else {
      addNewAllergen(modalInputValue);
    }

    setOpenAllergenModal(false);
    setModalInputValue("");
    setSelectedMealId(0);
  };

  const handleCancelAllergenModal = () => {
    setOpenAllergenModal(false);
    setModalInputValue("");
    setSelectedMealId(0);
  };

  const renderAddButton = () => {
    return (
      <CircleIcon
        onClick={() => {
          tabIndex === 1
            ? setOpenIngredientModal(true)
            : setOpenAllergenModal(true);
        }}
      />
    );
  };

  const renderIngredientModal = () => {
    return (
      <Modal
        onOkClick={handleOkIngredientModal}
        onCancelClick={handleCancelIngredientModal}
        title={selectedMealId === 0 ? "Add ingredient" : "Edit ingredient"}
        okText={selectedMealId === 0 ? "Add" : "Edit"}
      >
        <TextField
          id="name"
          label="name"
          value={modalInputValue}
          onChange={(e) => setModalInputValue(e.target.value)}
          helperText="Add name of ingredient"
          autoComplete="off"
        />
      </Modal>
    );
  };

  const renderAllergenModal = () => {
    return (
      <Modal
        onOkClick={handleOkAllergenModal}
        onCancelClick={handleCancelAllergenModal}
        title={selectedMealId === 0 ? "Add allergen" : "Edit allergen"}
        okText={selectedMealId === 0 ? "Add" : "Edit"}
      >
        <TextField
          id="name"
          label="name"
          value={modalInputValue}
          onChange={(e) => setModalInputValue(e.target.value)}
          helperText="Add name of allergen"
          autoComplete="off"
        />
      </Modal>
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
            <Tab label="ALLERGENS" {...a11yProps(0)} />
            <Tab label="INGREDIENTS" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <MealList
            data={allergens}
            onDelete={onDeleteAllergen}
            onUpdate={handleUpdateItem}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <MealList
            data={ingredients}
            onDelete={onDeleteIngredient}
            onUpdate={handleUpdateItem}
          />
        </TabPanel>
      </Box>
    );
  };

  return (
    <>
      {renderTabs()}
      {renderAddButton()}
      {openIngredientModal && renderIngredientModal()}
      {openAllergenModal && renderAllergenModal()}
    </>
  );
};
