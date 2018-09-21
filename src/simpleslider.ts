import { SliderClass, SliderOpts } from "./interfaces";

export default class SimpleSlider extends SliderClass {
	constructor(options: SliderOpts) {
		super();

		this.interval = null;
		this.intervalStartTime = null;

		this.updateConfig(options);

		const boundChange = this.visibilityChange.bind(this);

		// configures visibility api handler https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
		document.addEventListener("visibilitychange", boundChange);

		if (this.imgs && this.imgs.length > 1) {
			this.resume();
		}

		this.animate = this.animate.bind(this);
		this.change = this.change.bind(this);
		this.dispose = this.dispose.bind(this);
		this.getCurrentIndex = this.getCurrentIndex.bind(this);
		this.isAutoPlay = this.isAutoPlay.bind(this);
		this.next = this.next.bind(this);
		this.nextIndex = this.nextIndex.bind(this);
		this.pause = this.pause.bind(this);
		this.prev = this.prev.bind(this);
		this.prevIndex = this.prevIndex.bind(this);
		this.reset = this.reset.bind(this);
		this.resume = this.resume.bind(this);
		this.reverse = this.reverse.bind(this);
		this.setAutoPlayLoop = this.setAutoPlayLoop.bind(this);
		this.setupSlides = this.setupSlides.bind(this);
		this.updateConfig = this.updateConfig.bind(this);
		this.visibilityChange = this.visibilityChange.bind(this);
	}

	public change(newIndex: number) {
		const { actualIndex, imgs } = this;

		imgs.forEach((image, index) => {
			const zIndex = index === newIndex ? "103"
				: index === actualIndex ? "102"
				: "101";

			image.style.zIndex = zIndex;
		});

		this.animate(imgs[actualIndex], imgs[newIndex], 0, 0);

		this.actualIndex = newIndex;

		if (this.onChange) {
			this.onChange(this.prevIndex(), actualIndex);
		}
	}

	public dispose() {
		clearTimeout(this.interval);

		const boundChange = this.visibilityChange.bind(this);

		document.removeEventListener("visibilitychange", boundChange);

		this.actualIndex = null;
		this.children = null;
		this.containerElem = null;
		this.delay = null;
		this.endVal = null;
		this.imgs = null;
		this.interval = null;
		this.intervalStartTime = null;
		this.onChange = null;
		this.onChangeEnd = null;
		this.paused = null;
		this.remainingTime = null;
		this.startVal = null;
		this.trProp = null;
		this.trTime = null;
		this.unit = null;
		this.visVal = null;
	}

	public getCurrentIndex() {
		return this.actualIndex;
	}

	public next() {
		this.change(this.nextIndex());
		this.resume();
	}

	public nextIndex(): number {
		const { actualIndex, imgs } = this;
		const newIndex = actualIndex + 1;

		return newIndex >= imgs.length
			? 0
			: newIndex;
	}

	public pause() {
		const { delay, intervalStartTime, interval } = this;

		if (this.isAutoPlay()) {
			this.remainingTime = delay - (Date.now() - intervalStartTime);

			clearTimeout(interval);

			this.interval = 0;
		}
	}

	public prev() {
		this.change(this.prevIndex());
		this.resume();
	}

	public prevIndex(): number {
		const { actualIndex, imgs } = this;
		const newIndex = actualIndex - 1;

		return newIndex < 0
			? imgs.length - 1
			: newIndex;
	}

	public reset(prevTrProp: string) {
		const { children, containerElem, delay, startVal, trProp, unit, visVal } = this;

		if (children.length > 0) {
			let style = containerElem.style;

			style.position = "relative";
			style.overflow = "hidden";
			style.display = "block";

			this.actualIndex = 0;
			this.imgs = this.setupSlides(containerElem, children, unit, startVal, visVal, trProp, prevTrProp);
			this.remainingTime = delay;
		}
	}

	public resume() {
		const { interval } = this;

		if (this.isAutoPlay()) {
			if (interval) {
				clearTimeout(interval);
			}

			this.setAutoPlayLoop();
		}
	}

	public reverse() {
		const { actualIndex, endVal, imgs, startVal } = this;
		const newEndVal = startVal;

		this.startVal = endVal;
		this.endVal = newEndVal;
		this.actualIndex = Math.abs(actualIndex - (imgs.length - 1));
		this.imgs = imgs.reverse();
	}

	public updateConfig(options: SliderOpts, withResume?: boolean) {
		const defaultEase = (time, begin, change, duration) => ((time = time / (duration / 2)) < 1)
				? change / 2 * time * time * time + begin
				: change / 2 * ((time -= 2) * time * time + 2) + begin;

		const { children, containerElem, delay, ease, endVal, onChange, onChangeEnd,
			paused, startVal, trProp, trTime, unit, visVal } = options;
		const prevTrProp = this.trProp;
		const getDef = (val, def) => val === null || val === undefined
			? def : val;

		this.containerElem = getDef(containerElem, document.querySelector("*[data-simple-slider]"));
		this.children = (children && children.length) ? children : this.containerElem.children;

		this.delay = getDef(delay, 3) * 1000;
		this.ease = getDef(ease, defaultEase);
		this.endVal = getDef(endVal, 100);
		this.onChange = getDef(onChange, null);
		this.onChangeEnd = getDef(onChangeEnd, null);
		this.paused = paused;
		this.startVal = getDef(startVal, -100);
		this.trProp = getDef(trProp, "left");
		this.trTime = getDef(trTime, 0.5) * 1000;
		this.unit = getDef(unit, "%");
		this.visVal = getDef(visVal, 0);

		this.reset(prevTrProp);

		if (withResume && this.imgs && this.imgs.length > 1) {
			this.resume();
		}
	}

	private animate(insertElem: HTMLElement, removeElem: HTMLElement, startTime: number, elapsedTime: number) {
		const { actualIndex, ease, endVal, startVal, trProp, trTime, unit, visVal } = this;
		const animate = this.animate;
		const setProp = (elem: HTMLElement, from: number, to: number) => {
			elem.style[trProp] = ease(elapsedTime - startTime, from, to - from, trTime) + unit;
		}

		if (startTime > 0) {
			if (elapsedTime - startTime < trTime) {
				setProp(insertElem, visVal, endVal);
				setProp(removeElem, startVal, visVal);
			} else {
				insertElem.style[trProp] = endVal + unit;
				removeElem.style[trProp] = visVal + unit;

				if (this.onChangeEnd) {
					this.onChangeEnd(actualIndex, this.nextIndex());
				}

				return;
			}
		}

		requestAnimationFrame((time) => {
			// Starts time in the first anim iteration
			const newStartTime = startTime === 0 ? time : startTime;

			animate(insertElem, removeElem, newStartTime, time);
		});
	}

	private isAutoPlay(): boolean {
		return !this.paused && this.imgs.length > 1;
	}

	private playLoop() {
		this.intervalStartTime = Date.now();
		this.remainingTime = this.delay; // resets time, used by pause/resume logic

		this.change(this.nextIndex());

		// loops
		this.setAutoPlayLoop();
	}

	private setAutoPlayLoop() {
		this.intervalStartTime = Date.now();

		const boundLoop = this.playLoop.bind(this);

		this.interval = window.setTimeout(boundLoop, this.remainingTime);
	}

	private setupSlides(containerElem: HTMLElement, children: HTMLCollection,
		unit: string, startVal: number, visVal: number, trProp: string, prevTrProp: string): HTMLElement[] {
		return Array.prototype.slice.call(children).map((child, index) => {
			const indexZero = index === 0;
			const zIndex = indexZero ? "1" : "0";
			const trVal = (indexZero ? visVal : startVal) + unit;

			if (prevTrProp) {
				child.style[prevTrProp] = "inherit";
			}

			child.style.position = "absolute";
			child.style.top = "inherit";
			child.style.left = "inherit";
			child.style.zIndex = zIndex;
			child.style[trProp] = trVal;

			return child;
		});
	}

	private visibilityChange() {
		if (document.hidden) {
			this.pause();
		} else {
			this.resume();
		}
	}
}
