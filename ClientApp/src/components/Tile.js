import { useContext } from "react";
import { useState } from "react";
import { ApplicationContext, DragContext } from "../App";
import Requests from "../Requests";
import Item from "./Item";

export default function Tile({item, index, drop, x, y}) {
    const dragContext = useContext(DragContext);
    const applicationContext = useContext(ApplicationContext);
    const [hovering, setHovering] = useState(false);
    
    function dropHandler(e) {
        setHovering(false);
        if(item) return;//don't drag to full tile
        drop(dragContext.draggingId, x, y);
    }

    function dragChangeHandler(bool) {
        setHovering(bool);
    }

    function onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    async function onClickHandler(event) {
        if (item) return;
        let res = await Requests.createItem(applicationContext.category , x, y);
        applicationContext.updateItems();
    }
    
    function onContext(event) {
        if(!item) return; //should not happen
        //menuContext.setContextMenu();
        // const options = [
        //     {icon: ["far", "fa-trash-alt"] ,text: "delete", func: (e)=> {
        //         Requests.moveItem(item.id, 5, 5);
        //     }}   
        // ];
    }

    let hover = hovering ? " hover" : "";

    return (
        <div onClick={onClickHandler} onDragOver={onDragOver} onDragEnter={()=>dragChangeHandler(true)} onDragLeave={()=>dragChangeHandler(false)} onDrop={dropHandler}
             className={"tile cursor-pointer " + hover}>
            {item && <Item text={item.mainText} done={item.isDone} x={item.x} y={item.y} id={item.id}/>}
        </div>
    )
}