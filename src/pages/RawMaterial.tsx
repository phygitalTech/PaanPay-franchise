import React from 'react';
import RawMaterialCat from '@/components/Admin/Rawmaterial/AddRawMaterialcat';
import DisplayRawMaterialCat from '@/components/Admin/Rawmaterial/DisplayAddRawMaterialCat';

const RawMaterialCategoryPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <RawMaterialCat />
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <DisplayRawMaterialCat />
        </div>
      </div>
    </div>
  );
};

export default RawMaterialCategoryPage;
