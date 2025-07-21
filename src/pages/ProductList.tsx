import {useAuthContext} from '@/context/AuthContext';
import {
  useDeleteProduct,
  useGetAllProduct,
} from '@/lib/react-query/Admin/products';
import {useNavigate} from '@tanstack/react-router';
import React from 'react';
import {FiBox, FiEdit, FiTrash} from 'react-icons/fi';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';

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

  const onEditPress = (item: Product) => {
    navigate({to: `/product/updateproduct/${item.id}`});
  };

  const onDeletePress = (item: Product) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(item.id);
    }
  };

  const columns: Column<Product>[] = [
    {
      header: '#',
      accessor: 'id',
      render: (_row, index) => <span>{index + 1}</span>,
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => row?.category?.name || '-',
    },
    {
      header: 'Desc',
      accessor: 'description',
    },
    {
      header: 'Image',
      accessor: 'image',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="bg-gray-100 h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="bg-gray-100 flex h-16 w-16 items-center justify-center rounded-lg">
            <FiBox size={24} className="text-gray-400" />
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-4">
      <GenericTable
        data={allProducts?.data || []}
        columns={columns}
        itemsPerPage={10}
        searchAble
        action
        title="Product List"
        onEdit={(item) => onEditPress(item)}
        onDelete={(item) => onDeletePress(item)}
      />
    </div>
  );
};

export default ProductList;
