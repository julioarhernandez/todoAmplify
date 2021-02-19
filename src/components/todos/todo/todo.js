import React, {useState} from 'react';
import {TodoStyled} from "./todo_style";

const TodoComponent = ({setModalView, children}) => {
    const [opened, setOpened] = useState(false);

    const toggleOpen = () => {
        setOpened(() => !opened);
    };
    return (
        <TodoStyled open={opened}>
            <div className="TodoStyled_header"
                 onClick={() => toggleOpen()}>
                <h1>title</h1>
            </div>
            <div className="TodoStyled_content">
                <div>
                    {children}
                </div>
                <footer>
                    <a href="#" onClick={() => setModalView('edit')} className="GlobalStyled_link">Edit</a>
                </footer>
            </div>
        </TodoStyled>
    );
};

export default TodoComponent;