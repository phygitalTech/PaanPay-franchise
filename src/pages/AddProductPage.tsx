import DisplayAddProduct from '@/components/Admin/Product/DisplayAddProduct';
import AddProduct from '@/components/Admin/Product/AddProduct';

const AddProductPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <AddProduct />
        </div>
        <div className="col-span-8">
          <DisplayAddProduct />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
