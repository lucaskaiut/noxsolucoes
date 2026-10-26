import type { IconName } from "@/lib/data";

export interface LandingProblem {
  title: string;
  description: string;
}

export interface LandingSolution {
  icon: IconName;
  title: string;
  description: string;
}

export interface LandingStep {
  title: string;
  description: string;
}

export const systemDevelopmentLanding = {
  path: "/desenvolvimento-de-sistemas",
  metaTitle: "Desenvolvimento de Sistemas Sob Medida",
  metaDescription:
    "Sistemas web, painéis administrativos e integrações desenvolvidos sob medida para a operação da sua empresa. Conte o desafio e solicite uma avaliação do projeto.",
  keywords: [
    "desenvolvimento de sistemas sob medida",
    "sistema sob medida para empresas",
    "desenvolvimento de software personalizado",
    "sistema interno personalizado",
    "integração entre sistemas",
    "automação de processos",
    "software house",
  ],
  hero: {
    eyebrow: "Software house em Curitiba — atendimento em todo o Brasil",
    title: "Desenvolvimento de sistemas sob medida para a sua empresa",
    subtitle:
      "Criamos sistemas personalizados e integrações para simplificar processos, conectar ferramentas e atender às necessidades reais da sua operação.",
    ctaLabel: "Falar no WhatsApp",
    note: "Atendimento consultivo, sem compromisso.",
  },
  problems: [
    {
      title: "Informações espalhadas em planilhas",
      description:
        "Quando os dados ficam em arquivos separados, é difícil saber qual versão está correta e enxergar a operação como um todo. Um sistema centralizado organiza as informações em um único lugar.",
    },
    {
      title: "Retrabalho por lançamentos manuais",
      description:
        "Digitar a mesma informação em mais de uma ferramenta gera erros e consome tempo. A automação de processos reduz tarefas repetitivas e mantém os dados consistentes.",
    },
    {
      title: "Sistemas que não compartilham dados",
      description:
        "ERPs, CRMs, e-commerces e outras plataformas podem trabalhar isolados. Integrações conectam esses ambientes para que a informação circule sem intervenção manual.",
    },
    {
      title: "Processos internos com controles improvisados",
      description:
        "E-mails, mensagens e planilhas não foram feitos para controlar aprovações e rotinas críticas. Um painel administrativo sob medida dá estrutura e rastreabilidade ao processo.",
    },
    {
      title: "Funcionalidades que o software atual não oferece",
      description:
        "Nem sempre trocar de sistema é o melhor caminho. É possível evoluir a solução existente e criar as funcionalidades que a operação precisa.",
    },
  ] satisfies LandingProblem[],
  solutions: [
    {
      icon: "code",
      title: "Sistemas web personalizados",
      description:
        "Aplicações web construídas para o fluxo de trabalho da sua empresa, com as regras e os níveis de acesso que a operação exige.",
    },
    {
      icon: "layers",
      title: "Painéis administrativos e ferramentas internas",
      description:
        "Telas de gestão, cadastros, relatórios e rotinas internas reunidos em uma interface única e simples de usar.",
    },
    {
      icon: "plug",
      title: "Integração entre sistemas e APIs",
      description:
        "Conexão entre ERPs, CRMs, e-commerces, gateways e outros serviços para eliminar a troca manual de dados.",
    },
    {
      icon: "gauge",
      title: "Automação de processos",
      description:
        "Automação de tarefas repetitivas, notificações e fluxos de aprovação para ganhar consistência e liberar a equipe.",
    },
    {
      icon: "compass",
      title: "Evolução e manutenção de sistemas",
      description:
        "Correções, melhorias e novas funcionalidades para sistemas existentes, respeitando o que já funciona na operação.",
    },
  ] satisfies LandingSolution[],
  steps: [
    {
      title: "Entendimento",
      description:
        "Conversamos sobre o problema, o processo atual e o que a empresa precisa resolver.",
    },
    {
      title: "Definição",
      description:
        "Organizamos requisitos, prioridades e possibilidades de solução para o cenário apresentado.",
    },
    {
      title: "Proposta",
      description:
        "Apresentamos a solução proposta, o escopo e as condições comerciais para avaliação.",
    },
    {
      title: "Desenvolvimento",
      description:
        "Implementamos o projeto em etapas acordadas, com acompanhamento e validação ao longo do caminho.",
    },
  ] satisfies LandingStep[],
  credibility: {
    eyebrow: "Experiência",
    title: "Projetos reais, construídos para operações reais",
    description:
      "Conheça alguns dos sistemas desenvolvidos pela Nox e veja como desafios de negócio foram transformados em soluções em uso.",
    caseSlugs: ["vulcano", "toth-crm", "atena"],
    principlesTitle: "Como conduzimos o trabalho",
    principles: [
      "Escopo e requisitos definidos antes do desenvolvimento.",
      "Entregas acompanhadas e comunicação direta com quem desenvolve.",
      "Soluções pensadas para a operação real, não para um modelo genérico.",
      "Evolução do sistema conforme a necessidade da empresa.",
    ],
    technologiesTitle: "Tecnologias que utilizamos",
  },
  finalCta: {
    title: "Vamos entender o que sua empresa precisa?",
    description:
      "Conte um pouco sobre seu projeto e converse com a Nox sobre uma solução adequada à sua operação.",
    buttonLabel: "Falar no WhatsApp",
  },
} as const;
