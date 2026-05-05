import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  onRetry,
  compact,
}: ErrorMessageProps) {
  if (compact) {
    return (
      <div
        className="flex items-center gap-2 text-destructive text-sm px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20"
        data-ocid="error_state"
      >
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-4 py-12 px-6 text-center"
      data-ocid="error_state"
    >
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
