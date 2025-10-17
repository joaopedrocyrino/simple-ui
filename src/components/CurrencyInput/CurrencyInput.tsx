import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import styles from "./CurrencyInput.module.css";

export interface CurrencyInputHandle {
  getValue: () => number;
  clear: () => void;
}

export interface CurrencyInputProps {
  currency: "real" | "euro" | "dollar";
  defaultValue?: number;
  label?: string;
  disabled?: boolean;
  variant?:
    | "floating"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "green"
    | "teal"
    | "cyan"
    | "blue"
    | "indigo"
    | "purple";
}

const localeObj = {
  dollar: ["en-US", "USD"],
  euro: ["de-DE", "EUR"],
  real: ["pt-BR", "BRL"],
};

export const CurrencyInput = forwardRef<
  CurrencyInputHandle,
  CurrencyInputProps
>(({ defaultValue = 0, label, disabled, variant, currency }, ref) => {
  const format = useCallback(
    (val: number) =>
      new Intl.NumberFormat(localeObj[currency][0], {
        style: "currency",
        currency: localeObj[currency][1],
        minimumFractionDigits: 2,
      }).format(val),
    [currency]
  );

  const [value, setValue] = useState<number>(defaultValue);
  const [displayValue, setDisplayValue] = useState<string>(
    format(defaultValue)
  );

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    clear: () => {
      setValue(0);
      setDisplayValue(format(0));
    },
  }));

  const parseCentsFirst = useCallback((input: string) => {
    const digits = input.replace(/\D/g, "");
    if (!digits) return 0;
    const len = digits.length;
    const integer = digits.slice(0, len - 2) || "0";
    const decimals = digits.slice(len - 2);
    return parseFloat(`${integer}.${decimals}`);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      const centsFirst = parseCentsFirst(newVal);

      setDisplayValue(format(centsFirst));
      setValue(centsFirst);
    },
    [setValue, setDisplayValue]
  );

  return (
      <div
        className={`${styles.inputContainer}${variant ? ` ${styles[variant]}` : ""}`}
      >
        <input
          placeholder={" "}
          onChange={handleChange}
          disabled={disabled}
          value={displayValue}
          inputMode={"decimal"}
          id={`currencyInput-${currency}`}
        />
        <label htmlFor={`currencyInput-${currency}`}>{label}</label>
      </div>
  );
});

export default CurrencyInput;
