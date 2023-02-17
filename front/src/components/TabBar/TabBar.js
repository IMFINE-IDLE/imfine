import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as MainTabSvg } from './icons/home.svg';
import { ReactComponent as DiaryTabSvg } from './icons/diary.svg';
import { ReactComponent as BambooTabSvg } from './icons/bamboo.svg';
import { ReactComponent as ProfileTabSvg } from './icons/profile.svg';
import CloverModal from '../CloverModal/CloverModal';
import {
  TabContainer,
  Tab,
  TabNavLink,
  ActiveBar,
  TabCenter,
  MainClover,
} from './style';
import { useLocation, useParams } from 'react-router-dom';

const TabBar = () => {
  const { uid, cloverCode } = useSelector((state) => state.user);
  const [currentClover, setCurrentClover] = useState(cloverCode);
  const [cloversOpen, setCloversOpen] = useState(false);

  // 내 프로필에서는 하단탭바 모달 안 뜨도록 함(달력에서 컨디션 변경)
  const { pathname } = useLocation();
  const uidParams = useParams().uid;
  let openCloverModal = true;
  if (pathname.startsWith('/profile') && uid === uidParams)
    openCloverModal = false;

  return (
    <div>
      {openCloverModal ? (
        cloversOpen && (
          <CloverModal
            currentClover={currentClover}
            setCurrentClover={setCurrentClover}
            setCloversOpen={setCloversOpen}
            center={false}
            date={new Date()}
          />
        )
      ) : (
        <></>
      )}

      <TabContainer>
        <Tab>
          <TabNavLink to="/">
            <ActiveBar />
            <MainTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
        <Tab>
          <TabNavLink to="/diary" state={{ filter: false }}>
            <ActiveBar />
            <DiaryTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
        <TabCenter>
          <MainClover
            onClick={() => setCloversOpen((prev) => !prev)}
            code={cloverCode}
            width="6.25em"
            height="6.25em"
            pointer={true}
          />
        </TabCenter>
        <Tab>
          <TabNavLink to="/bamboo">
            <ActiveBar />
            <BambooTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
        <Tab>
          <TabNavLink to={`/profile/${uid}`}>
            <ActiveBar />
            <ProfileTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
      </TabContainer>
    </div>
  );
};

export default TabBar;
