import DisplayAddRawMaterial from '@/components/Admin/Rawmaterial/DisplayRawMaterialPage';
import AddRawMaterial from '@/components/Admin/Rawmaterial/RawMaterialPage';

const AddRawMaterialPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <AddRawMaterial />
        </div>
        <div className="col-span-8">
          <DisplayAddRawMaterial />
        </div>
      </div>
    </div>
  );
};

export default AddRawMaterialPage;
