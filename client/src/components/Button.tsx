

const Button = ({
    title = "Click Me", 
    bg = "green-500", 
    txt = "white",
    onClick = () => {} // Default empty function
  }: {
    title?: string;
    bg?: string;
    txt?: string;
    onClick?: () => void; // Type for the onClick prop
  }) => {

  
    return (
      <button 
        className={`p-2 rounded text-${txt} bg-${bg} cursor-pointer m-y-2 transition duration-300 ease-in-out block m-2`}
        onClick={onClick} // Bind the onClick function to the button
      >
        {title}
      </button>
    );
  };
  
  export default Button;
  