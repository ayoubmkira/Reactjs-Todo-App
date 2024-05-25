import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListTodos from "./ListTodos";
import TodoForm from "./TodoForm";
import useLocalStorage from "./utils/useLocalStorage";
import Button from "./form/Button";
import "./TodoApp.css";
import { CiBoxList } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { GoHistory } from "react-icons/go";

export const Context = createContext();

let initialCategories = [
    {
        id: uuidv4(),
        label: "⏰"
    }, {
        id: uuidv4(),
        label: "🛒"
    }, {
        id: uuidv4(),
        label: "🎓"
    }, {
        id: uuidv4(),
        label: "💼"
    }, {
        id: uuidv4(),
        label: "⚽"
    }, {
        id: uuidv4(),
        label: "💊"
    }
];

const filterTodos = (todos, viewMode, filter) => {
    switch (viewMode) {
        case "list":
            if(filter.id !== "all")
                todos = todos.filter(todo => todo.idCategoryIcon === filter.id);
            return {
                urgentTodos: todos.filter(todo => todo.isUrgent && !todo.done),
                otherTodos: todos.filter(todo => !todo.isUrgent && !todo.done)
            };
        case "history":
            return { completedTodos: todos.filter(todo => todo.done) };
        default:
            return {};
    }
};

export default function TodoApp() {

    const [viewMode, setViewMode] = useState("list");
    const [categories] = useLocalStorage({ key: "todos_categories_next", initialValue: initialCategories });
    const [todos, setTodos] = useLocalStorage({ key: "todos_next" });
    const [filter, setFilter] = useState({ id: "all", label: "All" });

    const { urgentTodos, otherTodos, completedTodos } = filterTodos(todos, viewMode, filter);

    return <div className="todo-app-container">
        <div className="todo-app-top">
            <h1 className="app-name">TODO 📝</h1>
        </div>
        <div className="todo-app-body">
            {
                (viewMode === "list") &&
                    <Context.Provider value={{setTodos: setTodos, categories: categories, filter: filter, setFilter: setFilter}}>
                        <ListTodos urgentTodos={urgentTodos} otherTodos={otherTodos} />
                    </Context.Provider>
            }
            {
                (viewMode === "form") &&
                    <TodoForm setTodos={setTodos} categories={categories} />
            }
            {
                (viewMode === "history") &&
                    <Context.Provider value={{setTodos: setTodos, categories: categories}}>
                        <ListTodos completedTodos={completedTodos} />
                    </Context.Provider>
            }
        </div>
        <div className="todo-app-bottom menu">
            <Button className={`menu-item btn-list ${viewMode === "list"? "active": ""}`} text={<CiBoxList />} onClick={() => setViewMode("list")} />
            <Button className={`menu-item btn-form ${viewMode === "form"? "active": ""}`} text={<BsPlus />} onClick={() => setViewMode("form")} />
            <Button className={`menu-item btn-history ${viewMode === "history"? "active": ""}`} text={<GoHistory />} onClick={() => setViewMode("history")} />
        </div>
    </div>;

}