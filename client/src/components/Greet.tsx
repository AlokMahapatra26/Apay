interface GreetProps {
  name: string;
}

const Greet = ({ name = "Guest" }: GreetProps) => {
  return (
    <div className="text-2xl font-semibold text-center text-black p-4">
      Hello, {name}!
    </div>
  );
};

export default Greet;
