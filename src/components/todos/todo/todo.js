import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {TodoStyled} from "./todo_style";
import {Item} from "../../items/item";
import ItemNew from "../../items/item/itemNew";
import dateIcon from "../../../images/calendar.svg";
import {format, differenceInDays, parseISO} from "date-fns";

const TodoComponent = ({
       setModalView,
       setTodoForEdit,
       inserItemHandler,
        updateItem,
       updatedStatus,
        deleteItem,
        refreshTodos,
       todo
    }) => {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState('');

    const toggleOpen = () => {
        setOpened(() => !opened);
    };

    const editTodoHandlers = (todo) => {
        setTodoForEdit(todo);
        setModalView('edit');
    };

    const insertTodoHandlers = (e) => {
        e.preventDefault();
        inserItemHandler({todoID: todo.id, itemName: formData.newItem});
        setModalView('');
        refreshTodos();
    };

    const nextDate = ({date, date_freq: sum}) => {
        // console.log(parseISO(format(new Date(), "yyyy-MM-dd")));
        let days = differenceInDays(parseISO(date), parseISO(format(new Date(), "yyyy-MM-dd")));
        days += (days > 1) ? ' days' : ' day';
        return days;
    };

    return (
        <TodoStyled open={opened} done={todo.status === 'done'}>
            <div className="TodoStyled_header"
                 onClick={() => toggleOpen()}>
                <h1 className={classNames({done: todo.status !== 'active' })}>{todo.name}</h1>
                <div className="TodoStyled_header-date">
                    <span><img src={dateIcon} /> </span> <span>{todo.date_freq ? `Every ${todo.date_freq} days` : "Once"}</span>{todo.date_freq > 0 && <span> - Next on {nextDate(todo)}</span>}

                </div>
            </div>
            <div className="TodoStyled_content">
                <form onSubmit={(e) => insertTodoHandlers(e)}>
                    {todo && todo.Items_todo.map((itm,i) => (
                        <Item
                            key={`item-${todo.id}-${i}`}
                            item={itm}
                            updatedStatus={updatedStatus}
                            updateItem={updateItem}
                            deleteItem={deleteItem}/>
                    ))}
                    <ItemNew onChange={setFormData}/>
                </form>
                <footer>
                    <a href="#" onClick={() => editTodoHandlers(todo)} className="GlobalStyled_link">Edit</a>
                </footer>
            </div>
        </TodoStyled>
    );
};

export default TodoComponent;