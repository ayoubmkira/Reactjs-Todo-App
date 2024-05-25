import "./TextInput.css";

export default function TextInput({ className, id, label, placeholder, value, onChange }) {

    return <div className={className}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
        />
    </div>


}