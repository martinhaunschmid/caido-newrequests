export const cleanQuery = (query: string): string => {
  return query.replaceAll(/and row\.id\.gt:\d+/g, "").replaceAll(/row\.id\.gt:\d+ and /g, "").replaceAll(/row\.id\.gt:\d+/g,"").trim()
}