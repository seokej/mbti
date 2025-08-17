const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const path = require("path");

// 절대 경로로 .env.local 파일 로드
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

// Firebase 설정 (환경변수 사용)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 디버깅을 위한 설정 로그 출력
console.log("Firebase 설정 확인:");
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log(
  "API Key:",
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "설정됨" : "설정되지 않음"
);
console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("환경변수 파일 경로:", path.resolve(__dirname, "../.env.local"));

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// MBTI 데이터
const mbtiData = [
  {
    type: "INTJ",
    title: "건축가 (Architect)",
    description:
      "상상력이 풍부하고 전략적인 사상가로, 모든 것을 계획하고 실행합니다.",
    strengths: ["전략적 사고", "독립적", "결정적", "창의적"],
    weaknesses: ["완벽주의", "타인과의 소통 부족", "감정 표현 어려움"],
    careers: ["과학자", "엔지니어", "의사", "변호사", "건축가"],
    relationships:
      "INTJ는 깊고 의미 있는 관계를 추구하며, 지적 호기심을 자극하는 파트너를 찾습니다.",
  },
  {
    type: "INTP",
    title: "논리술사 (Logician)",
    description:
      "혁신적인 발명가로, 지식에 대한 끝없는 갈증을 가지고 있습니다.",
    strengths: ["논리적 사고", "창의적", "객관적", "지적 호기심"],
    weaknesses: ["실용성 부족", "감정적 소통 어려움", "일상적 업무 싫어함"],
    careers: ["연구원", "프로그래머", "철학자", "수학자", "건축가"],
    relationships:
      "INTP는 지적 대화를 즐기며, 개인 공간을 존중하는 파트너를 선호합니다.",
  },
  {
    type: "ENTJ",
    title: "통솔자 (Commander)",
    description:
      "대담하고 상상력이 풍부한 강력한 리더로, 항상 지식을 추구합니다.",
    strengths: ["리더십", "결정력", "효율성", "전략적 사고"],
    weaknesses: ["인내심 부족", "감정적 민감성 부족", "타인 의견 무시"],
    careers: ["경영자", "변호사", "정치인", "컨설턴트", "군인"],
    relationships:
      "ENTJ는 강력하고 독립적인 파트너를 찾으며, 함께 성장하는 관계를 원합니다.",
  },
  {
    type: "ENTP",
    title: "변론가 (Debater)",
    description: "똑똑하고 호기심 많은 사상가로, 지적 도전을 즐깁니다.",
    strengths: ["창의적", "적응력", "지적 호기심", "유연한 사고"],
    weaknesses: ["일상적 업무 싫어함", "감정적 민감성 부족", "완성도 부족"],
    careers: ["기업가", "변호사", "정치인", "마케터", "언론인"],
    relationships:
      "ENTP는 지적 자극을 주는 파트너를 찾으며, 자유로운 관계를 선호합니다.",
  },
  {
    type: "INFJ",
    title: "옹호자 (Advocate)",
    description:
      "조용하고 신비로운 이상주의자로, 다른 사람들을 돕는 것을 좋아합니다.",
    strengths: ["공감능력", "창의적", "결정적", "이상주의적"],
    weaknesses: ["완벽주의", "과민함", "갈등 회피"],
    careers: ["상담사", "작가", "교사", "심리학자", "사회복지사"],
    relationships:
      "INFJ는 깊고 의미 있는 관계를 추구하며, 정신적 연결을 중요하게 생각합니다.",
  },
  {
    type: "INFP",
    title: "중재자 (Mediator)",
    description:
      "시적이고 친절한 이상주의자로, 항상 선한 일을 하려고 노력합니다.",
    strengths: ["창의적", "공감능력", "열정적", "이상주의적"],
    weaknesses: ["비현실적", "감정적", "결정 어려움"],
    careers: ["작가", "예술가", "상담사", "교사", "심리학자"],
    relationships:
      "INFP는 진정성과 깊이를 중요하게 생각하며, 개인적 가치관을 공유하는 파트너를 찾습니다.",
  },
  {
    type: "ENFJ",
    title: "선도자 (Protagonist)",
    description:
      "카리스마 있고 영감을 주는 리더로, 다른 사람들의 잠재력을 끌어올립니다.",
    strengths: ["리더십", "공감능력", "영감적", "책임감"],
    weaknesses: ["과민함", "완벽주의", "자기희생"],
    careers: ["교사", "상담사", "인사담당자", "마케터", "정치인"],
    relationships:
      "ENFJ는 깊고 의미 있는 관계를 추구하며, 파트너의 성장을 돕는 것을 즐깁니다.",
  },
  {
    type: "ENFP",
    title: "활동가 (Campaigner)",
    description:
      "열정적이고 창의적인 자유로운 영혼으로, 가능성에 대해 이야기하는 것을 좋아합니다.",
    strengths: ["창의적", "열정적", "적응력", "공감능력"],
    weaknesses: ["집중력 부족", "감정적", "일상적 업무 싫어함"],
    careers: ["기자", "마케터", "교사", "상담사", "예술가"],
    relationships:
      "ENFP는 열정적이고 자유로운 관계를 추구하며, 함께 성장하는 파트너를 원합니다.",
  },
  {
    type: "ESFJ",
    title: "집정관 (Consul)",
    description: "사람들을 돕고 보호하는 따뜻한 마음을 가진 사회적 존재입니다.",
    strengths: ["사교적", "책임감", "실용적", "동정심"],
    weaknesses: ["변화 싫어함", "갈등 회피", "비판에 민감함"],
    careers: ["간호사", "교사", "상담사", "인사담당자", "사회복지사"],
    relationships:
      "ESFJ는 안정적이고 전통적인 관계를 추구하며, 가족과 친구를 소중히 여깁니다.",
  },
  {
    type: "ESFP",
    title: "연예인 (Entertainer)",
    description:
      "자유분방하고 재미있는 영혼으로, 삶을 즐기고 다른 사람들도 즐겁게 만듭니다.",
    strengths: ["낙관적", "사교적", "실용적", "적응력"],
    weaknesses: ["계획성 부족", "집중력 부족", "감정적"],
    careers: ["연예인", "이벤트 플래너", "여행 가이드", "판매원", "요리사"],
    relationships:
      "ESFP는 재미있고 자유로운 관계를 추구하며, 함께 모험을 즐기는 파트너를 원합니다.",
  },
  {
    type: "ISFJ",
    title: "수호자 (Defender)",
    description:
      "조용하고 친절하며 헌신적인 보호자로, 다른 사람들을 돌보는 것을 좋아합니다.",
    strengths: ["헌신적", "실용적", "인내심", "관찰력"],
    weaknesses: ["변화 싫어함", "자기희생", "표현력 부족"],
    careers: ["간호사", "교사", "사서", "행정직", "보육교사"],
    relationships:
      "ISFJ는 안정적이고 전통적인 관계를 추구하며, 파트너를 보호하고 돌봅니다.",
  },
  {
    type: "ISFP",
    title: "모험가 (Adventurer)",
    description:
      "유연하고 매력적인 예술가로, 자신만의 방식으로 삶을 살아갑니다.",
    strengths: ["창의적", "유연함", "관찰력", "실용적"],
    weaknesses: ["계획성 부족", "갈등 회피", "표현력 부족"],
    careers: ["예술가", "디자이너", "사진작가", "수의사", "요리사"],
    relationships:
      "ISFP는 자유롭고 개인적인 관계를 추구하며, 개인 공간을 존중하는 파트너를 선호합니다.",
  },
  {
    type: "ESTJ",
    title: "경영자 (Executive)",
    description:
      "실용적이고 사실에 기반한 결정을 내리는 관리자로, 질서와 구조를 만듭니다.",
    strengths: ["조직력", "결정력", "실용적", "책임감"],
    weaknesses: ["유연성 부족", "감정적 민감성 부족", "완고함"],
    careers: ["경영자", "군인", "경찰", "법무관", "프로젝트 매니저"],
    relationships:
      "ESTJ는 안정적이고 전통적인 관계를 추구하며, 함께 목표를 달성하는 파트너를 원합니다.",
  },
  {
    type: "ESTP",
    title: "만능재주꾼 (Virtuoso)",
    description:
      "대담하고 실용적인 실험가로, 위험을 감수하고 문제를 해결하는 것을 즐깁니다.",
    strengths: ["적응력", "실용적", "대담함", "문제 해결 능력"],
    weaknesses: ["계획성 부족", "인내심 부족", "감정적 민감성 부족"],
    careers: ["경찰", "소방관", "군인", "운동선수", "엔지니어"],
    relationships:
      "ESTP는 자유롭고 모험적인 관계를 추구하며, 함께 새로운 경험을 하는 파트너를 원합니다.",
  },
  {
    type: "ISTJ",
    title: "현실주의자 (Logistician)",
    description:
      "실용적이고 사실에 기반한 결정을 내리는 신뢰할 수 있는 사람입니다.",
    strengths: ["신뢰성", "실용적", "조직력", "책임감"],
    weaknesses: ["유연성 부족", "감정적 민감성 부족", "완고함"],
    careers: ["회계사", "법무관", "군인", "경찰", "행정직"],
    relationships:
      "ISTJ는 안정적이고 전통적인 관계를 추구하며, 신뢰할 수 있는 파트너를 원합니다.",
  },
  {
    type: "ISTP",
    title: "만능재주꾼 (Virtuoso)",
    description:
      "대담하고 실용적인 실험가로, 위험을 감수하고 문제를 해결하는 것을 즐깁니다.",
    strengths: ["적응력", "실용적", "대담함", "문제 해결 능력"],
    weaknesses: ["계획성 부족", "인내심 부족", "감정적 민감성 부족"],
    careers: ["경찰", "소방관", "군인", "운동선수", "엔지니어"],
    relationships:
      "ISTP는 자유롭고 모험적인 관계를 추구하며, 함께 새로운 경험을 하는 파트너를 원합니다.",
  },
];

async function addMbtiData() {
  try {
    const collectionRef = collection(db, "mbti-results");

    for (const data of mbtiData) {
      await addDoc(collectionRef, data);
      console.log(`Added ${data.type}: ${data.title}`);
    }

    console.log("All MBTI data added successfully!");
  } catch (error) {
    console.error("Error adding MBTI data:", error);
  }
}

addMbtiData();
