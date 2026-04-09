export * from './LunchTypes'
export * from'./Dessert'
export * from './Maincourse'
export * from './Rice'
export * from './Starters'

import { DessertItems } from './Dessert'
import { MainCourseItems } from './Maincourse'
import { RiceItems } from './Rice'
import { StarterItems } from './Starters'

export const LunchItems  = [
    ...DessertItems,
    ...MainCourseItems,
    ...RiceItems,
    ...StarterItems
]