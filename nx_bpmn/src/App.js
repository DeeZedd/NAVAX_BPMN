import logo from './logo.svg';
import './App.css';
import Renderer from './components/Renderer.tsx';

function App() {

  function onShown(){
    console.log('diagram shown');
  }

  function onLoading(){
    console.log('diagram loading');
  }

  function onError(err){
    console.log('failed to show diagram: ', err);
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Renderer/>

    // <ReactBpmn
    //   url={process.env.PUBLIC_URL + "/diagram.bpmn"}
    //   onShown={onShown}
    //   onLoading={onLoading}
    //   onError={onError}
    // />
  );
}

export default App;
