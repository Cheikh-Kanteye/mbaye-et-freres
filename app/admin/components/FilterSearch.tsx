import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FilterSearch = <T,>(props: InputProps) => {
  return (
    <div className={cn("flex flex-1 items-center py-4 gap-1", props.className)}>
      <Input {...props} className="max-w-sm w-full" />
    </div>
  );
};

export default FilterSearch;
