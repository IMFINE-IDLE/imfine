import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ diaryList }) => {
  return (
    <FlexDiv wrap="wrap" gap="1.25em 5%" justify="space-between">
      {diaryList?.map(
        ({
          diaryId,
          image,
          medicalName,
          mySubscribe,
          name,
          open,
          paperCount,
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
  );
};

export default DiaryListGrid;
