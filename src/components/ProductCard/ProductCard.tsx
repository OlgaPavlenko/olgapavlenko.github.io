import { FunctionComponent, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { IProduct } from "../../interfaces";
import { Paper } from "@mui/material";
import styles from "./ProductCard.module.scss";

interface IProductCard {
  items: IProduct[];
}

export const ProductCard: FunctionComponent<IProductCard> = ({ items }) => {
  return (
    <>
      {items.map(({ img, name, description, weight, price, id }) => {
        return (
          <Paper key={id} className={styles.wrap}>
            <img src={img} alt="image" />
            <div className={styles.bodyWrap}>
              <div className={styles.body}>
                <h1>{name}</h1>
                <span>{description}</span>
              </div>
              <div className={styles.numericWrap}>
                <span className={styles.numeric}>{weight}g</span>
                <span className={styles.numeric}>{price}uah</span>
              </div>
              <div className={styles.btnsWrap}>
                <Button className={styles.editBtn}>EDIT</Button>
                <Button className={styles.delBtn}>DELETE</Button>
              </div>
            </div>
          </Paper>
        );
      })}
    </>
  );
};
