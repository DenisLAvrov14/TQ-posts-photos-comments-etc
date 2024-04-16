import React from 'react';
import styles from './Submit.module.css';
import cx from 'classnames'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Submit: React.FC<Props> = ({ className, ...rest }) => {
    return (
        <input
            type="submit"
            value="Submit"
            {...rest}
            className={cx(styles.submit, className)}
        />
    );
};

export default Submit;
