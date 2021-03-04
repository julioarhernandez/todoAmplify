import React, {useState, useEffect} from 'react';

// Amplify
import {DataStore, Predicates, SortDirection} from '@aws-amplify/datastore';
import {Todo, Items} from './models';
import classNames from 'classnames';

//Styles
import {AppStyled} from './App_styles';

import TodoNew from "./components/todos/todo/todoNew";
import TodoEdit from "./components/todos/todo/todoEdit";
import {Modal} from "./components/UI/modal";
import {TodoComponent} from "./components/todos/todo";

import {format, parseISO, add, differenceInDays} from 'date-fns';


function App() {

    const [modalView, setModalView] = useState('');
    const [todos, setTodos] = useState([]);
    // const [items, setItems] = useState([]);
    const [todoForEdit, setTodoForEdit] = useState('');

    useEffect(() => {
        // Get all todos
        readTodos();
    }, []);

    const today = () => {
        return format(new Date(), "yyyy-MM-dd");
    };

    const newTodo = ({name, frequency, freqNumber, startDate}) => {
        let startDateTemp = format(parseISO(startDate), "yyyy-MM-dd");
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

    const setNewDate = ({date, freq}) => {
        const diffDays = differenceInDays(parseISO(today()), parseISO(date));
        const freqChunks = Math.floor(diffDays / freq);
        const addDays = (freqChunks + 1) * freq;
        console.log(`New date passed date: ${parseISO(date)} today: ${parseISO(today())}, diff: ${diffDays}, freqChunks: ${freqChunks}, addDays: ${addDays}` );
        return format(add(parseISO(date), {days: addDays}), "yyyy-MM-dd");
    };

    const setTodoDateEnd = async (d) => {
        let updated = false;
        // check if todo date is less than today and is not done to update
        // next date to show it again
        if (d.date <= today() && d.date_freq && d.status === 'done') {
            updated = true;
            const newDate = setNewDate({date: d.date, freq: d.date_freq});
            console.log('updating todo date changed');
            return updateTodoDate({
                todoID: d.id,
                date: newDate
            }).then(() => {
                return Promise.resolve("reload");
            });
        }
        if (!updated) {
            return Promise.resolve("set");
        }
    };

    const setTodoStatusForItems = async (d) => {
        let updated = false;
        if (d.status === 'active' && d.Items_todo.every(i => i.status === 'done')) {
            updated = true;
            return updateTodoStatus({todoID: d.id, date_changed: format(new Date(), "yyyy-MM-dd"), status: "done"}).then(()=> {
                return Promise.resolve("reload");
            });
            // Search local data and set todo status too
        }
        if (d.status === 'done' && d.Items_todo.some(i => i.status === 'active')) {
            updated = true;
            return updateTodoStatus({todoID: d.id, date_changed: format(new Date(), "yyyy-MM-dd"), status: "active"}).then(() => {
                return Promise.resolve("reload");
            });
            // Search local data and set todo status too
        }
        if (!updated){
            return Promise.resolve("set");
        }
    };

    const changeTodoStatusWhenItemsChanged = async (data) => {
        return Promise.all(data.map((d) => {
            return setTodoStatusForItems(d);
        }));
    };

    const readTodos = async () => {
        console.log('reading-todos -> function');
        //Sort by status and by date (closer dates first)
        let models = await DataStore.query(Todo, Predicates.ALL, {
            sort: s => s.status(SortDirection.ASCENDING).date(SortDirection.ASCENDING)
        });

        console.log(models);

        console.log('reading-todos -> check if needs to change date_changed and status back to active');
        const checkData = async () => {
            return Promise.all(models.map((model) => {
                return setTodoDateEnd(model);
            }));
        };

        checkData().then((data) => {
            if (data.includes('reload')) {
                console.log("reload again");
                readTodos();
            } else {
                console.log('reading-todos -> making api reading request')
                const getData = async () => {
                    return Promise.all(models.map((model) => {
                        return readItemsByTodoId(model);
                    }));
                };

                getData().then((data) => {
                    changeTodoStatusWhenItemsChanged(data).then((d) => {
                        // if return a set in all responses it means that no changes were made to todo status
                        // if return a reload in any of its responses means that we need to readTodo again to
                        // refresh local state fot todos
                        if (d.includes('reload')) {
                            readTodos();
                        } else {
                            setTodos(data);
                        }
                    });
                });
            }
        });
    };

    async function updateTodoById(data) {
        const original = await DataStore.query(Todo, data.id);
        const {frequency, date, date_freq, name} = data;
        let freq = (frequency === "Every") ? date_freq : 0 ;
        await DataStore.save(
            Todo.copyOf(original, updated => {
                updated.name = name;
                updated.date_freq = parseInt(freq);
                updated.date = date;
            })
        );
    }

    const updateTodo = async (action, todoData) => {
        if (action === 'edit') {
            updateTodoById(todoData).then(() => {
                readTodos();
            });

        }
        if (action === 'delete') {
            deleteTodo(todoData.id);
        }
        setModalView('');
    };

    async function updateTodoStatus({todoID, date_changed, status}) {
        const original = await DataStore.query(Todo, todoID);
        await DataStore.save(
            Todo.copyOf(original, updated => {
                updated.date_changed = date_changed;
                updated.status = status;
            })
        );
    }

    async function updateTodoDate({todoID, date}) {
        const original = await DataStore.query(Todo, todoID);
        await DataStore.save(
            Todo.copyOf(original, updated => {
                updated.date = date;
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
