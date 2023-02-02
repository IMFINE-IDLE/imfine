import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as MainTabSvg } from './icons/home.svg';
import { ReactComponent as DiaryTabSvg } from './icons/diary.svg';
import { ReactComponent as BambooTabSvg } from './icons/bamboo.svg';
import { ReactComponent as ProfileTabSvg } from './icons/profile.svg';
import CloverModal from './CloverModal';
import {
  TabContainer,
  Tab,
  TabNavLink,
  ActiveBar,
  TabCenter,
  MainClover,
  CloverStatusContainer,
} from './style';

const TabBar = () => {
  const state = useSelector((state) => state);
  const [currentClover, setCurrentClover] = useState(state.userInfo.cloverCode);
  const [cloversOpen, setCloversOpen] = useState(false);

  return (
    <div>
      {cloversOpen && (
        <CloverStatusContainer width="18.75em" height="11em" radius="25px">
          <CloverModal
            setCurrentClover={setCurrentClover}
            setCloversOpen={setCloversOpen}
          />
        </CloverStatusContainer>
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
          <TabNavLink to={`/profile/${state.user.uid}`}>
            <ActiveBar />
            <ProfileTabSvg stroke="currentColor" />
          </TabNavLink>
        </Tab>
      </TabContainer>
    </div>
  );
};

export default TabBar;
