import { Avatar, IconButton } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./EditMenus.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import noImage from "../../../assets/svg/image-file.svg";
import Input from "@mui/joy/Input";
import { DropDownList } from "../../../components/DropDownList";
import HTTPService from "../../../services/httpService";
import { ENDPOINTS } from "../../../utils/constants";
import { IMeal } from "../../../interfaces";

export const EditMenus: FunctionComponent = () => {
  const [allergens, setAllergens] = useState<IMeal[]>([]);
  const [ingredients, setIngredients] = useState<IMeal[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [inputDescrValue, setInputDescrValue] = useState();

  const getAllAllergens = async () => {
    const { data } = await HTTPService.get(ENDPOINTS.ALLERGENS);
    setAllergens(data);
  };
  const getAllIngredients = async () => {
    const { data } = await HTTPService.get(ENDPOINTS.INGREDIENTS);
    setIngredients(data);
  };

  const getSelectedlAllergens = (items: string[]) => {
    console.log("edit", items);
  };
  const getSelectedIngredients = (items: string[]) => {
    console.log("edit", items);
  };

  useEffect(() => {
    getAllAllergens();
    getAllIngredients();
  }, []);

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e: any) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        setImgUrl(result as string);
      })
      .catch((err) => {
        console.log(err);
      });

    setImgUrl(e.target.files[0]);
  };

  return (
    <div className={styles.editing_products}>
      <div className={styles.editing_products_header}>
        <h2>Editing product</h2>
        <IconButton
          aria-label="close"
          onClick={() => {}}
          className={styles.editing_products_header_button}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <form method="post">
        <div className={styles.main_product_info}>
          <div className={styles.main_product_info_photo_wrap}>
            <Avatar
              alt="product"
              src={imgUrl || noImage}
              className={styles.main_product_info_photo_avatar}
            />
          </div>

          <label className={styles.input_file}>
            <input type="file" name="file" onChange={handleFileInputChange} />
            <span>CHANGE</span>
          </label>
        </div>
        <div className={styles.descr}>
          <p>Description</p>
          <Input
            placeholder="Type in here…"
            className={styles.descrInput}
            size="lg"
            value={inputDescrValue}
            onClick={() => {}}
          />
        </div>
        <div className={styles.descr}>
          <DropDownList
            items={allergens}
            callback={getSelectedlAllergens}
            label="Allergens"
          />
        </div>
        <div className={styles.descr}>
          <DropDownList
            items={ingredients}
            callback={getSelectedIngredients}
            label="Ingredients"
          />
        </div>
        {/* <div className={styles.descr}>
          <p>Ingredients</p>
          <DropDownList items={"INGREDIENTS"} />
        </div> */}
      </form>
    </div>
  );
};
