import { ChevronDown } from "lucide-react";

type PropTypes<T> = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  data: T[];
  getLabel: (item: T) => string;
  getValue: (item: T) => string | number;
};

const Select = <T,>(props: PropTypes<T>) => {
  const { name, label, placeholder, data, getLabel, getValue, disabled } = props;

  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      {label}
      <div className="relative">
        <select
          name={name}
          id={name}
          defaultValue="default"
          className="appearance-none cursor-pointer w-full peer"
          disabled={disabled}
        >
          <option disabled value="default">
            {placeholder}
          </option>
          {data?.length
            ? data.map((item) => (
                <option key={getValue(item)} value={getValue(item)}>
                  {getLabel(item)}
                </option>
              ))
            : null}
        </select>
        <ChevronDown
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 peer-focus:rotate-180 transition-transform"
        />
      </div>
    </label>
  );
};

export default Select;
