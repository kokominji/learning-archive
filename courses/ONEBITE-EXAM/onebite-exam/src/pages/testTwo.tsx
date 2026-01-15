import * as S from "./testTwo.styled";
import { useEffect, useState } from "react";
// import { URI_SYS, useFdrRestAPI } from '@api';

export const TestTwo = () => {
  const [info, setInfo] = useState<any[]>(infos);
  // const { restAPI } = useFdrRestAPI();
  const [unit, setUnit] = useState<any[]>([]);

  const rateColor = (subject: string) => {
    switch (subject) {
      case "국어":
        return "green";
      case "영어":
        return "yellow";
      case "수학":
        return "red";
    }
  };

  const subjectColor = (type: string) => {
    switch (type) {
      case "main":
        return "#75FF75";
      case "common":
        return "#FFF732";
      case "art":
        return "#C0C0FF";
    }
  };

  // const unitShow = async () => {
  //   const res = await restAPI('GET', URI_SYS.UNIT.GET.DEFAULT, {});
  //   setUnit(res.data.data.rows);
  // };

  // useEffect(() => {
  //   unitShow();
  // }, []);

  const totalScore = info.reduce((sum, item) => {
    return sum + item.score;
  }, 0);

  const totalSubject = info.length;

  const avg = Number((totalScore / totalSubject).toFixed(2));
  const maxScore = info.reduce(
    (max, item) => (item.score > max ? item.score : max),
    0
  );

  const minScore = info.reduce(
    (min, item) => (item.score < min ? item.score : min),
    info[0]?.score ?? 0
  );

  const lenType = unit.filter((unit: any) => unit.unitType === "LEN");
  const wgtType = unit.filter((unit: any) => unit.unitType === "WGT");
  const cntType = unit.filter((unit: any) => unit.unitType === "CNT");

  return (
    <S.Container>
      <S.Label>성적 순위</S.Label>
      <S.Span>◆</S.Span>
      <S.RankWrapper>
        {info
          .sort((a, b) => b.score - a.score)
          .map((item) => (
            <S.Card key={item.id}>
              <S.Score $color={subjectColor(item.type)}>{item.score}</S.Score>
              <S.Subject>{item.subject}</S.Subject>
            </S.Card>
          ))}
      </S.RankWrapper>
      <S.Label>성적 집계</S.Label>
      <S.Span>◆</S.Span>
      <S.TotalWrapper>
        <S.TotalMain>합계</S.TotalMain>
        <S.TotalSub>{totalScore}점</S.TotalSub>

        <S.TotalMain>과목수</S.TotalMain>
        <S.TotalSub>{totalSubject}과목</S.TotalSub>

        <S.TotalMain>평균</S.TotalMain>
        <S.TotalSub>{avg}점</S.TotalSub>

        <S.TotalMain>최저</S.TotalMain>
        <S.TotalSub>{minScore}점</S.TotalSub>

        <S.TotalMain>최고</S.TotalMain>
        <S.TotalSub>{maxScore}점</S.TotalSub>
      </S.TotalWrapper>

      <S.Label>진도율</S.Label>
      <S.Span>◆</S.Span>

      <S.RateWrapper>
        {info
          .filter((item) => item.progress)
          .map((item) => (
            <S.RateBarWrapper key={item.id} $width={item.progress}>
              <S.RateSubject>{item.subject}</S.RateSubject>
              <S.RateBar
                $width={item.progress}
                $color={rateColor(item.subject)}
              />
            </S.RateBarWrapper>
          ))}
      </S.RateWrapper>

      {/* <S.Label>단위</S.Label><S.Span>◆</S.Span>
      {lenType.map((unit) => (
        <div key={unit.unitId}>
          길이:
          {unit.unitNm}
        </div>
      ))}
      {wgtType.map((unit) => (
        <div key={unit.unitId}>
          무게:
          {unit.unitNm}
        </div>
      ))}
      {cntType.map((unit) => (
        <div key={unit.unitId}>
          넓이:
          {unit.unitNm}
        </div> */}
      {/* ))} */}
    </S.Container>
  );
};

const infos = [
  {
    id: "1",
    subject: "수학",
    score: 99,
    progress: "30%",
    type: "main",
  },
  {
    id: "2",
    subject: "국어",
    score: 84,
    progress: "75%",
    type: "main",
  },
  {
    id: "3",
    subject: "영어",
    score: 37,
    progress: "50%",
    type: "main",
  },
  {
    id: "4",
    subject: "사회",
    score: 68,
    type: "common",
  },
  {
    id: "5",
    subject: "체육",
    score: 21,
    type: "art",
  },
  {
    id: "6",
    subject: "도덕",
    score: 40,
    type: "common",
  },
  {
    id: "7",
    subject: "미술",
    score: 55,
    type: "art",
  },
];
