import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

type TUseClientRenderToString = (
  input: React.ReactElement | React.ReactElement[],
  deps?: any[]
) => string[];

const clientRenderToString = (element: React.ReactElement): Promise<string> =>
  new Promise((resolve) => {
    const container = document.createElement("div");
    const renderCallback = () => {
      resolve(container.firstElementChild?.innerHTML || "");
    };

    createRoot(container).render(<div ref={renderCallback}>{element}</div>);
  });

export const useClientRenderToString: TUseClientRenderToString = (
  input,
  deps = []
) => {
  const [htmlStringList, setHtmlStringList] = useState<string[]>([]);
  const elementList = Array.isArray(input) ? input : [input];

  useEffect(() => {
    (async () => {
      const markupPromises = elementList.map(clientRenderToString);
      const markup: string[] = await Promise.all(markupPromises);

      if (!setHtmlStringList) {
        return;
      }

      setHtmlStringList(markup);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return htmlStringList;
};
