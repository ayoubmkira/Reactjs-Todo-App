import "./Checkbox.css";

export default function Checkbox({ className, id, label, checked, onChange }) {

    return <div className={className}>
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange} />
        <label htmlFor={id}>{label}</label>
    </div>;

}