/// &lt;reference path="index.ts" /&gt;
declare module "simple-slider-ts" {
	import getSlider from "./src/index";
	import { SliderClass, SliderOpts } from "./src/interfaces";
	import SimpleSlider from "./src/simpleslider";

	export default getSlider;

	export {
		getSlider,
		SimpleSlider,
		SliderClass,
		SliderOpts
	};
}
