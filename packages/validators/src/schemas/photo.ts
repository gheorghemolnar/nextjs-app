import z from 'zod';

export const Schema_Photo_RO = z.object({
    PhotoCtrl: z.array(
        z.object({
            CodeCont          : z.string(),
            CodePhotoControle : z.string(),
            CreaQuand         : z.string(),
            CreaQui           : z.string(),
            FicPhotoControle  : z.string(),
            IdPhotoControle   : z.number(),
            LibPhotoControle  : z.string(),
            ModifQui          : z.string().optional()
        })
    )
});

export const photoControlSchema = z
    .object({
        PhotoCtrl: z.array(Schema_Photo_RO)
    })
    .nullable();
