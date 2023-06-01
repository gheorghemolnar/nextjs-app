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
