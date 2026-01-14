import ComboList from "@/src/app/(site)/components/combos/list";

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Polymarket Combos</h1>
        <p className="mt-1 text-gray-600">
          Bet on combinations of prediction market events
        </p>
      </header>
      <ComboList />
    </div>
  );
};

export default Home;