import React, {useState, useEffect} from 'react';

// Amplify
import {DataStore} from '@aws-amplify/datastore';
import {Todo, Items} from './models';

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
    const [todos, setTodos] = useState([]);
    // const [items, setItems] = useState([]);
    const [todoForEdit, setTodoForEdit] = useState('');

    useEffect(() => {
        // Get all todos
        readTodos();
        // get items for active todos only
        // readActiveTodosItems();

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
            readTodos();
        });
    };

    const readTodos = async () => {
        let models = await DataStore.query(Todo);

        // console.log(models);
        const getData = async() => {
            return Promise.all(models.map((model) => {
                return readItemsByTodoId(model);
            }));
        }

        getData().then((data) => {
            console.log(data);
            setTodos(data);
        })

        // setTodos(models);
    };

    const readActiveTodosItems = async () => {
        const models = await DataStore.query(Todo);
        setTodos(models);
    };

    const updateTodo = async () => {

    };

    const newItems = async ({todoID, itemName}) => {
        await DataStore.save(
            new Items({
                "name": itemName,
                "status": "active",
                "status_date_changed": "1970-01-01Z",
                "todoID": todoID
            })
        ).then(() => {
            console.log('inserted');
            // readItems();
        });
    };

    const readItems = async () => {
        const models = await DataStore.query(Items);
        // setTodos(models);
    };

    async function updateItems(data) {
        const original = await DataStore.query(Items, data.id);
        await DataStore.save(
            Items.copyOf(original, updated => {
                updated.name = data.name;
            })
        );
    }

    async function updateItemsStatus(data) {
        const original = await DataStore.query(Items, data.id);
        await DataStore.save(
            Items.copyOf(original, updated => {
                updated.status = (original.status === 'active' ? 'done' : 'active');
            })
        ).then(()=> readTodos());

    }

    async function deleteItem(itemId) {
        const modelToDelete = await DataStore.query(Items, itemId);
        DataStore.delete(modelToDelete);
        readTodos();
    }

    const readItemsByTodoId = async (model) => {
        const items = await DataStore.query(Items, c => c.todoID("eq", model.id));
        return Promise.resolve({ ...model, Items_todo: items});
    };

    return (
        <AppStyled>
            {todos && todos.map((todo, i) => (
                <TodoComponent
                    setModalView={setModalView}
                    setTodoForEdit={setTodoForEdit}
                    todo={todo}
                    updateItem={updateItems}
                    deleteItem={deleteItem}
                    refreshTodos={readTodos}
                    updatedStatus={updateItemsStatus}
                    inserItemHandler={newItems}
                    key={`todos-${i}`} />
            ))}

            <Modal classType={ modalView === 'new' && 'show'} setModalView={setModalView}>
                <TodoNew
                    newTodoFn={newTodo}/>
            </Modal>
            <Modal classType={modalView === 'edit' && 'show'} setModalView={setModalView}>
                <TodoEdit
                    todoData={todoForEdit}
                    editTodoFn={updateTodo}/>
            </Modal>
            <button type="button" className="AppStyled_add-button" onClick={() => setModalView('new')}>+</button>
        </AppStyled>
    );
}

export default App;
