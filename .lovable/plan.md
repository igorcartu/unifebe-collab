
# Sistema de Cadastramento de Colaboradores — Semana Acadêmica UNIFEBE

## Visão Geral
Sistema web para gerenciar o cadastro de voluntários e equipe de apoio da Semana Acadêmica, com área pública de inscrição e painel administrativo completo.

---

## 1. Autenticação e Controle de Acesso
- **Login por email/senha** para administradores e colaboradores
- **Cadastro público** para voluntários se inscreverem
- **Papéis**: admin (organizadores) e colaborador (voluntário/apoio)
- Proteção de rotas administrativas

## 2. Formulário de Cadastro Público
- Nome completo, email, telefone, CPF
- Curso e período (se aluno UNIFEBE)
- Tipo de vínculo: Aluno / Funcionário / Externo
- Área de interesse para atuação (recepção, logística, apoio técnico, etc.)
- Disponibilidade de horários (manhã/tarde/noite por dia do evento)
- Aceite de termo de compromisso

## 3. Painel Administrativo
- **Dashboard** com contadores: total de inscritos, por área, por disponibilidade
- **Lista de colaboradores** com busca, filtros (área, status, disponibilidade) e ordenação
- **Aprovação/rejeição** de inscrições
- **Alocação** de colaboradores em atividades/setores
- Edição e exclusão de registros

## 4. Controle de Presença
- Registro de check-in/check-out por dia do evento
- Visualização de presença por colaborador e por dia
- Status: presente, ausente, atrasado

## 5. Certificados
- Geração automática de certificado de participação (PDF)
- Baseado na presença registrada (horas de voluntariado)
- Nome do colaborador, atividade, carga horária

## 6. Relatórios
- Relatório geral de colaboradores (exportável em CSV)
- Relatório de presença por dia
- Resumo por área de atuação

## 7. Design e UX
- Visual limpo e institucional, com cores da UNIFEBE (azul e branco)
- Responsivo para mobile (check-in no celular)
- Navegação com sidebar no painel admin
- Feedback com toasts para ações (cadastro, aprovação, etc.)

## Estrutura de Páginas
| Página | Acesso |
|--------|--------|
| `/` | Landing page com info do evento e botão de inscrição |
| `/cadastro` | Formulário público de inscrição |
| `/login` | Login para admin e colaboradores |
| `/painel` | Dashboard administrativo |
| `/painel/colaboradores` | Lista e gestão de colaboradores |
| `/painel/presenca` | Controle de presença |
| `/painel/relatorios` | Relatórios e exportação |
| `/painel/certificados` | Geração de certificados |

## Backend
- **Lovable Cloud** para autenticação e banco de dados
- Tabelas: colaboradores, atividades, presença, user_roles
- RLS para segurança de dados
