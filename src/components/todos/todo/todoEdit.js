import React, {useState} from 'react';
import {TodoEditStyled} from "./todo_edit_style";

const TodoEdit = ({newTodoFn}) => {
    const [opened, setOpened] = useState(false);

    const newTodo = () => {
        newTodoFn();
    };
    return (
        <TodoEditStyled open={opened}>
            <div className="TodoEditStyled_header">
                <h1>Edit Todo</h1>
            </div>
            <div className="TodoEditStyled_form">
                <form onSubmit={() => newTodo()}>
                    <div className="TodoEditStyled_form-group">
                        <input name="name" placeholder="Todo Name" className="GlobalStyled-input"/>
                    </div>
                    <div className="TodoEditStyled_form-group">
                        <div className="TodoEditStyled_form-group_item">
                            <select className="GlobalStyled-input">
                                <option>
                                    Once
                                </option>
                                <option>
                                    Every
                                </option>
                            </select>
                        </div>
                        <div className="TodoEditStyled_form-group_item">
                            <input name="freqNumber" type="number" className="GlobalStyled-input" step="1"/>
                        </div>

                    </div>
                    <div className="GlobalStyled_form-group">
                        <div className="GlobalStyled_form-group_item">
                            <button type="submit" className="GlobalStyled-button">Edit Todo</button>
                        </div>
                        <div className="GlobalStyled_form-group_item">
                            <button type="button" className="GlobalStyled-button">Delete Todo</button>
                        </div>
                    </div>
                </form>

            </div>
        </TodoEditStyled>
    );
};

export default TodoEdit;