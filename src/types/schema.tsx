import { z } from "zod";

// We're keeping a simple non-relational schema here.
export const photoSchema = z.object({
  CodeCont: z.string(),
  CodePhotoControle: z.string(),
  CreaQuand: z.date(),
  CreaQui: z.string(),
  FicPhotoControle: z.string(),
  IdPhotoControle: z.number(),
  LibPhotoControle: z.string(),
  ModifQui: z.string().nullish()
});

export const photoControlSchema = z
  .object({
    PhotoCtrl: z.array(photoSchema)
  })
  .nullable();

export const controlSchema = z.object({
  IdControle: z.number(),
  CodeAtelier: z.string(),
  CodeCont: z.string(),
  CodeSecteur: z.string(),
  CommCont: z.string().nullish(),
  CreaQuand: z.date(),
  CreaQui: z.string(),
  DaHeCont: z.date(),
  DescCtrl: z.string(),
  IdAtelier: z.number(),
  IdGrilleGr: z.number(),
  IdGrilleSit: z.number(),
  IdParc: z.number(),
  IdSecteur: z.number(),
  LibAtelier: z.string(),
  LibCtrl: z.string(),
  LibSecteur: z.string(),
  Photos: photoControlSchema,
  ResultCont: z.string(),
  TypeGrille: z.string()
});

export type CONTROL = z.infer<typeof controlSchema>;

export enum CONTROL_STATUS {
  NC = "NC",
  C = "C"
}

export const companySchema = z.object({
  ORDREAFF: z.number(),
  MODIFQUI: z.string().nullable(),
  MODIFQUAND: z.date().nullable(),
  LIBSOCIETE: z.string(),
  IDSOCIETE: z.number(),
  CREAQUI: z.string(),
  CREAQUAND: z.date(),
  CODESOCIETE: z.string(),
  ANNUQUI: z.string().nullable(),
  ANNUQUAND: z.date().nullable()
});

export type COMPANY = z.infer<typeof companySchema>;

export const userSchema = z.object({
  codeutil: z.string(),
  idprofil: z.number(),
  matricule: z.number(),
  nomutil: z.string(),
  preutil: z.string(),
  mdputil: z.string(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish()
});
export type USER = z.infer<typeof userSchema>;

export const secteurSchema = z.object({
  codesecteur: z.string(),
  libsecteur: z.string(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish(),
  ordreaff: z.number()
});
export type SECTEUR = z.infer<typeof secteurSchema>;

export const atelierSchema = z.object({
  codeatelier: z.string(),
  libatelier: z.string(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish(),
  ordreaff: z.number()
});
export type ATELIER = z.infer<typeof atelierSchema>;

export const profilSchema = z.object({
  codeprofil: z.string(),
  libprofil: z.string(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish(),
  ordreaff: z.number()
});
export type PROFIL = z.infer<typeof profilSchema>;

export const paramSiteSchema = z.object({
  idsite: z.number(),
  idatelier: z.number(),
  idsecteur: z.number(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish()
});
export type PARAMSITE = z.infer<typeof paramSiteSchema>;

export const grilleGroupeSchema = z.object({
  codegrillegr: z.string(),
  typegrille: z.string(),
  libctrl: z.string(),
  descctrl: z.string(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish()
});
export type GRILLE_GROUPE = z.infer<typeof grilleGroupeSchema>;

export const grilleSiteSchema = z.object({
  idgrillesite: z.number(),
  idatelier: z.number(),
  idsecteur: z.number(),
  creaqui: z.string().nullish(),
  modifqui: z.string().nullish(),
  annuqui: z.string().nullish()
});
export type GRILLE_SITE = z.infer<typeof grilleSiteSchema>;
