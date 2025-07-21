import SelectRawMaterial from '@/components/Admin/Rawmaterial/SelectRawmaterial';
import DisplayRawmaterialdata from '@/components/Admin/Rawmaterial/DisplayRawmaterialdata';
import React from 'react';
const Rawmaterial: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <SelectRawMaterial />
        </div>

        {/* Table */}
        <DisplayRawmaterialdata />
      </div>
    </div>
  );
};

export default Rawmaterial;
