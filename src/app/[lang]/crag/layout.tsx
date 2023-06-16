import CragHeader from "../../../components/crag/crag-header";
import Client from "../../../components/client";

function CragLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Client>
        <CragHeader />
      </Client>
      <div>{children}</div>
    </>
  );
}

export default CragLayout;
