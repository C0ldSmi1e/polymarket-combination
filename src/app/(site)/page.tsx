import Link from "next/link";
import { TrendingUp } from "lucide-react";
import ComboList from "@/src/app/(site)/components/combos/list";

const Home = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Polymarket Combos</h1>
          </div>
          <Link
            href="/admin/combos"
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Admin
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Active Combos</h2>
          <p className="text-neutral-500 text-sm">
            Combine multiple prediction market outcomes into a single bet
          </p>
        </div>
        <ComboList />
      </main>
    </div>
  );
};

export default Home;
