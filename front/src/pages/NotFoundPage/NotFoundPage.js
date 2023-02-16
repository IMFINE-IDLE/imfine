import React from 'react';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import { Span404 } from './style';

function NotFoundPage() {
  return (
    <>
      <NavBarBasic Back BackgroundColor={'main'} />
      <BoxGrad
        radius={'0 0 0 0'}
        padding={'0'}
        height={'cal(100vh - var(--nav-height))'}
      >
        <FlexDiv direction={'column'}>
          <div style={{ marginTop: '2em' }}>
            <Span404>404</Span404>
          </div>
          <img src="/assets/clovers/clover6.svg" alt="404에러" />
          <div
            style={{
              marginTop: '2em',
              color: 'var(--icon-color)',
            }}
          >
            해당 페이지를 찾을 수 없어요
          </div>
        </FlexDiv>
      </BoxGrad>
      <TabBar />
    </>
  );
}

export default NotFoundPage;
