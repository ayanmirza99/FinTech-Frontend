"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";

export function CopyButton({
  text,
  displayText,
  className,
  variant = "default",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Text copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy text");
    }
  };

  if (variant === "card") {
    return (
      <Card
        className={cn(
          "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg p-4",
          className
        )}
        onClick={handleCopy}
      >
        <div className="flex items-center justify-between">
          <p className="font-medium">{displayText || text}</p>
          <span
            className={cn(
              "transition-all duration-300",
              copied ? "text-green-500" : "text-muted-foreground"
            )}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </span>
        </div>
        <div
          className={cn(
            "absolute inset-0 bg-primary/5 transform transition-transform duration-300 ease-in-out",
            copied ? "translate-y-0" : "translate-y-full"
          )}
        />
      </Card>
    );
  }

  if (variant === "gradient") {
    return (
      <Button
        className={cn(
          "relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300",
          className
        )}
        onClick={handleCopy}
      >
        <span
          className={cn(
            "flex items-center gap-2 transition-opacity duration-300",
            copied ? "opacity-0" : "opacity-100"
          )}
        >
          <Copy className="h-4 w-4" />
          {displayText || text}
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300",
            copied ? "opacity-100" : "opacity-0"
          )}
        >
          <Check className="h-4 w-4" />
          Copied!
        </span>
      </Button>
    );
  }

  if (variant === "outline") {
    return (
      <Button
        variant="outline"
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          copied ? "border-green-500 text-green-500" : "",
          className
        )}
        onClick={handleCopy}
      >
        <span
          className={cn(
            "flex items-center gap-2 transition-all duration-300 group-hover:scale-105",
            copied ? "opacity-0" : "opacity-100"
          )}
        >
          <Copy className="h-4 w-4" />
          {displayText || text}
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300",
            copied ? "opacity-100" : "opacity-0"
          )}
        >
          <Check className="h-4 w-4" />
          Copied!
        </span>
      </Button>
    );
  }

  // Default variant
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      onClick={handleCopy}
    >
      <span
        className={cn(
          "flex items-center gap-2 transition-transform duration-300",
          copied ? "translate-y-[-100%]" : "translate-y-0"
        )}
      >
        <Copy className="h-4 w-4" />
        {displayText || text}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300",
          copied ? "translate-y-0" : "translate-y-[100%]"
        )}
      >
        <Check className="h-4 w-4" />
        Copied!
      </span>
    </Button>
  );
}
