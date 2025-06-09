/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TextSearch } from "lucide-react";

import { cx } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTitle,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Button from "../button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

export interface Props extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {
  options: string[];
}

export const OperationsHeader = ({ options, children, className, ...props }: Props) => {
  const [visibilityState, setVisibilityState] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const initialState: Record<string, boolean> = {};

    options.forEach((option) => {
      const element = document.querySelector(`[data-${option}]`);
      if (element) {
        const isVisible = getComputedStyle(element).display !== "none";
        initialState[option] = isVisible;
      }
    });
    setVisibilityState(initialState);
  }, [options]);

  const toggleVisibility = (operation: string) => {
    const elements = document.querySelectorAll(`[data-${operation}]`);
    const newVisibility = !visibilityState[operation];

    elements.forEach((element) => {
      (element as HTMLElement).style.display = newVisibility ? "" : "none";
    });

    setVisibilityState((prev) => ({
      ...prev,
      [operation]: newVisibility,
    }));
  };

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                intent="ghost"
                size="icon"
                {...props}
                className={cx("h-full grow rounded-none !ring-0 !ring-offset-0", className)}>
                {children ? children : <TextSearch className="size-4 shrink-0" />}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Operações</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuTitle>Operações</DropdownMenuTitle>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={visibilityState[option] || false}
            onCheckedChange={() => toggleVisibility(option)}>
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
