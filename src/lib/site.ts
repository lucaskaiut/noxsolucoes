export const site = {
  name: "Nox Soluções em Tecnologia",
  shortName: "Nox",
  url: "https://noxtecnologias.com.br",
  email: "contato@noxtecnologias.com.br",
  phoneDisplay: "(41) 98829-7008",
  phoneE164: "+5541988297008",
  locality: "Curitiba",
  region: "PR",
  country: "BR",
  description:
    "A Nox Soluções em Tecnologia é uma software house especializada em desenvolvimento de sistemas web sob medida, aplicativos mobile, integrações de APIs e soluções com inteligência artificial para empresas que querem crescer.",
  foundingYear: 2020,
} as const;

export const links = {
  whatsapp: `https://wa.me/5541988297008?text=${encodeURIComponent(
    "Olá! Vim pelo site da Nox e gostaria de conversar sobre um projeto."
  )}`,
  whatsappQuote: `https://wa.me/5541988297008?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para um projeto."
  )}`,
  email: `mailto:${site.email}?subject=${encodeURIComponent(
    "Solicitação de orçamento — Nox Soluções em Tecnologia"
  )}`,
  phone: `tel:${site.phoneE164}`,
} as const;

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Como trabalhamos", href: "#processo" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Projetos", href: "#projetos" },
  { label: "FAQ", href: "#faq" },
] as const;
