import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { Clover } from '../../common/Clover/Clover';
import {
  ProfileFollowBtn,
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileItemSpan,
  ProfileNickNameWrapper,
  ProfileInfoModifyBtn,
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
  // 그날 해당 유저의 컨디션
  const { cloverCode } = useSelector((state) => state.user);
  // 팔로우 여부 체크용 state
  const [followStatus, setFollowStatus] = useState(relation);
  // 수정하기, 설정하기 버튼 오픈
  const [modifyOpen, setModifyOpen] = useState(false);

  const navigate = useNavigate();

  // 타인의 프로필 페이지에서 팔로우, 언팔로우 요청
  const fetchChangeFollowStatus = async () => {
    try {
      // 내가 현재 팔로중이면 언팔로우 요청을 보내고 relation을 3으로 변경
      if (followStatus === 1) {
        await axios.delete(api.profile.unfollow(uid));
        setFollowStatus(3);
      }
      // 현재 팔로우하고 있지 않으면 팔로우 요청을 보니고 relation을 1로 변경
      else if (followStatus === 3) {
        await axios.post(api.profile.follow(), { uid });
        setFollowStatus(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 팔로잉, 팔로워 목록 페이지로 보낼 데이터
  const infoToFollowPage = {
    name,
    open,
    followingCount,
    followerCount,
    condition,
  };

  // 클로버 오늘 상태가 바뀌거나 팔로우 상태가 바뀔 때마다 재렌더링
  useEffect(() => {
    fetchUserInfo();
  }, [cloverCode, followStatus]);

  return (
    <BoxNoShad color="light" radius="0" padding="0.3em 1em 6.7em 1em">
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
            <div
              style={{
                height: '2.5em',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {relation === 0 ? (
                <>
                  <img
                    src="/assets/icons/more-vertical.svg"
                    alt="more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModifyOpen((prev) => !prev);
                    }}
                  />

                  {modifyOpen && (
                    <>
                      <ProfileInfoModifyBtn
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${uid}/config`, {
                            state: { name, open },
                          });
                        }}
                      >
                        프로필 수정하기
                      </ProfileInfoModifyBtn>
                      <ProfileInfoModifyBtn
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/settings`);
                        }}
                        top="80px"
                      >
                        계정 설정하기
                      </ProfileInfoModifyBtn>
                    </>
                  )}
                </>
              ) : (
                <ProfileFollowBtn
                  onClick={() => fetchChangeFollowStatus()}
                  color={relation === 1 ? 'gray' : 'main'}
                >
                  {relation === 1
                    ? '언팔로우'
                    : relation === 2
                    ? '요청중'
                    : '팔로우'}
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
