function SandboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-neutral-100">
        <div className="mx-auto px-4 2xl:container xs:px-8">
          <div className="pt-4">
            <h1 className="pb-8 pt-12 text-3xl">Component showcase</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto 2xl:container">{children}</div>
    </>
  );
}

export default SandboxLayout;
