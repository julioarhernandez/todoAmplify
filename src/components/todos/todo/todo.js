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

    const differenceBetweenTodayAndDate = (date) => {
        return differenceInDays(parseISO(date), parseISO(format(new Date(), "yyyy-MM-dd")));
    };

    const daySuffix = (day) => {
          return ((day > 1) ? ' days' : ' day');
    };

    const nextDate = ({date, date_freq}) => {
        // console.log(parseISO(format(new Date(), "yyyy-MM-dd")));
        let days = differenceBetweenTodayAndDate(date);
        if (days > 0) {
            days = '- Next on ' + days + daySuffix(days);
        }else{
            let overdueDays = overdueAmount(days, date_freq);
            days = '- Overdue (' + overdueDays + ')';
        }
        return days;
    };

    const overdue = ({date}) => {
        // if todos date is greater than today it means the todo is overdue
        // console.log('its ', differenceBetweenTodayAndDate(date), date);
        return (differenceBetweenTodayAndDate(date) <= 0);
    };

    const overdueAmount = (days, freq) => {
        const difference = (days === 0) ? 0 : Math.abs(days + freq);
        return ((difference == 0) ? "Today" : `${difference} ${daySuffix(difference)}`);
    };

    return (
        <TodoStyled done={todo.status === 'done'} overdue={overdue(todo)}>
            <div className="TodoStyled_header"
                 onClick={() => toggleOpen()}>
                <h1 className={classNames({done: todo.status !== 'active' })}>{todo.name}</h1>
                <div className="TodoStyled_header-date">
                    <span><img src={dateIcon} /> </span> <span>{todo.date_freq ? `Every ${todo.date_freq} days` : "Once"}</span>{todo.date_freq > 0 && <span> {nextDate(todo)}</span>}

                </div>
            </div>
            <div className={classNames("TodoStyled_content GlobalStyled_collapse", {show: opened})}>
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