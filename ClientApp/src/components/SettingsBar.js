import {useContext} from "react";
import {ApplicationContext} from "../App";
import {Button} from "reactstrap";
import Requests from "../Requests";

export default function SettingsBar() {
    const applicationContext = useContext(ApplicationContext);
    
    // function onChangeWidth(e) {
    //     applicationContext.setWidth(e.target.value);
    // }
    //
    // function onChangeHeight(e) {
    //     applicationContext.setHeight(e.target.value);
    // }
    
    function deleteCompleted() {
        let deleteIds = [];
        applicationContext.items.forEach(item => {
            if(item.isDone) deleteIds.push(item.id);
        })
        Requests.bulkDeleteItems(deleteIds).then(r => {
            applicationContext.updateItems();
        });
    }
    
    return <div className="settingsBar">
        <Button onClick={deleteCompleted} color="danger">Delete Completed Items</Button>
        {/*<span className="bg-light">*/}
        {/*    <h4>width: </h4>*/}
        {/*    <input min={1} max={8} onChange={onChangeWidth} defaultValue={applicationContext.width} id="width" type="number"/>*/}
        {/*</span>*/}
        {/*<span className="bg-light">*/}
        {/*    <h4>height: </h4>*/}
        {/*    <input min={1} max={8} onChange={onChangeHeight} defaultValue={applicationContext.height} id="height" type="number"/>*/}
        {/*</span>*/}
    </div>
}