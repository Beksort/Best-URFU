import React from "react";
import '../css/item.css';

function Item({item, clickOnItem}) {
    return (
        <li className={`item item_${item.type} explorer__item`} onClick={() => {clickOnItem(item)}}>
            <span className="item__text">{item.name}</span>
        </li>
    )
}

export default Item