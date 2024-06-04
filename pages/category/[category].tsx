import React from 'react';
import { useRouter } from 'next/router';
import Category from '../../src/Category';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return <Category category={ category as string} />;
};

export default CategoryPage;