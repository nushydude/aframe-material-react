import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { identity } from 'ramda';
import { noop } from 'ramda-adjunct';
import memoizeOne from 'memoize-one';

const name = 'svg-material';

const isSrcChanged = memoizeOne((a, b) => a === b);

const component = {
  schema: {
    src: {
      default: '',
      parse: (Component) => ReactDOMServer.renderToStaticMarkup(<Component />),
    },
    onChange: { default: noop, parse: identity },
  },

  createTexture() {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.addEventListener('load', () => resolve(new window.THREE.Texture(img)));
      img.addEventListener('error', reject);

      img.src = `data:image/svg+xml,${encodeURIComponent(this.data.src)}`;
    })
  },

  update(oldData) {
    if (!isSrcChanged(oldData.src, this.data.src)) {
      this.updateTexture();

      this.data.onChange();
    }
  },

  async updateTexture() {
    if (this.texture) {
      this.texture.dispose();
    }

    this.texture = await this.createTexture();

    this.el.object3D.children[0].material = new window.THREE.MeshBasicMaterial();
    this.el.object3D.children[0].material.map = this.texture;

    this.texture.needsUpdate = true;
  },

  remove() {
    if (this.texture) {
      this.texture.dispose();
    }
  },
};

export default { name, component };
