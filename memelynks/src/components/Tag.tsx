import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={twMerge(
                "items-center inline-flex border border-[#ffce7b] gap-2 text-[#ffce7b] px-3 py-1 rounded-full uppercase",
                className
            )}
            {...otherProps}
        >
            <span>&#10038;</span>
            <span className="text-sm">{children}</span>
        </div>
    );
}
