import SelectRawMaterial from '@/components/Admin/Rawmaterial/SelectRawmaterial';
import DisplayRawmaterialdata from '@/components/Admin/Rawmaterial/DisplayRawmaterialdata';
import React from 'react';
const Rawmaterial: React.FC = () => {
  return (
    <>
      <SelectRawMaterial />

      <DisplayRawmaterialdata />
    </>
  );
};

export default Rawmaterial;
