import { useRef, useState, useLayoutEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

export const TruncatedText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.offsetWidth);
      }
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(textRef.current);

    return () => resizeObserver.disconnect();
  }, [text]);

  const span = (
    <span
      ref={textRef}
      className="text-sm truncate max-w-full w-full pl-1 inline-block align-middle cursor-pointer"
    >
      {text}
    </span>
  );

  return isTruncated ? (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{span}</TooltipTrigger>
      <TooltipContent side="top">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  ) : (
    span
  );
};
