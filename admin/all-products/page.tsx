import AllProducts from "./AllProducts";
import { Product } from "@/types";
import { getAllProducts } from "@/lib/actions";

const ProductsPage = async () => {
  const products: Product[] = await getAllProducts();
  return <AllProducts products={products} />;
};

export default ProductsPage;
