# 바공 워터마크 에디터

청남교회 청년부 인스타그램 게시글 워터마크 편집툴

## 소개

이 프로젝트는 청남교회 청년부(바공)의 인스타그램 게시물을 위한 워터마크 에디터입니다. 이미지에 워터마크를 추가하고, 썸네일 이미지에 제목과 부제목을 삽입할 수 있습니다.

## 주요 기능

- 여러 이미지 일괄 업로드 및 처리
- 이미지 크롭 기능으로 비율 조정 (4:5 인스타그램 최적화)
- 워터마크 자동 적용
- 썸네일 이미지에 제목 및 부제목 추가
- 가이드라인 표시 기능
- 처리된 모든 이미지 ZIP 파일로 다운로드

## 기술 스택

- React
- TypeScript
- Vite
- Chakra UI
- react-easy-crop: 이미지 크롭 기능
- JSZip: 이미지 일괄 다운로드

## 로컬 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/watermark-editor.git
cd watermark-editor

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

## GitHub Pages 배포 방법

이 프로젝트는 GitHub Pages에 쉽게 배포할 수 있도록 설정되어 있습니다.

1. `package.json`의 `homepage` 필드를 자신의 GitHub 레포지토리 URL로 수정합니다.

   ```json
   "homepage": "https://github-username.github.io/watermark-editor"
   ```

2. 아래 명령어로 GitHub Pages에 배포합니다.

   ```bash
   npm run deploy
   # 또는
   yarn deploy
   ```

3. GitHub 레포지토리 설정에서 Pages 섹션의 Source를 `gh-pages` 브랜치로 설정합니다.

## 사용 방법

1. 썸네일 이미지 추가 후 제목과 부제목 입력
2. 이미지 추가 버튼을 눌러 워터마크를 적용할 이미지 업로드
3. 필요시 각 이미지 크롭 기능으로 비율 조정
4. '전체 다운로드' 버튼을 눌러 처리된 이미지 다운로드

## 라이센스

© 청남교회 청년부
