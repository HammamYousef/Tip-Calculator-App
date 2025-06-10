interface TipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tip = ({ label, isSelected, onClick }: TipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        isSelected ? "bg-green-400 text-green-900" : "bg-green-900 text-white"
      } w-full py-2 rounded-sm text-[24px] cursor-pointer hover:bg-green-400 hover:text-green-900 transition-colors duration-200`}
    >
      {label}
    </button>
  );
};

export default Tip;
