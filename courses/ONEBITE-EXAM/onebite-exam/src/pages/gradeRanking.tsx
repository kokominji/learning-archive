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
  gap: 16px;
  margin: 20px;
  padding: 20px;
  max-height: 200px;
  max-width: "50%";
  overflow-y: auto;
  border: 1px solid; //색상추가
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
        </Card>
      ))}
    </Wrapper>
  );
};
