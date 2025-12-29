# GitHub 푸시 가이드

## 현재 상태
- ✅ Git 저장소 초기화 완료
- ✅ 원격 저장소 추가 완료
- ✅ 코드 커밋 완료
- ❌ GitHub 인증 필요

## 해결 방법

### 방법 1: Personal Access Token 사용 (권장)

1. **GitHub Personal Access Token 생성**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)" 클릭
   - Note: "Todo app push" 등으로 설명 추가
   - Expiration: 원하는 만료일 설정 (또는 No expiration)
   - Scopes: `repo` 체크 (모든 항목 체크)
   - "Generate token" 클릭
   - **토큰을 복사해두세요! (한 번만 보여줍니다)**

2. **원격 저장소 URL에 토큰 포함하여 푸시**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/melodystyle0327-beep/todo.git
   git push -u origin main
   ```
   
   또는 직접 명령어에 토큰 포함:
   ```bash
   git push https://YOUR_TOKEN@github.com/melodystyle0327-beep/todo.git main
   ```

### 방법 2: GitHub Desktop 사용
- GitHub Desktop 앱을 사용하면 자동으로 인증 처리됩니다

### 방법 3: SSH 키 사용

1. **SSH 키 생성** (이미 있다면 생략)
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **SSH 키를 GitHub에 등록**
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 공개 키 내용 복사 후 등록

3. **원격 저장소 URL을 SSH로 변경**
   ```bash
   git remote set-url origin git@github.com:melodystyle0327-beep/todo.git
   git push -u origin main
   ```

### 방법 4: GitHub CLI 사용
```bash
gh auth login
git push -u origin main
```

## 현재 커밋된 파일 목록

- `.gitignore` (환경 변수, node_modules 제외)
- `index.js` (서버 진입점)
- `package.json` (의존성 관리)
- `models/Todo.js` (MongoDB 스키마)
- `routes/todos.js` (API 라우터)
- `public/index.html` (프론트엔드)
- `public/admin.html` (관리자 페이지)
- `check-todos.js` (데이터 확인 스크립트)
- `README.md`, `MONGODB_ATLAS_SETUP.md` 등 문서 파일

**주의**: `.env` 파일은 `.gitignore`에 포함되어 있어 커밋되지 않습니다. (보안상 올바른 설정입니다)

