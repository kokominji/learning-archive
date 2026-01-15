import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: column;
`;

// region 성적 순위
export const RankWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 820px;
  gap: 16px;
  margin: 20px;
  padding: 20px;
  max-height: 210px;
  overflow-y: auto;
  border: 1px solid #eeeeee;
  border-radius: 12px;
`;

export const Card = styled.div`
  width: 115px;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid;
  border-radius: 16px;
  position: relative;
`;

export const Subject = styled.div<{ $color: string }>`
  font-size: 15px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: ${(p) => p.color};
`;

export const Score = styled.div`
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  top: 8px;
`;
//endregion

// region 성적 집계
export const TotalWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
`;

export const TotalMain = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #3264a8;
`;

export const TotalSub = styled.div`
  font-size: 30px;
`;
//endregion

// region 진도율
export const RateWrapper = styled.div`
  gap: 16px;
  padding: 20px;
`;

export const RateBarWrapper = styled.div<{ $width: string }>`
  width: 820px;
  height: 15px;
  background-color: #797979;
  margin: 30px;
  position: relative;

  &::after {
    content: "${(p) => p.$width}";
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 12px;
  }
`;

export const RateSubject = styled.div`
  font-size: 12px;
  top: -20px;
  position: absolute;
`;
export const RateBar = styled.div<{ $width: string; $color: string }>`
  position: absolute;
  height: 15px;
  width: ${(p) => p.$width};
  background-color: ${(p) => p.$color};
  top: 0;
`;

//endregion

// region 단위
export const UnitWrapper = styled.div`
  position: relative;
`;
//endregion
