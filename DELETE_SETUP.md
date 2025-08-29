# GitHub Actions 삭제 로직 설정 가이드

이 가이드는 github-api.md를 참고하여 구현된 GitHub Actions 삭제 로직의 설정 및 사용 방법을 설명합니다.

## 📋 구현된 기능

- **보안 토큰 기반 삭제**: JWT 토큰을 사용한 안전한 삭제 링크
- **GitHub API 연동**: GitHub Repository의 파일을 직접 삭제
- **자동 리다이렉트**: 삭제 성공/실패에 따른 적절한 페이지 이동
- **토큰 만료**: 7일 후 자동 만료되는 삭제 링크

## 🛠️ 설치 및 설정

### 1. 의존성 설치

```bash
npm install jsonwebtoken @types/jsonwebtoken
```

### 2. 환경변수 설정

`.env` 파일에 다음 환경변수를 설정하세요:

```env
# GitHub API Configuration
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repository-name
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_BRANCH=main

# JWT Secret for Delete Tokens
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-secure
```

### 3. GitHub Personal Access Token 생성

1. GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 다음 권한 선택:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access public repositories)
4. 생성된 토큰을 `GITHUB_TOKEN` 환경변수에 설정

## 📁 구현된 파일 구조

```
src/
├── lib/
│   └── github-api.ts          # GitHub API 클래스
├── app/
│   ├── api/delete-blog/
│   │   └── route.ts           # 삭제 API 엔드포인트
│   ├── delete-success/
│   │   └── page.tsx           # 삭제 성공 페이지
│   ├── delete-expired/
│   │   └── page.tsx           # 토큰 만료 페이지
│   └── delete-not-found/
│       └── page.tsx           # 포스트 없음 페이지
scripts/
├── utils/
│   └── token-manager.js       # JWT 토큰 관리자
└── test-delete.js             # 삭제 기능 테스트 스크립트
```

## 🚀 사용 방법

### 1. 삭제 토큰 생성

```javascript
const TokenManager = require('./scripts/utils/token-manager');

const tokenManager = new TokenManager();
const deleteUrl = tokenManager.generateDeleteUrl(
  'https://yoursite.com',
  '2024-01-01-post.md',
  'Blog Post Title'
);

console.log('삭제 URL:', deleteUrl);
```

### 2. 삭제 프로세스

1. **토큰 생성**: 블로그 포스트 생성 시 삭제 토큰과 URL 생성
2. **이메일 발송**: 생성된 삭제 URL을 이메일에 포함하여 발송
3. **사용자 클릭**: 사용자가 삭제 링크 클릭
4. **토큰 검증**: 서버에서 토큰 유효성 검증
5. **파일 삭제**: GitHub API를 통한 실제 파일 삭제
6. **결과 표시**: 성공/실패 페이지로 리다이렉트

### 3. API 엔드포인트

#### GET `/api/delete-blog?token={token}`
- 브라우저를 통한 삭제 (리다이렉트 방식)
- 성공 시: `/delete-success`로 리다이렉트
- 실패 시: `/delete-expired` 또는 `/delete-not-found`로 리다이렉트

#### POST `/api/delete-blog`
```json
{
  "token": "jwt-token-here"
}
```
- API를 통한 삭제 (JSON 응답)
- 성공 응답:
```json
{
  "success": true,
  "message": "Blog post successfully deleted: Title",
  "filename": "2024-01-01-post.md",
  "title": "Title",
  "deletedFile": "content/posts/2024-01-01-post.md"
}
```

## 🧪 테스트 방법

### 1. 기본 테스트 실행

```bash
node scripts/test-delete.js
```

### 2. 수동 테스트

```javascript
const TokenManager = require('./scripts/utils/token-manager');

// 토큰 생성
const tokenManager = new TokenManager();
const token = tokenManager.generateDeleteToken('test.md', 'Test Title');

// 토큰 검증
const decoded = tokenManager.verifyDeleteToken(token);
console.log('검증 결과:', decoded);
```

## 🔒 보안 고려사항

1. **JWT Secret**: 강력한 비밀키 사용 필수
2. **토큰 만료**: 7일 후 자동 만료
3. **GitHub Token**: 최소 권한 원칙 적용
4. **HTTPS**: 프로덕션에서 HTTPS 필수

## 🐛 문제 해결

### 1. 토큰 검증 실패
- `JWT_SECRET` 환경변수 확인
- 토큰 만료 시간 확인

### 2. GitHub API 오류
- `GITHUB_TOKEN` 권한 확인
- Repository 이름 및 소유자 확인
- API 사용량 제한 확인

### 3. 파일을 찾을 수 없음
- 파일 경로 확인 (`content/posts/` 디렉토리)
- 파일명과 제목 매칭 로직 확인

## 📝 로그 예시

```
GitHub API Request: https://api.github.com/repos/owner/repo/contents/content/posts/test.md
Using token: ghp_abcdef...
GitHub API Response: Success
Blog deleted via GitHub API: content/posts/test.md - Test Title
```

## 🔄 Digital Marketing Hub 연동

이 삭제 로직은 [Digital Marketing Hub](https://github.com/dongdongdongk/Digital-Marketing-Hub)의 구조를 참고하여 구현되었으며, 다음과 같은 호환성을 제공합니다:

- 동일한 토큰 생성/검증 방식
- 같은 API 엔드포인트 구조
- 호환되는 환경변수 설정
- 유사한 오류 처리 방식