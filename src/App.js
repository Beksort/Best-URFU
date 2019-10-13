import React from 'react';
import './App.css';
import Auth from "./components/auth";
import Explorer from "./components/explorer";
import Router from "./components/router";
import YaDisk from "./modules/yadisk"
import Context from "./Context/context"


const disk = new YaDisk();

function routeTo (path, setItems) {
  let nPath;
  path = path.match(/[^\/]*$/)[0] ? path + '/' : path;
  if (!disk.token) nPath = 'auth';
  else{
    nPath = path === '/' ? 'disk/' : path.replace(':','');
    let rPath = nPath.replace('disk/', '');
    rPath = rPath === '' ? '/' : rPath;
    disk.pathInfo(decodeURIComponent(rPath)).then((items) => {
      setItems(items);
    });
  }

  window.history.replaceState({},'', '/');
  window.history.replaceState({},'folder',nPath);

  return nPath;
}

function App() {
  const [items, setItems] = React.useState([]);

  function changeItems (items) {
    setItems(items);
  }

  const [path, setPath] = React.useState(() => {routeTo(window.location.pathname, changeItems); return "disk" });
  const [pathParts, setParts] = React.useState([])
  return (
    <Context.Provider value={{disk, routeTo, changeItems, path}}>
      <div className="application">
        <div className="application__container">
          <header className="header application__header">
          </header>
          <main className="application__content">
            <Router items ={items}/>
          </main>
          <footer className="footer application__footer"></footer>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
