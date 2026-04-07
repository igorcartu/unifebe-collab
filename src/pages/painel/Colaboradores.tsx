import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  mockColaboradores, AREAS_INTERESSE, TIPOS_VINCULO, DISPONIBILIDADES,
  type Colaborador, type ColaboradorStatus,
} from "@/lib/mock-data";
import { Search, Check, X } from "lucide-react";

const statusBadge: Record<ColaboradorStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pendente: { label: "Pendente", variant: "secondary" },
  aprovado: { label: "Aprovado", variant: "default" },
  rejeitado: { label: "Rejeitado", variant: "destructive" },
};

const Colaboradores = () => {
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(mockColaboradores);

  const filtered = colaboradores.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) || c.email.toLowerCase().includes(busca.toLowerCase());
    const matchArea = filtroArea === "todos" || c.area_interesse === filtroArea;
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus;
    return matchBusca && matchArea && matchStatus;
  });

  const updateStatus = (id: string, status: ColaboradorStatus) => {
    setColaboradores((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    toast({ title: `Colaborador ${status}`, description: `Status atualizado com sucesso.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Colaboradores</h1>
        <p className="text-muted-foreground">Gerencie os voluntários inscritos.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou e-mail..." value={busca} onChange={(e) => setBusca(e.target.value)} className="pl-10" />
            </div>
            <Select value={filtroArea} onValueChange={setFiltroArea}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as áreas</SelectItem>
                {Object.entries(AREAS_INTERESSE).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Vínculo</TableHead>
                <TableHead className="hidden sm:table-cell">Área</TableHead>
                <TableHead className="hidden lg:table-cell">Disponibilidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => {
                const badge = statusBadge[c.status];
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{c.nome}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{TIPOS_VINCULO[c.tipo_vinculo]}</TableCell>
                    <TableCell className="hidden sm:table-cell">{AREAS_INTERESSE[c.area_interesse]}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex gap-1">
                        {c.disponibilidade.map((d) => (
                          <Badge key={d} variant="outline" className="text-xs">{DISPONIBILIDADES[d]}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell><Badge variant={badge.variant}>{badge.label}</Badge></TableCell>
                    <TableCell className="text-right">
                      {c.status === "pendente" && (
                        <div className="flex gap-1 justify-end">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-success" onClick={() => updateStatus(c.id, "aprovado")}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => updateStatus(c.id, "rejeitado")}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum colaborador encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Colaboradores;
