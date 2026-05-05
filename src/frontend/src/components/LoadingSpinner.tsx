interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  fullPage?: boolean;
}

const sizeMap = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  label,
  fullPage,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-primary/20 border-t-primary animate-spin`}
        role="status"
        aria-label={label ?? "Loading…"}
      />
      {label && (
        <p className="text-sm text-muted-foreground font-body">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="flex flex-1 items-center justify-center min-h-[40vh]"
        data-ocid="loading_state"
      >
        {spinner}
      </div>
    );
  }

  return <div data-ocid="loading_state">{spinner}</div>;
}
