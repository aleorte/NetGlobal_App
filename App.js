import Options from "./src/components/Options";
import { Provider } from "react-redux";
import store from "./src/state/store";


export default function App() {

  return (
    <Provider store={store}>

          <Options />

    </Provider>
  ) 
}


