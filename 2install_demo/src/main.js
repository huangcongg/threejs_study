import { createApp } from 'vue'
// 一.安装自 npm
// npm install --save three
// 方式 1: 导入整个 three.js核心库
// import * as THREE from "three";
// const scene = new THREE.Scene();
// console.log(scene);

// 方式 2: 仅导入你所需要的部分
// import { Scene } from "three";
// const scene = new Scene();
// console.log(scene);

 // 三.示例
 import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
 const controls = new OrbitControls();
 console.log(controls);

import App from './App.vue'

createApp(App).mount('#app')
