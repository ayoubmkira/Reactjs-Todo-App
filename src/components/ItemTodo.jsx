import { useContext } from "react";
import Checkbox from "./form/Checkbox";
import { Context } from "./TodoApp";
import "./ItemTodo.css";
import Button from "./form/Button";
import { FaTrashAlt } from "react-icons/fa";

export default function ItemTodo({ className, todo }) {

    const context = useContext(Context);
    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };
    const handleCheckboxItemTodo = (todo) => {
        context.setTodos(currTodos => {
            return currTodos.map(item => {
                return (item.id === todo.id)? { ...item, done: !item.done }: { ...item }
            });
        });
    };
    const handleDeleteItemTodo = (todo) => {
        context.setTodos(currTodos => {
            return currTodos.filter(item => (item.id !== todo.id))
        });
    };

    const category = context.categories.find(cat => {
        return cat.id === todo.idCategoryIcon;
    });

    return <li style={styles} className={className}>
        <Checkbox
            id={todo.id}
            label={`${category?.label} ${todo.task}`}
            checked={todo.done}
            onChange={() => handleCheckboxItemTodo(todo)} />

        <div>
            <Button
                className={"btn-remove-todo"}
                text={<FaTrashAlt color="red" />}
                onClick={() => handleDeleteItemTodo(todo)} />
        </div>
    </li>;

}