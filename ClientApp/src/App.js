import React, {createContext, useContext, useEffect, useState} from 'react';
import { Route } from 'react-router';
import Board from './components/Board';
import './app.scss'
import {Header} from "./components/Header";
import Requests from "./Requests";
import SettingsBar from "./components/SettingsBar";

export const DragContext = createContext();
export const DragProvider = ({children}) => {
    const [draggingId, setDraggingId] = useState();
    return <DragContext.Provider
        value={{
            draggingId,
            setDraggingId
        }}
    >
        {children}
    </DragContext.Provider>
}

export const ApplicationContext = createContext();
export const ApplicationProvider = ({children}) => {
    const [categories, setCategories] = useState([])
    const [category,setCategory] = useState(1);
    const [items, setItems] = useState([])
    const [width,setWidth] = useState(8);
    const [height, setHeight] = useState(5);
    
    async function updateItems() {
        let its = await Requests.getItemsByCategoryId(category);
        setItems(its);
    }
    
    async function updateCategories() {
        let res = await Requests.getCategories();
        setCategories(res);
    }

    useEffect(updateItems,[category])
    useEffect(updateCategories, [])
    
    return <ApplicationContext.Provider
        value={{
            category,
            setCategory,
            categories,
            setCategories,
            width,
            setWidth,
            height,
            setHeight,
            updateItems,
            items,
            setItems,
            updateCategories
        }}
    >
        {children}
    </ApplicationContext.Provider>
}

export default function App() {
    return (
        <ApplicationProvider>
        <DragProvider>
            <div className="app bg-secondary">
                <Header/>
                <SettingsBar/>
                <Route exact path='/'>{<Board/>}</Route>
            </div>
        </DragProvider>
        </ApplicationProvider>
    );
}
