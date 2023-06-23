import React from 'react';

export const ItemHeader = ({name}) => {

    return (
        <>
        <div>
            <h4 className="mb-0">{name}</h4>
        </div>
        </>
    )
}

export default ItemHeader;