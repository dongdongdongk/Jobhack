# GitHub Secrets 설정 가이드

GitHub Actions에서 삭제 로직을 사용하기 위해 다음 시크릿들을 설정해야 합니다.

## 🔑 필요한 GitHub Secrets

### 기존 시크릿들 (이미 설정되어 있을 것)
- `OPENAI_API_KEY`
- `NEWS_API_KEY` 
- `GNEWS_API_KEY`
- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`
- `REDDIT_USER_AGENT`
- `GMAIL_USER`
- `GMAIL_PASSWORD`
- `NOTIFICATION_EMAIL`
- `UNSPLASH_ACCESS_KEY`

### 새로 추가해야 할 시크릿들 ⭐

#### 1. `GITHUB_TOKEN` (선택사항)
- **설명**: 기본 제공되는 `${{ secrets.GITHUB_TOKEN }}`으로 충분할 수 있음
- **필요한 경우**: 기본 토큰으로 권한 부족 시에만 커스텀 토큰 생성
- **생성 방법** (필요시):
  1. GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. "Generate new token (classic)" 클릭
  3. 권한: `repo` (Full control of private repositories)
  4. 생성된 토큰을 `GITHUB_TOKEN` 시크릿에 설정

#### 2. `JWT_SECRET` ⭐ 필수
- **값**: JWT 토큰 서명용 비밀키 (강력한 랜덤 문자열)
- **예시**: `super-secret-jwt-key-2024-jobhack-blog-secure-token-xyz123`
- **생성 방법**:
  ```bash
  # 방법 1: openssl 사용
  openssl rand -base64 64
  
  # 방법 2: Node.js 사용
  node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
  
  # 방법 3: 수동 생성 (최소 32자 이상)
  # 예: MySecureJWTSecret2024ForJobhackBlogDeletionToken!@#
  ```

## 🛠️ GitHub Secrets 설정 방법

1. **GitHub 레포지토리로 이동**
   - https://github.com/dongdongdongk/JobhacksBlog

2. **Settings 탭 클릭**

3. **왼쪽 메뉴에서 "Secrets and variables" → "Actions" 클릭**

4. **"New repository secret" 버튼 클릭**

5. **시크릿 추가:**
   - **필수**: `JWT_SECRET` - 생성한 강력한 비밀키
   - **선택사항**: `GITHUB_TOKEN` - 기본 토큰으로 부족할 경우에만

## ✅ 설정 확인

설정이 완료되면 다음과 같은 시크릿들이 있어야 합니다:

```
Repository secrets:
├── OPENAI_API_KEY
├── REDDIT_CLIENT_ID  
├── REDDIT_CLIENT_SECRET
├── REDDIT_USER_AGENT
├── GMAIL_USER
├── GMAIL_PASSWORD
├── NOTIFICATION_EMAIL
├── GITHUB_TOKEN          ⭐ (선택사항 - 기본 토큰으로 부족할 때만)
└── JWT_SECRET            ⭐ 필수 추가
```

**참고**: `GITHUB_OWNER`와 `GITHUB_REPO`는 GitHub Actions의 내장 컨텍스트 사용:
- `${{ github.repository_owner }}` - 자동으로 저장소 소유자 제공
- `${{ github.event.repository.name }}` - 자동으로 저장소 이름 제공

## 🔒 보안 주의사항

1. **JWT_SECRET**: 
   - 최소 32자 이상의 강력한 랜덤 문자열 사용
   - 절대 코드에 하드코딩하지 말 것
   - 정기적으로 변경 권장

2. **GITHUB_TOKEN**:
   - 최소 권한 원칙 적용 (repo 권한만)
   - 토큰 만료일 설정 권장
   - 의심스러운 활동 시 즉시 재생성

3. **시크릿 관리**:
   - 시크릿 값은 GitHub에서만 확인 가능
   - 로그에 시크릿 값이 출력되지 않도록 주의
   - 팀원과 시크릿 공유 시 안전한 방법 사용

## 🧪 테스트

시크릿 설정 후 GitHub Actions를 수동으로 실행하여 테스트:

1. Actions 탭 → "Automated Blog Generation" 
2. "Run workflow" 클릭
3. 로그에서 JWT 관련 오류가 없는지 확인

## 🚨 문제 해결

### JWT_SECRET 관련 오류
```
Error: Missing required JWT_SECRET environment variable
```
→ `JWT_SECRET` 시크릿이 설정되지 않았거나 이름이 틀림

### GitHub API 인증 오류  
```
GitHub API error: 401 Unauthorized
```
→ `GITHUB_TOKEN`이 잘못되었거나 권한 부족

### 레포지토리 접근 오류
```
GitHub API error: 404 Not Found  
```
→ `GITHUB_OWNER` 또는 `GITHUB_REPO` 값이 틀림