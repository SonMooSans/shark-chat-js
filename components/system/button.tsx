import { ComponentProps, forwardRef } from "react";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Spinner } from "./spinner";

export const button = tv({
    base: [
        "inline-flex select-none items-center justify-center text-start",
        "focus:outline-none focus-visible:ring",
        // Register all radix states
        "group",
        "radix-state-on:bg-light-100 dark:radix-state-on:bg-dark-900",
        "radix-state-instant-open:bg-light-100 radix-state-delayed-open:bg-light-50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    variants: {
        color: {
            primary: [
                "rounded-lg transition-colors shadow-lg shadow-brand-400/50",
                "bg-brand-500 hover:bg-brand-400 dark:bg-brand-400 text-gray-50 dark:hover:bg-brand-500 dark:shadow-none",
                "focus-visible:ring-0",
            ],
            secondary: [
                "rounded-md transition-colors shadow-lg shadow-brand-500/10 bg-white text-gray-700 hover:bg-light-200",
                "dark:bg-dark-800 dark:text-gray-50 dark:hover:bg-dark-700 dark:shadow-none",
                "focus-visible:ring-0",
            ],
            danger: [
                "rounded-md transition-colors",
                "bg-red-500 hover:bg-red-400 dark:bg-red-500 text-gray-50 dark:hover:bg-red-600",
                "focus-visible:ring-0",
            ],
        },
        size: {
            large: "px-6 py-3 text-base font-semibold",
            medium: "px-4 py-2 text-sm font-semibold",
        },
    },
    defaultVariants: {
        color: "secondary",
        size: "medium",
    },
});

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof button> & {
        isLoading?: boolean;
    };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, color, size, isLoading, ...props }, ref) => (
        <button
            ref={ref}
            disabled={isLoading === true}
            {...props}
            className={button({ color, size, className: props.className })}
        >
            {isLoading === true && (
                <div className="mr-2 inline">
                    <Spinner size="small" />
                </div>
            )}
            {children}
        </button>
    )
);

Button.displayName = "Button";

const iconButton = tv({
    base: [
        "inline-flex flex-row items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-500 text-accent-50 p-3",
        "disabled:bg-brand-400/50 disabled:bg-none disabled:cursor-not-allowed disabled:text-accent-50 dark:disabled:text-accent-500",
    ],
});

type IconButtonProps = ComponentProps<"button"> &
    VariantProps<typeof iconButton>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => (
        <button
            {...props}
            ref={ref}
            className={iconButton({ className: props.className })}
        />
    )
);

IconButton.displayName = "IconButton";
