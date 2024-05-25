import { useId, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./form/Button";
import TextInput from "./form/TextInput";
import Checkbox from "./form/Checkbox";
import "./TodoForm.css";
import "./form/Checkbox.css";
import ListCategories from "./ListCategories";

export default function TodoForm({ setTodos, categories }) {

    const [category, setCategory] = useState(categories[0]);
    const [todoInput, setTodoInput] = useState("");
    const [isUrgent, setIsUrgent] = useState(false);

    const handleChangeCategory = (cat) => {
        setCategory(() => ({ ...cat }));
    };
    const handleTodoInputChange = (e) => {
        setTodoInput(e.target.value);
    };
    const handleChangeUrgent = () => {
        setIsUrgent(!isUrgent);
    };
    const handleAddTodo = (e) => {
        e.preventDefault();
        setTodos(currData => {
            return [
                ...currData, {
                    id: uuidv4(),
                    task: todoInput,
                    done: false,
                    idCategoryIcon: category.id,
                    isUrgent: isUrgent
                }
            ]
        });

        // Initialize Form:
        setCategory(categories[0]);
        setTodoInput("");
        setIsUrgent(false);
    };

    return <form className="todo-form">
        <div className="form-control">
            <h3 className="second-title">Choose Category :</h3>
            <ListCategories
                categories={categories}
                currCategory={category}
                onChange={handleChangeCategory} />
        </div>
        <div className="form-control">
            <h3 className="second-title">Task you want to Do :</h3>
            <TextInput
                className={"todo-input"}
                id={useId()}
                placeholder={"Enter Todo"}
                value={todoInput}
                onChange={handleTodoInputChange} />
        </div>
        <div className="form-control">
            <h3 className="second-title">Task Type :</h3>
            <Checkbox
                className={"urgent"}
                id={"task-urgente"}
                label={"The Task is Urgent 🚨"}
                checked={isUrgent}
                onChange={() => handleChangeUrgent()} />
        </div>
        <Button
            className={"btn-add-todo"}
            text={"Add Task"}
            onClick={handleAddTodo}
            disabled={!(todoInput.trim().length > 0)} />
    </form>;

}