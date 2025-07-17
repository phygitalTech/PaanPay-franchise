/* eslint-disable*/
import {useAuthContext} from '@/context/AuthContext';
import {
  useDeleteProduct,
  useGetAllProduct,
} from '@/lib/react-query/Admin/products';
import {useNavigate} from '@tanstack/react-router';
import React from 'react';
import {FiBox, FiEdit, FiTrash} from 'react-icons/fi';

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  s3filekey: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    description: string;
    adminId: string;
    createdAt: string;
  };
  adminId: string;
  merchantId: string | null;
  self: number;
  level1: number;
  level2: number;
  price: number | null;
  createdAt: string;
  updatedAt: string;

  productSizes: ProductSize[];
  produtRawMaterial: ProductRawMaterial[];
};

export type ProductSize = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt?: string;

  productExtraItems: ProductExtraItem[];
};

export type ProductExtraItem = {
  id: string;
  productSizesId: string;
  extraItemsId: string;
  price: number;
  createdAt: string;
};

export type ProductRawMaterial = {
  id: string;
  productSizesId: string;
  rawMaterialId: string;
  quantity: number;
  createdAt: string;
};

const ProductList = () => {
  const {user} = useAuthContext();
  const adminId = user?.id;

  const navigate = useNavigate();

  const {data: allProducts} = useGetAllProduct(adminId!);
  const {mutateAsync: deleteProduct} = useDeleteProduct();

  console.log('all products', allProducts);

  const onEditPress = (item: Product) => {
    navigate({to: `/product/updateproduct/${item.id}`});
  };

  const onDeleePress = (item: Product) => {
    deleteProduct(item.id);
  };
  return (
    <div className="space-y-4">
      <header className="rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-semibold leading-tight">Product List</h1>
        <p className="text-sm opacity-90">Manage your products</p>
      </header>

      <section className="rounded-md bg-white shadow">
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="[&_th]:border [&_th]:border-neutral-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left">
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Desc</th>
                <th>Image</th>
                <th>Cancle</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody className="[&_td]:border [&_td]:border-neutral-200 [&_td]:px-4 [&_td]:py-2">
              {allProducts?.data?.map((each: any, index) => (
                <tr
                  key={each.id}
                  className="hover:bg-gray-50 even:bg-gray-50/50 odd:bg-white"
                >
                  <td>{index + 1}</td>
                  <td>{each?.name}</td>
                  <td className="whitespace-nowrap">{each?.category?.name}</td>

                  <td>{each?.description}</td>
                  <td className="max-w-[15rem] truncate">
                    {' '}
                    {each.image ? (
                      <img
                        src={each.image}
                        alt={each.name}
                        className="bg-gray-100 mr-4 h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="bg-gray-100 mr-4 flex h-16 w-16 items-center justify-center rounded-lg">
                        <FiBox size={24} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="">
                    {' '}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleePress(each);
                      }}
                    >
                      <FiTrash size={20} className="ml-4 text-red-500" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onEditPress(each)}>
                      <FiEdit size={20} className="ml-4 text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
