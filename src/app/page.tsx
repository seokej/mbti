"use client";

import { useState } from "react";
import styled from "styled-components";

interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  type: "E-I" | "S-N" | "T-F" | "J-P";
}

const questions: Question[] = [
  // E-I 질문들
  {
    id: 1,
    question: "새로운 사람들과 만나는 것이 즐겁다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "E-I",
  },
  {
    id: 2,
    question: "혼자 있는 시간이 필요하다",
    optionA: "아니다",
    optionB: "그렇다",
    type: "E-I",
  },
  {
    id: 3,
    question: "파티나 모임에서 활발하게 참여한다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "E-I",
  },

  // S-N 질문들
  {
    id: 4,
    question: "구체적이고 실용적인 정보를 선호한다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "S-N",
  },
  {
    id: 5,
    question: "미래의 가능성과 새로운 아이디어에 관심이 많다",
    optionA: "아니다",
    optionB: "그렇다",
    type: "S-N",
  },
  {
    id: 6,
    question: "직관보다는 경험을 믿는다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "S-N",
  },

  // T-F 질문들
  {
    id: 7,
    question: "논리적이고 객관적인 판단을 한다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "T-F",
  },
  {
    id: 8,
    question: "다른 사람의 감정을 고려한다",
    optionA: "아니다",
    optionB: "그렇다",
    type: "T-F",
  },
  {
    id: 9,
    question: "공정함보다는 따뜻함을 중요하게 생각한다",
    optionA: "아니다",
    optionB: "그렇다",
    type: "T-F",
  },

  // J-P 질문들
  {
    id: 10,
    question: "계획을 세우고 그대로 실행한다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "J-P",
  },
  {
    id: 11,
    question: "즉흥적이고 유연하게 행동한다",
    optionA: "아니다",
    optionB: "그렇다",
    type: "J-P",
  },
  {
    id: 12,
    question: "마감일을 잘 지킨다",
    optionA: "그렇다",
    optionB: "아니다",
    type: "J-P",
  },
];

const typeDescriptions = {
  E: "외향적 (Extroverted) - 사람들과 어울리는 것을 좋아하고 활발함",
  I: "내향적 (Introverted) - 혼자 있는 시간을 선호하고 조용함",
  S: "감각적 (Sensing) - 구체적이고 실용적인 것을 선호함",
  N: "직관적 (Intuitive) - 추상적이고 미래지향적인 것을 선호함",
  T: "사고적 (Thinking) - 논리적이고 객관적인 판단을 함",
  F: "감정적 (Feeling) - 감정적이고 공감능력이 뛰어남",
  J: "판단적 (Judging) - 계획적이고 체계적인 것을 선호함",
  P: "인식적 (Perceiving) - 유연하고 즉흥적인 것을 선호함",
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
  max-width: 48rem;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
`;

const ProgressContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProgressText = styled.span`
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 500;
`;

const ProgressNumber = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
  background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.75rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number }>`
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%);
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease-out;
  width: ${(props) => props.width}%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const QuestionBox = styled.div`
  background: linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid #e9d5ff;
`;

const QuestionText = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PrimaryButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  border: none;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  background: white;
  color: #374151;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  border: 3px solid #d1d5db;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const InfoText = styled.div`
  margin-top: 2.5rem;
  text-align: center;
`;

const InfoParagraph = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  font-weight: 500;
`;

// Result Page Styled Components
const ResultCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
  max-width: 64rem;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const ResultTitle = styled.h1`
  font-size: 3.75rem;
  font-weight: bold;
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const ResultMBTI = styled.div`
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const TypeCard = styled.div`
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

const TypeLetter = styled.div`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const TypeDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 1rem;
  border: none;
  font-weight: bold;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState("");

  const handleAnswer = (type: string, value: number) => {
    const newAnswers = { ...answers };
    if (newAnswers[type]) {
      newAnswers[type] += value;
    } else {
      newAnswers[type] = value;
    }
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    let result = "";

    // E-I 결정
    result += (finalAnswers["E-I"] || 0) > 0 ? "E" : "I";

    // S-N 결정
    result += (finalAnswers["S-N"] || 0) > 0 ? "S" : "N";

    // T-F 결정
    result += (finalAnswers["T-F"] || 0) > 0 ? "T" : "F";

    // J-P 결정
    result += (finalAnswers["J-P"] || 0) > 0 ? "J" : "P";

    setMbtiResult(result);
    setShowResult(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setMbtiResult("");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <Container>
        <ResultCard>
          <ResultTitle>MBTI 결과</ResultTitle>
          <ResultMBTI>{mbtiResult}</ResultMBTI>

          <TypeGrid>
            {mbtiResult.split("").map((letter, index) => (
              <TypeCard key={index}>
                <TypeLetter>{letter}</TypeLetter>
                <TypeDescription>
                  {typeDescriptions[letter as keyof typeof typeDescriptions]}
                </TypeDescription>
              </TypeCard>
            ))}
          </TypeGrid>

          <ResetButton onClick={resetTest}>다시 검사하기 ✨</ResetButton>
        </ResultCard>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        {/* 헤더 */}
        <Title>MBTI 성격 유형 검사</Title>
        <Subtitle>당신의 성격을 알아보세요</Subtitle>

        {/* 진행률 바 */}
        <ProgressContainer>
          <ProgressHeader>
            <ProgressText>진행률</ProgressText>
            <ProgressNumber>
              {currentQuestion + 1} / {questions.length}
            </ProgressNumber>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill width={progress} />
          </ProgressBar>
        </ProgressContainer>

        {/* 질문 */}
        <QuestionContainer>
          <QuestionBox>
            <QuestionText>{questions[currentQuestion].question}</QuestionText>
          </QuestionBox>
        </QuestionContainer>

        {/* 답변 버튼 */}
        <ButtonContainer>
          <PrimaryButton
            onClick={() => handleAnswer(questions[currentQuestion].type, 1)}
          >
            {questions[currentQuestion].optionA}
          </PrimaryButton>

          <SecondaryButton
            onClick={() => handleAnswer(questions[currentQuestion].type, -1)}
          >
            {questions[currentQuestion].optionB}
          </SecondaryButton>
        </ButtonContainer>

        {/* 안내 문구 */}
        <InfoText>
          <InfoParagraph>
            💡 진실되게 답변해주세요. 정답은 없습니다.
          </InfoParagraph>
        </InfoText>
      </Card>
    </Container>
  );
}
