import React, {createContext, useContext, useEffect, useState} from "react";
import Tile from "./Tile";
import Requests from "../Requests";
import {ApplicationContext} from "../App";

export default function Board({}) {
    const applicationContext = useContext(ApplicationContext);
    let [items, setItems] = useState([]);
    let [tiles, setTiles] = useState([]);
    
    async function getItems() {
        let its = applicationContext.items;

        let itemz = [...Array(applicationContext.width * applicationContext.height)];
        let duplicates = [];
        for (let i = 0; i < its.length; i++) {
            const item = its[i];
            if(itemz[item.x + (item.y * applicationContext.width)]) {
                duplicates.push(item);
            } else {
                itemz[item.x + (item.y * applicationContext.width)] = {...item};   
            }
        }
        
        for (let i = 0; i < duplicates.length; i++) {
            const item = duplicates[i];
            for (let j = 0; j < itemz.length; j++) {
                if (!itemz[j]) {
                    itemz[j] = item;
                    break;
                }
            }
        }
        
        setItems(itemz)
    }
    
    useEffect(getItems, [applicationContext.items, applicationContext.width, applicationContext.height])
    
    async function dropHandler(id, x, y) {
        let res = await Requests.moveItem(id,x,y);
        applicationContext.updateItems();
    }
    //on load
    useEffect(()=> {
        //set tiles
        let tls = []
        for (let i = 0; i < applicationContext.width * applicationContext.height; i++) {
            tls[i] = <Tile key={"tile"+i} item={items[i]} drop={dropHandler} index={i} y={Math.floor(i / applicationContext.width)} x={i % applicationContext.width}/>
        }
        setTiles(tls);
    },[items])
    
    return(<div className="boardWrapper">
        <div onContextMenu={e=>e.preventDefault()} style={{gridTemplateColumns:`repeat(${applicationContext.width}, 1fr)`,gridTemplateRows:`repeat(${applicationContext.height}, 1fr)`}} className="board shadow overflow-hidden">
            {tiles}
        </div>
    </div>)
    
}