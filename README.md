# MBTI 성격 유형 검사 앱

Next.js와 Firebase를 사용한 MBTI 성격 유형 검사 애플리케이션입니다.

## 주요 기능

- 12개 질문을 통한 MBTI 성격 유형 검사
- Firebase Firestore에서 동적으로 MBTI 결과 데이터 로드
- React Query를 사용한 효율적인 데이터 페칭
- 반응형 디자인과 모던한 UI

## 설치 및 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. 프로젝트 설정에서 웹 앱 추가
4. `.env.local` 파일의 Firebase 설정을 실제 값으로 교체:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Firestore 데이터 추가

Firebase에 MBTI 데이터를 추가하는 방법:

#### 방법 1: 스크립트 사용 (권장)
```bash
# 환경변수 설정 후 스크립트 실행
npm run add-mbti-data
```

**환경변수 설정:**
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**주의사항:**
- `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- 실제 Firebase 프로젝트의 설정 값으로 교체해야 합니다
- `NEXT_PUBLIC_` 접두사가 붙은 환경변수는 클라이언트 사이드에서도 접근 가능합니다

#### 방법 2: 수동으로 Firestore에 추가
`mbti-results` 컬렉션에 다음과 같은 구조로 데이터 추가:

```json
{
  "type": "INTJ",
  "title": "건축가 (Architect)",
  "description": "상상력이 풍부하고 전략적인 사상가로, 모든 것을 계획하고 실행합니다.",
  "strengths": ["전략적 사고", "독립적", "결정적", "창의적"],
  "weaknesses": ["완벽주의", "타인과의 소통 부족", "감정 표현 어려움"],
  "careers": ["과학자", "엔지니어", "의사", "변호사", "건축가"],
  "relationships": "INTJ는 깊고 의미 있는 관계를 추구하며, 지적 호기심을 자극하는 파트너를 찾습니다."
}
```

## 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Styled Components
- **State Management**: React Query (TanStack Query)
- **Backend**: Firebase Firestore
- **API**: Next.js API Routes

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── mbti-results/
│   │       └── route.ts          # MBTI 결과 API
│   ├── layout.tsx
│   └── page.tsx                  # 메인 MBTI 앱
├── hooks/
│   └── useMbtiResult.ts         # MBTI 결과 조회 훅
├── lib/
│   └── firebase.ts              # Firebase 설정
firebase/
├── firebasedb.ts                # Firebase 초기화 설정
└── firestore.ts                 # Firestore 인스턴스
scripts/
└── add-mbti-data.js             # Firebase 데이터 추가 스크립트
```

## Firebase 연동 상태

✅ **완료된 작업:**
- Firebase 설정 파일 생성 (`firebasedb.ts`, `firestore.ts`)
- Firestore API 라우트 구현
- React Query 훅 구현
- MBTI 데이터 추가 스크립트 (`add-mbti-data.js`)
- 환경변수를 통한 Firebase 설정 관리

⚠️ **필요한 작업:**
- `.env.local`에 실제 Firebase 설정 값 입력
- `npm run add-mbti-data` 명령으로 Firestore에 MBTI 데이터 추가

## 라이센스

MIT License