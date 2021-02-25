import React, {useState, useEffect} from 'react';
import {TodoStyled} from "./todo_style";
import {Item} from "../../items/item";
import ItemNew from "../../items/item/itemNew";

const TodoComponent = ({
       setModalView,
       setTodoForEdit,
       inserItemHandler,
        refreshTodos,
       todo
    }) => {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState('');

    const toggleOpen = () => {
        setOpened(() => !opened);
    };

    const editTodoHandlers = (todoId) => {
        setTodoForEdit(todoId);
        setModalView('edit');
    };

    const insertTodoHandlers = (e) => {
        e.preventDefault();
        inserItemHandler({todoID: todo.id, itemName: formData.newItem});
        setModalView('');
        refreshTodos();
    };

    useEffect(() => {
        console.log('todo que', todo);
        //read items
    }, []);

    return (
        <TodoStyled open={opened}>
            <div className="TodoStyled_header"
                 onClick={() => toggleOpen()}>
                <h1>title</h1>
            </div>
            <div className="TodoStyled_content">
                <form onSubmit={(e) => insertTodoHandlers(e)}>
                    {todo && todo.Items_todo.map((itm) => (
                        <Item item={itm}/>
                    ))}
                    <ItemNew onChange={setFormData}/>
                </form>
                <footer>
                    <a href="#" onClick={() => editTodoHandlers(todo.id)} className="GlobalStyled_link">Edit</a>
                </footer>
            </div>
        </TodoStyled>
    );
};

export default TodoComponent;