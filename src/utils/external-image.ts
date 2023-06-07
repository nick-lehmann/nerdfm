import { z } from 'zod'

export const ExternalImage = z.object({
  url: z.string(),
  height: z.number().optional(),
  width: z.number().optional(),
})
export type ExternalImage = z.infer<typeof ExternalImage>
