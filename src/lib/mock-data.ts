export type ColaboradorStatus = 'pendente' | 'aprovado' | 'rejeitado';
export type TipoVinculo = 'aluno' | 'funcionario' | 'externo';
export type AreaInteresse = 'recepcao' | 'logistica' | 'apoio_tecnico' | 'secretaria' | 'alimentacao';
export type Disponibilidade = 'manha' | 'tarde' | 'noite';
export type PresencaStatus = 'presente' | 'ausente' | 'atrasado';

export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  curso?: string;
  periodo?: string;
  tipo_vinculo: TipoVinculo;
  area_interesse: AreaInteresse;
  disponibilidade: Disponibilidade[];
  status: ColaboradorStatus;
  created_at: string;
  aceite_termo: boolean;
}

export interface RegistroPresenca {
  id: string;
  colaborador_id: string;
  colaborador_nome: string;
  data: string;
  check_in?: string;
  check_out?: string;
  status: PresencaStatus;
}

export const AREAS_INTERESSE: Record<AreaInteresse, string> = {
  recepcao: 'Recepção',
  logistica: 'Logística',
  apoio_tecnico: 'Apoio Técnico',
  secretaria: 'Secretaria',
  alimentacao: 'Alimentação',
};

export const TIPOS_VINCULO: Record<TipoVinculo, string> = {
  aluno: 'Aluno UNIFEBE',
  funcionario: 'Funcionário',
  externo: 'Externo',
};

export const DISPONIBILIDADES: Record<Disponibilidade, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Noite',
};

export const mockColaboradores: Colaborador[] = [
  {
    id: '1', nome: 'Ana Silva', email: 'ana@email.com', telefone: '(47) 99999-0001',
    cpf: '123.456.789-00', curso: 'Sistemas de Informação', periodo: '5º',
    tipo_vinculo: 'aluno', area_interesse: 'apoio_tecnico',
    disponibilidade: ['manha', 'tarde'], status: 'aprovado',
    created_at: '2024-03-01T10:00:00Z', aceite_termo: true,
  },
  {
    id: '2', nome: 'Bruno Souza', email: 'bruno@email.com', telefone: '(47) 99999-0002',
    cpf: '234.567.890-11', curso: 'Administração', periodo: '3º',
    tipo_vinculo: 'aluno', area_interesse: 'recepcao',
    disponibilidade: ['tarde', 'noite'], status: 'pendente',
    created_at: '2024-03-02T14:00:00Z', aceite_termo: true,
  },
  {
    id: '3', nome: 'Carla Mendes', email: 'carla@email.com', telefone: '(47) 99999-0003',
    cpf: '345.678.901-22', tipo_vinculo: 'externo', area_interesse: 'logistica',
    disponibilidade: ['manha'], status: 'aprovado',
    created_at: '2024-03-03T09:00:00Z', aceite_termo: true,
  },
  {
    id: '4', nome: 'Diego Lima', email: 'diego@email.com', telefone: '(47) 99999-0004',
    cpf: '456.789.012-33', tipo_vinculo: 'funcionario', area_interesse: 'secretaria',
    disponibilidade: ['manha', 'tarde', 'noite'], status: 'aprovado',
    created_at: '2024-03-04T11:00:00Z', aceite_termo: true,
  },
  {
    id: '5', nome: 'Elena Costa', email: 'elena@email.com', telefone: '(47) 99999-0005',
    cpf: '567.890.123-44', curso: 'Direito', periodo: '7º',
    tipo_vinculo: 'aluno', area_interesse: 'alimentacao',
    disponibilidade: ['noite'], status: 'rejeitado',
    created_at: '2024-03-05T16:00:00Z', aceite_termo: true,
  },
];

export const mockPresenca: RegistroPresenca[] = [
  { id: '1', colaborador_id: '1', colaborador_nome: 'Ana Silva', data: '2024-06-10', check_in: '08:00', check_out: '12:00', status: 'presente' },
  { id: '2', colaborador_id: '3', colaborador_nome: 'Carla Mendes', data: '2024-06-10', check_in: '08:30', status: 'atrasado' },
  { id: '3', colaborador_id: '4', colaborador_nome: 'Diego Lima', data: '2024-06-10', check_in: '08:00', check_out: '17:00', status: 'presente' },
  { id: '4', colaborador_id: '1', colaborador_nome: 'Ana Silva', data: '2024-06-11', check_in: '08:00', check_out: '12:00', status: 'presente' },
  { id: '5', colaborador_id: '4', colaborador_nome: 'Diego Lima', data: '2024-06-11', status: 'ausente' },
];
