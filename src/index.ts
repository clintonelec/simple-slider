import SimpleSlider from 'simpleslider';

let _slider: SimpleSlider;

export default function getSlider(opts: SliderOpts) {
  if (!_slider) {
    return new SimpleSlider(opts);
  }

  _slider.updateConfig(opts);

  return _slider;
}
