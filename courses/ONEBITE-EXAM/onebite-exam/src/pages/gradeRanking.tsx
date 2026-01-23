import styled from "styled-components";
import { useEffect, useState } from "react";

type score = {
  id: string;
  subject: string;

  score: number;
};
type progress = {
  korean: number;
  english: number;
  math: number;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  gap: 16px;
  margin: 20px;
  padding: 20px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eeeeee;
  border-radius: 12px;
`;

const Card = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid;
  border-radius: 14px;
`;

const Subject = styled.div`
  font-size: 14px;
  align-self: flex-end;
`;

const Score = styled.div`
  font-size: 50x;
  font-weight: bold;
`;

// const Dot = styled.div<{ group: subjectGroup }>`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: ${(p) => subjectColor[p.group]};
// `;
// type subjectGroup = "required" | "common" | "art";

// const subjectColor: Record<subjectGroup, string> = {
//   required: "#00EB00",
//   common: "#FFF71C",
//   art: "#9B9BFF",
// };
// const subjectGroupMap: Record<string, subjectGroup> = {
//   국어: "required",
//   영어: "required",
//   수학: "common",
//   사회: "common",
//   도덕: "common",
//   미술: "art",
//   체육: "art",
// };

export const GradeRanking = () => {
  const [scores, setScores] = useState<score[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/scores")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <Wrapper>
      {scores.map((item) => (
        <Card>
          <Score>{item.score}</Score>
          <Subject>{item.subject}</Subject>
          {/* <Dot subject={subject} /> */}
        </Card>
      ))}
    </Wrapper>
  );
};
