export interface Manufacturer {
  manuId: number
  title: string
  category: {
    cateId: number,
    title: string
  }
  selected: boolean;
}
