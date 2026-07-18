export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  coverImage: string;
  gallery?: string[];
  keywords: string[];
  publishedAt: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "nox-agenda",
    title: "Nox Agenda",
    tagline: "Plataforma SaaS de Agendamentos",
    category: "SaaS · Inteligência Artificial",
    shortDescription:
      "Plataforma SaaS multiempresa de agendamento online para salões, barbearias e clínicas, com automação de atendimento via WhatsApp e pagamentos integrados.",
    description:
      "O Nox Agenda é uma plataforma SaaS de agendamento online desenvolvida pela Nox Soluções em Tecnologia para negócios de serviços como salões de beleza, barbearias e clínicas. O sistema funciona em modelo multiempresa: cada estabelecimento configura seus profissionais, serviços, horários e regras de agenda em um painel próprio. Os clientes finais agendam pela página pública do estabelecimento ou conversando diretamente com um assistente de inteligência artificial no WhatsApp, que consulta horários disponíveis, confirma reservas e envia lembretes automáticos. A plataforma também processa pagamentos e sinais de reserva, reduzindo faltas e adiantando o faturamento. Mais de 500 agendamentos já foram realizados pela plataforma.",
    challenge:
      "Estabelecimentos de serviços perdiam horários e clientes por depender de agendamento manual por telefone e mensagens. A agenda ficava espalhada entre cadernos, planilhas e conversas de WhatsApp, gerando conflitos de horário, esquecimentos e faltas frequentes. Era preciso uma solução única que funcionasse para diferentes segmentos e tamanhos de negócio, sem exigir conhecimento técnico dos donos.",
    solution:
      "A Nox desenvolveu uma plataforma SaaS multiempresa com agenda inteligente, página de agendamento online personalizada por estabelecimento e um agente de IA integrado ao WhatsApp que atende clientes em linguagem natural, consulta disponibilidade em tempo real e confirma agendamentos sozinho. Lembretes automáticos reduzem faltas, e a integração com pagamentos permite cobrar sinal na reserva. O painel administrativo centraliza agenda, clientes, serviços e relatórios de desempenho.",
    results: [
      "Mais de 500 agendamentos realizados pela plataforma",
      "Atendimento e agendamento 24/7 sem intervenção humana via WhatsApp",
      "Redução de faltas com lembretes automáticos e cobrança de sinal",
      "Agenda centralizada e sem conflitos de horário para múltiplos profissionais",
      "Operação multiempresa: novos estabelecimentos entram sem custo de desenvolvimento",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "MySQL",
      "Redis",
      "Evolution API",
      "OpenAI",
    ],
    coverImage: "/images/nox-agenda.png",
    keywords: [
      "sistema de agendamento online",
      "SaaS de agendamentos",
      "agendamento pelo WhatsApp",
      "software para salão de beleza",
      "software para barbearia",
      "software para clínica",
      "agendamento com inteligência artificial",
    ],
    publishedAt: "2026-03-10",
  },
  {
    slug: "toth-crm",
    title: "Toth CRM",
    tagline: "CRM com IA integrada ao WhatsApp",
    category: "CRM · Inteligência Artificial",
    shortDescription:
      "CRM de gestão de leads com funil Kanban, automações comerciais e agentes de inteligência artificial que atendem clientes diretamente no WhatsApp.",
    description:
      "O Toth CRM é um sistema de gestão de relacionamento com clientes desenvolvido pela Nox Soluções em Tecnologia para equipes comerciais que vendem pelo WhatsApp. A plataforma organiza leads em funis Kanban visuais, registra todo o histórico de conversas e permite criar automações de follow-up e distribuição de leads entre vendedores. O diferencial é o agente de inteligência artificial integrado ao WhatsApp: ele responde novos contatos em segundos, qualifica o lead com perguntas naturais, registra as informações no CRM e transfere para um vendedor humano no momento certo. As conversas acontecem em tempo real dentro do próprio sistema, via WebSocket, sem alternar entre ferramentas.",
    challenge:
      "Equipes comerciais perdiam vendas por demora no primeiro atendimento e por falta de organização dos leads que chegavam pelo WhatsApp. As conversas ficavam no celular de cada vendedor, sem histórico centralizado, sem critério de distribuição e sem visibilidade do funil para o gestor. Leads esfriavam antes de receber resposta e o follow-up dependia da memória de cada um.",
    solution:
      "A Nox construiu um CRM com atendimento em tempo real integrado ao WhatsApp via Evolution API, funil Kanban configurável e agentes de IA treinados no contexto do negócio. A IA faz o primeiro atendimento em segundos, qualifica e categoriza o lead e aciona o vendedor certo. Automações cuidam de follow-ups, mudanças de etapa e alertas, enquanto o gestor acompanha métricas de conversão em dashboards.",
    results: [
      "Primeiro atendimento em segundos, a qualquer hora, com agente de IA",
      "Histórico completo de conversas centralizado e auditável",
      "Funil de vendas visível e padronizado para toda a equipe",
      "Follow-ups automáticos que reduzem leads esquecidos",
      "Gestores acompanham conversão por etapa em tempo real",
    ],
    technologies: [
      "Laravel",
      "React",
      "WebSocket",
      "Evolution API",
      "OpenAI",
      "MySQL",
      "Redis",
    ],
    coverImage: "/images/toth-crm.png",
    keywords: [
      "CRM com inteligência artificial",
      "CRM integrado ao WhatsApp",
      "agente de IA para vendas",
      "gestão de leads",
      "funil de vendas Kanban",
      "automação comercial",
    ],
    publishedAt: "2026-01-20",
  },
  {
    slug: "vulcano",
    title: "Vulcano",
    tagline: "Gestão de RH e Processos Corporativos",
    category: "Sistema Web · RH",
    shortDescription:
      "Sistema de RH para gestão de colaboradores PJ com controle de férias, comissões, custos e workflows de aprovação configuráveis.",
    description:
      "O Vulcano é um sistema web de recursos humanos e processos corporativos desenvolvido pela Nox Soluções em Tecnologia para empresas que trabalham com colaboradores PJ. A plataforma centraliza o cadastro e o ciclo de vida dos colaboradores, controla férias e ausências, calcula comissões e consolida custos por área e por projeto. Processos que antes dependiam de e-mails e planilhas — como solicitações de férias, reembolsos e ajustes de remuneração — acontecem dentro de workflows de aprovação configuráveis, com etapas, responsáveis e alçadas definidos pela própria empresa. Cada solicitação percorre o fluxo com rastreabilidade completa: quem pediu, quem aprovou e quando.",
    challenge:
      "A gestão de colaboradores PJ acontecia em planilhas paralelas e threads de e-mail: solicitações de férias sem registro formal, comissões calculadas manualmente com risco de erro e aprovações que se perdiam entre departamentos. Faltava rastreabilidade para auditoria e o RH gastava horas consolidando informações espalhadas.",
    solution:
      "A Nox desenvolveu um sistema centralizado com motor de workflows configurável: cada tipo de solicitação tem seu fluxo de aprovação com etapas e alçadas próprias, notificações automáticas e histórico completo. Férias, comissões e custos são calculados pelo sistema a partir de regras cadastradas, eliminando planilhas paralelas. Perfis de acesso garantem que cada gestor veja apenas o que lhe cabe aprovar.",
    results: [
      "Aprovações que levavam dias passaram a ser resolvidas em horas",
      "Fim das planilhas paralelas: dados de RH em uma única fonte",
      "Cálculo automático de comissões e custos, sem erro manual",
      "Trilha de auditoria completa de todas as solicitações e aprovações",
      "Workflows novos configurados pela própria empresa, sem desenvolvimento",
    ],
    technologies: ["React", "TypeScript", "Laravel", "MySQL", "Docker"],
    coverImage: "/images/vulcano.png",
    keywords: [
      "sistema de RH",
      "gestão de colaboradores PJ",
      "workflow de aprovação",
      "controle de férias",
      "gestão de comissões",
      "processos corporativos",
    ],
    publishedAt: "2025-10-15",
  },
  {
    slug: "atena",
    title: "Atena",
    tagline: "Gestão de Projetos e Tarefas Empresarial",
    category: "SaaS · Gestão Empresarial",
    shortDescription:
      "Plataforma SaaS multi-tenant de gestão empresarial com projetos, tarefas, Kanban, Gantt, time tracking e dashboards de produtividade.",
    description:
      "O Atena é uma plataforma SaaS de gestão empresarial desenvolvida pela Nox Soluções em Tecnologia para organizar projetos, tarefas e equipes em um só lugar. Multi-tenant, atende múltiplas empresas na mesma infraestrutura com isolamento completo de dados. As equipes planejam o trabalho em quadros Kanban e cronogramas Gantt, registram horas com time tracking integrado e acompanham a produtividade em dashboards em tempo real. Permissões por papel controlam o que cada pessoa vê e edita, e o histórico de atividades mantém o contexto de cada decisão. O Atena substitui a combinação de planilhas, aplicativos de tarefas e controles manuais de horas por uma única fonte de verdade sobre a operação.",
    challenge:
      "As equipes gerenciavam projetos em ferramentas desconexas: tarefas em um aplicativo, cronogramas em planilhas e horas trabalhadas em controles manuais. Sem integração, os gestores não conseguiam responder perguntas básicas — o que está atrasado, quem está sobrecarregado, quanto custou cada projeto — sem horas de consolidação manual.",
    solution:
      "A Nox construiu uma plataforma multi-tenant que une planejamento, execução e medição: Kanban para o fluxo diário, Gantt para cronogramas e dependências, time tracking acoplado às tarefas e dashboards que consolidam tudo em tempo real. A arquitetura multi-tenant com cache em Redis mantém a performance mesmo com múltiplas empresas e grandes volumes de tarefas.",
    results: [
      "Projetos, tarefas e horas em uma única plataforma",
      "Visibilidade em tempo real de atrasos e gargalos por equipe",
      "Custo real por projeto calculado a partir do time tracking",
      "Onboarding de novas empresas em minutos, sem nova infraestrutura",
      "Menos reuniões de status: dashboards respondem antes da pergunta",
    ],
    technologies: ["Next.js", "TypeScript", "Laravel", "MySQL", "Redis"],
    coverImage: "/images/atena.png",
    keywords: [
      "gestão de projetos",
      "plataforma SaaS multi-tenant",
      "Kanban e Gantt",
      "time tracking",
      "dashboard de produtividade",
      "sistema de gestão empresarial",
    ],
    publishedAt: "2025-08-05",
  },
  {
    slug: "ematricula",
    title: "eMatrícula",
    tagline: "Matrículas Escolares 100% Online",
    category: "Sistema Web · Educação",
    shortDescription:
      "Sistema de gestão escolar que digitaliza todo o processo de matrícula: inscrição online, documentos, filas de vaga e confirmação sem papel.",
    description:
      "O eMatrícula é um sistema de gestão escolar desenvolvido pela Nox Soluções em Tecnologia para digitalizar o processo de matrícula de instituições de ensino. Pais e responsáveis realizam a inscrição pela internet, enviam documentos digitalizados e acompanham o status da solicitação sem precisar comparecer à secretaria. A instituição gerencia turmas, vagas e filas de espera em um painel central, valida documentos online e confirma matrículas com poucos cliques. Regras de prioridade e disponibilidade de vagas são aplicadas automaticamente pelo sistema, garantindo transparência no processo. O resultado é um período de matrículas sem filas, sem papel e com muito menos trabalho manual para a equipe administrativa.",
    challenge:
      "O período de matrículas gerava filas na secretaria, pilhas de formulários em papel e retrabalho para digitar dados manualmente. Documentos se perdiam, pais precisavam comparecer presencialmente mais de uma vez e a gestão de vagas por turma era feita em planilhas sujeitas a erro e sem transparência na fila de espera.",
    solution:
      "A Nox desenvolveu um portal de matrícula online com formulários digitais, upload e validação de documentos, gestão de vagas por turma e fila de espera automática com regras de prioridade. A secretaria acompanha tudo em um painel único, com comunicação de status automática aos responsáveis em cada etapa do processo.",
    results: [
      "Matrículas realizadas 100% online, sem filas na secretaria",
      "Eliminação de formulários em papel e da digitação manual de dados",
      "Fila de vagas transparente com regras de prioridade automáticas",
      "Documentação digitalizada, validada online e sem extravios",
      "Equipe administrativa liberada para atendimentos que realmente exigem contato humano",
    ],
    technologies: ["Next.js", "React", "Laravel", "MySQL"],
    coverImage: "/images/ematricula.png",
    keywords: [
      "sistema de matrícula online",
      "gestão escolar",
      "matrícula digital",
      "software para escolas",
      "gestão de vagas escolares",
    ],
    publishedAt: "2025-06-12",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
