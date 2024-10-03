import { CheckIcon } from "lucide-react";
import { CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export const CopyButton: React.FC<{
  content: string;
  className?: string;
  notifyText?: string;
}> = ({ content, className, notifyText }) => {
  const [copied, setCopied] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.navigator.clipboard.writeText(content);
      if (notifyText) {
        toast.success("Copied!", {
          description: <p className="text-xs">{notifyText}</p>,
        });
      }
      setCopied(true);
      if (copied) return;
      timeoutId.current = setTimeout(() => {
        setCopied(false);
      }, 1000);
    },
    [content, copied, notifyText]
  );

  // clean up tiemout
  useEffect(
    () => () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    },
    []
  );

  return (
    <div
      onClick={handleCopy}
      className={twMerge("h-4 w-4 cursor-pointer", className)}
    >
      {copied ? (
        <CheckIcon className="h-full w-full text-success" />
      ) : (
        <CopyIcon className="h-full w-full text-action-tertiary hover:text-action-tertiary-hover" />
      )}
    </div>
  );
};
