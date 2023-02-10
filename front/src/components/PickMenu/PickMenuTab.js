import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTabs from '../../hooks/useTabs';
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
 * (Function) apiFunc: 선택 완료 버튼 클릭시 실행할 api 함수
 *
 */

const PickMenuTab = ({
  tabCnt,
  title,
  medicals,
  symptoms,
  setMedicals,
  setSymptoms,
  apiFunc,
  idx,
  setType,
}) => {
  // 임시 더미데이터
  // const sampleDataList = [
  //   {
  //     id: 1,
  //     name: '질병1',
  //     image:
  //       'data:image/png;base64,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',
  //   },
  //   { id: 2, name: '질병2', image: '/assets/clovers/clover1.svg' },
  //   { id: 3, name: '질병3', image: '/assets/clovers/clover2.svg' },
  //   { id: 4, name: '질병4', image: '/assets/clovers/clover3.svg' },
  //   { id: 5, name: '질병5', image: '/assets/clovers/clover4.svg' },
  //   { id: 6, name: '질병6', image: '/assets/clovers/clover5.svg' },
  //   { id: 7, name: '질병7', image: '/assets/clovers/clover6.svg' },
  //   { id: 8, name: '질병8', image: '/assets/clovers/clover7.svg' },
  //   { id: 9, name: '질병9', image: '/assets/clovers/clover8.svg' },
  //   { id: 10, name: '질병10', image: '/assets/clovers/clover9.svg' },
  //   { id: 11, name: '질병11', image: '/assets/clovers/clover-1.svg' },
  //   { id: 12, name: '질병12', image: '/assets/clovers/clover1.svg' },
  // ];

  // 메모
  // 여기서 medicalList = useState(medicals)로 한 번 더 state 써서 사용하다가 마지막에 버튼 눌렀을 때만
  // props로 받아온 setMedicals에 넣어주는 게 좋지 않을까...?
  const [pickedMedicals, setPickedMedicals] = useState(medicals || []);
  const [pickedSymptoms, setPickedSymptoms] = useState(symptoms || []);

  const dispatch = useDispatch();
  // 질병/수술 목록과 증상 목록을 서버에서 받아와서 스토어에 저장
  useEffect(() => {
    dispatch(fetchMedicalList());
    dispatch(fetchSymptomList());
  }, []);

  // 스토어에서 질병/수술 목록과 증상 목록 가져오기
  const { medicalMenuList, symptomMenuList } = useSelector(
    (state) => state.menu
  );

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
                  setPickedSymptoms={setPickedSymptoms}
                />
              ) : (
                <PickMenu
                  type="medical"
                  dataList={medicalMenuList}
                  setPickedMedicals={setPickedMedicals}
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
                setPickedMedicals={setPickedMedicals}
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
                setPickedSymptoms={setPickedSymptoms}
              />
            ),
          },
        ];

  // useTabs Hooks 사용
  const { currentTab, setCurrentTab } = useTabs(idx || 0, tabArr);

  // 세부 항목 선택 모달창 띄우기
  // const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <FlexDiv direction="column" padding="0 0 2.5em 0">
        {tabCnt === 1 ? (
          <PickedItemList
            title={title}
            type={title === '증상' ? 'symptom' : 'medical'}
            medicals={pickedMedicals}
            setMedicals={setPickedMedicals}
            symptoms={pickedSymptoms}
            setSymptoms={setPickedSymptoms}
            canModify={true}
          />
        ) : (
          <>
            <PickedItemList
              title="질병/수술"
              type="medical"
              medicals={pickedMedicals}
              setMedicals={setPickedMedicals}
              canModify={true}
            />
            <PickedItemList
              title="증상"
              type="symptom"
              symptoms={pickedSymptoms}
              setSymptoms={setPickedSymptoms}
              color="light-pink"
              canModify={true}
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
                  if (setType) setType(tab.tabName);
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
                  if (setType) setType(tab.tabName);
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
    </div>
  );
};

export default PickMenuTab;
