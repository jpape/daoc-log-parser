import { CashResults } from "./cash-results.model";
import { CombatResults } from "./combat-results.model";
import { HealingResults } from "./healing-results.model";

export class ParsingResults {
    constructor(
        public Combat: CombatResults,
        public Crafting: {
            Series: string[],
            Values: number[][]
        },
        public PvE: {
            Monies: CashResults,
            Drops: any[][],
            XP: any[]
        }
    ) { }
}