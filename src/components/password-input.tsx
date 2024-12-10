import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    value,
    onChange = () => {},
    id,
  }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
  
    const togglePasswordVisibility = (): void => {
      setShowPassword(!showPassword);
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.target.value);
    };
  
    return (
      <div className="flex items-center">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleInputChange}
          placeholder="Enter password"
        />
        <div className="-ml-[25px]" onClick={togglePasswordVisibility}>
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>
    );
  };
  
  export default PasswordInput;