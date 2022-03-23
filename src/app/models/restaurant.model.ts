export interface Restaurant {
  id: number,
  name: string,
  menu?: {
    name: string,
    dishes: { name: string, price: number, icon: string }[]
  }
}
