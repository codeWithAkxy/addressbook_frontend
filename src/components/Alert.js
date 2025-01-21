import React from 'react'

const Alert = (props) => {

    const capitalize = (word) => {
        if (word === 'danger'){
            return 'Error'
        }
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '40px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)} : {props.alert.message}</strong>
            </div>}
        </div>
    )
}

export default Alert
