import Checkbox from "./form/Checkbox";
import "./ListCategories.css";

export default function ListCategories({ categories, currCategory, onChange }) {

    return <ul className="list-categories">
        {
            categories.map(cat => {
                return <Checkbox
                            className={"category"}
                            key={cat.id}
                            label={cat.label}
                            id={cat.id}
                            checked={String(currCategory.id) === String(cat.id)}
                            onChange={() => onChange(cat)} />
            })
        }
    </ul>;

}