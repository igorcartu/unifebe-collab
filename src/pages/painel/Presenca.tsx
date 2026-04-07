import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { mockPresenca, mockColaboradores, type RegistroPresenca, type PresencaStatus } from "@/lib/mock-data";
import { LogIn, LogOut } from "lucide-react";

const statusConfig: Record<PresencaStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  presente: { label: "Presente", variant: "default" },
  ausente: { label: "Ausente", variant: "destructive" },
  atrasado: { label: "Atrasado", variant: "secondary" },
};

const Presenca = () => {
  const { toast } = useToast();
  const [registros, setRegistros] = useState<RegistroPresenca[]>(mockPresenca);
  const [dataFiltro, setDataFiltro] = useState("2024-06-10");

  const aprovados = mockColaboradores.filter((c) => c.status === "aprovado");
  const filtered = registros.filter((r) => r.data === dataFiltro);

  const doCheckIn = (colaboradorId: string, nome: string) => {
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const novo: RegistroPresenca = {
      id: Date.now().toString(),
      colaborador_id: colaboradorId,
      colaborador_nome: nome,
      data: dataFiltro,
      check_in: now,
      status: "presente",
    };
    setRegistros((prev) => [...prev, novo]);
    toast({ title: "Check-in registrado", description: `${nome} — ${now}` });
  };

  const doCheckOut = (id: string) => {
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setRegistros((prev) =>
      prev.map((r) => (r.id === id ? { ...r, check_out: now } : r))
    );
    toast({ title: "Check-out registrado", description: `Saída às ${now}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Controle de Presença</h1>
        <p className="text-muted-foreground">Registre check-in e check-out dos colaboradores.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Data do evento</label>
          <Input type="date" value={dataFiltro} onChange={(e) => setDataFiltro(e.target.value)} className="w-44" />
        </div>
        <Card className="flex-1">
          <CardContent className="py-3 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Presentes hoje:</span>
            <span className="font-bold text-foreground">{filtered.filter((r) => r.status !== "ausente").length}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registros do dia</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const cfg = statusConfig[r.status];
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.colaborador_nome}</TableCell>
                    <TableCell>{r.check_in || "—"}</TableCell>
                    <TableCell>{r.check_out || "—"}</TableCell>
                    <TableCell><Badge variant={cfg.variant}>{cfg.label}</Badge></TableCell>
                    <TableCell className="text-right">
                      {r.check_in && !r.check_out && (
                        <Button size="sm" variant="outline" onClick={() => doCheckOut(r.id)}>
                          <LogOut className="h-4 w-4 mr-1" /> Check-out
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum registro para esta data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Check-in rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aprovados.map((c) => {
              const jaRegistrado = filtered.some((r) => r.colaborador_id === c.id);
              return (
                <Button
                  key={c.id}
                  variant={jaRegistrado ? "secondary" : "outline"}
                  disabled={jaRegistrado}
                  className="justify-start"
                  onClick={() => doCheckIn(c.id, c.nome)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {c.nome}
                  {jaRegistrado && <span className="ml-auto text-xs text-muted-foreground">✓</span>}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Presenca;
