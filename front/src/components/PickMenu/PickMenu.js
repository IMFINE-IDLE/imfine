import axios from 'axios';
import React, { forwardRef, useState } from 'react';
import api from '../../api/api';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import {
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

const PickMenu = forwardRef(
  ({ type, dataList, ToggleSymptom, pickOnlyOne }, ref) => {
    // dataList를 4개씩 잘라서 dataListModified에 넣기
    const dataListModified = [];
    // const rowCnt = Math.floor(dataList.length / 4);
    for (let i = 0; i < Math.ceil(dataList.length / 4); i++) {
      dataListModified.push(dataList.slice(0 + 4 * i, 4 + 4 * i));
    }

    const [detailList, setDetailList] = useState(null);

    // 메뉴 클릭시 서브메뉴 열기 위한 ref
    const { subMenuSection, clickedSubMenuSectionIdx, clickedMenuId } = ref;

    // 메뉴 클릭시 대분류에 클릭여부 표시하기 위한 state
    const [clickedId, setClickedId] = useState(null);

    // 질병/수술 또는 증상 세부목록 가져오기
    const fetchDetailList = async (id) => {
      const url =
        type === 'medical'
          ? api.medical.getMedicalDetail(id)
          : api.symptom.getSymptomDetail(id);
      const res = await axios.get(url);
      setDetailList(res.data.data);
    };

    // 메뉴 하나 클릭했을 때
    const handleMenuClick = (e, idx, id) => {
      e.preventDefault();

      // 클릭한 메뉴의 idx를 clickedIdx에 저장
      setClickedId(id);

      // 최초 클릭시 클릭된 메뉴의 id와 행의 idx를 저장하고 subMenu 영역 열기
      if (!clickedMenuId.current) {
        clickedMenuId.current = id;
        clickedSubMenuSectionIdx.current = idx;
        subMenuSection.current[idx].lastElementChild.style.display = 'block';
      }
      // 기존에 클릭된 메뉴와 같은 메뉴를 다시 클릭하면 subMenu 영역을 토글(닫거나 염)
      else if (clickedMenuId.current === id) {
        const currentState =
          subMenuSection.current[idx].lastElementChild.style.display;
        subMenuSection.current[idx].lastElementChild.style.display =
          currentState === 'block' ? 'none' : 'block';
      }

      // 기존과 다른 메뉴를 클릭하면 기존 subMenu를 닫고
      // 클릭된 메뉴의 id와 행의 idx를 저장하고 새 subMenu를 열기
      else if (clickedMenuId.current !== id) {
        const currentIdx = clickedSubMenuSectionIdx.current;
        subMenuSection.current[currentIdx].lastElementChild.style.display =
          'none';
        clickedMenuId.current = id;
        clickedSubMenuSectionIdx.current = idx;
        subMenuSection.current[idx].lastElementChild.style.display = 'block';
      }

      // 메뉴 id로 세부목록 불러오기
      fetchDetailList(id);
    };

    return (
      <FlexDiv wrap="wrap" padding="0 1.5em">
        {dataListModified?.map((dataList, idx) => (
          <PickMenuRowContainer
            ref={(el) => (subMenuSection.current[idx] = el)}
            key={idx}
          >
            <FlexDiv justify="space-between" align="start" padding="0 0 1em 0">
              {dataList.map(({ id, name, image }) => (
                <IconSymptom
                  type={type}
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  handleMenuClick={(e) => handleMenuClick(e, idx, id)}
                  clicked={Boolean(id === clickedId)}
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
                    onClick={() => ToggleSymptom(type, id, name)}
                  >
                    {name}
                  </PickMenuDetailMenu>
                ))}
              </FlexDiv>
            </PickMenuSubListContainer>
          </PickMenuRowContainer>
        ))}
      </FlexDiv>
    );
  }
);

export default PickMenu;
