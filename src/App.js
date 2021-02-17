import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

//Components
import {Todo} from "./components/todos/todo";

//Styles
import {AppStyled} from './App_styles';
import {Item} from "./components/items/item";
import {Separator} from "./components/UI/separator";

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
        </Todo>
        <Todo>
            <Item/>
        </Todo>
    </AppStyled>
  );
}

export default App;
