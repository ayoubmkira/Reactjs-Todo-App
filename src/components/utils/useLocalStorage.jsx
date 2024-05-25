import { useState, useEffect } from "react";

export default function useLocalStorage({ key, initialValue = []}) {

    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(key);
        return data? JSON.parse(data): initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [
        value,
        setValue
    ];

}