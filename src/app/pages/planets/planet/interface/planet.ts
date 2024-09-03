export interface Planet {
    id: number
    name: string
    isDestroyed: boolean
    description: string
    image: string
    deletedAt: any
    characters: Character[]
  }
  
  export interface Character {
    id: number
    name: string
    ki: string
    maxKi: string
    race: string
    gender: string
    description: string
    image: string
    affiliation: string
    deletedAt: any
  }
  