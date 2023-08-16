import * as React from "react";
import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import HTTPService from "../../services/httpService";
import { ENDPOINTS } from "../../utils/constants";
import { IMeal } from "../../interfaces";
import styles from "./DropDownList.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

interface IDropDownListProps {
  label: string;
  items: IMeal[];
  callback: (items: string[]) => void;
}

export const DropDownList: FunctionComponent<IDropDownListProps> = ({
  label,
  items,
  callback,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItems = (items: string[]) => {
    console.log("handleItems");
    setSelectedItems(items);
    callback(items);
  };

  const renderMealItems = (items: IMeal[]): React.ReactNode => {
    return items.map(({ name, id }) => (
      <MenuItem key={id} value={name} sx={{ justifyContent: "space-between" }}>
        {name}
        {selectedItems.includes(name) ? <CheckIcon color="info" /> : null}
      </MenuItem>
    ));
  };

  const renderSelectedItems = (selectedItems: string[]): React.ReactNode => {
    return selectedItems.map((name) => (
      <Chip
        key={name}
        label={name}
        onDelete={() =>
          handleItems(selectedItems.filter((item) => item !== name))
        }
        deleteIcon={
          <CancelIcon
            onMouseDown={(event: React.SyntheticEvent) =>
              event.stopPropagation()
            }
          />
        }
      />
    ));
  };

  return (
    <>
      <InputLabel className={styles.label}>{label}</InputLabel>
      <Select
        className={styles.selectList}
        multiple
        value={selectedItems}
        onChange={(e) => handleItems(e.target.value as string[])}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {renderSelectedItems(selected)}
          </Stack>
        )}
      >
        {renderMealItems(items)}
      </Select>
    </>
  );
};
