import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AREAS_INTERESSE, TIPOS_VINCULO, DISPONIBILIDADES, type TipoVinculo, type AreaInteresse, type Disponibilidade } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";

const Cadastro = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tipoVinculo, setTipoVinculo] = useState<TipoVinculo | "">("");
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade[]>([]);
  const [aceiteTermo, setAceiteTermo] = useState(false);

  const toggleDisponibilidade = (d: Disponibilidade) => {
    setDisponibilidade((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aceiteTermo) {
      toast({ title: "Erro", description: "Você deve aceitar o termo de compromisso.", variant: "destructive" });
      return;
    }
    if (disponibilidade.length === 0) {
      toast({ title: "Erro", description: "Selecione pelo menos uma disponibilidade.", variant: "destructive" });
      return;
    }
    toast({ title: "Inscrição realizada!", description: "Sua inscrição foi enviada com sucesso. Aguarde a aprovação." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Inscrição de Voluntário</CardTitle>
            <CardDescription>Preencha seus dados para se inscrever como colaborador na Semana Acadêmica UNIFEBE.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados pessoais */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Dados Pessoais</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input id="nome" required placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input id="cpf" required placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" required placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input id="telefone" required placeholder="(00) 00000-0000" />
                  </div>
                </div>
              </div>

              {/* Vínculo */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Vínculo Institucional</h3>
                <div className="space-y-2">
                  <Label>Tipo de vínculo *</Label>
                  <Select required onValueChange={(v) => setTipoVinculo(v as TipoVinculo)}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(TIPOS_VINCULO).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {tipoVinculo === "aluno" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="curso">Curso</Label>
                      <Input id="curso" placeholder="Ex: Sistemas de Informação" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="periodo">Período</Label>
                      <Input id="periodo" placeholder="Ex: 5º" />
                    </div>
                  </div>
                )}
              </div>

              {/* Área e disponibilidade */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Área e Disponibilidade</h3>
                <div className="space-y-2">
                  <Label>Área de interesse *</Label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="Selecione a área" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(AREAS_INTERESSE).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Disponibilidade de horários *</Label>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(DISPONIBILIDADES).map(([k, v]) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={disponibilidade.includes(k as Disponibilidade)}
                          onCheckedChange={() => toggleDisponibilidade(k as Disponibilidade)}
                        />
                        <span className="text-sm">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Termo */}
              <div className="space-y-4 border-t pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={aceiteTermo} onCheckedChange={(c) => setAceiteTermo(!!c)} className="mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Declaro que estou ciente das responsabilidades como voluntário e me comprometo a cumprir os horários e atividades designadas durante a Semana Acadêmica UNIFEBE. *
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Enviar Inscrição
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
