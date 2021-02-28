import React, {useState, useEffect} from 'react';

// Amplify
import {DataStore} from '@aws-amplify/datastore';
import {Todo, Items} from './models';
import classNames from 'classnames';

//Styles
import {AppStyled} from './App_styles';

import TodoNew from "./components/todos/todo/todoNew";
import TodoEdit from "./components/todos/todo/todoEdit";
import {Modal} from "./components/UI/modal";
import {TodoComponent} from "./components/todos/todo";

import {format, parseISO} from 'date-fns';


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


    const newTodo = ({name, frequency, freqNumber, startDate}) => {
        let startDateTemp = format(parseISO(startDate), "yyyy-MM-dd");
        // console.log(name, startDateTemp, freqNumber);
        insertTodo({name, date: startDateTemp, date_freq: freqNumber});
    };

    const insertTodo = async ({date, date_freq, name}) => {
        await DataStore.save(
            new Todo({
                "owner": "somebody",
                "date": date,
                "date_changed": null,
                "date_freq": parseInt(date_freq) || 0,
                "shared": true,
                "name": name,
                "status": "active",
                "Items_todo": []
            })
        ).then(() => {
            readTodos();
            setModalView('');
        });
    };

    const readItemsByTodoId = async (model) => {
        const items = await DataStore.query(Items, c => c.todoID("eq", model.id));
        return Promise.resolve({...model, Items_todo: items});
    };

    const readTodos = async () => {
        let models = await DataStore.query(Todo);

        console.log('reading todos', models);
        const getData = async() => {
            return Promise.all(models.map((model) => {
                return readItemsByTodoId(model);
            }));
        };

        getData().then((data) => {
            console.log(data);
            // check if any item is active to update the todos status when all are done
            let todoStatusChanged = false;
            data.map( (d) => {
                // If no item within todos is active and the todo is still active
                //  update todo with status done and date changed to today
                if (d.status === 'active' && !(d.Items_todo.some(i => i.status === 'active'))) {
                    todoStatusChanged = true;
                    updateTodoStatus({todoID: d.id, date_changed: "2021-02-27", status: "done"});
                }
                if (d.status === 'done' && d.Items_todo.some(i => i.status === 'active')) {
                    todoStatusChanged = true;
                    updateTodoStatus({todoID: d.id, date_changed: "2021-02-27", status: "active"});
                }
            });
            if (todoStatusChanged){
                console.log('sed to read todo again');
                readTodos();
            }else {
                setTodos(data);
            }
        });

    };

    const readActiveTodosItems = async () => {
        const models = await DataStore.query(Todo);
        setTodos(models);
    };

    const updateTodo = async (action, todoData) => {
        if (action === 'edit'){
            console.log('edit', todoData);
            updateTodoById(todoData).then(() => {
                readTodos();
            });

        }
        if (action === 'delete') {
            console.log('delete', todoData);
            deleteTodo(todoData.id);
        }
        setModalView('');
    };

    async function updateTodoById(data) {
        const original = await DataStore.query(Todo, data.id);
        await DataStore.save(
            Todo.copyOf(original, updated => {
                updated.name = data.name;
                updated.date_freq = parseInt(data.date_freq);
                updated.date = data.date;
            })
        );
    }

    async function updateTodoStatus({todoID, date_changed, status}) {
        const original = await DataStore.query(Todo, todoID);
        await DataStore.save(
            Todo.copyOf(original, updated => {
                updated.date_changed = date_changed;
                updated.status = status;
            })
        );
    }

    async function deleteTodo(itemId) {
        const modelToDelete = await DataStore.query(Todo, itemId);
        DataStore.delete(modelToDelete);
        readTodos();
    }

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
        ).then(()=> {
            readTodos();
        });

    }

    async function deleteItem(itemId) {
        const modelToDelete = await DataStore.query(Items, itemId);
        DataStore.delete(modelToDelete);
        readTodos();
    }

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
