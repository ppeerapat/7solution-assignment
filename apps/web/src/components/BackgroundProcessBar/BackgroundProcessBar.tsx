import { useEffect, useRef } from "react";
import cx from "classnames";

interface BackgroundProgressBarProps {
  className?: string;
  duration?: number;
}

export default function BackgroundProgressBar({
  className = "bg-primary duration-[5s]",
}: BackgroundProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current!.style.width = "100%";
    }, 0);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 top-0 right-0 w-full h-full z-[-1]">
      <div
        className={cx("h-full w-0 transition-[width] ease-linear", className)}
        ref={ref}
      />
    </div>
  );
}
