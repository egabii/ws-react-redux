import React from 'react';
import styles from './field.module.css';

export const Form = (props) => {
    return (
        <form className={styles.fieldContainer}>
            {props.children}
        </form>
    )
}