import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const controlSchema = z.object({
  CodeAtelier: z.string(),
  IdControle: z.number(),
  CodeCont: z.string(),
  CodeSecteur: z.string(),
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
  Photos: z
    .object({
      PhotoCtrl: z.array(
        z.object({
          CodeCont: z.string(),
          CodePhotoControle: z.string(),
          CreaQuand: z.date(),
          CreaQui: z.string(),
          FicPhotoControle: z.string(),
          IdPhotoControle: z.number(),
          LibPhotoControle: z.string(),
          ModifQui: z.string(),
        })
      ),
    })
    .nullable(),
  ResultCont: z.string(),
  TypeGrille: z.string(),
})

export type Control = z.infer<typeof controlSchema>
