/* eslint-disable*/

import {useAuthContext} from '@/context/AuthContext';
import {
  useGetAllExtraItems,
  useGetAllProductCategory,
  useGetAllRawMaterial,
  useGetProductById,
  useSaveProduct,
  useUpdateProduct,
} from '@/lib/react-query/Admin/products';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

type Size = {id: string; name: string; price: number};
type QtyMap = Record<string, number>;

interface Row {
  id: string;
  material: string;
  qty: QtyMap;
}

type Props = {
  mode: 'create' | 'edit';
  id?: string;
};
const ProductPage: React.FC<Props> = ({mode, id}) => {
  const {user} = useAuthContext();
  const adminId = user?.id;
  const {data: allMaterials} = useGetAllRawMaterial(adminId!);
  const {data: allProductCategory} = useGetAllProductCategory(adminId!);
  const {data: allExtraItems} = useGetAllExtraItems(adminId!);
  const {mutateAsync: saveProduct, isSuccess} = useSaveProduct(adminId!);
  const {mutateAsync: updateProduct, isSuccess: successUpdate} =
    useUpdateProduct(id!);
  const {data: oneProductData} = useGetProductById(id!);
  const [justUpdated, setJustUpdated] = useState(false);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [self, setSelf] = useState('');
  const [level1, setLevel1] = useState('');
  const [level2, setLevel2] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [sizes, setSizes] = useState<Size[]>([]);

  const [rawRows, setRawRows] = useState<Row[]>([
    {id: uid(), material: '', qty: {}},
  ]);
  const [extraRows, setExtraRows] = useState<Row[]>([
    {id: uid(), material: '', qty: {}},
  ]);

  const addColumn = () => {
    setSizes([...sizes, {id: uid(), name: '', price: 0}]);
  };

  const deleteColumn = () => {
    setSizes((prevSizes) => prevSizes.slice(0, -1));
  };

  const updateSize = (id: string, key: 'name' | 'price', value: string) =>
    setSizes(
      sizes.map((s) =>
        s.id === id ? {...s, [key]: key === 'price' ? +value : value} : s,
      ),
    );

  const changeQty = (
    rowId: string,
    sizeId: string,
    value: string,
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
  ) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId ? {...r, qty: {...r.qty, [sizeId]: +value}} : r,
      ),
    );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success('Image selected successfully!');
    }
  };

  useEffect(() => {
    if (justUpdated) return;
    if (oneProductData?.data) {
      const product = oneProductData.data;

      setProductName(product.name);
      setDescription(product.description);
      setSelf(String(product.self));
      setCategory(product.category?.id ?? '');
      setLevel1(String(product.level1));
      setLevel2(String(product.level2));
      setImageFile(product.image); // or handle preview if needed

      if (product.image) {
        setImagePreview(product.image);
      }
      const fetchedSizes = product.productSizes.map((size) => ({
        id: size.id,
        name: size.name,
        price: size.price,
      }));
      setSizes(fetchedSizes);

      const rawRowMap: Record<string, Row> = {};
      const extraRowMap: Record<string, Row> = {};

      // Loop through each size and map raw materials & extra items
      product.productSizes.forEach((size) => {
        size.produtRawMaterial.forEach((raw) => {
          const rowId = raw.rawMaterialId;
          if (!rawRowMap[rowId]) {
            rawRowMap[rowId] = {
              id: uid(),
              material: raw.rawMaterialId,
              qty: {},
            };
          }
          rawRowMap[rowId].qty[size.id] = raw.quantity;
        });

        size.productExtraItems.forEach((extra) => {
          const rowId = extra.extraItemsId;
          if (!extraRowMap[rowId]) {
            extraRowMap[rowId] = {
              id: uid(),
              material: extra.extraItemsId,
              qty: {},
            };
          }
          extraRowMap[rowId].qty[size.id] = extra.price;
        });
      });

      setRawRows(Object.values(rawRowMap));
      setExtraRows(Object.values(extraRowMap));
    }
  }, [oneProductData, justUpdated]);

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setCategory('');
    setSelf('');
    setLevel1('');
    setLevel2('');
    setSizes([]);
    setRawRows([]);
    setExtraRows([]);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    console.log('hiii');
    const payload = {
      name: productName,
      description,
      categoryId: category,
      self: Number(self),
      level1: Number(level1),
      level2: Number(level2),
      imageFile: imageFile ?? undefined,
      size: sizes.map((size) => {
        // raw materials for this size
        const rawMaterials = rawRows
          .filter((row) => row.material && row.qty[size.id])
          .map((row) => ({
            rawMaterialId: row.material,
            quantity: row.qty[size.id],
          }));

        // extra items for this size
        const extraItems = extraRows
          .filter((row) => row.material && row.qty[size.id])
          .map((row) => ({
            extraItemsId: row.material,
            price: row.qty[size.id],
          }));

        return {
          name: size.name,
          price: size.price,
          rawMaterials,
          extraItems,
        };
      }),
    };

    try {
      if (oneProductData) {
        console.log('update payload', payload);
        const res = await updateProduct({payload});

        setJustUpdated(true);
        resetForm();
      } else {
        const res = await saveProduct({
          payload,
        });
        resetForm();
      }
    } catch (error) {
      toast.error('Failed to save product.');
    }
  };

  const buildBody = (
    rows: Row[],
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
    label: string,
  ) => (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          <td className="px-3 py-2">
            <select
              className="rounded p-4 dark:border-form-strokedark dark:bg-boxdark"
              value={row.material}
              onChange={(e) =>
                setRows((prev) =>
                  prev.map((r) =>
                    r.id === row.id ? {...r, material: e.target.value} : r,
                  ),
                )
              }
            >
              <option value="">{label}</option>

              {label === 'Select Material' &&
                allMaterials?.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}

              {label === 'Select Extra Item' &&
                allExtraItems?.data?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </td>

          {sizes.map((s) => (
            <td key={s.id} className="px-3 py-2">
              <input
                type="number"
                className="rounded border border-stroke px-2 py-3 text-center dark:border-form-strokedark dark:bg-boxdark"
                value={row.qty[s.id] ?? ''}
                onChange={(e) =>
                  changeQty(row.id, s.id, e.target.value, setRows)
                }
              />
            </td>
          ))}

          <td className="px-2 py-2 text-center">
            <button
              onClick={() =>
                setRows((prev) => prev.filter((r) => r.id !== row.id))
              }
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );

  const TableHead: React.FC = () => (
    <thead className="bg-slate-200 dark:border-form-strokedark dark:bg-slate-600">
      <tr>
        <th className="px-3 py-2 text-center font-bold">Raw Material</th>
        {sizes.map((s) => (
          <th key={s.id} className="py-2 text-center font-bold">
            {s.name || 'Size'}
          </th>
        ))}
        <th className="" />
      </tr>

      <tr>
        <th />
        {sizes.map((s) => (
          <th key={s.id} className="px-3 pb-4">
            <div className="flex flex-col items-center gap-2">
              <input
                className="rounded border border-stroke py-3 text-center dark:border-form-strokedark dark:bg-boxdark"
                placeholder="name"
                value={s.name}
                onChange={(e) => updateSize(s.id, 'name', e.target.value)}
              />
              <input
                type="number"
                className="rounded border border-stroke py-3 text-center dark:border-form-strokedark dark:bg-boxdark"
                placeholder="price"
                value={s.price}
                onChange={(e) => updateSize(s.id, 'price', e.target.value)}
              />
            </div>
          </th>
        ))}
        <th />
      </tr>
    </thead>
  );

  const ExtraHead: React.FC = () => (
    <thead>
      <tr>
        <th className="px-3 py-2 text-center font-bold">Extra Item</th>
        {/* {sizes.map((s) => (
          <th key={s.id} className=" py-2 text-center font-bold">
            {s.name || 'Size'}
          </th>
        ))} */}
        <th className="w-10" />
      </tr>

      <tr>
        <th />
        {/* {sizes.map((s) => (
          <th key={s.id} className="px-3 pb-4">
            <input
              type="number"
              className=" rounded border py-2 text-center"
              placeholder="Qty"
            />
          </th>
        ))} */}
        <th />
      </tr>
    </thead>
  );

  return (
    <div className="space-y-8 p-2">
      {mode === 'edit' && id ? (
        <h1 className="text-2xl font-bold text-neutral-700 dark:text-white">
          Edit Product
        </h1>
      ) : (
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Create Product
        </h1>
      )}

      {/* Top Header Inputs */}
      <div className="grid grid-cols-12 items-end gap-4">
        <div className="col-span-4">
          <label className="text-sm font-medium">Product Name</label>
          <input
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="col-span-4">
          <label className="text-sm font-medium">Description</label>
          <input
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-span-4">
          <label className="text-sm font-medium"> Category</label>
          <select
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="text-sm">Select Category</option>

            {allProductCategory?.categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-4">
          <label className="text-sm font-medium">Self</label>
          <input
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            placeholder="Enter self"
            value={self}
            onChange={(e) => setSelf(e.target.value)}
          />
        </div>

        <div className="col-span-4">
          <label className="text-sm font-medium">Level 1</label>
          <input
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            placeholder="Enter level1"
            value={level1}
            onChange={(e) => setLevel1(e.target.value)}
          />
        </div>

        <div className="col-span-4">
          <label className="text-sm font-medium">Level 2</label>
          <input
            className="mt-1 w-full rounded border border-stroke px-3 py-2 dark:border-form-strokedark dark:bg-boxdark"
            placeholder="Enter level2"
            value={level2}
            onChange={(e) => setLevel2(e.target.value)}
          />
        </div>

        <div className="col-span-6">
          <label className="text-gray-700 mb-1 block text-sm font-medium">
            Product Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="dark:border-form-strokedark dark:bg-boxdark"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-h-52 w-full rounded-lg object-cover dark:border-form-strokedark dark:bg-boxdark"
            />
          )}
        </div>

        <div className="col-span-6 flex justify-end gap-2">
          <button
            onClick={addColumn}
            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 p-1 text-white hover:bg-indigo-700"
          >
            + Add
            <br />
            Column
          </button>
          <button
            onClick={deleteColumn}
            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 p-1 text-white hover:bg-indigo-700"
          >
            delete
            <br />
            Column
          </button>
        </div>
      </div>

      {/* Raw Material Table */}
      <section className="bg-gray-50 rounded-lg border border-stroke p-6 dark:border-form-strokedark">
        <h3 className="mb-4 text-lg font-semibold">Raw Materials</h3>
        <div className="max-h-96 overflow-auto">
          <table className="min-w-max text-sm">
            <TableHead />
            {buildBody(rawRows, setRawRows, 'Select Material')}
          </table>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              setRawRows([...rawRows, {id: uid(), material: '', qty: {}}])
            }
            className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            + Add Row
          </button>
          <button
            onClick={() => setRawRows((prev) => prev.slice(0, -1))}
            className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Delete Row
          </button>
        </div>
      </section>

      {/* Extra Items Table */}
      <section className="bg-gray-50 rounded-lg border border-stroke p-6 dark:border-form-strokedark">
        <h3 className="mb-4 text-lg font-semibold">Extra Items</h3>
        <div className="max-h-72 overflow-auto">
          <table className="min-w-max text-sm">
            <ExtraHead />
            {buildBody(extraRows, setExtraRows, 'Select Extra Item')}
          </table>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              setExtraRows([...extraRows, {id: uid(), material: '', qty: {}}])
            }
            className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            + Add Row
          </button>
          <button
            onClick={() => setExtraRows((prev) => prev.slice(0, -1))}
            className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Delete Row
          </button>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="rounded bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
