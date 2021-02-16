import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

//Components
import {Todo} from "./components/todos/todo";

//Styles
import {AppStyled} from './App_styles';

Amplify.configure(awsconfig)

function App() {

  return (
    <AppStyled>
      <Todo></Todo>
    </AppStyled>
  );
}

export default App;
