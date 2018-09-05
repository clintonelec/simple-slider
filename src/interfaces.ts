export interface SliderOpts {
	children?: HTMLCollection;
	containerElem?: HTMLElement;
	trProp?: string;
	trTime?: number;
	delay?: number;
	unit?: string;
	startVal?: number;
	visVal?: number;
	endVal?: number;
	paused?: boolean;
	ease?: (time: number, begin: number, change: number, duration: number) => number;
	onChange?: (prevIndex: number, index: number) => void;
	onChangeEnd?: (index: number, nextIndex: number) => void;
}

export abstract class SliderClass implements SliderOpts {
	// class members
	actualIndex: number;
	children: HTMLCollection;
	containerElem: HTMLElement;
	delay: number;
	ease: (time: number, begin: number, change: number, duration: number) => number;
	endVal: number;
	imgs: HTMLElement[];
	interval: number;
	intervalStartTime: number;
	onChange: (prevIndex: number, index: number) => void;
	onChangeEnd: (index: number, nextIndex: number) => void;
	paused: boolean;
	remainingTime: number;
	startVal: number;
	trProp: string;
	trTime: number;
	unit: string;
	visVal: number;

	// public methods
	abstract change(newIndex: number): void;
	abstract dispose(): void;
	abstract getCurrentIndex(): number;
	abstract next(): void;
	abstract nextIndex(): number;
	abstract pause(): void;
	abstract prev(): void;
	abstract prevIndex(): number;
	abstract reset(): void;
	abstract resume(): void;
	abstract reverse(): void;
	abstract updateConfig(options: SliderOpts): void;
}
