import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import BtnToTop from '../../Paper/BtnToTop/BtnToTop';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ diaryList }) => {
  return (
    <FlexDiv direction="column">
      <FlexDiv
        wrap="wrap"
        gap="1.25em 5%"
        justify="start"
        padding="0 0 0.5em 0"
      >
        {diaryList?.map(
          ({
            diaryId,
            image,
            medicalName,
            mySubscribe,
            name,
            open,
            paperCount,
            paperId,
            subscribeCount,
            title,
            uid,
          }) => (
            <DiaryItem
              key={diaryId}
              diaryId={diaryId}
              image={image}
              medicalName={medicalName}
              mySubscribe={mySubscribe}
              name={name}
              open={open}
              paperCount={paperCount}
              subscribeCount={subscribeCount}
              title={title}
              uid={uid}
            />
          )
        )}
      </FlexDiv>
      {diaryList?.length >= 9 && (
        <>
          <BtnToTop />
          <span style={{ paddingBottom: '1em' }}></span>
        </>
      )}
    </FlexDiv>
  );
};

export default DiaryListGrid;
