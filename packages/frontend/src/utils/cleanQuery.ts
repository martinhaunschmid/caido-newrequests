export const cleanQuery = (query: string): string => {
  let cleaned = query.replaceAll(/\s+and\s+row\.id\.gt:\d+/g, "")
  cleaned = cleaned.replaceAll(/row\.id\.gt:\d+(\s+and\s+)?/g, "")
  return cleaned.replaceAll(/\s+/g, " ").trim()
}