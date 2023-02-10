import React, { useState } from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import { BoxPickMenu } from './style';

function PickMenu({ type, dataList, setIsOpen }) {
  // const [dataListModified, setDataListModified] = useState();

  // const rowCnt = Math.floor(dataList.length / 4);
  // for (let i = 0; i < rowCnt; i++) {}

  const handleMenuClick = () => {
    console.log('clicked');
    setIsOpen((prev) => !prev);
  };

  return (
    // <BoxPickMenu>
    <FlexDiv wrap="wrap">
      {dataList?.map(({ id, name, image }) => (
        <IconSymptom
          type={type}
          key={id}
          id={id}
          name={name}
          image={image}
          onClick={handleMenuClick}
        />
      ))}
    </FlexDiv>
    // </BoxPickMenu>
  );
}

export default PickMenu;
