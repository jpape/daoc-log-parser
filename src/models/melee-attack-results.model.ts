export class MeleeAttackResults {
    constructor(
        public Hits: number,
        public BaseDamage: number,
        public Procs: number,
        public ProcDamage: number,
        public Crits: number,
        public CritDamage: number,
        public Evades: number,
        public Parries: number,
        public Blocks: number,
        public Misses: number,
        public Fumbles: number,
        public Bladeturns: number,
        public Absorbed: number,
        public TotalAttacks: number,
        public TotalDamage: number,
        
        public Targets: string[],
        public WeaponStats: string[],
        public StyleStats: string[],
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