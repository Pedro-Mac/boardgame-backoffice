export interface Game {
  id: number
  title: string
  description: string
  min_players: number
  max_players: number
  price: number
  duration: string
  is_available: boolean
  created_at: string
  updated_at: string
  created_by: number // Fixed: was literal 2, should be number
  updated_by: string | null
}

export interface GameListResponse {
  games: Game[]
}
