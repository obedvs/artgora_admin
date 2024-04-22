export const Button = ({ onClick = () => (console.log('click')), type, value }) => {
    return (
      <input
        className="bg-grayscale-500 text-grayscale-100 hover:opacity-60 active:opacity-40 px-4 py-2 mt-8 text-xl rounded-full shadow-md cursor-pointer"
        type={type}
        onClick={onClick}
        value={value}
      >
      </input>
    )
  }