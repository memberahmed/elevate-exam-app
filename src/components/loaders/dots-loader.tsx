// Objective: Create a loader with dots animation.  
// The loader should be a component called DotsLoader.
// The component should be a function component.

import React from 'react';  
import style from './dots-loader.module.css';

const DotsLoader = () => {
  return (
    <div className={style.loader}></div>
  );
}

export default DotsLoader;