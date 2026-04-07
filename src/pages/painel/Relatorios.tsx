import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { mockColaboradores, mockPresenca, AREAS_INTERESSE, TIPOS_VINCULO, DISPONIBILIDADES } from "@/lib/mock-data";
import { Download, FileText, Users, ClipboardCheck } from "lucide-react";

const Relatorios = () => {
  const { toast } = useToast();

  const exportCSV = () => {
    const header = "Nome,Email,Telefone,CPF,Vínculo,Área,Disponibilidade,Status\n";
    const rows = mockColaboradores.map((c) =>
      `"${c.nome}","${c.email}","${c.telefone}","${c.cpf}","${TIPOS_VINCULO[c.tipo_vinculo]}","${AREAS_INTERESSE[c.area_interesse]}","${c.disponibilidade.map((d) => DISPONIBILIDADES[d]).join(", ")}","${c.status}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colaboradores_unifebe.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV exportado!", description: "Arquivo baixado com sucesso." });
  };

  const porArea = Object.entries(AREAS_INTERESSE).map(([key, label]) => ({
    area: label,
    total: mockColaboradores.filter((c) => c.area_interesse === key).length,
    aprovados: mockColaboradores.filter((c) => c.area_interesse === key && c.status === "aprovado").length,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Visualize e exporte dados dos colaboradores.</p>
        </div>
        <Button onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" /> Exportar CSV
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-sm">Total de Colaboradores</CardTitle>
              <CardDescription>{mockColaboradores.length}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <ClipboardCheck className="h-5 w-5 text-success" />
            <div>
              <CardTitle className="text-sm">Registros de Presença</CardTitle>
              <CardDescription>{mockPresenca.length}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <FileText className="h-5 w-5 text-warning" />
            <div>
              <CardTitle className="text-sm">Áreas de Atuação</CardTitle>
              <CardDescription>{Object.keys(AREAS_INTERESSE).length}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo por Área de Atuação</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área</TableHead>
                <TableHead className="text-center">Total Inscritos</TableHead>
                <TableHead className="text-center">Aprovados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {porArea.map((a) => (
                <TableRow key={a.area}>
                  <TableCell className="font-medium">{a.area}</TableCell>
                  <TableCell className="text-center">{a.total}</TableCell>
                  <TableCell className="text-center">{a.aprovados}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
