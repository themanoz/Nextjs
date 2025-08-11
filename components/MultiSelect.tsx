"use client";

import * as React from "react";
import { XIcon, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LabelOption } from "@/types/types";


interface MultiLabelSelectProps {
  options: LabelOption[];
  value: LabelOption[];
  onChange: (labels: LabelOption[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiLabelSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select labels...",
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addLabelFromInput = () => {
    const match = options.find(
      (o) => o.label.toLowerCase() === inputValue.toLowerCase()
    );
    if (match && !value.some(v => v.value === match.value)) {
      onChange([...value, match]);
    } else if (inputValue.trim() && !value.some(v => v.label.toLowerCase() === inputValue.toLowerCase())) {
      const custom = {
        value: inputValue.toLowerCase().replace(/\s+/g, "-"),
        label: inputValue.trim(),
        colorClass: "bg-gray-100 text-gray-800 border-gray-200"
      };
      onChange([...value, custom]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addLabelFromInput();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeLabel = (opt: LabelOption) => {
    onChange(value.filter((l) => l.value !== opt.value));
  };

  const addOption = (option: LabelOption) => {
    if (!value.some(v => v.value === option.value)) {
      onChange([...value, option]);
    }
    setOpen(false);
  };

  const availableOptions = options.filter(
    option => !value.some(v => v.value === option.value)
  );

  return (
    <div className="space-y-2">
      {/* Selected Labels Display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
          {value.map((label) => (
            <Badge
              key={label.value}
              variant="secondary"
              className={cn(
                "flex items-center gap-1 text-xs px-2 py-1 border",
                label.colorClass
              )}
            >
              <span className="truncate max-w-24">{label.label}</span>
              <XIcon
                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                onClick={() => removeLabel(label)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={value.length === 0 ? placeholder : "Add more labels..."}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          
          {inputValue.trim() && (
            <Button
              type="button"
              size="sm"
              onClick={addLabelFromInput}
              className="px-3 py-2 text-xs"
            >
              Add
            </Button>
          )}
        </div>

        {/* Predefined Options Dropdown */}
        {availableOptions.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs h-8"
              >
                <span>Choose from predefined labels</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[620px] p-0 popover-content-width">
              <Command>
                <CommandInput placeholder="Search labels..." className="h-8 text-xs" />
                <CommandList>
                  <CommandEmpty>No labels found.</CommandEmpty>
                  <CommandGroup>
                    {availableOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => addOption(option)}
                        className="cursor-pointer text-xs"
                      >
                        <Badge
                          variant="secondary"
                          className={cn("text-xs mr-2", option.colorClass)}
                        >
                          {option.label}
                        </Badge>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};