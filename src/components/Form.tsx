import { useState } from "react";
import Input from "./Input";
import Tip from "./Tip";

interface formProps {
    className?: string;
}

const Form = ({className} : formProps) => {
  const [bill, setBill] = useState<number | "">("");
  const [tip, setTip] = useState<number>(0);
  const [customTip, setCustomTip] = useState<number | "">("");
  const [people, setPeople] = useState<number | "">("");
  const [error, setError] = useState({
    billError: "",
    customTipError: "",
    peopleError: "",
  });

  const TIPS = [
    { label: "5%", value: 0.05 },
    { label: "10%", value: 0.1 },
    { label: "15%", value: 0.15 },
    { label: "25%", value: 0.25 },
    { label: "50%", value: 0.5 },
  ];

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : "";
    setBill(value);
    if (typeof value === "number" && value < 0) {
      setError((error) => ({
        ...error,
        billError: "Can't be negative",
      }));
    } else {
      setError((error) => ({
        ...error,
        billError: "",
      }));
    }
  };

  const handleTipChange = (value: number) => {
    if (value === tip) {
      setTip(0);
      setCustomTip("");
    } else {
      setTip(value);
      setCustomTip("");
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : "";
    if (value) setTip(0);
    setCustomTip(value);
    if (typeof value === "number" && value < 0) {
      setError((error) => ({
        ...error,
        customTipError: "Can't be negative",
      }));
    } else {
      setError((error) => ({
        ...error,
        customTipError: "",
      }));
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : "";
    setPeople(value);
    if (value === 0) {
      setError((error) => ({
        ...error,
        peopleError: "Can't be zero",
      }));
    } else if (typeof value === "number" && value < 0) {
      setError((error) => ({
        ...error,
        peopleError: "Can't be negative",
      }));
    } else {
      setError((error) => ({
        ...error,
        peopleError: "",
      }));
    }
  };

  const resetForm = () => {
    setBill("");
    setTip(0);
    setCustomTip("");
    setPeople("");
    setError({
      billError: "",
      customTipError: "",
      peopleError: "",
    });
  };

  const calculateTipAmount = () => {
    if (
      typeof bill === "number" &&
      typeof people === "number" &&
      people > 0 &&
      error.billError === "" &&
      error.customTipError === "" &&
      error.peopleError === ""
    ) {
      const tipValue =
        tip || (typeof customTip === "number" ? customTip / 100 : 0);
      const tipAmount = (bill * tipValue) / people;
      return tipAmount.toFixed(2);
    }
    return "0.00";
  };

  const calculateTotal = () => {
    if (
      typeof bill === "number" &&
      typeof people === "number" &&
      people > 0 &&
      error.billError === "" &&
      error.customTipError === "" &&
      error.peopleError === ""
    ) {
      const tipValue =
        tip || (typeof customTip === "number" ? customTip / 100 : 0);
      const total = (bill + bill * tipValue) / people;
      return total.toFixed(2);
    }
    return "0.00";
  };

  const isResetDisabled =
    bill === "" &&
    tip === 0 &&
    customTip === "" &&
    people === "" &&
    !error.billError &&
    !error.customTipError &&
    !error.peopleError;

  return (
    <form className={`px-8 py-7 bg-white h-screen w-screen rounded-t-2xl flex flex-col justify-between md:flex-row md:max-w-[850px] md:h-auto md:rounded-xl md:shadow-lg md:gap-8 ${className}`}>
      <div className="flex flex-col justify-between flex-[51%] md:gap-8">
        <div>
          <div className="flex justify-between">
            <p className="mb-1">Bill</p>
            {error.billError && (
              <p className="text-red-400 text-sm">{error.billError}</p>
            )}
          </div>
          <Input
            value={bill}
            onChange={handleBillChange}
            iconSrc="icon-dollar.svg"
            error={!!error.billError}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="mb-4">Select Tip %</p>
            {error.customTipError && (
              <p className="text-red-400 text-sm">{error.customTipError}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {TIPS.map((t) => (
              <Tip
                key={t.value}
                label={t.label}
                isSelected={t.value === tip}
                onClick={() => handleTipChange(t.value)}
              />
            ))}
            <Input
              value={customTip}
              onChange={handleCustomTipChange}
              placeholder="Custom"
              error={!!error.customTipError}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="mb-1">Number of People</p>
            {error.peopleError && (
              <p className="text-red-400 text-sm">{error.peopleError}</p>
            )}
          </div>
          <Input
            value={people}
            onChange={handlePeopleChange}
            className="mt-2"
            iconSrc="icon-person.svg"
            integerOnly
            error={!!error.peopleError}
          />
        </div>
      </div>
      <div className="bg-green-900 rounded-xl p-6 flex flex-col align-top gap-6 mt-8 md:mt-0 md:flex-[49%] md:gap-8">
        <div className="amountContainer mt-3">
          <div>
            <p className="text-white">Tip Amount</p>
            <p className="text-xs">/ person</p>
          </div>
          <p>${calculateTipAmount()}</p>
        </div>
        <div className="amountContainer">
          <div>
            <p className="text-white">Total</p>
            <p className="text-xs">/ person</p>
          </div>
          <p>${calculateTotal()}</p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="bg-green-400 text-green-900 uppercase py-2.5 rounded-sm cursor-pointer hover:bg-grey-200 transition-colors duration-200 md:mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isResetDisabled}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
