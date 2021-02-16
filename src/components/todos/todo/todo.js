import React from 'react';
import {todoStyled} from "./todo_style";

const Todo = ({children}) => {
    return (
        <todoStyled>
            <h1>title</h1>
            <div>
                {children}
            </div>
            <footer>
                close
            </footer>
        </todoStyled>
    );
};

export default Todo;