import { useContext } from "react";
import ItemTodo from "./ItemTodo";
import "./ListTodos.css";
import { Context } from "./TodoApp";
import ListCategories from "./ListCategories";

export default function ListTodos({ urgentTodos, otherTodos, completedTodos }) {

    const context = useContext(Context);

    return <div className="list-todos-container">
        {
            (urgentTodos || otherTodos)?
                <>
                    <h2 className="title filter">Filter Todos :</h2>
                    <ListCategories
                        categories={[{ id: "all", label: "All" }, ...context.categories]}
                        currCategory={context.filter}
                        onChange={(category) => {
                            context.setFilter(category);
                        }} />
                    
                    <h2 className="title urgent">Urgent Todos :</h2>
                    {
                        (urgentTodos && urgentTodos.length > 0)?
                            <ul className="list-todos">
                                {urgentTodos.map((item, idx) => <ItemTodo className={"item-todo"} key={idx} todo={item} />)}
                            </ul>: <p className="alert">No Urgent Todos.</p>
                    }
                    <h2 className="title other">Other Todos :</h2>
                    {
                        (otherTodos && otherTodos.length > 0)?
                            <ul className="list-todos">
                                {otherTodos.map((item, idx) => <ItemTodo className={"item-todo"} key={idx} todo={item} />)}
                            </ul>: <p className="alert">No Other Todos.</p>
                    }
                </>:
                <>
                    <h2 className="title history">History :</h2>
                    {
                        (completedTodos && completedTodos.length > 0)?
                            <ul className="list-todos">
                                {completedTodos.map((item, idx) => <ItemTodo className={"item-todo"} key={idx} todo={item} />)}
                            </ul>: <p className="alert">No Completed Todos.</p>
                    }
                </>
        }
    </div>;

}