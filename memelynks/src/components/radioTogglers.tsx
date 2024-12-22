import { IconType } from "react-icons";

interface RadioTogglerOption {
  value: string;
  icon: IconType; // React-icons type
  label: string;
}

interface RadioTogglersProps {
  options: RadioTogglerOption[];
  defaultValue: string;
  onChange: (value: string) => void;
}

export default function RadioTogglers({
  options,
  defaultValue,
  onChange,
}: RadioTogglersProps) {
  return (
    <div className="radio-togglers shadow rounded-lg">
      {options.map((option) => (
        <label key={option.value} className="radio-option">
          <input
            type="radio"
            name="bgType"
            onClick={(ev) => onChange(ev.currentTarget.value)}
            defaultChecked={defaultValue === option.value}
            value={option.value}
          />
          <div className="icon-label-wrapper flex items-center gap-2 rounded-md">
            <option.icon size={20} className="" />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
