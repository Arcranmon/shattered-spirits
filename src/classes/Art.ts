// Art should be comprised of the following:
// - Name X
// - Description X
// - Keywords
// - Specific Arts
//      - Attack
//      - General
//      - Movement
//      - Reaction
//      - Enhancement

// Starting Arts:
//  - Spirit Summon
//  - Shift
//  - Martial Arts
//  - Evade (Dodge + Retreat)
//  - Guard (Perfect Guard + Raise Guard)
//  - Catch Breath (Recover + Grit Teeth + Seize Momentum)
//  - Retrieve/Stow
//  - Seize Opening (Opportunity Attack + Lethal Strike)
import { store } from '@/store'
import { Base, Ability } from '@/class'

class Art extends Base {
  protected abilities_: Ability[]
}
