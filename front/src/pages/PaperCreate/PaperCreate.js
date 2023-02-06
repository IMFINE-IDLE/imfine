import React, { useState, useEffect } from 'react';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
function PaperCreate() {
  const items = ['aaaa', 'bbbb', 'cccc'];
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState(items[0]);

  return (
    <div>
      <PaperCreateHeader items={items} />
    </div>
  );
}

export default PaperCreate;
