export const Input = ({ name, onChange, type, value, placeholder, required = false }) => {
  return (
    <input
        className="border-x-0 focus-visible:outline-none text-grayscale-500 w-full h-auto px-4 py-2 text-xl bg-gray-100 rounded-lg shadow-md resize-none"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
    >
    </input>
  )
}