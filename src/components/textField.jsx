import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomTextField = ({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  rules = {},
  isPassword = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <LabelInputContainer>
            <Label className="text-primary/90">{label}</Label>
            <FormControl>
              <div className="relative">
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
                {isPassword && (
                  <p
                    className="absolute right-2 top-[0.5rem] text-primary hover:bg-transparent bg-transparent"
                    onClick={handleToggle}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </p>
                )}
              </div>
            </FormControl>
          </LabelInputContainer>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomTextField;

export const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
