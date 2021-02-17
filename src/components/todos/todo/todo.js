import React, {useState} from 'react';
import {TodoStyled} from "./todo_style";

const Todo = ({children}) => {
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
                    Edit
                </footer>
            </div>
        </TodoStyled>
    );
};

export default Todo;