declare module 'simple-slider-ts/src/interfaces' {
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
	    abstract change(newIndex: number): void;
	    abstract dispose(): void;
	    abstract getCurrentIndex(): number;
	    abstract next(): void;
	    abstract nextIndex(): number;
	    abstract pause(): void;
	    abstract prev(): void;
	    abstract prevIndex(): number;
	    abstract reset(prevTrProp: string): void;
	    abstract resume(): void;
	    abstract reverse(): void;
	    abstract updateConfig(options: SliderOpts, withResume?: boolean): void;
	}
	//# sourceMappingURL=interfaces.d.ts.map
}
declare module 'simple-slider-ts/src/simpleslider' {
	import { SliderClass, SliderOpts } from 'simple-slider-ts/src/interfaces';
	export default class SimpleSlider extends SliderClass {
	    constructor(options: SliderOpts);
	    change(newIndex: number): void;
	    dispose(): void;
	    getCurrentIndex(): number;
	    next(): void;
	    nextIndex(): number;
	    pause(): void;
	    prev(): void;
	    prevIndex(): number;
	    reset(prevTrProp: string): void;
	    resume(): void;
	    reverse(): void;
	    updateConfig(options: SliderOpts, withResume?: boolean): void;
	    private animate;
	    private isAutoPlay;
	    private playLoop;
	    private setAutoPlayLoop;
	    private setupSlides;
	    private visibilityChange;
	}
	//# sourceMappingURL=simpleslider.d.ts.map
}
declare module 'simple-slider-ts/src/index' {
	import { SliderOpts } from 'simple-slider-ts/src/interfaces';
	import SimpleSlider from 'simple-slider-ts/src/simpleslider';
	export default function getSlider(opts: SliderOpts): SimpleSlider;
	//# sourceMappingURL=index.d.ts.map
}
declare module 'simple-slider-ts/index' {
	import getSlider from 'simple-slider-ts/src/index';
	import { SliderClass, SliderOpts } from 'simple-slider-ts/src/interfaces';
	import SimpleSlider from 'simple-slider-ts/src/simpleslider';
	export default getSlider;
	export { getSlider, SimpleSlider, SliderClass, SliderOpts };
	//# sourceMappingURL=index.d.ts.map
}
