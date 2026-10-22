type PageTitleProps = {
  children: React.ReactNode;
  description?: string;
};

export default function PageTitle({ children, description }: PageTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="text-[30px] font-bold leading-[1.2] text-[var(--text)]">
        {children}
      </h1>
      {description && (
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">{description}</p>
      )}
    </div>
  );
}
