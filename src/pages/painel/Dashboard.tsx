import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockColaboradores, AREAS_INTERESSE, type AreaInteresse } from "@/lib/mock-data";
import { Users, UserCheck, Clock, UserX } from "lucide-react";

const Dashboard = () => {
  const total = mockColaboradores.length;
  const aprovados = mockColaboradores.filter((c) => c.status === "aprovado").length;
  const pendentes = mockColaboradores.filter((c) => c.status === "pendente").length;
  const rejeitados = mockColaboradores.filter((c) => c.status === "rejeitado").length;

  const porArea = Object.entries(AREAS_INTERESSE).map(([key, label]) => ({
    area: label,
    count: mockColaboradores.filter((c) => c.area_interesse === key).length,
  }));

  const stats = [
    { label: "Total Inscritos", value: total, icon: Users, color: "text-primary" },
    { label: "Aprovados", value: aprovados, icon: UserCheck, color: "text-success" },
    { label: "Pendentes", value: pendentes, icon: Clock, color: "text-warning" },
    { label: "Rejeitados", value: rejeitados, icon: UserX, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos colaboradores da Semana Acadêmica.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inscritos por Área</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {porArea.map((a) => (
              <div key={a.area} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{a.area}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${total > 0 ? (a.count / total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-6 text-right">{a.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
