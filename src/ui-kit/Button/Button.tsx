import React from 'react';
import styles from './Button.module.css';
import cx from 'classnames';

type Props = {
    text: string;
    className?: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.FC<Props> = ({ text, className, ...rest }) => {
    return (
        <button className={cx(styles.button, className)} {...rest}>
            {text}
        </button>
    );
};

export default Button;
