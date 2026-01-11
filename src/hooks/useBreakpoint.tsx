import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useState } from "react";

// Get breakpoints defined in tailwind config and generate appropriate media query strings, ordered from largest to smallest
const fullConfig = resolveConfig(tailwindConfig);

if (!fullConfig.theme?.screens) {
  throw Error("Breakpoints are not defined in the Tailwind configuration.");
}

const breakpoints = Object.entries(fullConfig.theme.screens)
  .sort(
    (a, b) =>
      +(b[1] as string).split("px")[0] - +(a[1] as string).split("px")[0]
  )
  .map(([bpName, bpSize]) => [bpName, `(min-width: ${bpSize})`]);

const getCurrentBreakpoint = () => {
  // Server does not have the matchMedia function
  if (typeof window === "undefined") {
    return "default";
  }
  // Test breakpoints from largest to smallest and claim match when first one matches
  // (assuming all breakpoints are defined via 'min-width' media queries)
  for (let i = 0; i < breakpoints.length; i++) {
    const [breakpointName, breakpointMediaQueryString] = breakpoints[i];
    if (matchMedia(breakpointMediaQueryString).matches) {
      return breakpointName;
    }
  }
  return "default";
};

function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getCurrentBreakpoint()
  );

  const breakpointPassedListener = () => {
    // Current breakpoint has changed (breakpoint was passed), determine the current screen size/breakpoint
    setCurrentBreakpoint(getCurrentBreakpoint());
  };

  useEffect(() => {
    // Add an event listener to each of the media queries defined by breakpoints
    const mediaQueryLists = breakpoints.map(([_, mediaQueryString]) => {
      const mediaQueryList = matchMedia(mediaQueryString);
      mediaQueryList.addEventListener("change", breakpointPassedListener);
      return mediaQueryList;
    });

    return () => {
      mediaQueryLists.forEach((mediaQueryList) =>
        mediaQueryList.removeEventListener("change", breakpointPassedListener)
      );
    };
  }, [currentBreakpoint]);

  return currentBreakpoint;
}

export default useBreakpoint;
