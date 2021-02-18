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

    return (
        <AppStyled>
            <Todo>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <Item/>
                <Separator/>
                <ItemNew/>
            </Todo>
            <Todo>
                <Item/>
            </Todo>
            <Modal>
                <TodoNew/>
            </Modal>
            <Modal>
                <TodoEdit/>
            </Modal>
            <button type="button" className="AppStyled_add-button">+</button>

        </AppStyled>
    );
}

export default App;
