import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { Clover } from '../../common/Clover/Clover';
import {
  ProfileFollowBtn,
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileItemSpan,
  ProfileNickNameWrapper,
} from './style';

const ProfileInfo = ({
  isMine,
  uid,
  condition,
  name,
  open,
  followingCount,
  followerCount,
  relation,
  fetchUserInfo,
}) => {
  const navigate = useNavigate();
  const { cloverCode } = useSelector((state) => state.userInfo);

  // 팔로잉, 팔로워 목록 페이지로 보낼 데이터
  const infoToFollowPage = {
    name,
    open,
    followingCount,
    followerCount,
    condition,
  };

  // 클로버 오늘 상태가 바뀔 때마다 재렌더링
  useEffect(() => {
    fetchUserInfo();
  }, [cloverCode]);

  return (
    <BoxNoShad color="light" radius="0" style={{ paddingBottom: '6.7em' }}>
      <ProfileInfoContainer>
        <Clover
          // 내 프로필일 때는 store에서 컨디션을 가져와서 렌더링
          code={isMine ? cloverCode : condition}
          width="4.2em"
          height="4.2em"
        />

        <ProfileInfoWrapper>
          <ProfileNickNameWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileItemSpan style={{ fontSize: '1.5em' }}>
                {name}
              </ProfileItemSpan>
              {open || (
                <img
                  src="/assets/icons/lock.svg"
                  alt="lock"
                  style={{ position: 'inline' }}
                />
              )}
            </div>
            <div style={{ height: '2.5em' }}>
              {relation === 0 ? (
                <img src="/assets/icons/more-vertical.svg" alt="more" />
              ) : (
                <ProfileFollowBtn color={relation === 1 ? 'gray' : 'main'}>
                  {relation === 1 ? '팔로잉' : '팔로우'}
                </ProfileFollowBtn>
              )}
            </div>
          </ProfileNickNameWrapper>

          <div>
            <ProfileItemSpan
              onClick={() =>
                navigate(`/profile/${uid}/follows`, {
                  state: { ...infoToFollowPage, type: '팔로잉' },
                })
              }
            >
              팔로잉
            </ProfileItemSpan>
            <ProfileItemSpan
              onClick={() =>
                navigate(`/profile/${uid}/follows`, {
                  state: { ...infoToFollowPage, type: '팔로잉' },
                })
              }
            >
              {followingCount >= 1000
                ? parseInt(followingCount / 1000) + 'k'
                : followingCount}
            </ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan
              onClick={() =>
                navigate(`/profile/${uid}/follows`, {
                  state: { ...infoToFollowPage, type: '팔로워' },
                })
              }
            >
              팔로워
            </ProfileItemSpan>
            <ProfileItemSpan
              onClick={() =>
                navigate(`/profile/${uid}/follows`, {
                  state: { ...infoToFollowPage, type: '팔로워' },
                })
              }
            >
              {followerCount >= 1000
                ? parseInt(followerCount / 1000) + 'k'
                : followerCount}
            </ProfileItemSpan>
          </div>
        </ProfileInfoWrapper>
      </ProfileInfoContainer>
    </BoxNoShad>
  );
};

export default ProfileInfo;
