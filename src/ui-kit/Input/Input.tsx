// Input.tsx
import React from "react";
import styles from "./styles.module.css";
import cx from 'classnames'

type Props = {
    label?: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { label, error, className, ...rest } = props;

    return (
        <div className={cx(styles.container, className)}>
            <label>
                <p>{label}</p>
                <input {...rest} ref={ref} className={styles.input} />
            </label>
        </div>
    );
});

export default Input;
