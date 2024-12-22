import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";

const classes = cva("border h-12 rounded-full px-6 font-medium", {
    variants: {
        variant: {
            primary: "bg-[#ffce7b] text-neutral-950 border-[#ffce7b]",
            secondary: "border-white text-white bg-transparent",
        },
        size: {
            sm: "h-10",
        },
    },
});

export default function Button(
    props: {
        variant: "primary" | "secondary";
        size?: "sm";
    } & ButtonHTMLAttributes<HTMLButtonElement>
) {
    const { variant, className, size, ...otherProps } = props;
    return (
        <button
            className={classes({
                variant,
                className,
                size,
            })}
            {...otherProps}
        />
    );
}
