import React from 'react';
import CreateProductCategory from './CreateProductCategory';
import DisplayProductCategory from './DisplayProductCategory';

const ProductCategoryPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <CreateProductCategory />
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <DisplayProductCategory />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
