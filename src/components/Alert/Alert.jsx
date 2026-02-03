import React from "react";

import './Alert.scss';

const Alert = ({ alertText }) => {

    return (
        <div className="alert">
            {alertText}
        </div>
    )
}

export default Alert;