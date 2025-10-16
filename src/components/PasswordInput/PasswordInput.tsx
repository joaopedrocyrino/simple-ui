import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { DynamicIcon } from "lucide-react/dynamic";

import styles from "./PasswordInput.module.css";

export interface PasswordInputHandle {
  getValue: () => string;
  clear: () => void;
}

export interface PasswordInputProps {
  defaultValue?: string;
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

export const PasswordInput = forwardRef<
  PasswordInputHandle,
  PasswordInputProps
>(({ defaultValue = "", label, disabled, variant }, ref) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    clear: () => {
      setValue("");
      setHidePassword(true);
    },
  }));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      setValue(newVal);
    },
    [setValue]
  );

  const toggleVisibility = useCallback(() => {
    setHidePassword((v) => !v);
  }, [setHidePassword]);

  return (
    <div>
      <div
        className={`${styles.inputContainer}${variant ? ` ${styles[variant]}` : ""}`}
      >
        <div className={styles.icon}>
          <DynamicIcon size="2rem" name="lock-keyhole" />
        </div>
        <input
          type={hidePassword ? "password" : "text"}
          placeholder={label}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className={styles.eye} onClick={toggleVisibility}>
          <DynamicIcon size="2rem" name={hidePassword ? "eye" : "eye-off"} />
        </div>
      </div>
    </div>
  );
});

export default PasswordInput;
