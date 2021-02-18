import React, {useState} from 'react';
import {TodoNewStyled} from "./todo_new_style";

const TodoNew = ({newTodoFn}) => {
    const [opened, setOpened] = useState(false);

    const newTodo = () => {
        newTodoFn();
    };
    return (
        <TodoNewStyled open={opened}>
            <div className="TodoNewStyled_header">
                <h1>New Todo</h1>
            </div>
            <div className="TodoNewStyled_form">
                <form onSubmit={() => newTodo()}>
                    <div className="TodoNewStyled_form-group">
                        <input name="name" placeholder="Todo Name" className="GlobalStyled-input"/>
                    </div>
                    <div className="TodoNewStyled_form-group">
                        <div className="TodoNewStyled_form-group_item">
                            <select className="GlobalStyled-input">
                                <option>
                                    Once
                                </option>
                                <option>
                                    Every
                                </option>
                            </select>
                        </div>
                        <div className="TodoNewStyled_form-group_item">
                            <input name="freqNumber" type="number" className="GlobalStyled-input" step="1"/>
                        </div>

                    </div>
                    <div className="TodoNewStyled_form-group">
                        <button type="submit" className="GlobalStyled-button">Add Todo</button>
                    </div>
                </form>

            </div>
        </TodoNewStyled>
    );
};

export default TodoNew;