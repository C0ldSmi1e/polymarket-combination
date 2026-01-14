import ComboList from "@/src/app/(site)/components/combos/list";

const Home = () => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <header style={{ padding: 20, borderBottom: "1px solid #eee" }}>
        <h1 style={{ margin: 0 }}>Polymarket Combos</h1>
        <p style={{ margin: "4px 0 0", color: "#666" }}>
          Bet on combinations of prediction market events
        </p>
      </header>
      <ComboList />
    </div>
  );
};

export default Home;