import React from "react";
import { useRouter } from "next/router";
import Category from "../../src/pages/Category";

const TagPage = () => {
  const router = useRouter();
  const { tag } = router.query;

  return <Category category={tag as string} isCategory={false} />;
};

export default TagPage;
