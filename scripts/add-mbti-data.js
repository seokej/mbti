const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase 설정 (실제 값으로 교체하세요)
const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id",
};

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
