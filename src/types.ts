type SneakerType = {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  favoriteId: number | null
  isAdded: boolean
}


type SneakerTypeShort =Omit<SneakerType, 'favoriteId'| 'isFavorite'| 'isAdded'>
