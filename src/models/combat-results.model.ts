import { DefenseResults } from './defense-results.model';
import { CasterAttackResults } from './caster-attack-results.model';
import { PhysicalAttackResults } from './melee-attack-results.model';
import { CombatSummary } from './combat-summary.model';
import { HealingResults } from './healing-results.model';

export class CombatResults {
    constructor(
        public Defense: DefenseResults,
        public CasterAttack: CasterAttackResults,
        public PhysicalAttack: PhysicalAttackResults,
        public ChartData: {
            Labels: number[],
            Values: number[]
        },
        public Summary: CombatSummary,
        public Healing: HealingResults,
        public DPS: number
    ) {}
}