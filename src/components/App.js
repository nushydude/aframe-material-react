import * as React from 'react';
import { Entity, Scene } from 'aframe-react';
import Template from './Template';

const NUM_ENTITIES = 10;

const getEntities = () => {
  const entities = [];
  for (let i = 0; i < NUM_ENTITIES; i++) {
    entities.push({
      position: {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: -20 - Math.random() * 10
      },
    });
  }
  return entities;
}

class App extends React.Component {
  componentDidMount() {
    console.log('Render time (DOM Server - 10):', performance.now() - this.startTime);
  }

  render() {
    const entities = getEntities();

    this.startTime = performance.now();

    return (
      <Scene>
      {
        entities.map(({ position }, idx) =>
          <Entity
            key={idx}
            geometry={{ primitive: 'plane', width: 16, height: 9 }}
            position={position}
            svg-material={<Template />}
          />
        )
      }
      </Scene>
    );
  }
}

export default App;
