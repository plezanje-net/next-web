function SandboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-neutral-100">
        <div className="container mx-auto px-8">
          <div className="pt-4">
            <h1 className="pb-8 pt-12 text-3xl">Component showcase</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto">{children}</div>
    </>
  );
}

export default SandboxLayout;
