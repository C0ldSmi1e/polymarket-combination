"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/src/actions/client/combos";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/src/components/ui/table";
import { Plus, Loader2 } from "lucide-react";

const List = () => {
  const { data: combos, isLoading } = useQuery({
    queryKey: ["combos"],
    queryFn: () => getCombos(),
    placeholderData: [],
  });

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Combos</h1>
            <p className="text-sm text-neutral-500">Manage your combo bets</p>
          </div>
          <Link href="/admin/combos/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Combo
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading...
          </div>
        ) : combos && combos.length > 0 ? (
          <div className="border border-neutral-200 rounded-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combos.map((combo) => (
                  <TableRow key={combo.id}>
                    <TableCell className="font-mono text-neutral-500">
                      {combo.id}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/combos/${combo.id}`}
                        className="font-medium hover:text-neutral-600 transition-colors"
                      >
                        {combo.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{combo.eventSlugs.length}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={combo.isActive ? "success" : "danger"}>
                        {combo.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-500">
                      {new Date(combo.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">No combos yet.</p>
            <Link href="/admin/combos/new">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create your first combo
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default List;
