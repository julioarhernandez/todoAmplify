import React, {useState, useRef} from 'react';
import {TodoNewStyled} from "./todo_new_style";
import classNames from 'classnames';

const TodoNew = ({newTodoFn}) => {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState({name:'', frequency: 'Once', freqNumber: 0, startDate: ''});
    const freqNum = useRef('');

    const newTodo = (e) => {
        e.preventDefault();
        newTodoFn(formData);
    };

    const dataChanged = (e) => {
        let data = {...formData, [e.target.name]: e.target.value};
        if ((e.target.name === 'frequency') && (e.target.value === 'Once')){
            data.freqNumber = 0;
        }
        if ((e.target.name === 'frequency') && (e.target.value === 'Every')) {
            data.freqNumber = freqNum.current.value;
        }
        setFormData(data);
    };



    return (
        <TodoNewStyled open={opened}>
            <div className="TodoNewStyled_header">
                <h1>New Todo</h1>
            </div>
            <div className="TodoNewStyled_form">
                <form onSubmit={newTodo}>
                    <div className="TodoNewStyled_form-group">
                        <input name="name" placeholder="Todo Name" className="GlobalStyled-input" onChange={dataChanged} required="required"/>
                    </div>
                    <div className="TodoNewStyled_form-group">
                        <div className="TodoNewStyled_form-group_item -half">
                            <select className="GlobalStyled-input" name="frequency" onChange={dataChanged}
                                    required="required">
                                <option>
                                    Once
                                </option>
                                <option>
                                    Every
                                </option>
                            </select>
                        </div>
                        <div className={classNames('TodoNewStyled_form-group_item -half', {hide: (formData.frequency === 'Once' || formData.freqNumber === 0)})}>
                            <input name="freqNumber" type="number" className="GlobalStyled-input" step="1"
                                   onChange={dataChanged} ref={freqNum}/>
                        </div>
                    </div>
                    <div className="TodoNewStyled_form-group">
                        <div className="TodoNewStyled_form-group_item -full">
                            <input name="startDate" type="date" className="GlobalStyled-input" onChange={dataChanged} required/>
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