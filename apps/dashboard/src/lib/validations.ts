import { z } from "zod";

export const briefSchema = z.object({
  businessName: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  vertical: z.string().min(2),
});

export const designSchema = z.object({
  colors: z.record(z.string(), z.string()).optional(),
  fonts: z.record(z.string(), z.string()).optional(),
});

export const generateSchema = z.object({
  draftId: z.string().uuid(),
});

export type BriefInput = z.infer<typeof briefSchema>;
export type DesignInput = z.infer<typeof designSchema>;

