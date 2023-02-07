//    import React, { useEffect, useState } from 'react';
// import Tabs from '../../Tabs/Tabs';
// // import FollowingList from '../FollowingList/FollowingList';
// // import FollowerList from '../FollowerList/FollowerList';
// import FollowList from '../FollowList/FollowList';
// import axios from 'axios';
// import api from '../../../api/api';
// import { useLocation, useParams } from 'react-router-dom';
// import NavBarBasic from '../../NavBarBasic/NavBarBasic';
// import ProfileInfo from '../ProfileInfo/ProfileInfo';

// const ProfileFollows = () => {
//   const location = useLocation();
//   const { uid } = useParams();
//   const [users, setUsers] = useState(null);
//   const [type, setType] = useState(null);
//   const [idx, setIdx] = useState(location.state === '팔로워' ? 1 : 0);

//   // const idx = location.state.type === 'follower' ? 1 : 0;
//   console.log('loc', location);
//   // console.log('idx', idx);
//   // console.log('paramuid', uid);
//   // setType(() => location.state);

//   const fetchFollowList = async () => {
//     const url =
//       type === '팔로워'
//         ? api.profile.getFollowerList(uid)
//         : api.profile.getFollowingList(uid);

//     try {
//       const res = await axios.get(url, {
//         headers: { Authorization: localStorage.getItem('accessToken') },
//       });
//       console.log('fetchfollowList res', res.data.data);
//       setUsers(res.data.data);
//       console.log('fetchfollowList users', users);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     setType(location.state);
//     fetchFollowList();
//   }, [type, location]);

//   const tabArr = [
//     {
//       idx: 0,
//       tabName: '팔로잉',
//       tabContent: (
//         <FollowList
//           users={users}
//           type="팔로잉"
//           fetchFunction={fetchFollowList}
//         />
//       ),
//     },
//     {
//       idx: 1,
//       tabName: '팔로워',
//       tabContent: <FollowList users={users} type="팔로워" />,
//     },
//     // { idx: 1, tabName: '팔로워', tabContent: <FollowerList /> },
//   ];

//   if (!users) return null;
//   return (
//     <div>
//       <NavBarBasic Back={true} />
//       <div style={{ paddingBottom: '6.7em' }}>{uid}</div>
//       <Tabs
//         tabArr={tabArr}
//         btnWidth="8.75em"
//         idx={idx}
//         setType={setType}
//       ></Tabs>
//     </div>
//   );
// };

// export default ProfileFollows;

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api';
import NavBarBasic from '../../NavBarBasic/NavBarBasic';
import FollowList from '../FollowList/FollowList';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { Clover } from '../../common/Clover/Clover';
import { ProfileItemSpan } from '../ProfileInfo/style';
import {
  ProfileFollowContainer,
  ProfileFollowListContainer,
  ProfileFollowListWrapper,
} from './style';

const ProfileFollows = () => {
  const { uid } = useParams();
  const { name, open, condition, type, followingCount, followerCount } =
    useLocation().state;
  const [followType, setFollowType] = useState(type);
  const [users, setUsers] = useState(null);

  const fetchFollowList = async () => {
    const url =
      followType === '팔로워'
        ? api.profile.getFollowerList(uid)
        : api.profile.getFollowingList(uid);

    try {
      const res = await axios.get(url, {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      setUsers(() => res.data.data);
      console.log('fetchfollowList res', res.data.data);
      console.log('fetchfollowList users', users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFollowList();
  }, [followType]);

  if (!users) return null;

  return (
    <>
      <NavBarBasic Back={true} />
      <ProfileFollowContainer radius="0" padding="0 2em">
        <FlexDiv direction="column" height="auto">
          <Clover code={condition} width="6.5em" height="6.5em" />
          <FlexDiv>
            <ProfileItemSpan>{name}</ProfileItemSpan>
            {open || (
              <img
                src="/assets/icons/lock.svg"
                alt="lock"
                style={{ position: 'inline' }}
              />
            )}
          </FlexDiv>
          <FlexDiv padding="1.2em">
            <FlexDiv justify="end" onClick={() => setFollowType('팔로잉')}>
              <ProfileItemSpan pointer={true}>팔로잉</ProfileItemSpan>
              <ProfileItemSpan pointer={true}>
                {followingCount >= 1000
                  ? parseInt(followingCount / 1000) + 'k'
                  : followingCount}
              </ProfileItemSpan>
            </FlexDiv>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>

            <FlexDiv justify="start" onClick={() => setFollowType('팔로워')}>
              <ProfileItemSpan pointer={true}>팔로워</ProfileItemSpan>
              <ProfileItemSpan pointer={true}>
                {followerCount >= 1000
                  ? parseInt(followerCount / 1000) + 'k'
                  : followerCount}
              </ProfileItemSpan>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <ProfileFollowListContainer
          height="70%"
          padding="3em 1em 0 0"
          radius="50px 50px 0 0"
        >
          <ProfileFollowListWrapper>
            <FollowList users={users} type={followType} />
          </ProfileFollowListWrapper>
        </ProfileFollowListContainer>
      </ProfileFollowContainer>
    </>
  );
};

export default ProfileFollows;
