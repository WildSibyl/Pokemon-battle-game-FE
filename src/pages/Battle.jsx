import RandomOpponent from "../battle components/RandomOpponent";

const Battle = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Battle Page</h1>
      <p className="text-lg">This is where the battle will take place!</p>
      <RandomOpponent />
    </div>
  );
};

export default Battle;
