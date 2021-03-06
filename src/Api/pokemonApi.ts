import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export const pokemonApi = {
    getPokemonList: (limit: number, offSet: number) => {
        return instance.get<ResponsePokemonListType>(`pokemon?limit=${limit}&offset=${offSet}`).then(res => res.data)
    },
    getPokemonInfo: (name: string) => {
        return instance.get<ResponsePokemonInfo>(`pokemon/${name}`).then(res => res.data)
    }
}

export type ResponsePokemonListType = {
    count: number
    next: string
    previous: string
    results: Array<NamedApiResource>
}
export type NamedApiResource = {
    name: string
    url: string
}
type ResponsePokemonInfo = {
    abilities: Array<abilitiesType>
    base_experience: number
    forms: Array<NamedApiResource>
    game_indices: Array<VersionGameIndex>
    height: number
    held_items: Array<PokemonHeldItem>
    id: number
    is_default: true
    location_area_encounters: string
    moves: Array<PokemonMove>
    name: string
    order: number
    past_types: []
    species: NamedApiResource
    sprites: PokemonSprites
    stats: Array<PokemonStat>
    types: Array<PokemonType>
    weight: number
}
type abilitiesType = {
    ability: Array<NamedApiResource>
    is_hidden: boolean
    slot: number
}
type VersionGameIndex = {
    game_index: number
    version: NamedApiResource
}
type PokemonHeldItem = {
    item: NamedApiResource
    version_details: Array<PokemonHeldItemVersion>
}
type PokemonHeldItemVersion = {
    version: NamedApiResource
    rarity: number
}
type PokemonMove = {
    move: NamedApiResource
    version_group_details: Array<PokemonMoveVersion>
}
type PokemonMoveVersion = {
    move_learn_method: NamedApiResource
    version_group: NamedApiResource
    level_learned_at: number
}
type PokemonSprites = {
    front_default: string
    front_shiny: string
    front_female: string
    front_shiny_female: string
    back_default: string
    back_shiny: string
    back_female: string
    back_shiny_female: string
}
type PokemonStat = {
    stat: NamedApiResource
    effort: number
    base_stat: number
}
type PokemonType = {
    slot: number
    type: NamedApiResource
}