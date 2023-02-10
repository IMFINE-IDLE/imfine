import React from 'react';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import { BoxPickMenu } from './style';

function PickMenu({ type, dataList, setIsOpen }) {
  return (
    <BoxPickMenu>
      {dataList?.map(({ id, name, image }) => (
        <IconSymptom
          type={type}
          key={id}
          id={id}
          name={name}
          image={image}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      ))}
    </BoxPickMenu>
  );
}

export default PickMenu;
