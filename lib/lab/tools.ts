export const labTools = ["brand-kit", "app-icon", "svg", "motion", "design"] as const
export type LabToolId = (typeof labTools)[number]

export function isLabTool(value: string): value is LabToolId {
  return (labTools as readonly string[]).includes(value)
}
