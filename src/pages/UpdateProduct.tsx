import React from 'react';
import ProductPage from './ProductsPage';
import {Route} from '@/routes/_app/product/updateproduct.$id';

const UpdateProduct = () => {
  const {id} = Route.useParams();
  return <ProductPage mode="edit" id={id} />;
};

export default UpdateProduct;
