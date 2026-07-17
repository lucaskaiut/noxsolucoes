import type { Faq, IconName } from "@/lib/data";

export interface ServicePage {
  slug: string;
  icon: IconName;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  headline: string;
  subheadline: string;
  intro: string[];
  deliverables: string[];
  benefits: { title: string; description: string }[];
  technologies: string[];
  faqs: Faq[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "desenvolvimento-de-sistemas",
    icon: "code",
    navLabel: "Desenvolvimento de Sistemas",
    metaTitle:
      "Desenvolvimento de Sistemas Web Sob Medida | ERP, CRM e SaaS",
    metaDescription:
      "Empresa de desenvolvimento de sistemas em Curitiba. Criação de software sob medida: ERPs, CRMs e plataformas SaaS com arquitetura escalável. Solicite um orçamento.",
    keywords: [
      "desenvolvimento de sistemas",
      "empresa desenvolvimento de sistemas curitiba",
      "criação de software sob medida",
      "desenvolvimento de ERP",
      "desenvolvimento de CRM",
      "desenvolvimento de SaaS",
      "sistema web sob medida",
      "fábrica de software",
    ],
    headline: "Desenvolvimento de sistemas web sob medida",
    subheadline:
      "ERPs, CRMs e plataformas SaaS projetados para o seu processo, com arquitetura escalável, segurança e performance desde o primeiro dia.",
    intro: [
      "A Nox Soluções em Tecnologia é uma empresa de desenvolvimento de sistemas em Curitiba que atende clientes em todo o Brasil. Criamos software sob medida que se adapta ao processo da sua empresa — e não o contrário.",
      "Do levantamento de requisitos à implantação, você acompanha cada etapa com entregas frequentes e comunicação direta com quem desenvolve. O resultado é um sistema que elimina planilhas, integra áreas e dá visibilidade real da operação.",
    ],
    deliverables: [
      "ERPs sob medida para gestão financeira, vendas, estoque e operação",
      "CRMs para funil de vendas, atendimento e relacionamento com clientes",
      "Plataformas SaaS multi-tenant prontas para escalar",
      "Portais, painéis administrativos e dashboards gerenciais",
      "Migração e modernização de sistemas legados",
    ],
    benefits: [
      {
        title: "Sob medida de verdade",
        description:
          "Cada tela, fluxo e regra de negócio é construída para o seu processo, sem adaptações forçadas a software genérico.",
      },
      {
        title: "Arquitetura escalável",
        description:
          "Sistemas preparados para crescer com a sua empresa, suportando mais usuários e novas funcionalidades sem retrabalho.",
      },
      {
        title: "Dados integrados",
        description:
          "Integração entre setores e sistemas externos, eliminando retrabalho e dando visibilidade completa da operação.",
      },
      {
        title: "Evolução contínua",
        description:
          "Suporte próximo e roadmap de melhorias para o sistema evoluir junto com o negócio.",
      },
    ],
    technologies: [
      "Laravel",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    faqs: [
      {
        question: "Quanto custa desenvolver um sistema sob medida?",
        answer:
          "O investimento depende do escopo e da complexidade. Após uma reunião de entendimento gratuita, entregamos uma proposta detalhada com valores e prazos. É possível começar por um MVP enxuto e evoluir por etapas.",
      },
      {
        question: "Quanto tempo leva para desenvolver um ERP ou CRM?",
        answer:
          "MVPs costumam levar de 4 a 8 semanas. Sistemas completos variam de 3 a 6 meses, com entregas incrementais — você começa a usar módulos antes da conclusão total.",
      },
      {
        question: "O sistema fica hospedado onde?",
        answer:
          "Hospedamos em nuvem (AWS ou provedor de sua preferência), com backups, monitoramento e segurança configurados. O código e os dados são seus.",
      },
      {
        question: "Vocês migram dados do meu sistema atual?",
        answer:
          "Sim. Planejamos a migração de dados de planilhas ou sistemas legados como parte da implantação, garantindo integridade e continuidade da operação.",
      },
    ],
  },
  {
    slug: "aplicativos-mobile",
    icon: "smartphone",
    navLabel: "Aplicativos Mobile",
    metaTitle: "Desenvolvimento de Aplicativos Mobile | Android e iOS",
    metaDescription:
      "Desenvolvimento de aplicativos Android e iOS sob medida em Curitiba. Apps com publicação nas lojas, painel administrativo e integrações. Solicite um orçamento.",
    keywords: [
      "desenvolvimento de aplicativos",
      "empresa de desenvolvimento de aplicativos",
      "criar aplicativo android",
      "criar aplicativo ios",
      "desenvolvimento de app sob medida",
      "app para empresas",
      "react native",
    ],
    headline: "Aplicativos mobile para Android e iOS",
    subheadline:
      "Apps com experiência fluida, publicação nas lojas e integração total com seus sistemas — do MVP ao aplicativo consolidado.",
    intro: [
      "A Nox Soluções em Tecnologia desenvolve aplicativos mobile sob medida para empresas que querem estar no bolso dos seus clientes e equipes. Atendemos todo o Brasil a partir de Curitiba.",
      "Cuidamos de todo o ciclo: design da experiência, desenvolvimento, publicação na Google Play e App Store, painel administrativo e evolução contínua do produto.",
    ],
    deliverables: [
      "Aplicativos para Android e iOS com base de código única",
      "Publicação e manutenção nas lojas (Google Play e App Store)",
      "Painel administrativo web para gestão do app",
      "Notificações push, pagamentos e login social",
      "Integração com sistemas e APIs existentes",
    ],
    benefits: [
      {
        title: "Uma base, duas plataformas",
        description:
          "Com React Native, seu app roda em Android e iOS com custo e prazo reduzidos, sem abrir mão da experiência nativa.",
      },
      {
        title: "Do design à loja",
        description:
          "Cuidamos de todo o processo, incluindo requisitos das lojas, revisões e publicação — você não se preocupa com burocracia.",
      },
      {
        title: "Integrado ao seu negócio",
        description:
          "O app conversa com seu ERP, CRM ou e-commerce, mantendo dados sincronizados em tempo real.",
      },
      {
        title: "Evolução orientada a dados",
        description:
          "Métricas de uso e feedback dos usuários guiam as próximas versões do aplicativo.",
      },
    ],
    technologies: [
      "React Native",
      "TypeScript",
      "React",
      "Node.js",
      "Laravel",
      "PostgreSQL",
      "AWS",
    ],
    faqs: [
      {
        question: "Quanto custa desenvolver um aplicativo?",
        answer:
          "Depende das funcionalidades, integrações e plataformas. Após entender seu objetivo, apresentamos uma proposta com valores e prazos claros. MVPs permitem validar a ideia com investimento menor.",
      },
      {
        question: "O app funciona em Android e iOS?",
        answer:
          "Sim. Desenvolvemos com base de código única que roda nas duas plataformas, reduzindo custo e tempo de entrega.",
      },
      {
        question: "Vocês publicam o app nas lojas?",
        answer:
          "Sim. Cuidamos de todo o processo de publicação na Google Play e na App Store, incluindo os requisitos técnicos e de conteúdo de cada loja.",
      },
      {
        question: "E depois do lançamento?",
        answer:
          "Oferecemos planos de suporte e evolução: correções, atualizações de sistema operacional, novas funcionalidades e acompanhamento de métricas.",
      },
    ],
  },
  {
    slug: "integracoes",
    icon: "plug",
    navLabel: "Integrações",
    metaTitle: "Integração de Sistemas e APIs | WhatsApp e Pagamentos",
    metaDescription:
      "Integração de sistemas, APIs, WhatsApp e gateways de pagamento. Conecte seu ERP, CRM e e-commerce com segurança e confiabilidade. Solicite um orçamento.",
    keywords: [
      "integração de sistemas",
      "integração de APIs",
      "integração whatsapp",
      "api oficial whatsapp",
      "integração gateway de pagamento",
      "integração de e-commerce",
      "webhooks",
    ],
    headline: "Integrações que conectam todo o seu negócio",
    subheadline:
      "APIs, WhatsApp, gateways de pagamento e serviços externos conversando entre si — com segurança, confiabilidade e monitoramento.",
    intro: [
      "Sistemas que não conversam geram retrabalho, erros e decisões no escuro. A Nox Soluções em Tecnologia integra seus sistemas, plataformas e serviços para que os dados fluam automaticamente entre eles.",
      "Trabalhamos com APIs REST, webhooks, filas e sincronização em tempo real, sempre com tratamento de falhas, logs e monitoramento para garantir confiabilidade.",
    ],
    deliverables: [
      "Integração entre ERPs, CRMs, e-commerces e marketplaces",
      "Automação e atendimento via API oficial do WhatsApp",
      "Integração com gateways de pagamento (Pix, cartão, boleto)",
      "Criação de APIs para expor seus dados com segurança",
      "Sincronização de dados em tempo real com filas e webhooks",
    ],
    benefits: [
      {
        title: "Fim do retrabalho",
        description:
          "Dados digitados uma única vez fluem automaticamente entre os sistemas, eliminando erros manuais.",
      },
      {
        title: "Confiabilidade",
        description:
          "Tratamento de falhas, reprocessamento automático e logs completos para nenhuma informação se perder.",
      },
      {
        title: "Segurança",
        description:
          "Autenticação, criptografia e boas práticas de segurança em todas as trocas de dados.",
      },
      {
        title: "Visibilidade",
        description:
          "Monitoramento e alertas para você saber que tudo está funcionando — e agir rápido quando algo foge do padrão.",
      },
    ],
    technologies: [
      "Node.js",
      "Laravel",
      "Redis",
      "Webhooks",
      "REST APIs",
      "EvolutionAPI",
      "AWS",
    ],
    faqs: [
      {
        question: "Quais sistemas vocês conseguem integrar?",
        answer:
          "Praticamente qualquer sistema que ofereça API, banco de dados acessível ou exportação de dados: ERPs, CRMs, e-commerces, marketplaces, gateways de pagamento e serviços como WhatsApp.",
      },
      {
        question: "Vocês trabalham com a API oficial do WhatsApp?",
        answer:
          "Sim. Implementamos automações e atendimento via API oficial do WhatsApp Business, além de soluções com EvolutionAPI quando adequado ao caso.",
      },
      {
        question: "A integração funciona em tempo real?",
        answer:
          "Sim, quando o caso exige. Usamos webhooks e filas para sincronização em tempo real, ou rotinas agendadas quando o volume e o custo-benefício pedem.",
      },
      {
        question: "E se um dos sistemas ficar fora do ar?",
        answer:
          "Projetamos as integrações com tolerância a falhas: as mensagens ficam em fila e são reprocessadas automaticamente quando o sistema volta, sem perda de dados.",
      },
    ],
  },
  {
    slug: "inteligencia-artificial",
    icon: "sparkles",
    navLabel: "Inteligência Artificial",
    metaTitle:
      "Inteligência Artificial para Empresas | Agentes de IA e Automação",
    metaDescription:
      "Soluções de inteligência artificial para empresas: agentes de IA, automação de processos e atendimento automatizado via WhatsApp. Solicite um orçamento.",
    keywords: [
      "inteligência artificial para empresas",
      "agentes de IA",
      "automação com IA",
      "atendimento automatizado",
      "chatbot com IA",
      "chatbot whatsapp",
      "openai para empresas",
    ],
    headline: "Inteligência artificial aplicada ao seu negócio",
    subheadline:
      "Agentes de IA, automação de processos e atendimento automatizado que reduzem custos e aceleram sua operação — integrados aos seus sistemas.",
    intro: [
      "IA deixou de ser promessa e virou vantagem competitiva. A Nox Soluções em Tecnologia desenvolve soluções de inteligência artificial que resolvem problemas reais: atendimento, triagem, automação de tarefas e apoio à decisão.",
      "Nossos agentes de IA são integrados aos seus sistemas e canais — como WhatsApp — e treinados com o contexto do seu negócio, com supervisão humana onde ela é necessária.",
    ],
    deliverables: [
      "Agentes de IA para atendimento e vendas via WhatsApp",
      "Automação de processos repetitivos com IA",
      "Assistentes internos treinados com dados da sua empresa",
      "Classificação, triagem e extração de dados de documentos",
      "Integração de modelos (OpenAI e outros) aos seus sistemas",
    ],
    benefits: [
      {
        title: "Atendimento 24/7",
        description:
          "Seus clientes são atendidos a qualquer hora, com respostas precisas e transbordo para humanos quando necessário.",
      },
      {
        title: "Redução de custos",
        description:
          "Tarefas repetitivas automatizadas liberam sua equipe para o que gera valor de verdade.",
      },
      {
        title: "Contexto do seu negócio",
        description:
          "Agentes treinados com seus dados, produtos e políticas — nada de respostas genéricas.",
      },
      {
        title: "Integrado e mensurável",
        description:
          "IA conectada ao seu CRM e sistemas, com métricas claras de resultado e qualidade.",
      },
    ],
    technologies: [
      "OpenAI",
      "Node.js",
      "Laravel",
      "Redis",
      "WhatsApp API",
      "PostgreSQL",
      "AWS",
    ],
    faqs: [
      {
        question: "O que um agente de IA pode fazer pela minha empresa?",
        answer:
          "Atender clientes no WhatsApp, qualificar leads, agendar serviços, responder dúvidas com base nos seus dados, triar solicitações e automatizar tarefas repetitivas — tudo integrado aos seus sistemas.",
      },
      {
        question: "A IA responde errado? Como controlam a qualidade?",
        answer:
          "Projetamos os agentes com limites claros, base de conhecimento controlada e transbordo para atendimento humano. Monitoramos as conversas e refinamos continuamente o comportamento.",
      },
      {
        question: "Meus dados ficam seguros?",
        answer:
          "Sim. Seguimos boas práticas de segurança e LGPD, com controle sobre quais dados são usados pelos modelos e acordos de confidencialidade.",
      },
      {
        question: "Quanto tempo leva para colocar um agente de IA no ar?",
        answer:
          "Projetos de atendimento automatizado costumam entrar em operação em 2 a 6 semanas, dependendo das integrações e da base de conhecimento necessária.",
      },
    ],
  },
  {
    slug: "consultoria-tecnologica",
    icon: "compass",
    navLabel: "Consultoria Tecnológica",
    metaTitle:
      "Consultoria Tecnológica | Arquitetura de Software e Modernização",
    metaDescription:
      "Consultoria em tecnologia: arquitetura de software, modernização de sistemas legados e escalabilidade. Decisões técnicas com visão de negócio. Fale conosco.",
    keywords: [
      "consultoria tecnológica",
      "consultoria em tecnologia",
      "arquitetura de software",
      "modernização de sistemas legados",
      "escalabilidade de sistemas",
      "consultoria de TI para empresas",
      "revisão de código",
    ],
    headline: "Consultoria tecnológica com visão de negócio",
    subheadline:
      "Arquitetura, modernização de sistemas legados e planejamento de escalabilidade para sua tecnologia sustentar o crescimento da empresa.",
    intro: [
      "Decisões técnicas erradas custam caro — em dinheiro, tempo e oportunidades. A consultoria da Nox Soluções em Tecnologia ajuda sua empresa a tomar decisões de tecnologia com segurança e visão de longo prazo.",
      "Avaliamos seu cenário atual, identificamos riscos e gargalos e desenhamos um plano prático de evolução: da arquitetura ao roadmap, da infraestrutura ao processo de desenvolvimento.",
    ],
    deliverables: [
      "Diagnóstico técnico de sistemas e infraestrutura",
      "Desenho de arquitetura para novos produtos",
      "Plano de modernização de sistemas legados",
      "Estratégia de escalabilidade, performance e segurança",
      "Apoio na contratação e estruturação de times técnicos",
    ],
    benefits: [
      {
        title: "Visão externa experiente",
        description:
          "Repertório de projetos em múltiplos segmentos para avaliar seu cenário sem vícios internos.",
      },
      {
        title: "Plano prático",
        description:
          "Nada de relatório engavetado: entregamos um roadmap priorizado e executável, com estimativas realistas.",
      },
      {
        title: "Redução de riscos",
        description:
          "Identificamos gargalos de segurança, performance e manutenção antes que virem crises.",
      },
      {
        title: "Tecnologia a serviço do negócio",
        description:
          "Recomendações alinhadas aos objetivos da empresa, não a modismos tecnológicos.",
      },
    ],
    technologies: [
      "Arquitetura de Software",
      "AWS",
      "Docker",
      "Laravel",
      "Node.js",
      "PostgreSQL",
      "CI/CD",
    ],
    faqs: [
      {
        question: "Como funciona a consultoria?",
        answer:
          "Começamos com um diagnóstico do cenário atual (sistemas, infraestrutura, time e processos). Em seguida, entregamos um plano priorizado com recomendações práticas e podemos acompanhar a execução.",
      },
      {
        question: "Minha empresa tem sistema legado. Vale a pena modernizar?",
        answer:
          "Depende do caso. Avaliamos custo, risco e valor de negócio para recomendar o melhor caminho: modernização gradual, reescrita por partes ou substituição.",
      },
      {
        question: "Vocês também executam o que recomendam?",
        answer:
          "Sim. Além do plano, nossa equipe pode executar a modernização, as melhorias de arquitetura e o desenvolvimento — ou apoiar seu time interno na execução.",
      },
      {
        question: "A consultoria serve para empresas sem equipe técnica?",
        answer:
          "Sim. Atuamos como parceiro técnico de empresas sem TI interna, apoiando decisões, contratações e a relação com fornecedores de tecnologia.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
