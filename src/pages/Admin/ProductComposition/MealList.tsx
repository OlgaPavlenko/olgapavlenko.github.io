import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";
import DeleteIcon from "@mui/icons-material/Remove";
import { IMeal } from "../../../interfaces";

interface IMealListProps {
  data: IMeal[];
  onDelete: (id: number) => void;
  onUpdate: (item: IMeal) => void;
}

export const MealList: FunctionComponent<IMealListProps> = ({
  data,
  onDelete,
  onUpdate,
}) => {
  const renderList = (
    data: IMeal[],
    onDelete: (id: number) => void,
    onUpdate: (item: IMeal) => void
  ) => {
    return data?.map((item) => {
      const { id, name } = item;

      return (
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={name}
            onClick={() => {
              onUpdate(item);
            }}
          />
        </ListItem>
      );
    });
  };

  return <List>{renderList(data, onDelete, onUpdate)}</List>;
};
