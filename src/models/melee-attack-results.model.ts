export class MeleeAttackResults {
    constructor(
        public Crits: number,
        public Blocks: number,
        public Hits: number,
        public BaseDamage: number,
        public Evades: number,
        public Parries: number,
        public TotalDamage: number,
        public TotalAttacks: number,
        public Misses: number,
        public Fumbles: number,
        public CritDamage: number,
        public Targets: string[],
        public StyleStats: string[],
        public WeaponStats: string[],
        public Percents: {
            Hits: number,
            Blocks: number,
            Crits: number,
            Misses: number,
            Evades: number,
            Parries: number
        }
    ) {}
}