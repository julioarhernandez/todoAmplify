import React from 'react';
import classNames from 'classnames';

const Modal = ({classType, children}) => {
    return (
        <div className={classNames('GlobalStyled_modal', classType)}>
            {children}
        </div>
    );
};

export default Modal;