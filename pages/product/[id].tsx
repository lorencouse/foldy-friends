import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../src/lib/firebaseConfig";
import { ProductInfo } from "../../src/types";
import { shuffleProducts } from "../../src/tools/ProductFilterFunctions";
import { useRouter } from "next/router";
import { LoadingScreen } from "../../src/components/Product/LoadingScreen";
import Product from "../../src/pages/Product"

const convertTimestamps = (data: any) => {
  for (const key in data) {
    if (data[key] instanceof Object && data[key].toDate) {
      data[key] = data[key].toDate().toISOString();
    } else if (typeof data[key] === "object") {
      convertTimestamps(data[key]);
    }
  }
  return data;
};

export async function getStaticPaths() {
  const productsQuery = collection(db, "products");
  const productsSnapshot = await getDocs(productsQuery);

  const paths = productsSnapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return {
    paths,
    fallback: false, // Render on-demand if path not found
  };
}


export async function getStaticProps(context: any) {
  const { id } = context.params;

  const productDocRef = doc(db, "products", id);
  const productPromise = getDoc(productDocRef);

  const productDoc = await productPromise;
  if (!productDoc.exists()) {
    return {
      notFound: true,
    };
  }

  const productData = productDoc.data();
  const serializedProduct = convertTimestamps(productData);

  const relatedProductsQuery = query(
    collection(db, "products"),
    where("category", "==", serializedProduct.category),
    limit(10),
  );
  const relatedProductsPromise = getDocs(relatedProductsQuery);

  const [relatedProductsSnapshot] = await Promise.all([relatedProductsPromise]);

  const relatedProductList = relatedProductsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as ProductInfo[];

  const relatedProducts = shuffleProducts(
    relatedProductList.filter((p) => p.id !== serializedProduct.id),
    4,
  );

  return {
    props: {
      product: serializedProduct as ProductInfo,
      relatedProducts: relatedProducts as ProductInfo[],
    },
  };
}

const ProductPage = ({
  product,
  relatedProducts,
}: {
  product: ProductInfo;
  relatedProducts: ProductInfo[];
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  return <Product product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;