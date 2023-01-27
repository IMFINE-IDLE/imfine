import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import { GiNotebook } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

import { ReactComponent as BamBooTabSvg } from './bamboo-copy.svg';
import CloverModal from './CloverModal';
import {
  TabContainer,
  Tab,
  TabCenter,
  Clover,
  CloverStatusContainer,
} from './style';

const TabBar = () => {
  const [currentClover, setCurrentClover] = useState('main');
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
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'var(--dark-color)' : 'var(--main-color)',
            })}
          >
            <BiHome />
          </NavLink>
        </Tab>
        <Tab>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'var(--dark-color)' : 'var(--main-color)',
            })}
          >
            <GiNotebook />
          </NavLink>
        </Tab>
        <TabCenter>
          <Clover
            onClick={() => setCloversOpen((prev) => !prev)}
            src={`/assets/clovers/clover-${currentClover}.svg`}
            width="6.25em"
            height="6.25em"
            isMain={true}
          />
        </TabCenter>
        <Tab>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'var(--dark-color)' : 'var(--main-color)',
            })}
          >
            <BamBooTabSvg fill="currentColor" />
          </NavLink>
        </Tab>
        <Tab>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'var(--dark-color)' : 'var(--main-color)',
            })}
          >
            <CgProfile />
          </NavLink>
        </Tab>
      </TabContainer>
    </div>
  );
};

export default TabBar;
