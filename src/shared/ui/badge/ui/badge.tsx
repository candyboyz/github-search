import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <div
      className={`text-[13px] leading-[18px] tracking-[0.16px] h-[24px] px-1.5 bg-black/[0.08] rounded-full flex items-center justify-center ${className}`}
      {...props}>
      {children}
    </div>
  );
};
