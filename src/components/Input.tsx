interface InputProps {
  value?: number | "";
  className?: string;
  iconSrc?: string;
  placeholder?: string;
  integerOnly?: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  className,
  iconSrc,
  placeholder,
  integerOnly = false,
  error,
  onChange,
}: InputProps) => {
  return (
    <div className={`relative ${className}`}>
      {iconSrc && (
        <img
          src={iconSrc}
          alt="Dollar Icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      )}
      <input
        type="number"
        placeholder={placeholder || "0"}
        value={value}
        onChange={onChange}
        onKeyDown={
          integerOnly
            ? (e) => {
                if (e.key === "." || e.key === "," || e.key === "e") {
                  e.preventDefault();
                }
              }
            : undefined
        }
        className={`bg-grey-50 py-2 px-3.5 rounded-lg w-full text-right text-green-900 cursor-pointer caret-green-400 placeholder:text-grey-400 text-[24px] hover:bg-grey-200 focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-400" : "focus:ring-green-400"
        } focus:border-transparent transition-all duration-200`}
      />
    </div>
  );
};

export default Input;
