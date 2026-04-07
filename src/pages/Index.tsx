import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ClipboardCheck, Award, Calendar } from "lucide-react";

const features = [
  { icon: Users, title: "Inscrição Simples", desc: "Cadastre-se como voluntário em poucos minutos." },
  { icon: ClipboardCheck, title: "Controle de Presença", desc: "Check-in e check-out durante o evento." },
  { icon: Award, title: "Certificados", desc: "Receba certificado de participação automaticamente." },
  { icon: Calendar, title: "Flexibilidade", desc: "Escolha seus horários e área de atuação." },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-bold text-lg text-foreground">UNIFEBE</span>
          </div>
          <Link to="/login">
            <Button variant="outline" size="sm">Entrar</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Semana Acadêmica 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Seja um <span className="text-primary">Voluntário</span> na
            <br />Semana Acadêmica
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Participe como colaborador e contribua para o maior evento acadêmico da UNIFEBE.
            Inscreva-se, escolha sua área de atuação e receba seu certificado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button size="lg" className="text-base px-8 py-6 font-semibold">
                Inscrever-se como Voluntário
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 font-semibold">
                Área Administrativa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Como funciona?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border-0 shadow-none bg-muted/50">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2024 UNIFEBE — Semana Acadêmica. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
