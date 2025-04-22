import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const CustomSelectField = ({
  control,
  name,
  label,
  optionsArray = [],
  placeholder = "Select an option",
  rules = { required: true },
  onChange,
  value = "",
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value);

  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="text-primary">{label}</FormLabel>
            <FormControl>
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onChange) onChange(value);
                }}
                disabled={disabled}
              >
                {/* <LabelInputContainer> */}
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                {/* </LabelInputContainer> */}
                <SelectContent>
                  {optionsArray?.map(
                    ({ value, label, disabled = false }, index) => (
                      <SelectItem key={index} value={value} disabled={disabled}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />
    );
  } else {
    return (
      <div>
        <label className="block font-medium text-primary text-sm">
          {label}
        </label>
        <Select
          value={localValue}
          onValueChange={(value) => {
            setLocalValue(value);
            if (onChange) {
              onChange(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {optionsArray?.map(({ value, label, disabled = false }, index) => (
              <SelectItem key={index} value={value} disabled={disabled}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

export default CustomSelectField;

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
