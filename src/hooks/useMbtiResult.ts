import { useQuery } from "@tanstack/react-query";

interface MbtiResult {
  type: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
}

const fetchMbtiResult = async (type: string): Promise<MbtiResult> => {
  const response = await fetch(`/api/mbti-results?type=${type}`);
  if (!response.ok) {
    throw new Error("MBTI 결과를 가져올 수 없습니다.");
  }
  return response.json();
};

export const useMbtiResult = (type: string) => {
  return useQuery({
    queryKey: ["mbti-result", type],
    queryFn: () => fetchMbtiResult(type),
    enabled: !!type,
    staleTime: 1000 * 60 * 30, // 30분
  });
};
