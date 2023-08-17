import { Avatar, IconButton, Paper } from "@mui/material";
import {
  ChangeEvent,
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import HTTPService, { baseUrl } from "../../../services/httpService";
import { IMeal, IProduct } from "../../../interfaces";

import { Button } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import { DropDownList } from "../../../components/DropDownList";
import { ENDPOINTS } from "../../../utils/constants";
import Input from "@mui/joy/Input";
import noImage from "../../../assets/svg/image-file.svg";
import styles from "./EditMenus.module.scss";

export const EditMenus: FunctionComponent = () => {
  const [allergens, setAllergens] = useState<IMeal[]>([]);
  const [ingredients, setIngredients] = useState<IMeal[]>([]);

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: "",
    img: "",
    description: "",
    ingredients: [],
    allergens: [],
    weight: "",
    price: 0,
  });

  const getAllAllergens = async () => {
    const { data } = await HTTPService.get(ENDPOINTS.ALLERGENS);
    setAllergens(data);
  };
  const getAllIngredients = async () => {
    const { data } = await HTTPService.get(ENDPOINTS.INGREDIENTS);
    setIngredients(data);
  };

  const getSelectedlAllergens = (items: string[]) => {
    setProduct({ ...product, allergens: items });
  };
  const getSelectedIngredients = (items: string[]) => {
    setProduct({ ...product, ingredients: items });
  };

  useEffect(() => {
    getAllAllergens();
    getAllIngredients();
  }, []);

  const createProduct = async (product: IProduct) => {
    await HTTPService.post(ENDPOINTS.PRODUCTS, product);
  };

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
        setProduct({ ...product, img: result as string });
      })
      .catch((err) => {
        console.log(err);
      });

    setProduct({ ...product, img: e.target.files[0] });
  };

  const addNewProduct = (e: SyntheticEvent) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    createProduct(newProduct);
  };
  const nameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };
  const weightInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, weight: e.target.value });
  };
  const priceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, price: Number(e.target.value) });
  };
  const descriptionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, description: e.target.value });
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
              src={product.img || noImage}
              className={styles.main_product_info_photo_avatar}
            />
          </div>

          <label className={styles.input_file}>
            <input type="file" name="file" onChange={handleFileInputChange} />
            <span>CHANGE</span>
          </label>
        </div>
        <label className={styles.descr}>
          <span className={styles.descrLabel}>Name</span>
          <Input
            placeholder="Type name in here…"
            className={styles.descrInput}
            size="lg"
            value={product.name}
            onChange={nameInputChange}
          />
        </label>
        <label className={styles.descr}>
          <span className={styles.descrLabel}>Description</span>
          <Input
            placeholder="Type in here…"
            className={styles.descrInput}
            size="lg"
            value={product.description}
            onChange={descriptionInputChange}
          />
        </label>
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
        <label className={styles.descr}>
          <span className={styles.descrLabel}>Weight</span>
          <Input
            size="lg"
            placeholder="0g"
            value={product.weight}
            onChange={weightInputChange}
          />
        </label>
        <label className={styles.descr}>
          <span className={styles.descrLabel}>Price</span>
          <Input
            size="lg"
            placeholder="0uah"
            value={product.price}
            onChange={priceInputChange}
          />
        </label>
        <div className={styles.buttonSpace}>
          <Button className={styles.button} onClick={addNewProduct}>
            SAVE
          </Button>
          <Button
            variant="outlined"
            className={styles.buttonDel}
            onClick={function () {}}
          >
            DELETE PRODUCT
          </Button>
        </div>
      </form>
    </div>
  );
};
