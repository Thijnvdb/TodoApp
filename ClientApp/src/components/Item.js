import {useContext, useState} from "react";
import {ApplicationContext, DragContext} from "../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Requests from "../Requests";
import {faTrashAlt, faEdit, faSave } from '@fortawesome/free-regular-svg-icons'
import {faCheck, faUndo, faBan} from "@fortawesome/free-solid-svg-icons";

export default function Item({text, x, y, id, done = false}) {
    const dragContext = useContext(DragContext);
    const applicationContext = useContext(ApplicationContext);
    const [showContext, setShowContext] = useState(false);
    const [dragged, setDragged] = useState(false);
    const [editing, setEditing] = useState(false);
    
    function onDragStart(e) {
        e.dataTransfer.effectAllowed = "move";
        setShowContext(false);
        setDragged(true);
        dragContext.setDraggingId(id);
    }
    
    function onDragStop() {
        //setShowContext(true);
        setDragged(false);
    }
    
    function showSettings(event) {
        event.preventDefault();
        setShowContext(true);
    }
    
    function toggleDone() {
        Requests.toggleItem(id, !done).then(e => {
            applicationContext.updateItems();
        });
    }
    
    function deleteItem() {
        Requests.deleteItem(id).then(e => {
            applicationContext.updateItems();
        })
    }
    
    function editItem() {
        setEditing(true);
    }
    
    function confirmEdit() {
        const editText = document.getElementById("editInput").value;
        setEditing(false);
        Requests.editItem(id, editText).then(e => {
            applicationContext.updateItems();
        });
    }
    
    function cancelEdit() {
        setEditing(false);
    }

    function mouseEnter(e) {
        setShowContext(true);
    }

    function mouseLeave(e) {
        setShowContext(false);
    }
    
    const context =  showContext && !editing ? "expanded" : "";
    const d = done ? "done" : "";
    
    return <div draggable={!editing} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onDragStart={onDragStart} onDragEnd={onDragStop} className={"font-monospace item rounded shadow user-select-none "+d}>
        {!editing && (
            <h1 draggable={false} className="user-select-none">{text}</h1>
        )}
        {editing && <textarea id="editInput" maxLength={42} placeholder={text}/>}
        {editing &&
            <span className="save" onClick={confirmEdit}>
                <FontAwesomeIcon icon={faSave}/>
            </span>
        }
        {editing &&
            <span className="cancel" onClick={cancelEdit}>
                <FontAwesomeIcon icon={faBan}/>
            </span>
        }
        <div hidden={dragged} className={"context shadow user-select-none " + context}>
            <span className="icon" onClick={deleteItem}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </span>
            <span className="icon" onClick={editItem}>
                <FontAwesomeIcon icon={faEdit}/>
            </span>
            <span className="icon" onClick={toggleDone}>
                <FontAwesomeIcon icon={done ? faUndo : faCheck}/>
            </span>
        </div>
    </div>
}