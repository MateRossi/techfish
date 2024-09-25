/* eslint-disable no-unused-vars */
import './Checkbox.css';

export default function Checkbox({ onChange, label, ...rest }) {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                onChange={onChange}
                {...rest}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    )
}