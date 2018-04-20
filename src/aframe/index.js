import 'aframe';

import svgMaterial from './components/svgMaterial.js';

export function initAFRAME() {
  window.AFRAME.registerComponent(svgMaterial.name, svgMaterial.component);
}
