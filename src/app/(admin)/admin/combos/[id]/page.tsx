import Link from "next/link";
import { getCombo } from "@/src/actions/server/combos";
import { notFound } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ArrowLeft, ExternalLink, Pencil, Calendar, Link as LinkIcon } from "lucide-react";

const ComboDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const comboId = parseInt(id, 10);

  if (isNaN(comboId)) {
    notFound();
  }

  const combo = await getCombo(comboId);

  if (!combo) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link
            href="/admin/combos"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Combos
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold mb-2">{combo.name}</h1>
            <Badge variant={combo.isActive ? "success" : "danger"}>
              {combo.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <Link href={`/admin/combos/${combo.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-neutral-500">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {combo.description || "No description provided"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-neutral-500 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{combo.createdAt.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-neutral-500 flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                Event Slugs ({combo.eventSlugs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {combo.eventSlugs.length > 0 ? (
                <ul className="space-y-2">
                  {combo.eventSlugs.map((slug) => (
                    <li key={slug}>
                      <a
                        href={`https://www.polymarket.com/event/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        {slug}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">No event slugs added</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ComboDetailPage;
