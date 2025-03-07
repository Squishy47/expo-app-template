import * as React from "react";
import { $NOW, useTimescape } from "timescape/react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export function DatePicker({ onChange, label }: { onChange: (date: Date | undefined) => void; label?: string }) {
    const { getRootProps, getInputProps } = useTimescape({
        date: undefined,
        minDate: $NOW,
        maxDate: undefined,
        hour12: false,
        digits: "2-digit",
        wrapAround: false,
        snapToStep: false,
        onChangeDate: (data) => onChange(data),
    });

    return (
        <div className="timescape flex flex-col justify-center" {...getRootProps()}>
            <Label className="text-xl mb-2">{label ?? "Date"}</Label>

            <div className="h-11 min-w-48 justify-center flex-col flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex justify-center">
                    <Input placeholder="dd" {...getInputProps("days")} className="min-w-10 text-center p-0 border-0" />
                    <span className="m-2">/</span>
                    <Input placeholder="mm" {...getInputProps("months")} className="min-w-10 text-center p-0 border-0" />
                    <span className="m-2">/</span>
                    <Input placeholder="yyyy" {...getInputProps("years")} className="min-w-16 text-center p-0 border-0" />
                </div>
            </div>
        </div>
    );
}

export function TimePicker({ onChange, label }: { onChange: (date: Date | undefined) => void; label?: string }) {
    const { getRootProps, getInputProps } = useTimescape({
        date: undefined,
        hour12: false,
        digits: "2-digit",
        wrapAround: false,
        snapToStep: false,
        onChangeDate: (data) => {
            data?.setSeconds(0);
            onChange(data);
        },
    });

    return (
        <div className="timescape flex flex-col justify-center" {...getRootProps()}>
            <Label className="text-xl mb-2">{label ?? "Time"}</Label>

            <div className="h-11 min-w-48 justify-center flex-col flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex justify-center">
                    <Input placeholder="hh" {...getInputProps("hours")} className="min-w-10 text-center p-0 border-0" />
                    <span className="m-2">:</span>
                    <Input placeholder="mm" {...getInputProps("minutes")} className="min-w-10 text-center p-0 border-0" />
                </div>
            </div>
        </div>
    );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:underline focus-visible:text-primary focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";
