export const createTag = (
  res: object & { id: string | number },
  tagName: string,
) => [{ type: tagName, id: res.id }]

export const createTags = (res: number[] | string[], tagName: string) =>
  res.map((el) => ({ type: tagName, id: el }))
