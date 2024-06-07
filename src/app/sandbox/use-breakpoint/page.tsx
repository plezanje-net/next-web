"use client";

import useBreakpoint from "@/hooks/useBreakpoint";

function UseBreakpointPage() {
  const breakpoint = useBreakpoint();

  return (
    <div className="text-center mt-8">
      Currently active breakpoint is:{" "}
      <span className="font-medium">{breakpoint}</span>
    </div>
  );
}

export default UseBreakpointPage;
