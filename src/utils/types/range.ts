export type Num =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30;

type PseudoRange<End extends Num> = {
	1: 1;
	2: PseudoRange<1> | 2;
	3: PseudoRange<2> | 3;
	4: PseudoRange<3> | 4;
	5: PseudoRange<4> | 5;
	6: PseudoRange<5> | 6;
	7: PseudoRange<6> | 7;
	8: PseudoRange<7> | 8;
	9: PseudoRange<8> | 9;
	10: PseudoRange<9> | 10;
	11: PseudoRange<10> | 11;
	12: PseudoRange<11> | 12;
	13: PseudoRange<12> | 13;
	14: PseudoRange<13> | 14;
	15: PseudoRange<14> | 15;
	16: PseudoRange<15> | 16;
	17: PseudoRange<16> | 17;
	18: PseudoRange<17> | 18;
	19: PseudoRange<18> | 19;
	20: PseudoRange<19> | 20;
	21: PseudoRange<20> | 21;
	22: PseudoRange<21> | 22;
	23: PseudoRange<22> | 23;
	24: PseudoRange<23> | 24;
	25: PseudoRange<24> | 25;
	26: PseudoRange<25> | 26;
	27: PseudoRange<26> | 27;
	28: PseudoRange<27> | 28;
	29: PseudoRange<28> | 29;
	30: PseudoRange<29> | 30;
}[End];

export type Range<Start extends Num, End extends Num> = Exclude<
	PseudoRange<End>,
	Exclude<PseudoRange<Start>, Start>
>;
