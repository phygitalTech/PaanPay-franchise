import DisplayExtraItemTable from '@/components/Admin/RawmaterialCat/ExtraItem/DisplayExtraItem';
import ExtraItem from '@/components/Admin/RawmaterialCat/ExtraItem/ExtraItem';
import React from 'react';

const ExtraItemPage: React.FC = () => {
  return (
    <>
      {' '}
      <ExtraItem />
      <DisplayExtraItemTable />
    </>
  );
};

export default ExtraItemPage;
