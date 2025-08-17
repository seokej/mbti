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
  try {
    const response = await fetch(`/api/mbti-results?type=${type}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("MBTI 결과 조회 실패:", error);
    throw new Error("MBTI 결과를 가져올 수 없습니다.");
  }
};

export const useMbtiResult = (type: string) => {
  return useQuery({
    queryKey: ["mbti-result", type],
    queryFn: () => fetchMbtiResult(type),
    enabled: !!type,
    staleTime: 1000 * 60 * 30, // 30분
    retry: 2, // 재시도 횟수
  });
};
