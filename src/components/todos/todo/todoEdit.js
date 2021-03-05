import React, {useState, useEffect} from 'react';
import {TodoEditStyled} from "./todo_edit_style";
import classNames from "classnames";

const TodoEdit = ({editTodoFn, todoData}) => {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState({name: todoData.name, date: todoData.date, date_freq: todoData.date_freq });

    useEffect(() => {
        setFormData({...todoData, frequency: (todoData.date_freq !== 0) ? "Every" : "Once"});
    }, [todoData]);


    const changeData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const editTodo = (action) => {
        editTodoFn(action, formData);
    };
    return (
        <TodoEditStyled open={opened}>
            <div className="TodoEditStyled_header">
                <h1>Edit Todo</h1>
            </div>
            <div className="TodoEditStyled_form">
                <form onSubmit={(e) => editTodo(e)}>
                    <div className="TodoEditStyled_form-group">
                        <input name="id" type="hidden" value={todoData.id}/>
                        <input name="name" placeholder="Todo Name" className="GlobalStyled-input" value={formData.name} onChange={changeData}/>
                    </div>
                    <div className="TodoEditStyled_form-group">
                        <div className="TodoEditStyled_form-group_item -half">
                            <select className="GlobalStyled-input" name="frequency" onChange={changeData}
                                    required="required" value={formData.frequency || (formData.date_freq ? "Every" : "Once")}>
                                <option value="Once">
                                    Once
                                </option>
                                <option value="Every">
                                    Every
                                </option>
                            </select>
                        </div>
                            <div className={classNames('TodoEditStyled_form-group_item -half', {hide: formData.frequency === 'Once'})}>
                            <input name="date_freq" type="number" className="GlobalStyled-input" step="1"
                                   value={formData.date_freq} onChange={changeData}/>
                        </div>
                    </div>
                    <div className="TodoEditStyled_form-group">
                        <div className="TodoEditStyled_form-group_item -full">
                            <input name="date" type="date" className="GlobalStyled-input" required
                                   value={formData.date} onChange={changeData}/>
                        </div>
                    </div>
                    <div className="GlobalStyled_form-group">
                        <div className="GlobalStyled_form-group_item">
                            <button type="button" className="GlobalStyled-button" name="editTodo" onClick={() => editTodo('edit')}>Save Todo</button>
                        </div>
                        <div className="GlobalStyled_form-group_item">
                            <button type="button" className="GlobalStyled-button danger" name="deleteTodo" onClick={() => editTodo('delete')}>Delete Todo</button>
                        </div>
                    </div>
                </form>

            </div>
        </TodoEditStyled>
    );
};

export default TodoEdit;