import React, {useContext} from 'react';
import '../css/explorer.css';
import Item from "./item";
import Context from "../Context/context";

function Explorer ({items}) {
    let {routeTo, changeItems} = React.useContext(Context);

    function clickOnItem (item) {
        if (item.type === 'back'){
            routeTo(window.location.pathname.replace(/(([^\/]*)\/)$/, ''), changeItems)
        }
        if (item.type === 'dir'){
            routeTo(item.path, changeItems);
        }
    }
    return <ul className="explorer">
        {window.location.pathname === '/disk/' ? '' : (
            <Item clickOnItem={clickOnItem} item={{type: 'back', name: '..'}} key="back"/>
            )}
        {items.map(item => <Item item={item} key={item.resource_id} clickOnItem={clickOnItem}/>)}
    </ul>
}

export default Explorer