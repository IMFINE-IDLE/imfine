import { BoxTimer, BasicBambooImg, LTBambooImg, LBBambooImg } from './Style';

function BambooTimer({ remainHour }) {
  if (remainHour <= 24 && remainHour > 20) {
    return (
      <BoxTimer>
        <BasicBambooImg />
        <LTBambooImg />
        <LBBambooImg />
        <BasicBambooImg />
        <LTBambooImg />
        <LBBambooImg />
      </BoxTimer>
    );
  } else if (remainHour <= 20 && remainHour > 16) {
    return (
      <BoxTimer>
        <BasicBambooImg />
        <LTBambooImg />
        <LBBambooImg />
        <BasicBambooImg />
        <LTBambooImg />
      </BoxTimer>
    );
  } else if (remainHour <= 16 && remainHour > 12) {
    return (
      <BoxTimer>
        <BasicBambooImg />
        <LTBambooImg />
        <LBBambooImg />
        <BasicBambooImg />
      </BoxTimer>
    );
  } else if (remainHour <= 12 && remainHour > 8) {
    return (
      <BoxTimer>
        <BasicBambooImg />
        <LTBambooImg />
        <LBBambooImg />
      </BoxTimer>
    );
  } else if (remainHour <= 8 && remainHour > 4) {
    return (
      <BoxTimer>
        <BasicBambooImg />
        <LTBambooImg />
      </BoxTimer>
    );
  } else {
    return (
      <BoxTimer>
        <BasicBambooImg />
      </BoxTimer>
    );
  }
}

export default BambooTimer;
