export type IconName =
  | "code"
  | "smartphone"
  | "plug"
  | "sparkles"
  | "compass"
  | "layers"
  | "shield"
  | "gauge"
  | "puzzle"
  | "users"
  | "handshake";

export interface Service {
  icon: IconName;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    icon: "code",
    title: "Desenvolvimento de Sistemas Web",
    description:
      "ERPs, CRMs e plataformas SaaS construídos sob medida para o seu negócio, com arquitetura escalável e foco em resultado.",
    tags: ["ERP", "CRM", "SaaS", "Portais"],
  },
  {
    icon: "smartphone",
    title: "Aplicativos Mobile",
    description:
      "Apps nativos e híbridos para Android e iOS, com experiência fluida, publicação nas lojas e evolução contínua.",
    tags: ["Android", "iOS", "React Native"],
  },
  {
    icon: "plug",
    title: "Integrações",
    description:
      "Conectamos seus sistemas a APIs, WhatsApp, gateways de pagamento e serviços externos com segurança e confiabilidade.",
    tags: ["APIs REST", "WhatsApp", "Pagamentos", "Webhooks"],
  },
  {
    icon: "sparkles",
    title: "Inteligência Artificial",
    description:
      "Automação de processos, agentes de IA e atendimento automatizado que reduzem custos e aceleram sua operação.",
    tags: ["Agentes IA", "Automação", "Chatbots", "OpenAI"],
  },
  {
    icon: "compass",
    title: "Consultoria Tecnológica",
    description:
      "Arquitetura de software, modernização de sistemas legados e planejamento de escalabilidade com visão de negócio.",
    tags: ["Arquitetura", "Modernização", "Escalabilidade"],
  },
];

export interface Differential {
  icon: IconName;
  title: string;
  description: string;
}

export const differentials: Differential[] = [
  {
    icon: "puzzle",
    title: "Desenvolvimento sob medida",
    description:
      "Cada solução é projetada para o seu processo, sem adaptações forçadas a softwares genéricos.",
  },
  {
    icon: "layers",
    title: "Arquitetura escalável",
    description:
      "Sistemas preparados para crescer junto com a sua empresa, sem retrabalho e sem gargalos.",
  },
  {
    icon: "shield",
    title: "Segurança",
    description:
      "Boas práticas de segurança aplicadas desde o primeiro commit: criptografia, controle de acesso e LGPD.",
  },
  {
    icon: "gauge",
    title: "Performance",
    description:
      "Aplicações rápidas e otimizadas, com monitoramento e métricas de desempenho contínuas.",
  },
  {
    icon: "users",
    title: "Experiência em múltiplos segmentos",
    description:
      "Atuação em varejo, serviços, saúde, logística e indústria, trazendo repertório para o seu projeto.",
  },
  {
    icon: "handshake",
    title: "Atendimento próximo",
    description:
      "Comunicação direta com quem desenvolve, respostas rápidas e acompanhamento transparente.",
  },
];

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Entendimento do projeto",
    description:
      "Imersão no seu negócio para mapear necessidades, objetivos e oportunidades.",
  },
  {
    step: 2,
    title: "Planejamento",
    description:
      "Definição de escopo, arquitetura, cronograma e entregas com total transparência.",
  },
  {
    step: 3,
    title: "Desenvolvimento",
    description:
      "Sprints curtas com entregas frequentes e acompanhamento em tempo real.",
  },
  {
    step: 4,
    title: "Testes",
    description:
      "Validação de qualidade, segurança e performance antes de qualquer publicação.",
  },
  {
    step: 5,
    title: "Implantação",
    description:
      "Deploy assistido, migração de dados e treinamento da sua equipe.",
  },
  {
    step: 6,
    title: "Evolução contínua",
    description:
      "Suporte, melhorias e novas funcionalidades conforme o negócio evolui.",
  },
];

export const technologies: string[] = [
  "Laravel",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "OpenAI",
];

export interface CaseItem {
  title: string;
  category: string;
  description: string;
  image: string;
}

export const cases: CaseItem[] = [
  {
    title: "Plataforma SaaS de Gestão",
    category: "Sistema Web",
    description:
      "Plataforma completa de gestão empresarial com módulos financeiro, vendas e estoque.",
    image:
      "https://placehold.co/600x400/17102b/a78bfa/png?text=Case+SaaS",
  },
  {
    title: "Aplicativo de Delivery",
    category: "Mobile",
    description:
      "App Android e iOS com pedidos em tempo real, pagamentos integrados e painel administrativo.",
    image:
      "https://placehold.co/600x400/17102b/a78bfa/png?text=Case+Mobile",
  },
  {
    title: "Agente de IA para Atendimento",
    category: "Inteligência Artificial",
    description:
      "Atendimento automatizado via WhatsApp com IA, reduzindo o tempo de resposta em 80%.",
    image:
      "https://placehold.co/600x400/17102b/a78bfa/png?text=Case+IA",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "A Nox entendeu nosso processo e entregou um sistema que realmente funciona para a nossa operação. O suporte é rápido e próximo.",
    author: "Cliente Exemplo",
    role: "Diretor de Operações — Empresa Fictícia A",
  },
  {
    quote:
      "O aplicativo superou nossas expectativas. Entrega no prazo, comunicação clara e qualidade técnica impecável.",
    author: "Cliente Exemplo",
    role: "CEO — Empresa Fictícia B",
  },
  {
    quote:
      "A automação com IA reduziu drasticamente nosso tempo de atendimento. Recomendo a Nox para qualquer empresa que queira escalar.",
    author: "Cliente Exemplo",
    role: "Gerente Comercial — Empresa Fictícia C",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Quanto custa um sistema sob medida?",
    answer:
      "O investimento depende do escopo, das integrações e da complexidade do projeto. Após uma conversa inicial gratuita, apresentamos uma proposta detalhada com valores e prazos transparentes. Projetos podem começar enxutos (MVP) e evoluir por etapas.",
  },
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer:
      "Projetos enxutos (MVPs) costumam levar de 4 a 8 semanas. Sistemas mais completos, como ERPs e plataformas SaaS, variam de 3 a 6 meses. Trabalhamos com entregas incrementais, então você começa a usar o sistema antes da conclusão total.",
  },
  {
    question: "Vocês desenvolvem aplicativos para Android e iOS?",
    answer:
      "Sim. Desenvolvemos aplicativos para Android e iOS, incluindo publicação nas lojas (Google Play e App Store), painel administrativo e integrações com sistemas existentes.",
  },
  {
    question: "Vocês trabalham com Inteligência Artificial?",
    answer:
      "Sim. Criamos agentes de IA, automação de processos e atendimento automatizado via WhatsApp e outros canais, utilizando tecnologias como OpenAI integradas aos seus sistemas.",
  },
  {
    question: "Vocês prestam suporte após a entrega?",
    answer:
      "Sim. Oferecemos planos de suporte e evolução contínua, com monitoramento, correções, melhorias e desenvolvimento de novas funcionalidades conforme a necessidade do seu negócio.",
  },
  {
    question: "Como funciona o processo de contratação?",
    answer:
      "É simples: entre em contato pelo WhatsApp (41) 98829-7008 ou e-mail contato@noxtecnologias.com.br. Fazemos uma reunião de entendimento sem custo, elaboramos a proposta e, após aprovação, iniciamos o projeto com cronograma definido.",
  },
];
