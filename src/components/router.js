import React, {useContext} from "react";
import Auth from "./auth";
import Explorer from "./explorer";
import Context from "../Context/context";
import Item from "./item";

function Router ({items}) {
    let {disk, path, routeTo, changeItems} = useContext(Context);
    return window.location.pathname === '/auth' ? (<Auth/>) : (<Explorer items={items}/>)
}

export default Router