import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  register,
  error,
}) => (
  <div className="flex flex-col gap-2">
    <Input id={id} {...register} placeholder={placeholder} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;
