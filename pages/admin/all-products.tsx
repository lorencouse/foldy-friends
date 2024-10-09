import AllProducts from "../../src/components/backend/product/AllProducts";
import AdminRoute from "../../src/components/AdminRoute";
import { ProductInfo } from "../../src/types";
import { getAllProducts } from "../../src/lib/api";

const ProductsPage = ({ products }: { products: ProductInfo[] }) => {
  return <AllProducts products={products} />;
};

export default AdminRoute(ProductsPage);

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
