import { createGlobalStyle } from 'styled-components'

// fonts
import KanitThin from './fonts/Kanit/Kanit-Thin.ttf'
import KanitExtraLight from './fonts/Kanit/Kanit-ExtraLight.ttf'
import KanitLight from './fonts/Kanit/Kanit-Light.ttf'
import KanitRegular from './fonts/Kanit/Kanit-Regular.ttf'
import KanitMedium from './fonts/Kanit/Kanit-Medium.ttf'
import KanitSemiBold from './fonts/Kanit/Kanit-SemiBold.ttf'
import KanitBold from './fonts/Kanit/Kanit-Bold.ttf'
import KanitExtraBold from './fonts/Kanit/Kanit-ExtraBold.ttf'
import KanitBlack from './fonts/Kanit/Kanit-Black.ttf'

const Global = createGlobalStyle`
  // declaring fonts
  @font-face { font-family: 'Kanit Thin'; src: url(${KanitThin}); }
  @font-face { font-family: 'Kanit ExtraLight'; src: url(${KanitExtraLight}); }
  @font-face { font-family: 'Kanit Light'; src: url(${KanitLight}); }
  @font-face { font-family: 'Kanit Regular'; src: url(${KanitRegular}); }
  @font-face { font-family: 'Kanit Medium'; src: url(${KanitMedium}); }
  @font-face { font-family: 'Kanit SemiBold'; src: url(${KanitSemiBold}); }
  @font-face { font-family: 'Kanit Bold'; src: url(${KanitBold}); }
  @font-face { font-family: 'Kanit ExtraBold'; src: url(${KanitExtraBold}); }
  @font-face { font-family: 'Kanit Black'; src: url(${KanitBlack}); }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, .3);
      border-radius: 5px;

      &:hover {
        background-color: rgba(0, 0, 0, .5);
      }
    }
  }

  body {
    padding-block-start: 100px;
    font-family: 'Kanit Light';
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    /* overflow: hidden; */
  }

  ol, ul, li { list-style: none; }
  textarea, input, button { outline: none; }
  table, tr, th, td { border-collapse: collapse; }
`

export default Global
