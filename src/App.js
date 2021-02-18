import React, {useState} from 'react';
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

//Components
import {Todo} from "./components/todos/todo";

//Styles
import {AppStyled} from './App_styles';
import {Item} from "./components/items/item";
import {Separator} from "./components/UI/separator";
import ItemNew from "./components/items/item/itemNew";
import TodoNew from "./components/todos/todo/todoNew";
import TodoEdit from "./components/todos/todo/todoEdit";
import {Modal} from "./components/UI/modal";

Amplify.configure(awsconfig)

function App() {

    const [modalView, setModalView] = useState('new');

    return (
        <AppStyled>
            <Todo setModalView={setModalView}>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <ItemNew/>
            </Todo>
            <Todo setModalView={setModalView}>
                <Item/>
            </Todo>
            <Modal classType={ modalView === 'new' && 'show'} setModalView={setModalView}>
                <TodoNew/>
            </Modal>
            <Modal classType={modalView === 'edit' && 'show'} setModalView={setModalView}>
                <TodoEdit/>
            </Modal>
            <button type="button" className="AppStyled_add-button" onClick={() => setModalView('new')}>+</button>

        </AppStyled>
    );
}

export default App;
