import React, { useEffect, useState } from 'react';
import Tabs from '../../Tabs/Tabs';
// import FollowingList from '../FollowingList/FollowingList';
// import FollowerList from '../FollowerList/FollowerList';
import FollowList from '../FollowList/FollowList';
import axios from 'axios';
import api from '../../../api/api';
import { useLocation, useParams } from 'react-router-dom';
import NavBarBasic from '../../NavBarBasic/NavBarBasic';
import ProfileInfo from '../ProfileInfo/ProfileInfo';

const ProfileFollows = () => {
  const location = useLocation();
  const { uid } = useParams();
  const [users, setUsers] = useState(null);
  const [type, setType] = useState(null);
  const [idx, setIdx] = useState(location.state === '팔로워' ? 1 : 0);

  // const idx = location.state.type === 'follower' ? 1 : 0;
  console.log('loc', location);
  // console.log('idx', idx);
  // console.log('paramuid', uid);
  // setType(() => location.state);

  const fetchFollowList = async () => {
    const url =
      type === '팔로워'
        ? api.profile.getFollowerList(uid)
        : api.profile.getFollowingList(uid);

    try {
      const res = await axios.get(url, {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('fetchfollowList res', res.data.data);
      setUsers(res.data.data);
      console.log('fetchfollowList users', users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setType(location.state);
    fetchFollowList();
  }, [type, location]);

  const tabArr = [
    {
      idx: 0,
      tabName: '팔로잉',
      tabContent: (
        <FollowList
          users={users}
          type="팔로잉"
          fetchFunction={fetchFollowList}
        />
      ),
    },
    {
      idx: 1,
      tabName: '팔로워',
      tabContent: <FollowList users={users} type="팔로워" />,
    },
    // { idx: 1, tabName: '팔로워', tabContent: <FollowerList /> },
  ];

  if (!users) return null;
  return (
    <div>
      <NavBarBasic Back={true} />
      <div style={{ paddingBottom: '6.7em' }}>{uid}</div>
      <Tabs
        tabArr={tabArr}
        btnWidth="8.75em"
        idx={idx}
        setType={setType}
      ></Tabs>
    </div>
  );
};

export default ProfileFollows;
