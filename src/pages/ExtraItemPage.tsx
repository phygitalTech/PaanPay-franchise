import DisplayExtraItemTable from '@/components/Admin/RawmaterialCat/ExtraItem/DisplayExtraItem';
import ExtraItem from '@/components/Admin/RawmaterialCat/ExtraItem/ExtraItem';
import React from 'react';

const ExtraItemPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <ExtraItem />
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-black">
          <DisplayExtraItemTable />
        </div>
      </div>
    </div>
  );
};

export default ExtraItemPage;
