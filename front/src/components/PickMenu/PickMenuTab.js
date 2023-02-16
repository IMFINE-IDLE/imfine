import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTabs from '../../hooks/useTabs';
import { SubmitBtn } from '../../pages/Diary/DiaryCreateConfirmPage/style';
import {
  fetchMedicalList,
  fetchSymptomList,
} from '../../store/slice/menuSlice';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import PickedItemList from '../PickedItemList/PickedItemList';
import PickMenu from './PickMenu';
import {
  PickMenuTabContainer,
  PickMenuTabLeft,
  PickMenuTabRight,
  TabContentContainer,
} from './style';

/* 프롭스 설명
 *
 * (Number) tabCnt: 탭 개수, 1이면 하나만 표시
 * (String) title: 탭이 1개일 때 탭에 표시할 이름, '질병/수술', '증상' 중 하나
 * (Array) medicals: 질병/수술 선택 결과를 담을 state, 빈 배열 또는 기존 선택지를 담은 배열
 * (Array) symptoms: 증상 선택 결과를 담을 state, 빈 배열 또는 기존 선택지를 담은 배열
 * (Function) setMedicals: 질병/수술 선택 결과 state 업데이트 함수, 상위 컴포넌트에서 useState로 선언
 * (Function) setSymptoms: 증상 선택 결과를 state 업데이트 함수, 상위 컴포넌트에서 useState로 선언
 * (Function) onSubmitBtnClick: 하단 버튼 클릭시 실행할 함수
 * (String) submitBtnText: 하단 버튼에 들어갈 텍스트
 * (Number) idx: 초기에 선택될 탭의 인덱스. 디폴트는 0(왼쪽 탭이 선택된 상태)
 *
 */

const PickMenuTab = ({
  tabCnt,
  title,
  medicals,
  symptoms,
  setMedicals,
  setSymptoms,
  onSubmitBtnClick,
  submitBtnText,
  idx,
  // 아래로 필요한 함수 또는 변수 추가해서 사용
  paddingPicked,
  addOnly,
  pickOnlyOne,
}) => {
  /*
   * Hooks
   */
  const dispatch = useDispatch();

  // 질병/수술 목록과 증상 목록을 서버에서 받아와서 스토어에 저장
  useEffect(() => {
    dispatch(fetchMedicalList());
    dispatch(fetchSymptomList());
  }, []);

  // refs
  const refs = {
    // 메뉴 클릭시 서브메뉴 열기 위한 ref
    subMenuSection: useRef([]),
    clickedSubMenuSectionIdx: useRef(null),
    clickedMenuId: useRef(null),
    // 질병/수술 또는 증상 추가시 스크롤 자동이동시키기 위한 ref
    medicalDivOut: useRef(null),
    medicalDivIn: useRef(null),
    symptomDivOut: useRef(null),
    symptomDivIn: useRef(null),
  };

  /*
   * Functions
   */
  // 스토어에서 질병/수술 목록과 증상 목록 가져오기
  const { medicalMenuList, symptomMenuList } = useSelector(
    (state) => state.menu
  );

  // 단일 질병/수술 또는 증상 클릭시 기존 배열에 없으면 추가 있으면 삭제
  const ToggleSymptom = (type, itemId, itemName) => {
    let prevList;
    if (type === 'medical') {
      prevList = [...medicals];
    } else {
      prevList = [...symptoms];
    }

    let idx = prevList.findIndex((item) => item.id === itemId);
    // addOnly가 true일 경우 추가만 가능
    if (addOnly) {
      if (idx === -1) {
        prevList.push({ id: itemId, name: itemName });
      }
    }
    // 일기장 생성시 질병/수술은 하나만 선택 가능
    else if (pickOnlyOne && type === 'medical') {
      if (prevList.length === 0) {
        if (idx === -1) {
          prevList.push({ id: itemId, name: itemName });
        } else {
          prevList.splice(idx, 1);
        }
      } else if (prevList.length === 1) {
        if (idx !== -1) {
          prevList.splice(idx, 1);
        }
      }
    }
    // addOnly가 false일 경우 추가 및 삭제 가능
    else {
      if (idx === -1) {
        prevList.push({ id: itemId, name: itemName });
      } else {
        prevList.splice(idx, 1);
      }
    }

    if (type === 'medical') {
      setMedicals(prevList);
    } else {
      setSymptoms(prevList);
    }
  };

  // 탭 바꿀 때 열려 있던 subMenu 영역을 초기화
  const resetRefs = () => {
    // 열려 있던 기존 subMenu를 닫고
    const currentIdx = refs.clickedSubMenuSectionIdx.current;
    refs.subMenuSection.current[currentIdx].lastElementChild.style.display =
      'none';
    // refs를 초기화
    refs.subMenuSection.current = [];
    refs.clickedSubMenuSectionIdx.current = null;
    refs.clickedMenuId.current = null;
  };

  // 질병/수술 또는 증상 하나 선택할 때마다 범위 넘어가면 스크롤
  const checkOverflow = () => {
    // 질병/수술

    if (
      refs.medicalDivOut.current.clientWidth <=
      refs.medicalDivIn.current.clientWidth
    )
      refs.medicalDivOut.current.scrollLeft += 1000;
    else refs.medicalDivOut.current.scrollLeft -= 1000;

    // 증상

    if (
      refs.symptomDivOut.current.clientWidth <=
      refs.symptomDivIn.current.clientWidth
    )
      refs.symptomDivOut.current.scrollLeft += 1000;
    else refs.symptomDivOut.current.scrollLeft -= 1000;
  };

  // 탭 하단에 탭 컨텐츠로 표시할 질병/수술 또는 증상 목록들
  const tabArr =
    tabCnt === 1
      ? [
          {
            idx: 0,
            tabName: title,
            tabContent:
              title === '증상' ? (
                <PickMenu
                  type="symptom"
                  dataList={symptomMenuList}
                  setPickedSymptoms={setSymptoms}
                  ToggleSymptom={ToggleSymptom}
                  ref={refs}
                />
              ) : (
                <PickMenu
                  type="medical"
                  dataList={medicalMenuList}
                  setPickedMedicals={setMedicals}
                  ToggleSymptom={ToggleSymptom}
                  ref={refs}
                />
              ),
          },
        ]
      : [
          {
            idx: 0,
            tabName: '질병/수술',
            tabContent: (
              <PickMenu
                type="medical"
                dataList={medicalMenuList}
                setPickedMedicals={setMedicals}
                ToggleSymptom={ToggleSymptom}
                ref={refs}
              />
            ),
          },
          {
            idx: 1,
            tabName: '증상',
            tabContent: (
              <PickMenu
                type="symptom"
                dataList={symptomMenuList}
                setPickedSymptoms={setSymptoms}
                ToggleSymptom={ToggleSymptom}
                ref={refs}
              />
            ),
          },
        ];

  // useTabs Hooks 사용
  const { currentTab, setCurrentTab } = useTabs(idx || 0, tabArr);

  return (
    <div>
      <FlexDiv direction="column" padding="0 0 2.5em 0">
        {tabCnt === 1 ? (
          <PickedItemList
            title={title}
            type={title === '증상' ? 'symptom' : 'medical'}
            medicals={medicals}
            symptoms={symptoms}
            canModify={addOnly ? false : true}
            ToggleSymptom={ToggleSymptom}
            paddingPicked={paddingPicked}
            color={title === '증상' ? 'light-pink' : 'main'}
            ref={refs}
            checkOverflow={checkOverflow}
          />
        ) : (
          <>
            <PickedItemList
              title="질병/수술"
              type="medical"
              medicals={medicals}
              canModify={true}
              ToggleSymptom={ToggleSymptom}
              paddingPicked={paddingPicked}
              ref={refs}
              checkOverflow={checkOverflow}
            />
            <PickedItemList
              title="증상"
              type="symptom"
              symptoms={symptoms}
              color="light-pink"
              canModify={true}
              ToggleSymptom={ToggleSymptom}
              paddingPicked={paddingPicked}
              ref={refs}
              checkOverflow={checkOverflow}
            />
          </>
        )}
      </FlexDiv>

      <PickMenuTabContainer>
        {tabArr.map((tab, idx) => {
          if (idx === 0)
            return (
              <PickMenuTabLeft
                onClick={() => {
                  setCurrentTab(idx);
                  resetRefs();
                }}
                key={tab.tabName}
                color={currentTab.idx === idx ? 'main' : 'light'}
                fontColor={currentTab.idx === idx ? 'white' : null}
              >
                {tab.tabName}
              </PickMenuTabLeft>
            );
          else
            return (
              <PickMenuTabRight
                onClick={() => {
                  setCurrentTab(idx);
                  resetRefs();
                }}
                key={tab.tabName}
                color={currentTab.idx === idx ? 'main' : 'light'}
                fontColor={currentTab.idx === idx ? 'white' : null}
              >
                {tab.tabName}
              </PickMenuTabRight>
            );
        })}
      </PickMenuTabContainer>

      <TabContentContainer>{currentTab.tabContent}</TabContentContainer>
      <FlexDiv>
        <SubmitBtn
          radius="20px"
          width="calc(100% - 2em)"
          height="3.5em"
          type="submit"
          onClick={() => {
            setMedicals(setMedicals);
            if (tabCnt === 2) {
              setSymptoms(setSymptoms);
            }
            onSubmitBtnClick();
          }}
        >
          {submitBtnText}
        </SubmitBtn>
      </FlexDiv>
    </div>
  );
};

export default PickMenuTab;
