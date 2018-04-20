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

  init() {
    // console.log('this.data:', this.data);

    // if (!this.data) {
    //   return;
    // }

    const canvas  = document.createElement('canvas');

    // TODO: set height and width of SVG
		canvas.width = 256;
    canvas.height = 256;
    canvas.style = "display: none";

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    
    // this.ctx.fillStyle = '#FFFFFF';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.texture = new window.THREE.Texture(this.canvas);

    if(this.el.object3D.children.length > 0) { //backwards compatibility
			this.el.object3D.children[0].material = new window.THREE.MeshBasicMaterial();
			this.el.object3D.children[0].material.map = this.texture;
		} else { //backwards compatibility
			this.el.object3D.material = new window.THREE.MeshBasicMaterial();
			this.el.object3D.material.map = this.texture;
		}

    if(!this.el.hasLoaded) {
      this.el.addEventListener('loaded', function() {
        this.render();
      });
    } else {
      this.render();
    }

    const img = new Image();

    img.addEventListener('load', () => {
      console.log('image loaded')

      this.ctx.drawImage(img, 0, 0);
    });

    img.src = 'data:image/svg+xml,' + encodeURIComponent(this.data);
  },

  render: function() {
    console.log('render');
		this.texture.needsUpdate = true;
  },
};

export default { name, component };
