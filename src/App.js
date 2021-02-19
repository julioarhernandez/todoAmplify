import React, {useState, useEffect} from 'react';

// Amplify
import {DataStore} from '@aws-amplify/datastore';
import {Todo} from './models';

//Styles
import {AppStyled} from './App_styles';
import {Item} from "./components/items/item";
import {Separator} from "./components/UI/separator";
import ItemNew from "./components/items/item/itemNew";
import TodoNew from "./components/todos/todo/todoNew";
import TodoEdit from "./components/todos/todo/todoEdit";
import {Modal} from "./components/UI/modal";
import {TodoComponent} from "./components/todos/todo";


function App() {

    const [modalView, setModalView] = useState('');
    const [todos, setTodos] = useState();

    useEffect(() => {
        readTodo();
    }, []);


    const newTodo = async () => {
        await DataStore.save(
            new Todo({
                "owner": "Lorem ipsum dolor sit amet",
                "date": "1970-01-01Z",
                "date_changed": "1970-01-01Z",
                "date_freq": 1,
                "shared": true,
                "status": "active",
                "Items_todo": []
            })
        ).then(() => {
            readTodo();
        });
    };

    const readTodo = async () => {
        const models = await DataStore.query(Todo);
        console.log(models);
        setTodos(models);
    };

    const updateTodo = async () => {

    };

    return (
        <AppStyled>
            <TodoComponent setModalView={setModalView}>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <ItemNew/>
            </TodoComponent>
            <TodoComponent setModalView={setModalView}>
                <Item/>
            </TodoComponent>
            <Modal classType={ modalView === 'new' && 'show'} setModalView={setModalView}>
                <TodoNew
                    newTodoFn={newTodo}/>
            </Modal>
            <Modal classType={modalView === 'edit' && 'show'} setModalView={setModalView}>
                <TodoEdit
                    todoData={todos}/>
            </Modal>
            <button type="button" className="AppStyled_add-button" onClick={() => setModalView('new')}>+</button>
        </AppStyled>
    );
}

export default App;
