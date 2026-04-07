import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockColaboradores, mockPresenca, AREAS_INTERESSE } from "@/lib/mock-data";
import { Award, Download } from "lucide-react";

const Certificados = () => {
  const { toast } = useToast();

  const aprovados = mockColaboradores.filter((c) => c.status === "aprovado");

  const getHoras = (colaboradorId: string) => {
    const registros = mockPresenca.filter(
      (p) => p.colaborador_id === colaboradorId && p.check_in && p.check_out
    );
    let totalMinutos = 0;
    registros.forEach((r) => {
      if (r.check_in && r.check_out) {
        const [hi, mi] = r.check_in.split(":").map(Number);
        const [ho, mo] = r.check_out.split(":").map(Number);
        totalMinutos += (ho * 60 + mo) - (hi * 60 + mi);
      }
    });
    return Math.round(totalMinutos / 60 * 10) / 10;
  };

  const gerarCertificado = (nome: string, horas: number) => {
    toast({
      title: "Certificado gerado!",
      description: `Certificado de ${nome} (${horas}h) pronto para download.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Certificados</h1>
        <p className="text-muted-foreground">Gere certificados de participação para os colaboradores aprovados.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Colaboradores Elegíveis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Área</TableHead>
                <TableHead className="text-center">Horas</TableHead>
                <TableHead className="text-center">Elegível</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aprovados.map((c) => {
                const horas = getHoras(c.id);
                const elegivel = horas >= 1;
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{c.nome}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{AREAS_INTERESSE[c.area_interesse]}</TableCell>
                    <TableCell className="text-center font-medium">{horas}h</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={elegivel ? "default" : "secondary"}>
                        {elegivel ? "Sim" : "Não"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!elegivel}
                        onClick={() => gerarCertificado(c.nome, horas)}
                      >
                        <Download className="h-4 w-4 mr-1" /> Gerar PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {aprovados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum colaborador aprovado.
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

export default Certificados;
