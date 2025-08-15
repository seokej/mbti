import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  try {
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
