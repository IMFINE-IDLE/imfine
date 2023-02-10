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

const TabBar = () => {
  const { cloverCode } = useSelector((state) => state.userInfo.cloverCode);
  const uid = localStorage.getItem('uid');
  const [currentClover, setCurrentClover] = useState(cloverCode);
  const [cloversOpen, setCloversOpen] = useState(false);

  return (
    <div>
      {cloversOpen && (
        <CloverModal
          currentClover={currentClover}
          setCurrentClover={setCurrentClover}
          setCloversOpen={setCloversOpen}
          center={false}
          date={new Date()}
        />
      )}

      <TabContainer>
        <Tab>
          <TabNavLink to="/">
            <ActiveBar />
            <MainTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
        <Tab>
          <TabNavLink to="/diary">
            <ActiveBar />
            <DiaryTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
        <TabCenter>
          <MainClover
            onClick={() => setCloversOpen((prev) => !prev)}
            code={currentClover}
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
