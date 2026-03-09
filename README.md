# Rede reab.LITA (tablet) — Documentação Completa do Protótipo Codificado Experimental
# Versão Tablet

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura e Tecnologias](#2-arquitetura-e-tecnologias)
3. [Estrutura de Diretórios](#3-estrutura-de-diretórios)
4. [Design System](#4-design-system)
5. [Internacionalização (i18n)](#5-internacionalização-i18n)
6. [Rotas e Navegação](#6-rotas-e-navegação)
7. [Páginas](#7-páginas)
8. [Componentes](#8-componentes)
9. [Modelo de Dados (Banco de Dados)](#9-modelo-de-dados-banco-de-dados)
10. [Autenticação e Autorização](#10-autenticação-e-autorização)
11. [Build Nativo (Capacitor)](#11-build-nativo-capacitor)
12. [Scripts e Desenvolvimento](#12-scripts-e-desenvolvimento)
13. [Glossário](#13-glossário)

---

## 1. Visão Geral

**reab.LITA** é uma aplicação web/mobile para aplicação de testes audiométricos por facilitadores treinados, desenvolvida para a Rede reab.LITA. A plataforma permite:

- **Triagem auditiva pediátrica** (módulo aud.IT) — foco em crianças em ambiente escolar.
- **Triagem auditiva rápida** (módulo Ouvir Brasil) — para adultos acima de 18 anos.
- **Gerenciamento de participantes** — cadastro completo com dados pessoais, contatos, endereço e informações clínicas, persistido em banco de dados.
- **Resultados de testes** — armazenamento e consulta de resultados audiométricos com status e indicação de reavaliação.
- **Checagem de ruído ambiente** — verificação com gauge interativo para garantir ambiente adequado ao teste.
- **Controle de acesso** — autenticação real com e-mail/senha, proteção de rotas, perfis de usuário e papéis (admin, facilitador, pesquisador).
- **Solicitação de acesso** — formulário público para novos usuários com fluxo de aprovação por administradores.

A aplicação opera em conformidade com a **LGPD** (Lei Geral de Proteção de Dados).

---

## 2. Arquitetura e Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React | ^18.3.1 |
| Linguagem | TypeScript | ^5.8.3 |
| Build | Vite | ^5.4.19 |
| Estilização | Tailwind CSS | ^3.4.17 |
| Componentes UI | shadcn/ui (Radix UI) | Vários |
| Roteamento | React Router DOM | ^6.30.1 |
| Estado servidor | TanStack React Query | ^5.83.0 |
| Formulários | React Hook Form + Zod | ^7.61.1 / ^3.25.76 |
| Ícones | Lucide React | ^0.462.0 |
| Gráficos | Recharts | ^2.15.4 |
| Notificações | Sonner | ^1.7.4 |
| Backend | Lovable Cloud (Supabase) | ^2.98.0 |
| Nativo (mobile) | Capacitor | ^8.1.0 |
| Testes | Vitest + Testing Library | ^3.2.4 |

### Decisões Arquiteturais

- **SPA (Single Page Application)** com roteamento client-side.
- **Backend integrado via Lovable Cloud** — banco de dados PostgreSQL, autenticação, Edge Functions e Row-Level Security (RLS).
- **Autenticação real** com sessões persistentes via Supabase Auth.
- **Proteção de rotas** com componente `ProtectedRoute` que redireciona usuários não autenticados.
- **Dados persistidos em banco** — participantes, resultados de testes, perfis de usuário, solicitações de acesso e papéis.
- **Internacionalização própria** — sistema leve baseado em `useSyncExternalStore` sem dependência de bibliotecas i18n externas.
- **Design tokens semânticos** em CSS via variáveis HSL — todas as cores são definidas em `index.css` e referenciadas via Tailwind.
- **Validação de CPF** — validação algorítmica completa implementada em `src/lib/cpf.ts`.
- **Consulta de CEP** — integração com API ViaCEP via hook `use-cep.ts`.

---

## 3. Estrutura de Diretórios

```
reab-lita/
├── public/                    # Arquivos estáticos (favicon, robots.txt)
├── supabase/
│   ├── config.toml            # Configuração do projeto Lovable Cloud
│   └── functions/             # Edge Functions
│       └── create-test-user/  # Função para criação de usuário de teste
├── src/
│   ├── assets/               # Imagens e logos
│   │   ├── logo-audit.png    # Logo do módulo aud.IT
│   │   └── logo-ouvir-brasil.png  # Logo do módulo Ouvir Brasil
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes shadcn/ui (Radix UI primitives)
│   │   ├── AppHeader.tsx    # Cabeçalho global com seletor de idioma e menu
│   │   ├── CancelWarningModal.tsx  # Modal de confirmação de cancelamento
│   │   ├── ConfirmParticipantsModal.tsx  # Modal de confirmação de participantes
│   │   ├── InfoBanner.tsx   # Banner informativo (info/warning)
│   │   ├── NavLink.tsx      # Link de navegação
│   │   ├── OptionsSidebar.tsx  # Barra lateral de opções/navegação
│   │   ├── PageHeader.tsx   # Sub-cabeçalho de página com breadcrumb
│   │   ├── ParticipantRegistrationModal.tsx  # Formulário completo de cadastro
│   │   ├── ParticipantsTable.tsx  # Tabela de participantes com filtros e paginação
│   │   ├── ProtectedRoute.tsx  # Proteção de rotas autenticadas
│   │   └── SelectParticipantsModal.tsx  # Modal de seleção de participantes
│   ├── hooks/               # Hooks customizados
│   │   ├── use-cep.ts       # Consulta de endereço via CEP (API ViaCEP)
│   │   ├── use-mobile.tsx   # Detecção de dispositivo mobile
│   │   ├── use-toast.ts     # Hook de notificações toast
│   │   └── useAuth.tsx      # Contexto de autenticação (AuthProvider/useAuth)
│   ├── integrations/        # Integrações com serviços externos
│   │   └── supabase/
│   │       ├── client.ts    # Cliente Supabase (auto-gerado)
│   │       └── types.ts     # Tipos do banco de dados (auto-gerado)
│   ├── lib/                 # Utilitários e lógica
│   │   ├── cpf.ts           # Validação e formatação de CPF
│   │   ├── data.ts          # Modelo de dados legado (mock — não mais utilizado)
│   │   ├── i18n.ts          # Sistema de internacionalização
│   │   ├── participants.ts  # CRUD de participantes via banco de dados
│   │   └── utils.ts         # Utilitários (cn helper)
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx     # Página inicial com módulos
│   │   ├── Index.tsx        # Redirecionamento
│   │   ├── InstructionsPage.tsx  # Instruções para o facilitador
│   │   ├── LoginPage.tsx    # Página de login (autenticação real)
│   │   ├── ManageParticipantsPage.tsx  # Gerenciamento de participantes
│   │   ├── NoiseCheckPage.tsx  # Checagem de ruído ambiente
│   │   ├── NotFound.tsx     # Página 404
│   │   ├── PanelPage.tsx    # Painel aud.IT
│   │   └── RequestAccessPage.tsx  # Solicitação de acesso (persiste no banco)
│   ├── test/                # Configuração de testes
│   ├── App.tsx              # Componente raiz com rotas e providers
│   ├── index.css            # Design tokens e estilos globais
│   └── main.tsx             # Entry point
├── capacitor.config.ts      # Configuração Capacitor (Android/iOS)
├── tailwind.config.ts       # Configuração Tailwind com tokens customizados
├── vite.config.ts           # Configuração Vite
└── vitest.config.ts         # Configuração de testes
```

---

## 4. Design System

### 4.1 Cores (Tokens Semânticos HSL)

Todas as cores são definidas em `src/index.css` como variáveis CSS HSL e mapeadas no `tailwind.config.ts`:

| Token | Uso | Valor HSL |
|-------|-----|-----------|
| `--primary` | Cor principal (botões, links, destaques) | `201 76% 40%` |
| `--foreground` | Texto principal | `210 20% 20%` |
| `--muted-foreground` | Texto secundário | `210 10% 50%` |
| `--background` | Fundo da aplicação | `0 0% 100%` |
| `--border` | Bordas e separadores | `210 20% 88%` |
| `--destructive` | Ações destrutivas (vermelho) | `0 72% 51%` |
| `--info` | Banners informativos | `201 76% 94%` |
| `--warning` | Banners de alerta | `45 100% 94%` |
| `--success` | Indicadores de sucesso | `142 50% 90%` |
| `--badge-audit` | Badge do módulo aud.IT | `201 76% 92%` |
| `--badge-ouvir` | Badge do módulo Ouvir Brasil | `15 80% 92%` |
| `--badge-normal` | Badge status "Normal" | `200 20% 94%` |
| `--badge-altered` | Badge status "Alterado" | `45 90% 90%` |

### 4.2 Tipografia

- **Fonte principal**: Open Sans (importada via Google Fonts)
- **Pesos utilizados**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### 4.3 Componentes Base (shadcn/ui)

A aplicação inclui uma biblioteca completa de componentes shadcn/ui pré-configurados em `src/components/ui/`, incluindo: Accordion, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Checkbox, Dialog, Dropdown Menu, Form, Input, Label, Popover, Progress, Radio Group, Select, Separator, Sheet, Sidebar, Skeleton, Switch, Table, Tabs, Toast, Toggle, Tooltip, entre outros.

### 4.4 Classes Utilitárias Customizadas

Definidas em `@layer components` no `index.css`:

```css
.info-banner  → bg-info text-info-foreground rounded-md p-3 text-sm
.page-header  → border-b border-border px-4 py-2 text-sm text-muted-foreground
.section-title → text-lg font-bold text-foreground mb-1
```

---

## 5. Internacionalização (i18n)

### 5.1 Implementação

O sistema i18n é implementado de forma leve em `src/lib/i18n.ts` usando:

- `useSyncExternalStore` para reatividade global sem re-renders desnecessários.
- Armazenamento do locale no `localStorage` com fallback para `'pt'`.
- Sem dependência de bibliotecas externas.

### 5.2 Idiomas Suportados

| Código | Idioma |
|--------|--------|
| `pt` | Português (Brasil) — padrão |
| `en` | English |
| `es` | Español |

### 5.3 Uso

```tsx
import { useI18n } from '@/lib/i18n';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  return <h1>{t('home.welcome')}</h1>;
}
```

### 5.4 Namespaces de Chaves

| Prefixo | Contexto |
|---------|----------|
| `login.*` | Página de login |
| `home.*` | Página inicial |
| `panel.*` | Painel aud.IT |
| `instructions.*` | Instruções do facilitador |
| `noise.*` | Checar ruído ambiente |
| `manage.*` | Gerenciar participantes |
| `register.*` | Cadastro de participante |
| `confirm.*` | Confirmação de participantes |
| `cancel.*` | Modais de cancelamento |
| `request.*` | Solicitação de acesso |
| `common.*` | Termos genéricos (Sim/Não, Selecione) |
| `sidebar.*` | Barra lateral de opções |

---

## 6. Rotas e Navegação

| Rota | Página | Autenticação | Descrição |
|------|--------|-------------|-----------|
| `/` | `LoginPage` | Não | Página de login com autenticação real |
| `/request-access` | `RequestAccessPage` | Não | Formulário de solicitação de acesso |
| `/home` | `HomePage` | **Sim** | Página inicial com módulos |
| `/panel` | `PanelPage` | **Sim** | Painel aud.IT com seleção de participantes |
| `/instructions` | `InstructionsPage` | **Sim** | Instruções para o facilitador |
| `/noise-check` | `NoiseCheckPage` | **Sim** | Verificação de ruído ambiente |
| `/manage-participants` | `ManageParticipantsPage` | **Sim** | Gerenciamento de participantes |
| `*` | `NotFound` | — | Página 404 |

> Rotas protegidas utilizam o componente `ProtectedRoute` que verifica a sessão ativa via Supabase Auth. Usuários não autenticados são redirecionados para `/`.

### Navegação via Barra Lateral (OptionsSidebar)

A barra lateral está disponível em todas as telas autenticadas e oferece acesso rápido a:

- Instruções para o facilitador → `/instructions`
- Checar ruído ambiente → `/noise-check`
- Protocolo de teste → *(desabilitado)*
- Calibração → *(desabilitado)*
- Gerenciar participantes → `/manage-participants`
- Gerenciar facilitadores → *(sem rota definida)*
- Editar perfil → *(sem rota definida)*
- Sair → executa `signOut()` e redireciona para `/`

---

## 7. Páginas

### 7.1 LoginPage (`/`)

- Formulário com campos de e-mail e senha.
- **Autenticação real** via Supabase Auth (`signInWithPassword`).
- Exibe mensagens de erro em caso de credenciais inválidas.
- Links para "Esqueci minha senha", "Solicitar acesso" e "Entrar com GOV".
- Banner LGPD informativo.

### 7.2 RequestAccessPage (`/request-access`)

- Formulário extenso com seções:
  - Tipo de acesso (dropdown)
  - Dados de identificação (CPF com validação, nome, data de nascimento, nome social)
  - Contatos (e-mail, confirmação, telefones)
  - Dados profissionais (registro, função no sistema)
  - Endereço institucional (CEP com auto-preenchimento via ViaCEP, estado, cidade, bairro, logradouro, número, complemento, tipo)
- **Persiste dados na tabela `access_requests`** do banco de dados.
- Banner LGPD de aviso.
- Botões "Cancelar" e "Enviar".

### 7.3 HomePage (`/home`)

- Saudação ao usuário.
- Dois cards de módulos:
  - **Ouvir Brasil**: triagem auditiva rápida para adultos (+18). Botões: "Painel Ouvir Brasil" e "Iniciar teste".
  - **aud.IT**: triagem auditiva pediátrica para crianças. Botões: "Painel aud.IT" (navega para `/panel`) e "Iniciar teste" (abre modal de seleção de participantes).
- Badges com contagem de participantes.
- Logos dos módulos exibidos nos cards.

### 7.4 PanelPage (`/panel`)

- Logo aud.IT no topo.
- Quatro botões de etapas: Instruções, Checar ruído, Protocolo (desabilitado), Calibração (desabilitado).
- Seção de seleção de participantes com:
  - Botão "Cadastrar participante" (abre modal de cadastro — persiste no banco).
  - Campo de busca.
  - Banner informativo com instruções.
  - **Tabela de participantes com dados do banco de dados**, filtros, seleção múltipla e paginação.
- Botão "Iniciar teste" que abre o modal de confirmação.

### 7.5 InstructionsPage (`/instructions`)

- Título e subtítulo explicativos.
- Três seções expansíveis (accordion manual):
  - Lista de verificação básica
  - Principais dúvidas (FAQ)
  - Responsabilidades do facilitador

### 7.6 NoiseCheckPage (`/noise-check`)

- Gauge SVG interativo com três zonas:
  - 🟢 Verde (0–20 dB): ambiente adequado
  - 🟡 Amarelo (20–40 dB): atenção
  - 🔴 Vermelho (40–60 dB): ambiente inadequado
- Ponteiro animado com transição CSS.
- Botão "Testar ruído ambiente" que simula medição por 3 segundos com flutuações aleatórias.
- Exibe valor em dB em tempo real.

### 7.7 ManageParticipantsPage (`/manage-participants`)

- **Tabela de participantes carregada do banco de dados** com:
  - Filtros (status auditivo, necessidade de reavaliação, teste realizado)
  - Seleção múltipla via checkbox
  - Paginação com controle de linhas por página
  - Botão de download/exportação
- Botão "Cadastrar participante" (persiste no banco).
- Campo de busca.

---

## 8. Componentes

### 8.1 AppHeader

Cabeçalho global presente em todas as páginas.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `showMenu` | `boolean` | Exibe botão de menu hamburger |
| `onMenuClick` | `() => void` | Callback ao clicar no menu |

**Funcionalidades**:
- Exibe logo "REDE reab•LITA".
- Seletor de idioma (PT-BR, EN, ES) com dropdown.
- Botão de menu (quando `showMenu=true`) com ícone azul.

### 8.2 PageHeader

Sub-cabeçalho com título da página e navegação.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título exibido |
| `showBack` | `boolean` | Mostra botão voltar (chevron) |
| `showLearnMore` | `boolean` | Mostra botão "Saiba mais" |

### 8.3 InfoBanner

Banner informativo com ícone ℹ️.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `text` | `string` | Texto do banner |
| `variant` | `'info' \| 'warning'` | Estilo visual (azul claro ou amarelo) |

### 8.4 OptionsSidebar

Drawer lateral direito com navegação e ações do usuário.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `open` | `boolean` | Controla visibilidade |
| `onClose` | `() => void` | Callback ao fechar |

**Seções**:
- Info do usuário (avatar, nome do perfil, papel).
- Links de navegação para páginas internas.
- Ações: "Editar perfil" e "Sair" (executa `signOut`).

### 8.5 ParticipantsTable

Tabela de dados carregada do banco de dados.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `selectedIds` | `string[]` | IDs selecionados |
| `onSelectionChange` | `(ids: string[]) => void` | Callback de seleção |
| `showLinesPerPage` | `boolean` | Exibe controle de linhas por página |
| `refreshKey` | `number` | Chave para forçar recarga dos dados |

**Colunas**: Nome completo, Teste realizado (badge), Data do último teste, Status auditivo (badge), Necessita reavaliação (badge), Ações.

**Funcionalidades**: Seleção individual e em massa, paginação com navegação (primeira, anterior, próxima, última), filtros por dropdown, botão de download, exclusão de participante.

### 8.6 ParticipantRegistrationModal

Formulário modal completo para cadastro de participante. **Persiste dados na tabela `participants`**.

**Seções do formulário**:
1. **Dados de identificação**: CPF* (com validação algorítmica), Nome completo*, Data de nascimento*, Nome social, RG*, Órgão expedidor*, Data de expedição*
2. **Dados complementares**: Sexo biológico, Identidade de gênero, Raça/Cor, Nome da mãe*, Nome do pai
3. **Contatos**: E-mail pessoal, Telefone
4. **Endereço**: CEP (com auto-preenchimento via ViaCEP), Estado, Cidade, Bairro, Logradouro, Número, Complemento
5. **Informações adicionais**: Instituição/Escola*, Professor responsável, Queixa auditiva*, Detalhes da queixa (habilitado condicionalmente), Observações
6. **Documentos**: Upload de arquivos (para menores de 18 anos)

> *Campos marcados com ◆ são obrigatórios.*

Ao cancelar, exibe `CancelWarningModal` com confirmação.

### 8.7 SelectParticipantsModal

Modal bottom-sheet para seleção rápida de participantes antes do teste.

- **Carrega participantes do banco de dados**.
- Lista com checkbox para cada participante.
- Exibe badge do tipo de teste (aud.IT ou Ouvir Brasil).
- Botão "Iniciar teste" que abre `ConfirmParticipantsModal`.

### 8.8 ConfirmParticipantsModal

Modal de confirmação da lista de participantes selecionados.

- Lista ordenável com ícone de grip (drag handle).
- Botão de remoção individual (ícone lixeira).
- Botão "Iniciar teste" para confirmar.
- Botão "Cancelar teste" que abre `CancelWarningModal`.

### 8.9 CancelWarningModal

Modal genérico de advertência para ações de cancelamento.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título do modal |
| `message` | `string` | Mensagem de aviso |
| `confirmLabel` | `string` | Texto do botão de confirmação |
| `onBack` | `() => void` | Callback "Voltar" |
| `onConfirm` | `() => void` | Callback "Confirmar" |

**Estilo**: Fundo creme (`hsl(45, 60%, 93%)`), botão âmbar (`hsl(42, 95%, 55%)`).

### 8.10 ProtectedRoute

Componente wrapper que protege rotas autenticadas.

- Exibe spinner durante carregamento da sessão.
- Redireciona para `/` se o usuário não estiver autenticado.
- Renderiza `children` se autenticado.

---

## 9. Modelo de Dados (Banco de Dados)

A aplicação utiliza **Lovable Cloud** com banco PostgreSQL. Todas as tabelas possuem **Row-Level Security (RLS)** habilitada.

### 9.1 Tabela `participants`

Armazena dados dos participantes de testes audiométricos.

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | Sim (auto) | Identificador único |
| `full_name` | text | Sim | Nome completo |
| `cpf` | text | Sim | CPF do participante |
| `birth_date` | date | Sim | Data de nascimento |
| `social_name` | text | Não | Nome social |
| `rg` | text | Não | RG |
| `issuing_body` | text | Não | Órgão expedidor |
| `issue_date` | date | Não | Data de expedição |
| `bio_sex` | text | Não | Sexo biológico |
| `gender_identity` | text | Não | Identidade de gênero |
| `race` | text | Não | Raça/Cor |
| `mother_name` | text | Sim | Nome da mãe |
| `father_name` | text | Não | Nome do pai |
| `email` | text | Não | E-mail |
| `phone` | text | Não | Telefone |
| `cep` | text | Não | CEP |
| `state` | text | Não | Estado |
| `city` | text | Não | Cidade |
| `neighborhood` | text | Não | Bairro |
| `street` | text | Não | Logradouro |
| `number` | text | Não | Número |
| `complement` | text | Não | Complemento |
| `institution` | text | Não | Instituição/Escola |
| `teacher` | text | Não | Professor responsável |
| `hearing_complaint` | text | Não | Queixa auditiva |
| `complaint_details` | text | Não | Detalhes da queixa |
| `observations` | text | Não | Observações |
| `created_by` | uuid | Sim | ID do usuário que criou |
| `created_at` | timestamptz | Sim (auto) | Data de criação |
| `updated_at` | timestamptz | Sim (auto) | Data de atualização |

**Políticas RLS**:
- Usuários autenticados podem visualizar todos os participantes.
- Usuários podem inserir participantes vinculados ao seu próprio ID.
- Usuários podem atualizar/excluir apenas participantes que criaram.

### 9.2 Tabela `test_results`

Armazena resultados de testes audiométricos.

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | Sim (auto) | Identificador único |
| `participant_id` | uuid | Sim | FK → `participants.id` |
| `performed_by` | uuid | Sim | ID do usuário que realizou |
| `test_type` | enum | Sim | `'audit'` ou `'ouvir_brasil'` |
| `hearing_status` | enum | Sim | `'normal'` ou `'altered'` (default: `'normal'`) |
| `needs_reevaluation` | boolean | Sim | Necessita reavaliação (default: `false`) |
| `noise_level_db` | numeric | Não | Nível de ruído em dB |
| `notes` | text | Não | Observações do teste |
| `performed_at` | timestamptz | Sim (auto) | Data/hora do teste |
| `created_at` | timestamptz | Sim (auto) | Data de criação |

**Políticas RLS**:
- Usuários autenticados podem visualizar todos os resultados.
- Usuários podem inserir resultados vinculados ao seu próprio ID.

### 9.3 Tabela `profiles`

Armazena dados do perfil do usuário. Criada automaticamente via trigger `handle_new_user` ao registrar um novo usuário.

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | Sim (auto) | Identificador único |
| `user_id` | uuid | Sim | ID do usuário (auth.users) |
| `full_name` | text | Sim | Nome completo (default: `''`) |
| `cpf` | text | Não | CPF |
| `social_name` | text | Não | Nome social |
| `phone` | text | Não | Telefone |
| `institution` | text | Não | Instituição |
| `created_at` | timestamptz | Sim (auto) | Data de criação |
| `updated_at` | timestamptz | Sim (auto) | Data de atualização |

**Políticas RLS**:
- Usuários podem visualizar, inserir e atualizar apenas seu próprio perfil.

### 9.4 Tabela `access_requests`

Armazena solicitações de acesso de novos usuários.

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | Sim (auto) | Identificador único |
| `full_name` | text | Sim | Nome completo |
| `cpf` | text | Sim | CPF |
| `email` | text | Sim | E-mail |
| `confirm_email` | text | Sim | Confirmação de e-mail |
| `personal_phone` | text | Sim | Telefone pessoal |
| `institutional_phone` | text | Não | Telefone institucional |
| `birth_date` | date | Não | Data de nascimento |
| `social_name` | text | Não | Nome social |
| `access_type` | text | Não | Tipo de acesso |
| `professional_register` | text | Não | Registro profissional |
| `system_function` | text | Não | Função no sistema |
| `institution_type` | text | Não | Tipo de instituição |
| `cep` | text | Não | CEP |
| `state` | text | Não | Estado |
| `city` | text | Não | Cidade |
| `neighborhood` | text | Não | Bairro |
| `street` | text | Não | Logradouro |
| `number` | text | Não | Número |
| `complement` | text | Não | Complemento |
| `status` | enum | Sim | `'pending'`, `'approved'` ou `'rejected'` (default: `'pending'`) |
| `created_at` | timestamptz | Sim (auto) | Data de criação |
| `updated_at` | timestamptz | Sim (auto) | Data de atualização |

**Políticas RLS**:
- Qualquer pessoa (anon/authenticated) pode inserir solicitações (com validação de campos obrigatórios).
- Apenas administradores podem visualizar e atualizar solicitações.

### 9.5 Tabela `user_roles`

Armazena papéis dos usuários para controle de acesso.

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | Sim (auto) | Identificador único |
| `user_id` | uuid | Sim | ID do usuário |
| `role` | enum | Sim | `'admin'`, `'facilitator'` ou `'researcher'` |

**Constraint**: Combinação `(user_id, role)` é única.

**Políticas RLS**:
- Usuários podem visualizar apenas seus próprios papéis.
- Inserção, atualização e exclusão não são permitidas via cliente.

### 9.6 Enums do Banco

| Enum | Valores | Uso |
|------|---------|-----|
| `app_role` | `admin`, `facilitator`, `researcher` | Papéis de usuário |
| `hearing_status` | `normal`, `altered` | Status auditivo |
| `request_status` | `pending`, `approved`, `rejected` | Status de solicitação |
| `test_type` | `audit`, `ouvir_brasil` | Tipo de teste |

### 9.7 Funções do Banco

| Função | Tipo | Descrição |
|--------|------|-----------|
| `has_role(_user_id, _role)` | `SECURITY DEFINER` | Verifica se um usuário possui determinado papel |
| `handle_new_user()` | Trigger | Cria perfil automaticamente ao registrar novo usuário |
| `update_updated_at_column()` | Trigger | Atualiza `updated_at` automaticamente |

### 9.8 Camada de Acesso a Dados (`src/lib/participants.ts`)

```typescript
// Interfaces
interface ParticipantRow { /* campos da tabela participants */ }
interface ParticipantWithTest extends ParticipantRow {
  testPerformed: string;       // 'Aud.IT' ou 'Ouvir Brasil'
  lastTestDate: string;        // Data formatada (dd/mm/yyyy)
  hearingStatus: string;       // 'Normal' ou 'Alterado'
  needsReevaluation: boolean;  // Necessita reavaliação
}

// Funções
fetchParticipants(): Promise<ParticipantWithTest[]>  // Lista com dados de teste
createParticipant(data): Promise<ParticipantRow>      // Cria participante
deleteParticipant(id): Promise<void>                  // Exclui participante
```

---

## 10. Autenticação e Autorização

### 10.1 Fluxo de Autenticação

1. Usuário acessa `/` (LoginPage).
2. Insere e-mail e senha.
3. `signInWithPassword` é chamado via Supabase Auth.
4. Se válido, sessão é criada e armazenada no `localStorage`.
5. `AuthProvider` detecta mudança de estado e carrega perfil do usuário.
6. Usuário é redirecionado para `/home`.

### 10.2 AuthProvider (`src/hooks/useAuth.tsx`)

Contexto React que fornece:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `user` | `User \| null` | Usuário autenticado |
| `session` | `Session \| null` | Sessão ativa |
| `loading` | `boolean` | Carregando sessão |
| `signIn(email, password)` | `function` | Login |
| `signOut()` | `function` | Logout |
| `profile` | `{ full_name, institution } \| null` | Dados do perfil |

### 10.3 Proteção de Rotas

O componente `ProtectedRoute` envolve todas as rotas autenticadas:

```tsx
<Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
```

- Exibe spinner enquanto `loading === true`.
- Redireciona para `/` se `user === null`.

### 10.4 Credenciais de Teste

| Campo | Valor |
|-------|-------|
| E-mail | `teste@reablita.com` |
| Senha | `Teste@123` |

---

## 11. Build Nativo (Capacitor)

A aplicação está configurada para build nativo via **Capacitor** para Android e iOS.

### Configuração (`capacitor.config.ts`)

```typescript
{
  appId: 'app.lovable.8977c253f7ff487583f48169c5cd1c3f',
  appName: 'reab.LITA',
  webDir: 'dist',
  server: {
    url: 'https://8977c253-f7ff-4875-83f4-8169c5cd1c3f.lovableproject.com',
    cleartext: true,
  }
}
```

### Plataformas Configuradas

- `@capacitor/android` ^8.1.0
- `@capacitor/ios` ^8.1.0

---

## 12. Scripts e Desenvolvimento

### Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Build de desenvolvimento
npm run build:dev

# Lint
npm run lint

# Preview do build
npm run preview

# Rodar testes (uma vez)
npm run test

# Rodar testes em modo watch
npm run test:watch
```

### Pré-requisitos

- **Node.js** (recomendado via nvm)
- **Bun** (gerenciador de pacotes utilizado)

### Variáveis de Ambiente

Gerenciadas automaticamente pelo Lovable Cloud:

| Variável | Descrição |
|----------|-----------|
| `VITE_SUPABASE_URL` | URL do projeto backend |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública (anon key) |
| `VITE_SUPABASE_PROJECT_ID` | ID do projeto |

---

## 13. Glossário

| Termo | Definição |
|-------|-----------|
| **aud.IT** | Módulo de triagem auditiva pediátrica para crianças em ambiente escolar |
| **Ouvir Brasil** | Módulo de triagem auditiva rápida para adultos acima de 18 anos |
| **Facilitador** | Profissional treinado autorizado a aplicar os testes audiométricos |
| **LGPD** | Lei Geral de Proteção de Dados — legislação brasileira de privacidade |
| **Participante** | Pessoa que realiza o teste audiométrico |
| **Status auditivo** | Resultado do teste: "Normal" ou "Alterado" |
| **Reavaliação** | Indicação de que o participante precisa refazer o teste |
| **dB NA** | Decibéis de nível de audição — unidade de medida do ruído ambiente |
| **CEP** | Código de Endereçamento Postal brasileiro |
| **CPF** | Cadastro de Pessoas Físicas — identificador fiscal brasileiro |
| **RG** | Registro Geral — documento de identidade brasileiro |
| **GOV** | Sistema de autenticação do governo brasileiro (gov.br) |
| **RLS** | Row-Level Security — políticas de segurança a nível de linha no banco de dados |
| **Edge Function** | Função serverless executada no backend |
| **Lovable Cloud** | Plataforma de backend integrada (banco de dados, autenticação, storage) |

---

## Fluxo Principal do Usuário

```
Login (/) — autenticação real
  ↓
Home (/home)
  ↓
Painel aud.IT (/panel)
  ├── Instruções (/instructions)
  ├── Checar ruído (/noise-check)
  ├── Cadastrar participante (modal → banco de dados)
  ├── Selecionar participantes (tabela → banco de dados)
  ├── Confirmar participantes (modal)
  └── Iniciar teste
```

```
Login (/)
  ↓
Solicitar acesso (/request-access)
  ↓
Formulário → Enviar (persiste no banco → aguarda aprovação admin)
```

---

## Dados de Teste

A aplicação possui **20 participantes** cadastrados no banco de dados para testes:

- **10 participantes aud.IT** (crianças, 4-8 anos): Ana Clara Santos, Bruno Oliveira, Camila Ferreira, Diego Souza, Elena Costa, Felipe Lima, Gabriela Alves, Henrique Martins, Isabela Rocha, João Pedro Silva.
- **10 participantes Ouvir Brasil** (adultos): Laura Mendes, Marcos Pereira, Natália Ribeiro, Oscar Barbosa, Patrícia Nunes, Ricardo Gomes, Silvia Cardoso, Thiago Araújo, Úrsula Dias, Vinícius Torres.

Cada participante possui um resultado de teste associado com status auditivo (normal/alterado) e indicação de reavaliação.

---

*Documentação atualizada em 09/03/2026 para o projeto reab.LITA.*
---

## Licença

©2026 Rede reab.LITA. Todos os direitos reservados.

Hospital Universitário Onofre Lopes (HUOL) — Universidade Federal do Rio Grande do Norte (UFRN)
