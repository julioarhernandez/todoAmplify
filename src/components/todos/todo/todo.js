import React, {useState, useEffect} from 'react';
import {TodoStyled} from "./todo_style";
import {Item} from "../../items/item";
import ItemNew from "../../items/item/itemNew";

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

    useEffect(() => {
        console.log('todo que', todo);
        //read items
    }, []);

    return (
        <TodoStyled open={opened}>
            <div className="TodoStyled_header"
                 onClick={() => toggleOpen()}>
                <h1>{todo.name}</h1>
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