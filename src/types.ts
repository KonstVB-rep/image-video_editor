type SneakerType = {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  favoriteId: number | null
  isAdded: boolean
}

type SneakerTypeShort = Omit<SneakerType, 'favoriteId' | 'isFavorite' | 'isAdded'>

type Cart = {
  addToCart: (item: SneakerType) => void
  toggleAddCart: (item: SneakerType) => void
  removeFromCart: (item: SneakerType) => void
  cart: {
    value: SneakerType[]
  },
  totalCartPrice: {
    value: number
  }
}
