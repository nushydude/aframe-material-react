import React from 'react';
import getRandomColor from '../libs/getRandomColor';

const WIDTH = 160;
const HEIGHT = 90;

const Template = ({ img, background }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={WIDTH} height={HEIGHT}>
    <rect width={WIDTH} height={HEIGHT} fill={background} />
    <image href={img} width={WIDTH} height={HEIGHT} />
  </svg>
);

export default Template;
