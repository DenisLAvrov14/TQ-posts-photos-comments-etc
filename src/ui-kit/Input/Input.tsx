import React from "react";
import styles from "./styles.module.css";
import cx from 'classnames'

type Props = {
    label: string;
    error: string;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export const Input: React.FC<Props> = ({ label, error, className, ...rest }) => (
    <div className={cx(styles.container, className)}>
        <label>
            <p>{label}</p>
            <input {...rest} className={styles.input} />
        </label>
        {/* <p>{error}</p> */}
    </div>
);

export default Input;
