import React, {useRef, useEffect} from 'react';
import classNames from 'classnames';

const Modal = ({classType, setModalView, children}) => {
    const modalRef = useRef();

    const handleClick = e => {
        if (modalRef.current && (modalRef.current == e.target)) {
            setModalView('');
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return (
        <div className={classNames('GlobalStyled_modal', classType)} ref={modalRef}>
            {children}
        </div>
    );
};

export default Modal;