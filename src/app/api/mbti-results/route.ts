import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// API 라우트에서 Firebase 직접 초기화
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 이미 초기화된 앱이 있으면 재사용, 없으면 새로 생성
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function GET(request: Request) {
  try {
    // 환경변수 확인
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.error("Firebase 환경변수가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const mbtiType = searchParams.get("type");

    if (!mbtiType) {
      return NextResponse.json(
        { error: "MBTI 타입이 필요합니다." },
        { status: 400 }
      );
    }

    const resultsRef = collection(db, "mbti-results");
    const q = query(resultsRef, where("type", "==", mbtiType));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "해당 MBTI 타입의 결과를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const result = querySnapshot.docs[0].data();

    return NextResponse.json({
      type: result.type,
      title: result.title,
      description: result.description,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      careers: result.careers,
      relationships: result.relationships,
    });
  } catch (error) {
    console.error("MBTI 결과 조회 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
