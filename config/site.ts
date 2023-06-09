export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Bigard - RTI",
  description: "Beautifully designed components",
  mainNav: [
    {
      title: "Accueil",
      href: "/"
    },
    {
      title: "Mes Contrôles",
      href: "/"
    },
    {
      title: "Mes Ressources Humaines",
      href: "/"
    },
    {
      title: "Mes Communications",
      href: "/"
    },
    {
      title: "Mes Documents",
      href: "/"
    },
    {
      title: "Admin",
      path: "/admin/params",
      children: [
        { title: "Utilisateurs", href: "utilisateurs" },
        { title: "Secteurs", href: "secteurs" },
        { title: "Atéliers", href: "ateliers" },
        { title: "Profils", href: "profils" },
        { title: "Params site", href: "paramssite" },
        { title: "Grille groupe", href: "grillesgroupe" }
      ]
    }
  ],
  links: {}
};
