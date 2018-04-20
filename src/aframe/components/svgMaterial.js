// import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

const name = 'svg-material';

const component = {
  schema: {
    default: '',
    parse: (Component) => {
      // const virtualDiv = document.createElement('div');
      // ReactDOM.render(Component, virtualDiv);

      // return virtualDiv.innerHTML;
      return ReactDOMServer.renderToStaticMarkup(Component);
    },
  },

  update(oldData) {
    if (oldData === this.data) {
      return;
    }

    const img = new Image();

    img.addEventListener('load', () => {
      const canvas  = document.createElement('canvas');

      // TODO: set matching dimensions from the SVG
      canvas.width = 256;
      canvas.height = 256;

      const ctx = canvas.getContext('2d').drawImage(img, 0, 0);

      this.applyMaterial(canvas.toDataURL('image/png'));
    });

    img.src = 'data:image/svg+xml,' + encodeURIComponent(this.data);
  },

  applyMaterial(dataURI) {
    const image = new Image();
    image.src = dataURI;

    if (this.texture) {
      this.texture.dispose();
    }

    this.texture = new window.THREE.Texture(image);

    this.el.object3D.children[0].material = new window.THREE.MeshBasicMaterial();
		this.el.object3D.children[0].material.map = this.texture;

    this.texture.needsUpdate = true;
  },

  remove() {
    if (this.texture) {
      this.texture.dispose();
    }
  }
};

export default { name, component };
