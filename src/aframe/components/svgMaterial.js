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

    img.addEventListener('load', () => this.applyMaterial(img));

    img.src = 'data:image/svg+xml,' + encodeURIComponent(this.data);
  },

  applyMaterial(img) {
    if (this.texture) {
      this.texture.dispose();
      delete this.texture;
    }

    this.texture = new window.THREE.Texture(img);

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
