import AddRawMaterial from '@/components/Admin/RawmaterialCat/AddRawmaterail';
import DisplayAddRawMaterial from '@/components/Admin/RawmaterialCat/DisplayAddRawMaterail';
import React from 'react';

const AddRawMaterialPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <AddRawMaterial />
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <DisplayAddRawMaterial />
        </div>
      </div>
    </div>
  );
};

export default AddRawMaterialPage;
