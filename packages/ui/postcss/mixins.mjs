// @ts-check
import postcssMixins from 'postcss-mixins';

/**
 * @typedef {import('postcss').PluginCreator<{ breakpoints: Record<string, number> }>} PostcssPluginCreator
 */

/** @type {PostcssPluginCreator} */
export default function platformUIMixins(
  /** @type {{ breakpoints: Record<string, number> }} */
  { breakpoints },
) {
  /** @type {Record<string, string | undefined>} */
  const mediaQueries = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    acc[key] = `(min-width: ${value}px)`;
    return acc;
  }, {});

  const supportedBreakpoints = Object.keys(mediaQueries)
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1');

  return {
    ...postcssMixins({
      mixins: {
        // @mixin breakpoint md { ... }            // scoped to current selector (default)
        // @mixin breakpoint md global { ... }     // global (no selector wrapper)
        breakpoint(_, targetBreakpointAndScope) {
          const [breakpointName, scope = 'scoped'] = targetBreakpointAndScope.trim().split(' ');

          const mediaQuery = mediaQueries[breakpointName];

          if (!mediaQuery) {
            throw new Error(
              `"${breakpointName}" is not a valid breakpoint. Supported breakpoints are ${supportedBreakpoints}.`,
            );
          }

          const isGlobal = typeof scope === 'string' && scope.toLowerCase() === 'global';

          return isGlobal
            ? {
                [`@media ${mediaQuery}`]: {
                  '@mixin-content': {},
                },
              }
            : {
                [`@media ${mediaQuery}`]: {
                  '&': {
                    '@mixin-content': {},
                  },
                },
              };
        },
      },
    }),
    postcssPlugin: '@ainativekit/ui/postcss-mixins',
  };
}

platformUIMixins.postcss = true;
