import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import platformUIMixins from './postcss/mixins.mjs';

/**
 * Breakpoint values aligned with OpenAI apps-sdk-ui
 * @see reference/apps-sdk-ui/postcss.config.mjs
 */
const breakpoints = {
  xs: 380,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default {
  plugins: [
    tailwindcss(),
    platformUIMixins({ breakpoints }),
    postcssNested(),
    autoprefixer(),
  ],
};
