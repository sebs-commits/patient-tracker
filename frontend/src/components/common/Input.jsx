import PropTypes from "prop-types";

const Input = ({ label, type, name, value, onChange, required }) => (
  <label>
    {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </label>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Input;
