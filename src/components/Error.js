import React from 'react';

const Error = ({title, description}) => {
    return (
        <div className="Error">
            <h1>{title}</h1>
            <div>{description}</div>
        </div>
    );
}

export default Error;