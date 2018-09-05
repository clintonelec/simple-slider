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

export interface SliderClass implements SliderOpts {
  private actualIndex: number;
  private children: HTMLCollection;
  private containerElem: HTMLElement;
  private delay: number;
  private ease: (time: number, begin: number, change: number, duration: number) => number;
  private endVal: number;
  private imgs: HTMLCollection;
  private interval: number;
  private intervalStartTime: number;
  private onChange: (prevIndex: number, index: number) => void;
  private onChangeEnd: (index: number, nextIndex: number) => void;
  private paused: boolean;
  private remainingTime: number;
  private startVal: number;
  private trProp: string;
  private trTime: number;
  private unit: string;
  private visVal: number;

  // public methods
  public change: (newIndex: number) => void;
  public dispose: () => void;
  public getCurrentIndex: () => number;
  public next: () => void;
  public nextIndex: () => number;
  public pause: () => void;
  public prev: () => void;
  public prevIndex: () => number;
  public reset: () => void;
  public resume: () => void;
  public reverse: () => void;
  public updateConfig: (options: SliderOpts) => void;

  // private methods
  private animate: (insertElement: any, removeElement: any, startTime: number, elapsedTime: number) => void;
  private isAutoPlay: () => boolean;
  private playLoop: () => void;
  private setAutoPlayLoop: () => void;
  private setupSlides: (containerElem: HTMLElement, children: HTMLCollection,
    unit: string, startVal: number, visVal: number, trProp: string) => void;
  private visibilityChange: () => void;
}
