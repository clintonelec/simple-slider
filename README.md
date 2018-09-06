# simple-slider

[![NPM version](https://badge.fury.io/js/simple-slider.svg)](https://npmjs.org/package/simple-slider)
[![CDNJS version](https://img.shields.io/cdnjs/v/simple-slider.svg)](https://cdnjs.com/libraries/simple-slider)
![File Size: < 1.2kB gzipped](http://img.badgesize.io/clintonelec/simple-slider/master/src/simpleslider.ts?compression=gzip)
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clintonelec/simple-slider/master/LICENSE)

https://clintonelec.github.com/simple-slider

Extremely lightweight carousel micro library.


## About

**simple-slider-ts** is a carousel micro library based on the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API. It makes for a highly testable implementation and less css-dependent.

This package contains a framework agnostic implementation based on the `simple-slider` library. If you need to use a library built in JavaScript instead, or if you are using **AngularJS** or **Polymer** there are some **simple-slider** framework-specific implementations available:

- [simple-slider](https://github.com/ruyadorno/simple-slider)
- [angular-simple-slider](https://github.com/ruyadorno/angular-simple-slider)
- [polymer-simple-slider](https://github.com/ruyadorno/polymer-simple-slider)


## Features

- Small size, less than 1.2kb minified/gzipped
- Support to [UMD](https://github.com/umdjs/umd): AMD, CommonJS and global definition
- Uses [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for animations
- Supports [Page visibility API](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange) to pause/resume transitions when user navigates away from the page
- Accept [ease functions](https://github.com/jimjeffers/Easie/blob/master/easie.js) to customize the transition animation
- Lots of ready-to-use examples available, just check the [example](./examples/) folder
- Animates any numerical css property


## Install

Available on **npm**:

```sh
npm install --save simple-slider-ts
```


## Usage

Simply import the script in your project and call the `getSlider` function with options if necessary. In this case the slider will use its default left-to-right sliding animation and the container element will be the first element containing a `data-simple-slider` attribute.

```js
import getSlider from "simple-slider-ts";

getSlider();
```


## Options

Options are set as named properties of a single parameter accepted by the `getSlider` function, they help you customize the slider transition and how it's going to work.

The main option is a `container` element, this will usually be a `<div>` or `<ul>` containing the elements to be transitioned, keep in mind that this container should also have a defined width/height value. You can also tweak things such as the delay time between each transition, how long each transition will take, etc.

```js
getSlider({
	container: document.getElementById('myslider'),
	transitionTime: 1,
	delay: 3.5
});
```

### Available Options

Here is the list of available values to customize how your slider is going to work:

- **containerElem**: <[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)> The HTML element that act as a container for the slider. Defaults to `document.querySelector('*[data-simple-slider])`.
- **children** <[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)/Array> A list of children to be used as slides, you can use the [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to have more flexibility on what children of the `containerElem` element should be used as slides. Defaults to `containerElem.children`.
- **paused**: <Boolean> Controls carousel auto-transition/slideshow. If value is `true` no transition will happen. Defaults to `false`.
- **trProp**: <String> Determines the css property to be animated. Defaults to `left`.
- **trTime**: <Number> Value setting the duration of animation transition. Defaults to `0.5`.
- **delay**: <Number> Value determining the wait between each animation when auto-transition is enabled. Defaults to `3` seconds.
- **startVal**: <Number> Initial value of slide elements when starting a transition animation. Defaults to `-100`.
- **visVal**: <Number> The value a slide element should have when it is displayed. Defaults to `0`.
- **endVal**: <Number> The value a slide will move to during a transition animation. Defaults to `100`.
- **unit**: <String> The css unit value to be used. Defaults to `%`.
- **ease**: <Function> An ease function, you can use any of [these](https://github.com/jimjeffers/Easie/blob/master/easie.js). Defaults to `defaultEase` internal function.
- **onChange**: <Function> A callback function to be invoked each time a slide changes.
- **onChangeEnd**: <Function> A callback function to be invoked at the end of the slide transition

### Default values

```js
{
  containerElem: document.querySelector('*[data-simple-slider]'),
  children: container.children,
  paused: false,
  trProp: 'left',
  trTime: 0.5,
  delay: 3,
  startVal: -100,
  visVal: 0,
  endVal: 100,
  unit: '%',
  ease: defaultEase function,
  onChange: null,
  onChangeEnd: null
}
```


## Programmatic API

Some methods are exposed by the returning value of the function allowing you to control the slider.

```js
const slider = simpleslider.getSlider({
	containerElem: document.getElementById('myslider'),
	onChangeEnd: updateCurrentIndex
});
let currentIndex;

function updateCurrentIndex() {
	currentIndex = slider.currentIndex();
}

// pauses slideshow
slider.pause();
```

### Available methods:

- `change(index: number)` Changes image to a given `index` value.
- `dispose()` Disposes of all internal variable references.
- `getCurrentIndex()` Returns the index of the current displaying image.
- `next()` Switches displaying image to the next one.
- `nextIndex()` Gets the index of the next slide to be shown.
- `pause()` Pauses the slideshow.
- `prev()` Switches displaying image to the previous one.
- `prevIndex()` Gets the index of the previous slide.
- `reset()` Resets the slideshow.
- `resume()` Resumes the slideshow.
- `reverse()` Swaps `init` for `end` and reverses the order of slides.
- `updateConfig(options: SliderOpts, withResume?: boolean)` Updates the configuration and restarts the slideshow.


## [Documentation](https://clintonelec.github.io/simple-slider/docs/)

Extensive documentation of the options and methods can be found at the [simple-slider official documentation](https://clintonelec.github.io/simple-slider/docs/).


## Alternatives

A JavaScript carousel micro library is not a new thing (fun fact, **simple-slider** (the library this one is based upon) has been around [since 2013](https://github.com/ruyadorno/simple-slider/commit/1e54f82536e5e1ef047445ab705c674cff3db9ee)).

I would recommend that you take a look at some of the available alternatives and decide by yourself which one better suits your needs.

- [simple-slider](https://github.com/ruyadorno/simple-slider)
- [slick](https://github.com/kenwheeler/slick)
- [lory](https://github.com/meandmax/lory)
- [siema](https://pawelgrzybek.com/siema/)
- [Swiper](https://github.com/nolimits4web/Swiper)
- [iSlider](https://github.com/BE-FE/iSlider)
- [Owl Carousel](https://github.com/OwlCarousel2/OwlCarousel2)
- [flickity](https://github.com/metafizzy/flickity)
- [swipe](https://github.com/lyfeyaj/swipe)
- [unslider](https://github.com/idiot/unslider)
- [Glide](https://github.com/jedrzejchalubek/glidejs)


## License

MIT © [Clinton Electronics](https://clintonelectronics.com)
