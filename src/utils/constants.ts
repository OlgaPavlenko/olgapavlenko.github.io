import { Admin } from "../pages/Admin/Admin";
import { EditMenus } from "../pages/Admin/EditMenus";
import { ManageMenusProducts } from "../pages/Admin/ManageMenusProducts";
import { AdminOrder } from "../pages/Admin/Order";
import { ProductComposition } from "../pages/Admin/ProductComposition";
import { Cart } from "../pages/Cart/Cart";
import { ClientAccount } from "../pages/ClientAccount/ClientAccount";
import { Login } from "../pages/Login/Login";
import { Order } from "../pages/Order/Order";
import { ProductCard } from "../pages/ProductCard/ProductCard";
import { ProductList } from "../pages/ProductList/ProductList";
import { SignUp } from "../pages/SignUp/SignUp";

export const PATHES = [
  {
    path: "/",
    element: ProductList,
  },
  {
    path: "/orders",
    element: Order,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/account",
    element: ClientAccount,
  },
  {
    path: "/productcard",
    element: ProductCard,
  },
  {
    path: "/productlist",
    element: ProductList,
  },
];

export const AUTH_PATHES = [
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/registration",
    element: SignUp,
  },
];

export const ADMIN_PATHES = [
  {
    path: "/admin",
    element: Admin,
    text: "Admin",
  },
  {
    path: "/admin/orders",
    element: AdminOrder,
    text: "Orders",
  },
  {
    path: "/admin/manage/menus",
    element: EditMenus,
    text: "Manage Products",
  },
  {
    path: "/admin/manage/products",
    element: EditMenus,
    text: "Manage Products",
  },
  {
    path: "/admin/manage",
    element: ManageMenusProducts,
    text: "Manage Menus",
  },
  {
    path: "/admin/product/composition",
    element: ProductComposition,
    text: "Product composition",
  },
];

export const ENDPOINTS = {
  ALLERGENS: "allergens",
  INGREDIENTS: "ingredients",
};
