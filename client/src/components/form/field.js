import React from 'react';
import styles from './field.module.css';

export const Field = (props) => {
    return (
        <div className={styles.fieldContent} style={{order: props.order}}>
        {
            props.type === 'select'
            ? (
                <select
                    data-testid="select"
                    onChange={props.onChangeInput} 
                    name={props.name} 
                    defaultValue={props.defaultValue}>
                    {
                        props.options.map(option => {
                            return (
                                <option  
                                    key={option.key} 
                                    value={JSON.stringify(option.value)}
                                >
                                {option.displayName}
                            </option>
                            )
                        })
                    }
                </select>
            )
            : (<input
                type={props.type} 
                value={props.defaultValue} 
                onChange={props.onChangeInput} 
                name={props.name} 
                data-testid={`input-${props.name}`}
                />)  
        }
        </div>
    )
};