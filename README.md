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
9. [Modelo de Dados](#9-modelo-de-dados)
10. [Build Nativo (Capacitor)](#10-build-nativo-capacitor)
11. [Scripts e Desenvolvimento](#11-scripts-e-desenvolvimento)
12. [Glossário](#12-glossário)

---

## 1. Visão Geral

**reab.LITA** é uma aplicação web/mobile para aplicação de testes audiométricos por facilitadores treinados, desenvolvida para a Rede reab.LITA. A plataforma permite:

- **Triagem auditiva pediátrica** (módulo aud.IT) — foco em crianças em ambiente escolar.
- **Triagem auditiva rápida** (módulo Ouvir Brasil) — para adultos acima de 18 anos.
- **Gerenciamento de participantes** — cadastro completo com dados pessoais, contatos, endereço e informações clínicas.
- **Checagem de ruído ambiente** — verificação com gauge interativo para garantir ambiente adequado ao teste.
- **Controle de acesso** — login, solicitação de acesso e perfis de facilitador.

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
| Nativo (mobile) | Capacitor | ^8.1.0 |
| Testes | Vitest + Testing Library | ^3.2.4 |

### Decisões Arquiteturais

- **SPA (Single Page Application)** com roteamento client-side.
- **Dados mock em memória** (`src/lib/data.ts`) — sem backend conectado (preparado para integração futura com Lovable Cloud/Supabase).
- **Internacionalização própria** — sistema leve baseado em `useSyncExternalStore` sem dependência de bibliotecas i18n externas.
- **Design tokens semânticos** em CSS via variáveis HSL — todas as cores são definidas em `index.css` e referenciadas via Tailwind.

---

## 3. Estrutura de Diretórios

```
reab-lita/
├── public/                    # Arquivos estáticos (favicon, robots.txt)
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
│   │   └── SelectParticipantsModal.tsx  # Modal de seleção de participantes
│   ├── hooks/               # Hooks customizados
│   │   ├── use-mobile.tsx   # Detecção de dispositivo mobile
│   │   └── use-toast.ts     # Hook de notificações toast
│   ├── lib/                 # Utilitários e lógica
│   │   ├── data.ts          # Modelo de dados e mock store
│   │   ├── i18n.ts          # Sistema de internacionalização
│   │   └── utils.ts         # Utilitários (cn helper)
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx     # Página inicial com módulos
│   │   ├── InstructionsPage.tsx  # Instruções para o facilitador
│   │   ├── LoginPage.tsx    # Página de login
│   │   ├── ManageParticipantsPage.tsx  # Gerenciamento de participantes
│   │   ├── NoiseCheckPage.tsx  # Checagem de ruído ambiente
│   │   ├── NotFound.tsx     # Página 404
│   │   ├── PanelPage.tsx    # Painel aud.IT
│   │   └── RequestAccessPage.tsx  # Solicitação de acesso
│   ├── test/                # Configuração de testes
│   ├── App.tsx              # Componente raiz com rotas
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
| `/` | `LoginPage` | Não | Página de login |
| `/request-access` | `RequestAccessPage` | Não | Formulário de solicitação de acesso |
| `/home` | `HomePage` | Sim* | Página inicial com módulos |
| `/panel` | `PanelPage` | Sim* | Painel aud.IT com seleção de participantes |
| `/instructions` | `InstructionsPage` | Sim* | Instruções para o facilitador |
| `/noise-check` | `NoiseCheckPage` | Sim* | Verificação de ruído ambiente |
| `/manage-participants` | `ManageParticipantsPage` | Sim* | Gerenciamento de participantes |
| `*` | `NotFound` | — | Página 404 |

> *\* Autenticação simulada — não há proteção de rotas implementada. A navegação é feita via `react-router-dom`.*

### Navegação via Barra Lateral (OptionsSidebar)

A barra lateral está disponível em todas as telas autenticadas e oferece acesso rápido a:

- Instruções para o facilitador → `/instructions`
- Checar ruído ambiente → `/noise-check`
- Protocolo de teste → *(desabilitado)*
- Calibração → *(desabilitado)*
- Gerenciar participantes → `/manage-participants`
- Gerenciar facilitadores → *(sem rota definida)*
- Editar perfil → *(sem rota definida)*
- Sair → redireciona para `/`

---

## 7. Páginas

### 7.1 LoginPage (`/`)

- Formulário com campos de e-mail e senha.
- Botão "Acessar" que redireciona para `/home` (sem validação real).
- Links para "Esqueci minha senha", "Solicitar acesso" e "Entrar com GOV".
- Banner LGPD informativo.

### 7.2 RequestAccessPage (`/request-access`)

- Formulário extenso com seções:
  - Tipo de acesso (dropdown)
  - Dados de identificação (CPF, nome, data de nascimento, nome social)
  - Contatos (e-mail, confirmação, telefones)
  - Dados profissionais (registro, função no sistema)
  - Endereço institucional (CEP, estado, cidade, bairro, logradouro, número, complemento, tipo)
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
  - Botão "Cadastrar participante" (abre modal de cadastro).
  - Campo de busca.
  - Banner informativo com instruções.
  - Tabela de participantes com filtros, seleção múltipla e paginação.
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

- Tabela de participantes cadastrados com:
  - Filtros (status auditivo, necessidade de reavaliação, teste realizado)
  - Seleção múltipla via checkbox
  - Paginação com controle de linhas por página
  - Botão de download/exportação
- Botão "Cadastrar participante".
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
- Info do usuário (avatar, nome, papel).
- Links de navegação para páginas internas.
- Ações: "Editar perfil" e "Sair".

### 8.5 ParticipantsTable

Tabela de dados com funcionalidades completas.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `selectedIds` | `string[]` | IDs selecionados |
| `onSelectionChange` | `(ids: string[]) => void` | Callback de seleção |
| `showLinesPerPage` | `boolean` | Exibe controle de linhas por página |

**Colunas**: Nome completo, Teste realizado (badge), Data do último teste, Status auditivo (badge), Necessita reavaliação (badge), Ações.

**Funcionalidades**: Seleção individual e em massa, paginação com navegação (primeira, anterior, próxima, última), filtros por dropdown, botão de download.

### 8.6 ParticipantRegistrationModal

Formulário modal completo para cadastro de participante.

**Seções do formulário**:
1. **Dados de identificação**: CPF*, Nome completo*, Data de nascimento*, Nome social, RG*, Órgão expedidor*, Data de expedição*
2. **Dados complementares**: Sexo biológico, Identidade de gênero, Raça/Cor, Nome da mãe*, Nome do pai
3. **Contatos**: E-mail pessoal, Telefone
4. **Endereço**: CEP, Estado, Cidade, Bairro, Logradouro, Número, Complemento
5. **Informações adicionais**: Instituição/Escola*, Professor responsável, Queixa auditiva*, Detalhes da queixa (habilitado condicionalmente), Observações
6. **Documentos**: Upload de arquivos (para menores de 18 anos)

> *Campos marcados com ◆ são obrigatórios.*

Ao cancelar, exibe `CancelWarningModal` com confirmação.

### 8.7 SelectParticipantsModal

Modal bottom-sheet para seleção rápida de participantes antes do teste.

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

---

## 9. Modelo de Dados

### 9.1 Interface `Participant`

```typescript
interface Participant {
  id: string;
  fullName: string;          // Nome completo (obrigatório)
  cpf: string;               // CPF (obrigatório)
  birthDate: string;         // Data de nascimento (obrigatório)
  socialName?: string;       // Nome social
  rg?: string;               // RG
  issuingBody?: string;      // Órgão expedidor
  issueDate?: string;        // Data de expedição
  bioSex?: string;           // Sexo biológico
  genderIdentity?: string;   // Identidade de gênero
  race?: string;             // Raça/Cor
  motherName: string;        // Nome da mãe (obrigatório)
  fatherName?: string;       // Nome do pai
  email?: string;            // E-mail
  phone?: string;            // Telefone
  cep?: string;              // CEP
  state?: string;            // Estado
  city?: string;             // Cidade
  neighborhood?: string;     // Bairro
  street?: string;           // Logradouro
  number?: string;           // Número
  complement?: string;       // Complemento
  institution?: string;      // Instituição/Escola
  teacher?: string;          // Professor responsável
  hearingComplaint?: string; // Queixa auditiva
  complaintDetails?: string; // Detalhes da queixa
  observations?: string;     // Observações
  testPerformed: 'Aud.IT' | 'Ouvir Brasil';  // Tipo de teste
  lastTestDate: string;      // Data do último teste
  hearingStatus: 'Normal' | 'Alterado';       // Status auditivo
  needsReevaluation: boolean; // Necessita reavaliação
}
```

### 9.2 Mock Store

A aplicação utiliza um store em memória (`src/lib/data.ts`) com:

- **20 participantes mock** gerados programaticamente.
- Funções CRUD:
  - `getParticipants()` — retorna lista completa.
  - `addParticipant(p)` — adiciona novo participante no início da lista.
  - `deleteParticipant(id)` — remove participante por ID.

> ⚠️ Os dados são perdidos ao recarregar a página. Para persistência, é recomendado integrar com Lovable Cloud.

---

## 10. Build Nativo (Capacitor)

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

## 11. Scripts e Desenvolvimento

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

Nenhuma variável de ambiente é necessária na versão atual (dados mock). Para integração futura com Lovable Cloud, serão necessárias as variáveis de conexão com Supabase.

---

## 12. Glossário

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

---

## Fluxo Principal do Usuário

```
Login (/) 
  ↓
Home (/home)
  ↓
Painel aud.IT (/panel)
  ├── Instruções (/instructions)
  ├── Checar ruído (/noise-check)
  ├── Cadastrar participante (modal)
  ├── Selecionar participantes (tabela)
  ├── Confirmar participantes (modal)
  └── Iniciar teste
```

```
Login (/)
  ↓
Solicitar acesso (/request-access)
  ↓
Formulário → Enviar
```

---

*Documentação gerada em 04/03/2026 para o projeto reab.LITA.*
