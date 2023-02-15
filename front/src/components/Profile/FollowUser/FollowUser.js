import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { Clover } from '../../common/Clover/Clover';
import Modal from '../../Modal/Modal';
import { FollowUserBtn, FollowUserContainer, FollowUserWrapper } from './style';

const FollowUser = ({
  cloverCode,
  name,
  type,
  relation,
  uid,
  setTrigger,
  noFollowButton,
  isMine,
}) => {
  const [followStatus, setFollowStatus] = useState(relation);
  // 팔로워 삭제 확인 모달
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  // 테스트용 더미데이터. 나중에 서버에서 받아올 것
  const open = false;

  // 팔로잉 목록에서 팔로우 요청, 언팔로우 요청 보내기
  const fetchChangeFollowStatus = async () => {
    try {
      // 내가 현재 팔로중이면 언팔로우 요청을 보내고 relation을 3으로 변경
      if (followStatus === 1) {
        await axios.delete(api.profile.unfollow(uid));
        setFollowStatus(3);
        setTrigger((prev) => !prev);
      }
      // 현재 팔로우하고 있지 않으면 팔로우 요청을 보내고 relation을 1(공개유저) 또는 2(비공개유저)로 변경
      else if (followStatus === 3) {
        await axios.post(api.profile.follow(), { uid });
        setFollowStatus(open === true ? 1 : 2);
        setTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 팔로워 목록에서 나를 팔로우하는 유저 팔로우 해제 요청
  const fetchDeleteFollower = async () => {
    try {
      const res = await axios.delete(api.profile.deleteFollower(uid));
      console.log(res.data.data);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  if (type === '팔로잉')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover
            onClick={() => navigate(`/profile/${uid}`)}
            style={{ cursor: 'pointer' }}
            code={cloverCode}
            width="3.75em"
            height="3.75em"
          />
          <span
            onClick={() => navigate(`/profile/${uid}`)}
            style={{ cursor: 'pointer' }}
          >
            {name}
          </span>
          {open || (
            <img
              src="/assets/icons/lock.svg"
              alt="lock"
              style={{ position: 'inline', paddingLeft: '0.3em' }}
            />
          )}
        </FollowUserWrapper>
        {noFollowButton ? (
          <></>
        ) : (
          followStatus === 0 || (
            <FollowUserBtn
              color={followStatus === 3 ? 'main' : 'gray'}
              onClick={() => fetchChangeFollowStatus()}
            >
              {followStatus === 1
                ? '언팔로우'
                : followStatus === 2
                ? '요청됨'
                : '팔로우'}
            </FollowUserBtn>
          )
        )}
      </FollowUserContainer>
    );
  else
    return (
      <>
        <FollowUserContainer>
          <FollowUserWrapper>
            <Clover
              onClick={() => navigate(`/profile/${uid}`)}
              code={cloverCode}
              width="3.75em"
              height="3.75em"
              style={{ cursor: 'pointer' }}
            />
            <span
              onClick={() => navigate(`/profile/${uid}`)}
              style={{ cursor: 'pointer' }}
            >
              {name}
            </span>
          </FollowUserWrapper>
          {followStatus === 0 ||
            (isMine ? (
              <FollowUserBtn color="gray" onClick={() => setModalOpen(true)}>
                삭제
              </FollowUserBtn>
            ) : (
              <FollowUserBtn
                color={followStatus === 3 ? 'main' : 'gray'}
                onClick={() => fetchChangeFollowStatus()}
              >
                {followStatus === 1
                  ? '언팔로우'
                  : followStatus === 2
                  ? '요청됨'
                  : '팔로우'}
              </FollowUserBtn>
            ))}
        </FollowUserContainer>

        {modalOpen && (
          <Modal
            type={'팔로워'}
            action={'삭제'}
            setModalOpen={setModalOpen}
            apiFunc={fetchDeleteFollower}
          />
        )}
      </>
    );
};

export default FollowUser;
