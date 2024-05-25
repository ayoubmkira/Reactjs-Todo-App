import "./Button.css";

export default function Button({ className, text, onClick, disabled }) {

    return <div>
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}>{text}</button>
    </div>;

}