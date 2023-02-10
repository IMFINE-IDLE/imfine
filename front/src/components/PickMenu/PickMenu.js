import React, { useRef, useState } from 'react';
import api from '../../api/api';
import { axiosInstance } from '../../api/axiosInstance';
import { BoxRT50LB50 } from '../common/BoxRT50LB50/BoxRT50LB50';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import {
  BoxPickMenu,
  PickMenuDetailMenu,
  PickMenuRowContainer,
  PickMenuSubListContainer,
} from './style';

/* 프롭스 설명
 *
 * (String) type: 'medical', 'symptom' 중 하나.
 * (Any) text: type='text' 일 경우 표시될 내용
 * (Array) medicals: [{id: Number, name: String}] 형식의 배열
 * (Array) symptoms: [{id: Number, name: String}] 형식의 배열
 * (String) color: 아이콘 색깔
 * (Boolean) canModify: true일 경우 수정 가능
 *
 */

function PickMenu({ type, dataList, setPickedMedicals, setPickedSymptoms }) {
  // dataList를 4개씩 잘라서 dataListModified에 넣기
  const dataListModified = [];
  // const rowCnt = Math.floor(dataList.length / 4);
  for (let i = 0; i < Math.ceil(dataList.length / 4); i++) {
    dataListModified.push(dataList.slice(0 + 4 * i, 4 + 4 * i));
  }

  // 메뉴 클릭시 서브메뉴 열기 위한 ref
  const subMenuSection = useRef([]);
  const clickedSubMenuSectionIdx = useRef(null);
  const clickedMenuId = useRef(null);

  const [detailList, setDetailList] = useState(null);

  // 질병/수술 또는 증상 세부목록 가져오기
  const fetchDetailList = async (id) => {
    const url =
      type === 'medical'
        ? api.medical.getMedicalDetail(id)
        : api.symptom.getSymptomDetail(id);
    const res = await axiosInstance.get(url);
    console.log('detail', res.data.data);
    await setDetailList(res.data.data);
    console.log(detailList);
  };

  // 메뉴 하나 클릭했을 때
  const handleMenuClick = (e, idx, id) => {
    console.log(e);
    console.log('idx, id', idx, id);
    console.log('aaaaaa', subMenuSection.current[idx]);
    // console.log('bbbb', subMenuSection.current[idx].lastElementChild);
    // subMenuSection.current[idx].lastElementChild.style.display = 'block';
    // subMenuFirstClicked.current.classList.add('subMenuOpen');

    // const currentDisplay =
    //   subMenuSection.current[idx].lastElementChild.style.display;
    // console.log('curdis', currentDisplay);

    // subMenuSection.current[idx].lastElementChild.style.display =
    //   currentDisplay === 'block' ? 'none' : 'block';

    // 최초 클릭시 클릭된 메뉴의 id와 행의 idx를 저장하고 subMenu 영역 열기
    if (!clickedMenuId.current) {
      clickedMenuId.current = id;
      clickedSubMenuSectionIdx.current = idx;
      subMenuSection.current[idx].lastElementChild.style.display = 'block';
    }
    // 기존에 클릭된 메뉴와 같은 메뉴를 다시 클릭하면 subMenu 영역을 닫음
    else if (clickedMenuId.current === id) {
      subMenuSection.current[idx].lastElementChild.style.display = 'none';
    }
    // 닫힌 메뉴 다시 클릭시 다시 여는 로직 필요

    // 기존과 다른 메뉴를 클릭하면 기존 subMenu를 닫고
    // 클릭된 메뉴의 id와 행의 idx를 저장하고 새 subMenu를 열기
    else if (clickedMenuId.current !== id) {
      const currentIdx = clickedSubMenuSectionIdx.current;
      console.log('curi', currentIdx);
      subMenuSection.current[currentIdx].lastElementChild.style.display =
        'none';
      clickedMenuId.current = id;
      clickedSubMenuSectionIdx.current = idx;
      subMenuSection.current[idx].lastElementChild.style.display = 'block';
    }

    // 메뉴 id로 세부목록 불러오기
    fetchDetailList(id);
  };

  // 세부목록에서 질병/수술 또는 증상 하나 선택했을 때
  const handleDetailMenuClick = (id, name) => {
    if (type === 'medical') {
      setPickedMedicals((prev) => [...prev, { id, name }]);
    } else {
      setPickedSymptoms((prev) => [...prev, { id, name }]);
    }
  };

  return (
    // <BoxPickMenu>
    //   {dataList?.map(({ id, name, image }) => (
    //     <IconSymptom
    //       type={type}
    //       key={id}
    //       id={id}
    //       name={name}
    //       image={image}
    //       onClick={handleMenuClick}
    //     />
    //   ))}
    //       </BoxPickMenu>
    <FlexDiv wrap="wrap" padding="0 1em">
      {dataListModified?.map((dataList, idx) => (
        <PickMenuRowContainer
          ref={(el) => (subMenuSection.current[idx] = el)}
          key={idx}
        >
          <FlexDiv justify="space-bewteen" gap="1.25em" padding="0 0 1em 0">
            {dataList.map(({ id, name, image }) => (
              <IconSymptom
                type={type}
                key={id}
                id={id}
                name={name}
                image={image}
                handleMenuClick={(e) => handleMenuClick(e, idx, id)}
              />
            ))}
          </FlexDiv>

          <PickMenuSubListContainer padding="1em 0">
            <FlexDiv
              justify="start"
              wrap="wrap"
              gap="0.85em 0"
              padding="0 0 0 10%"
            >
              {detailList?.map(({ id, name }) => (
                <PickMenuDetailMenu
                  key={id}
                  onClick={() => handleDetailMenuClick(id, name)}
                >
                  {name}
                </PickMenuDetailMenu>
              ))}
              <PickMenuDetailMenu
                onClick={() => handleDetailMenuClick(1, 'test')}
              >
                질병하나
              </PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나이름이길어요</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병둘</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나세세</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나꺅</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
              <PickMenuDetailMenu>질병하나</PickMenuDetailMenu>
            </FlexDiv>
          </PickMenuSubListContainer>
        </PickMenuRowContainer>
      ))}
    </FlexDiv>
  );
}

export default PickMenu;
