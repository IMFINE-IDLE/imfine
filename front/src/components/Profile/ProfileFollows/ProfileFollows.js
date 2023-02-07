import React, { useEffect, useState } from 'react';
import Tabs from '../../Tabs/Tabs';
import FollowingList from '../FollowingList/FollowingList';
import FollowerList from '../FollowerList/FollowerList';
import FollowList from '../FollowList/FollowList';
import axios from 'axios';
import api from '../../../api/api';
import { useLocation, useParams } from 'react-router-dom';

const ProfileFollows = () => {
  const location = useLocation();
  const [users, setUsers] = useState(null);
  const { uid } = useParams();

  const idx = location.state.type === 'follower' ? 1 : 0;
  console.log('loc', location);
  // console.log('paramuid', uid);

  const fetchFollowList = async () => {
    const url =
      location.state === 'follower'
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
    fetchFollowList();
  }, [location]);

  const tabArr = [
    {
      idx: 0,
      tabName: '팔로잉',
      tabContent: (
        <FollowList
          users={users}
          type="following"
          fetchFunction={fetchFollowList}
        />
      ),
    },
    {
      idx: 1,
      tabName: '팔로워',
      tabContent: <FollowList users={users} type="follower" />,
    },
    // { idx: 1, tabName: '팔로워', tabContent: <FollowerList /> },
  ];

  if (!users) return null;
  return (
    <div>
      <Tabs tabArr={tabArr} btnWidth="8.75em" idx={idx}></Tabs>
    </div>
  );
};

export default ProfileFollows;
