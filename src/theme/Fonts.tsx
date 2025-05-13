import { css, Global } from '@emotion/react';

const fontFaces = css`
  /* 프리텐다드 */
  @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  /* 산토끼 */
  @font-face {
    font-family: 'SanTokki';
    src: url('/assets/fonts/HSSanTokki2-Regular.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  /* 페이퍼로지 */
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-1Thin.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-2ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-3Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-4Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-5Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-6SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-7Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-8ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy/Paperlogy-9Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
  }
`;

const Fonts = () => (
  <Global
    styles={`
      ${fontFaces.styles}
    `}
  />
);

export default Fonts;
