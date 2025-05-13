export const breakpointsNum = {
  xs: 360,
  sm: 380,
  md: 768,
  lg: 1024,
  //   xl: 1280,
};

export const breakpoints = Object.fromEntries(
  Object.entries(breakpointsNum).map(([key, value]) => [key, `${value}px`]),
) as Record<keyof typeof breakpointsNum, string>;
