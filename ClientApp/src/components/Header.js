import {useContext, useEffect, useState} from "react";
import {ApplicationContext} from "../App"
import Requests from "../Requests";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ReactModal from "./Modal";

export function Header() {
    let applicationContext = useContext(ApplicationContext);
    const [showModal, setShowModal] = useState(false);
    
    function changeHandler(e) {
        let x = e.target.value;
        applicationContext.setCategory(x);
    }
    
    function addCategory(e) {
        setShowModal(true);
    }
    
    function submitCategory(e) {
        e.preventDefault();
        const title = e.target.categoryTitle.value;
        Requests.createCategory(title).then(e => {
            applicationContext.updateCategories();
        });
        setShowModal(false);
    }
    
    return <header className="bg-dark d-flex flex-row align-items-center w-100 h-80">
        <ReactModal title={"Add Category"}
            modalOpen={showModal}
            handleModalOpen={()=>{setShowModal(!showModal)}}
            submitFormName="categoryform"
        >
            <form id="categoryform" onSubmit={submitCategory}>
                <div className="mb-3">
                    <label htmlFor="categoryTitle" className="form-label">New Category Title</label>
                    <div id="categoryHelp" className="form-text">Only alphanumeric names are allowed.</div>
                    <input autoComplete={"off"} pattern="[a-zA-Z0-9\s]+" minLength={3} maxLength={28} required type="text" className="form-control" id="categoryTitle"/>
                </div>
            </form>
        </ReactModal>
        <h1 className="text-primary fs-1 ms-4 mb-0">//TODO:</h1>
        <select onChange={changeHandler} className="bg-transparent fs-1 text-light border-0">
            {
                applicationContext.categories?.map(cat => 
                    <option key={"option"+cat.id} className="text-dark" value={cat.id}>{cat.name}</option>
                )
            }
        </select>
        <button className="addCat btn btn-primary" onClick={addCategory}>
            Add Category
            <FontAwesomeIcon icon={faPlus}/>
        </button>
    </header>
}