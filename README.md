# threejs_study
threejs学习

# 创建一个场景（Creating a scene）

这一部分将对three.js来做一个简要的介绍；我们将开始搭建一个场景，其中包含一个正在旋转的立方体。页面下方有一个已经完成的例子，当你遇到麻烦，或者需要帮助的时候，可以看一看。

## 开始之前

在开始使用three.js之前，你需要一个地方来显示它。将下列HTML代码保存为你电脑上的一个HTML文件，同时将[three.js](https://threejs.org/build/three.js)复制到该HTML文件所在的目录下的js/目录下，然后在你的浏览器中打开这个HTML文件。

```html
<!DOCTYPE html> 
<html> 	
    <head> 		
        <meta charset="utf-8"> 		
        <title>My first three.js app</title> 		
        <style> 			
            body { margin: 0; } 		
        </style> 	
    </head> 	
    <body> 		
        <script src="js/three.js"></script> 		
        <script> 			
            // Our Javascript will go here. 		
        </script> 	
    </body> 
</html>
```



好了，接下来的所有代码将会写入到空的<script>标签中。

## 创建一个场景

为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。

```javascript
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );
```

我们花一点点时间来解释一下这里发生了什么。我们现在建立了场景、相机和渲染器。

three.js里有几种不同的相机，在这里，我们使用的是**PerspectiveCamera**（透视摄像机）。

第一个参数是**视野角度（FOV）**。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。

第二个参数是**长宽比（aspect ratio）**。 也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。

接下来的两个参数是**近截面**（near）和**远截面**（far）。 当物体某些部分比摄像机的**远截面**远或者比**近截面**近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。

接下来是渲染器。这里是施展魔法的地方。除了我们在这里用到的WebGLRenderer渲染器之外，Three.js同时提供了其他几种渲染器，当用户所使用的浏览器过于老旧，或者由于其他原因不支持WebGL时，可以使用这几种渲染器进行降级。

除了创建一个渲染器的实例之外，我们还需要在我们的应用程序里设置一个渲染器的尺寸。比如说，我们可以使用所需要的渲染区域的宽高，来让渲染器渲染出的场景填充满我们的应用程序。因此，我们可以将渲染器宽高设置为浏览器窗口宽高。对于性能比较敏感的应用程序来说，你可以使用**setSize**传入一个较小的值，例如**window.innerWidth/2**和**window.innerHeight/2**，这将使得应用程序在渲染时，以一半的长宽尺寸渲染场景。

如果你希望保持你的应用程序的尺寸，但是以较低的分辨率来渲染，你可以在调用**setSize**时，将**updateStyle**（第三个参数）设为false。例如，假设你的<canvas> 标签现在已经具有了100%的宽和高，调用**setSize(window.innerWidth/2, window.innerHeight/2, false)**将使得你的应用程序以一半的分辨率来进行渲染。

最后一步很重要，我们将**renderer**（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。这就是渲染器用来显示场景给我们看的<canvas>元素。

*“嗯，看起来很不错，那你说的那个立方体在哪儿？”*接下来，我们就来添加立方体。

```js
const geometry = new THREE.BoxGeometry(); 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube ); 
camera.position.z = 5;
```

要创建一个立方体，我们需要一个**BoxGeometry**（立方体）对象. 这个对象包含了一个立方体中所有的顶点（**vertices**）和面（**faces**）。未来我们将在这方面进行更多的探索。

接下来，对于这个立方体，我们需要给它一个材质，来让它有颜色。Three.js自带了几种材质，在这里我们使用的是**MeshBasicMaterial**。所有的材质都存有应用于他们的属性的对象。在这里为了简单起见，我们只设置一个color属性，值为**0x00ff00**，也就是绿色。这里所做的事情，和在CSS或者Photoshop中使用十六进制(**hex colors**)颜色格式来设置颜色的方式一致。

第三步，我们需要一个**Mesh**（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。

默认情况下，当我们调用**scene.add()**的时候，物体将会被添加到**(0,0,0)**坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。

## 渲染场景

现在，如果将之前写好的代码复制到HTML文件中，你不会在页面中看到任何东西。这是因为我们还没有对它进行真正的渲染。为此，我们需要使用一个被叫做“**渲染循环**”（render loop）或者“**动画循环**”（animate loop）的东西。

```js
function animate() { 
    requestAnimationFrame( animate ); 
    renderer.render( scene, camera ); 
} 
animate();
```



在这里我们创建了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般是60次/秒）。如果你是一个浏览器游戏开发的新手，你或许会说*“为什么我们不直接用setInterval来实现刷新的功能呢？”*当然啦，我们的确可以用setInterval，但是，**requestAnimationFrame**有很多的优点。最重要的一点或许就是当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命。

## 使立方体动起来

在开始之前，如果你已经将上面的代码写入到了你所创建的文件中，你可以看到一个绿色的方块。让我们来做一些更加有趣的事 —— 让它旋转起来。

将下列代码添加到animate()函数中**renderer.render**调用的上方：

```js
cube.rotation.x += 0.01; 
cube.rotation.y += 0.01;
```



这段代码每帧都会执行（正常情况下是60次/秒），这就让立方体有了一个看起来很不错的旋转动画。基本上来说，当应用程序运行时，如果你想要移动或者改变任何场景中的东西，都必须要经过这个动画循环。当然，你可以在这个动画循环里调用别的函数，这样你就不会写出有上百行代码的**animate**函数。

## 结果

祝贺你！你现在已经成功完成了你的第一个Three.js应用程序。虽然它很简单，但现在你已经有了一个入门的起点。

下面是完整的代码，可在[live example](https://jsfiddle.net/fxurzeb4/)运行、编辑；运行或者修改代码有助于你更好的理解它是如何工作的。

```html
<html> 	
    <head> 		
        <meta charset="utf-8"> 		
        <title>My first three.js app</title> 		
        <style> 			
            body { margin: 0; } 		
        </style> 	
    </head> 	
    <body> 		
        <script src="js/three.js"></script> 		
        <script> 			
            const scene = new THREE.Scene(); 			
            const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  			
            const renderer = new THREE.WebGLRenderer(); 			
            renderer.setSize( window.innerWidth, window.innerHeight ); 			
            document.body.appendChild( renderer.domElement );  			
            const geometry = new THREE.BoxGeometry(); 			
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 			
            const cube = new THREE.Mesh( geometry, material ); 			
            scene.add( cube );  			
            camera.position.z = 5;  			
            const animate = function () { 				
                requestAnimationFrame( animate );  				
                cube.rotation.x += 0.01; 				
                cube.rotation.y += 0.01;  				
                renderer.render( scene, camera ); 			
            };  			
            animate(); 		
        </script> 	
    </body> 
</html>
```



# 安装（Installation）

你可以使用[npm](https://www.npmjs.com/)以及现代构建工具来安装 three.js ，也可以只需静态主机或是 CDN 来快速上手。对于大多数用户来说，从 npm 安装是最佳选择。

无论你选择哪种方式，请始终保持一致，并注意从相同版本的库中导入所有文件。混合不同来源的文件可能会导致包含重复代码，甚至会以意料之外的方式破坏应用程序，

所有安装 three.js 的方式都依赖于 ES modules（参见 [Eloquent JavaScript: ECMAScript Modules](https://eloquentjavascript.net/10_modules.html#h_hF2FmOVxw7)）。ES modules使你能够在最终项目中包含所需库的一小部分。

## 安装自 npm

要安装[three](https://www.npmjs.com/package/three) 的 npm 模块，请在你的项目文件夹里打开终端窗口，并运行：

```shell
npm install --save three
```

包将会被下载并安装。然后你就可以将它导入你的代码了：

```javascript
// 方式 1: 导入整个 three.js核心库 
import * as THREE from 'three'; 
const scene = new THREE.Scene();  

// 方式 2: 仅导入你所需要的部分 
import { Scene } from 'three'; 
const scene = new Scene();
```

从npm上进行安装的时候，几乎总是使用某种构建工具（[bundling tool](https://eloquentjavascript.net/10_modules.html#h_zWTXAU93DC)）来将你项目中需要的所有包组合到一个独立的JavaScript软件中。虽然任何现代的 JavaScript 打包器都可以和 three.js 一起使用，但最流行的选择是 [webpack](https://webpack.js.org/) 。

并非所有功能都可以通过 *three* 模块来直接访问（也称为“裸导入”）。three.js 中其它较为流行的部分 —— 如控制器（control）、加载器（loader）以及后期处理效果（post-processing effect） —— 必须从 [examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm) 子目录下导入。了解更多信息，请参阅下方的*示例*。

你可以从 [Eloquent JavaScript: Installing with npm](https://eloquentjavascript.net/20_node.html#h_J6hW/SmL/a) 来了解更多有关 npm 模块的信息。

## 从CDN或静态主机安装

通过将文件上传到你自己的服务器，或是使用一个已存在的CDN，three.js 便可以不借助任何构建系统来进行使用。由于 three.js 依赖于ES module，因此任何引用它的script标签必须使用*type="module"*。如下所示：

```html
<script type="module">    
    // 通过访问 https://cdn.skypack.dev/three 来查找最新版本。    
    import * as THREE from 'https://cdn.skypack.dev/three@<version>';    
    const scene = new THREE.Scene();  
</script>
```



并非所有功能都可以通过 *build/three.module.js* 模块来直接访问。three.js 中其它较为流行的部分 —— 如控制器（control）、加载器（loader）以及后期处理效果（post-processing effect） —— 必须从 [examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm) 子目录下导入。了解更多信息，请参阅下方的*示例*。

## 示例

three.js的核心专注于3D引擎最重要的组件。其它很多有用的组件 —— 如控制器（control）、加载器（loader）以及后期处理效果（post-processing effect） —— 是 [examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm) 目录的一部分。它们被称为“示例”，虽然你可以直接将它们拿来使用，但它们也需要重新混合以及定制。这些组件和 three.js 的核心保持同步，而 npm 上类似的第三方包则由不同的作者进行维护，可能不是最新的。

示例无需被单独地*安装*，但需要被单独地*导入*。如果 three.js 是使用 npm 来安装的，你可以使用如下代码来加载轨道控制器（OrbitControls）：

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
const controls = new OrbitControls();
```



如果 three.js 安装自一个 CDN ，请使用相同的 CDN 来安装其他组件：

```html
<script type="module">    
    // 通过访问 https://cdn.skypack.dev/three 来查找最新版本。    
    import { OrbitControls } from 'https://cdn.skypack.dev/three@<version>/examples/jsm/controls/OrbitControls.js';    
    const controls = new OrbitControls();  
</script>
```



所有文件使用相同版本是十分重要的。请勿从不同版本导入不同的示例，也不要使用与 three.js 本身版本不一致的示例。

## 兼容性

### CommonJS 导入

虽然现代的 JavaScript 打包器已经默认支持ES module，然而也有一些较旧的构建工具并不支持。对于这些情况，你或许可以对这些打包器进行配置，让它们能够理解 ES module 。例如，[Browserify](http://browserify.org/) 仅需 [babelify](https://github.com/babel/babelify) 插件。

### Import maps

和从静态主机或CDN来进行安装的方式相比，从npm安装时，导入的路径有所不同。我们意识到，对于使用两种不同方式的用户群体来说，这是一个人体工程学问题。使用构建工具与打包器的开发者更喜欢仅使用单独的包说明符（如'three'）而非相对路径，而*examples/*目录中的文件使用相对于 *three.module.js* 的引用并不符合这一期望。对于不使用构建工具的人（用于快速原型、学习或个人参考）来说，或许也会很反感这些相对导入。这些相对导入需要确定目录结构，并且比全局 *THREE.** 命名空间更不宽容。

我们希望在 [import maps](https://github.com/WICG/import-maps) 广泛可用时，能够移除这些相对路径，将它们替换为单独的包说明符，'three'。这更加符合构建工具对npm包的期望，且使得两种用户群体在导入文件时能够编写完全相同的代码。对于更偏向于避免使用构建工具的用户来说，一个简单的 JSON 映射即可将所有的导入都定向到一个 CDN 或是静态文件夹。通过实验，目前你可以通过一个 import map 的 polyfill，来尝试更简洁的导入，如 [import map example](https://glitch.com/edit/#!/three-import-map?path=index.html) 示例中所示。

### Node.js

在 [Node.js](https://eloquentjavascript.net/20_node.html) 下使用 three.js 较为困难，原因有2条：

首先， three.js 是为 web 而构建的，其依赖于浏览器，以及并不总是存在于 Node.js 中的 DOM API。其中的一些问题可使用类似 [headless-gl](https://github.com/stackgl/headless-gl) 的 shim ，或使用定制的替代品来替换掉一些组件（例如 TextureLoader ）来进行解决。其他的 DOM API 或许和使用它们的代码紧密相连在一起，并且很难解决。我们欢迎简单且可维护的 pull request，以改善对 Node.js 的支持。但建议您首先提出一个 issue 来讨论您的改进。

第二，Node.js 对于 ES module 的支持可以说……很复杂。在 Node.js v12 中， three.js 的核心库可使用 *require('three')* 来作为 CommonJS module 进行导入。然而，大多数在 *examples/jsm* 中的示例组件并不能够这样。未来版本的 Node.js 或许可以解决这个问题，但同时你可能需要一些类似 [esm](https://github.com/standard-things/esm) 的解决方案，来使得你的 Node.js 应用程序识别 ES module。

# 浏览器支持（Browser support）

## 总览

在所有现代浏览器中，Three.js可以使用WebGL来渲染场景。对于较旧的浏览器，特别是Internet Explorer 10或者更低版本浏览器，你将需要回落到其它[renderers](https://github.com/mrdoob/three.js/tree/master/examples/jsm/renderers)（CSS2DRenderer、CSS3DRenderer、SVGRenderer）。此外，你或许不得不包含一些额外的“填充物”来解决兼容性问题，特别是当你使用[/examples](https://github.com/mrdoob/three.js/tree/master/examples)目录中的文件时。

注意：如果你并不需要支持较旧的浏览器，那就不推荐使用其他渲染器来进行渲染，因为与WebGLRenderer相比，其它渲染器渲染较慢，并且不支持WebGL的诸多特性。

## 支持WebGL的浏览器

Google Chrome 9+、Firefox 4+、Opera 15+、Safari 5.1+、Internet Explorer 11 和 Microsoft Edge。你可以点击[Can I use WebGL](https://caniuse.com/#feat=webgl)来查阅各个浏览器对WebGL的支持性。

## 在Three.js中所使用到的JavaScript语言特性或者Web API

这里是一些在Three.js中使用到的特性，其中的一部分需要额外的“填充物”（Polyfills）来解决兼容性问题。

| 特性             | 适用范围 | 模块                                                         |
| :--------------- | :------- | :----------------------------------------------------------- |
| Typed Arrays     | Source   | BufferAttribute, BufferGeometry, etc.                        |
| Web Audio API    | Source   | Audio, AudioContext, AudioListener, etc.                     |
| WebXR Device API | Source   | WebXRManager                                                 |
| Blob             | Source   | FileLoader, etc.                                             |
| Promise          | Examples | GLTFLoader, DRACOLoader, BasisTextureLoader, GLTFExporter, VRButton, ARButton, etc. |
| Fetch            | Examples | ImageBitmapLoader, etc.                                      |
| File API         | Examples | GLTFExporter, etc.                                           |
| URL API          | Examples | GLTFLoader, etc.                                             |
| Pointer Lock API | Examples | PointerLockControls                                          |

## 关于用于解决兼容性问题的“填充物”

根据你的需求，引入相关的“填充物”即可。以IE9为例，你至少需要来使用“填充物”完成以下的功能。

- Typed Arrays
- Blob

### 建议的“填充物”

- [core-js](https://github.com/zloirock/core-js)
- [typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js)
- [ES6-Promise](https://github.com/stefanpenner/es6-promise/)
- [Blob.js](https://github.com/eligrey/Blob.js)
- [fetch](https://github.com/github/fetch)

# WebGL兼容性检查（WebGL compatibility check）

虽然这个问题现在已经变得越来不明显，但不可否定的是，某些设备以及浏览器直到现在仍然不支持WebGL。
以下的方法可以帮助你检测当前用户所使用的环境是否支持WebGL，如果不支持，将会向用户提示一条信息。

请将https://github.com/mrdoob/three.js/blob/master/examples/jsm/WebGL.js引入到你的文件，并在尝试开始渲染之前先运行该文件。

```js
if (WEBGL.isWebGLAvailable()) {    
    // Initiate function or other initializations here    
    animate(); 
} else {    
    const warning = WEBGL.getWebGLErrorMessage(); 
    document.getElementById('container').appendChild(warning); 
}
```

# 如何在本地运行Three.js（How to run things locally）

倘若你只是使用Three.js库中所提供的几何体，且不载入任何纹理贴图，则网页是可以从本地的文件系统中打开，并且是能够直接运行的，只需在文件管理器中双击HTML文件，它就可以在浏览器中进行显示。 （此时你将在地址栏中看到类似这样的URL：*file:///yourFile.html*）

## 从外部文件载入的内容

倘若你需要从外部文件里载入几何体或是纹理贴图，由于浏览器[same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy)（同源策略）的安全限制，从本地文件系统载入外部文件将会失败，同时抛出安全性异常。

这里有两种方法来解决这个问题：

1. 在浏览器中改变本地文件的安全策略，这将使你可以通过`file:///yourFile.html`来直接运行本地文件系统中的文件。
2. 从本地的服务器运行文件，这可以让你通过`http://localhost/yourFile.html`来访问运行在本地服务器上的文件。

倘若你选择第一种方法，请小心，倘若你使用同一个浏览器来进行日常网络冲浪，你将可能会触发一些漏洞。 你或许可以创建一个用于开发环境的独立的浏览器配置文件或者快捷方式，仅仅用于本地开发；这将使得日常使用环境与开发环境相分离，以保证日常使用环境的安全性。 接下来，我们来看一看除此之外的别的方法。

## 运行一个本地的服务器

很多的编程语言都具有一个内置的简易HTTP服务器。它们的功能并不像能够被用于生产环境的服务器，例如[Apache](https://www.apache.org/) 或者 [NGINX](https://nginx.org/)那样完善， 但对于你来测试three.js应用程序来说，它们就已经足够了。

### 流行的代码编辑器插件

一些代码编辑器具有插件，可以根据需要生成简单的服务器。

- Visual Studio Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件。
- Atom [Live Server](https://atom.io/packages/atom-live-server) 插件。

### Servez

[Servez](https://greggman.github.io/servez) 一个具有界面的简单服务器。

### Node.js server

Node.js 具有一个简单的HTTP服务器包，如需安装，请执行：

```
npm install http-server -g
```

若要从本地目录下运行，请执行：

```
http-server . -p 8000
```

### Python server

如果你已经安装好了[Python](http://python.org/)，只需要从命令行里便可以运行它（从工作目录）：

```
//Python 2.x python -m SimpleHTTPServer //Python 3.x python -m http.server
```

这将会在为当前目录在8000端口创建一个服务器，也就是说你可以在地址栏里输入这个地址来访问已经创建好的服务器：

```
http://localhost:8000/
```

### Ruby server

如果你已经安装好了Ruby，通过执行下列命也可以创建同样的服务器：

```
ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"
```

### PHP server

PHP自从5.4.0版本开始，就内置了一个Web服务器：

```
php -S localhost:8000
```

### Lighttpd

Lighttpd是一个轻量级的通用Web服务器，在这里，我们将介绍如何在OS X上使用HomeBrew来安装它。 和我们在这里讨论的其他服务器不同，lighttpd是一个成熟的、准用于生产环境的服务器。

1. 通过HomeBrew安装lighttpd`brew install lighttpd`
2. 在你希望作为服务器来运行的目录里，创建一个名为lighttpd.conf的配置文件。 这是一个配置文件的样本：[TutorialConfiguration](http://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration)。
3. 在配置文件里，将server.document-root更改为你将要创建的服务器中的文件的所在的目录。
4. 通过这个命令来启动：`lighttpd -f lighttpd.conf`
5. 使用浏览器打开http://localhost:3000/，然后服务器将可以从你所选择的目录中向你提供静态文件。

### IIS

如果你正在使用Microsoft IIS来作为网站服务器，在服务器载入之前，请为.fbx扩展名增加MIME类型。

```
File name externsion: fbx        MIME Type: text/plain
```

在默认情况下，IIS阻止 .fbx、 .obj 文件的下载，因此你必须对IIS进行配置，使得这些类型的文件可以被下载。

其它简单的替代方案你可以在Stack Overflow上找到：[click here](http://stackoverflow.com/q/12905426/24874)。

# 画线（Drawing lines）

假设你将要画一个圆或者画一条线，而不是一个线框模型，或者说不是一个Mesh（网格）。 第一步我们要做的，是设置好renderer（渲染器）、scene（场景）和camera（相机）-（如果对这里所提到的东西，还不了解，请阅读本手册第一章“创建一个场景 - Creating a scene”）。

这是我们将要用到的代码：

```
const renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight ); document.body.appendChild( renderer.domElement ); const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 ); camera.position.set( 0, 0, 100 ); camera.lookAt( 0, 0, 0 ); const scene = new THREE.Scene();
```

接下来我们要做的事情是定义一个材质。对于线条来说，我们能使用的材质只有LineBasicMaterial 或者 LineDashedMaterial。

```
//create a blue LineBasicMaterial const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
```

定义好材质之后，我们需要一个带有一些顶点的geometry（几何体）。

```
const points = []; points.push( new THREE.Vector3( - 10, 0, 0 ) ); points.push( new THREE.Vector3( 0, 10, 0 ) ); points.push( new THREE.Vector3( 10, 0, 0 ) ); const geometry = new THREE.BufferGeometry().setFromPoints( points );
```

注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条（线条并未闭合）。

既然我们已经有了能够画两条线的点和一个材质，那我们现在就可以将他们组合在一起，形成一条线。

```
const line = new THREE.Line( geometry, material );
```

剩下的事情就是把它添加到场景中，并调用render（渲染）函数。

```
scene.add( line ); renderer.render( scene, camera );
```

你现在应当已经看到了一个由两条蓝线组成的、指向上的箭头。

# 创建文字（Creating text）

有时候，您可能需要在你的Three.js应用程序中使用到文本，这里有几种方法可以做到。

## 1. DOM + CSS

使用HTML通常是最简单、最快速的添加文本的方法，这是大多数的Three.js示例中用于添加描述性叠加文字的方法。

你可以在这里添加内容

<div id="info">Description</div>

然后使用CSS来将其绝对定位在其它具有z-index的元素之上，尤其是当你全屏运行three.js的时候。

`#info { position: absolute; top: 10px; width: 100%; text-align: center; z-index: 100; display:block; }`

## 2. 将文字绘制到画布中，并将其用作Texture（纹理）

如果你希望在three.js的场景中的平面上轻松地绘制文本，请使用此方法。

## 3. 在你所喜欢的3D软件里创建模型，并导出给three.js

如果你更喜欢使用3D建模软件来工作并导出模型到three.js，请使用这种方法。

## 4. three.js自带的文字几何体

如果你更喜欢使用纯three.js来工作，或者创建能够由程序改变的、动态的3D文字，你可以创建一个其几何体为THREE.TextGeometry的实例的网格：

`new THREE.TextGeometry( text, parameters );`

然而，为了使得它能够工作，你的TextGeometry需要在其“font”参数上设置一个THREE.Font的实例。
请参阅 TextGeometry 页面来阅读如何完成此操作的详细信息，以及每一个接收的参数的描述，还有由three.js分发、自带的JSON字体的列表。

### 示例

[WebGL / geometry / text](https://threejs.org/examples/#webgl_geometry_text)
[WebGL / shadowmap](https://threejs.org/examples/#webgl_shadowmap)

如果Typeface已经关闭，或者没有你所想使用的字体，这有一个教程:http://www.jaanga.com/2012/03/blender-to-threejs-create-3d-text-with.html
这是一个在blender上运行的python脚本，能够让你将文字导出为Three.js的JSON格式。

## 5. 位图字体

BMFonts (位图字体) 可以将字形批处理为单个BufferGeometry。BMFont的渲染支持自动换行、字母间距、字句调整、signed distance fields with standard derivatives、multi-channel signed distance fields、多纹理字体等特性。 详情请参阅 [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui) 或 [three-bmfont-text](https://github.com/Jam3/three-bmfont-text)。

现有库存的字体在项目中同样可用，就像[A-Frame Fonts](https://github.com/etiennepinchon/aframe-fonts)一样， 或者你也可以从任何TTF字体中创建你自己的字体，优化时，只需要包含项目中所需的字符即可。

这是一些有用的工具：

- [msdf-bmfont-web](http://msdf-bmfont.donmccurdy.com/) *(web-based)*
- [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml) *(commandline)*
- [hiero](https://github.com/libgdx/libgdx/wiki/Hiero) *(desktop app)*

# 载入3D模型（Loading 3D models）

目前，3D模型的格式有成千上万种可供选择，但每一种格式都具有不同的目的、用途以及复杂性。 虽然[ three.js已经提供了多种导入工具](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/loaders)， 但是选择正确的文件格式以及工作流程将可以节省很多时间，以及避免遭受很多挫折。某些格式难以使用，或者实时体验效率低下，或者目前尚未得到完全支持。

对大多数用户，本指南向你推荐了一个工作流程，并向你提供了一些当没有达到预期效果时的建议。

## 在开始之前

如果你是第一次运行一个本地服务器，可以先阅读[how to run things locally](https://threejs.org/docs/#manual/introduction/How-to-run-things-locally)。 正确地托管文件，可以避免很多查看3D模型时的常见错误。

## 推荐的工作流程

如果有可能的话，我们推荐使用glTF（gl传输格式）。.GLB和.GLTF是这种格式的这两种不同版本， 都可以被很好地支持。由于glTF这种格式是专注于在程序运行时呈现三维物体的，所以它的传输效率非常高，且加载速度非常快。 功能方面则包括了网格、材质、纹理、皮肤、骨骼、变形目标、动画、灯光和摄像机。

公共领域的glTF文件可以在网上找到，例如 [Sketchfab](https://sketchfab.com/models?features=downloadable&sort_by=-likeCount&type=models)，或者很多工具包含了glTF的导出功能：

- [Blender](https://www.blender.org/) by the Blender Foundation
- [Substance Painter](https://www.allegorithmic.com/products/substance-painter) by Allegorithmic
- [Modo](https://www.foundry.com/products/modo) by Foundry
- [Toolbag](https://www.marmoset.co/toolbag/) by Marmoset
- [Houdini](https://www.sidefx.com/products/houdini/) by SideFX
- [Cinema 4D](https://labs.maxon.net/?p=3360) by MAXON
- [COLLADA2GLTF](https://github.com/KhronosGroup/COLLADA2GLTF) by the Khronos Group
- [FBX2GLTF](https://github.com/facebookincubator/FBX2glTF) by Facebook
- [OBJ2GLTF](https://github.com/AnalyticalGraphicsInc/obj2gltf) by Analytical Graphics Inc
- …and [还有更多](http://github.khronos.org/glTF-Project-Explorer/)

倘若你所喜欢的工具不支持glTF格式，请考虑向该工具的作者请求glTF导出功能， 或者在[the glTF roadmap thread](https://github.com/KhronosGroup/glTF/issues/1051)贴出你的想法。

当glTF不可用的时候，诸如FBX、OBJ或者COLLADA等等其它广受欢迎的格式在Three.js中也是可以使用、并且定期维护的。

## 加载

Only a few loaders (e.g. ObjectLoader) are included by default with three.js — others should be added to your app individually.

```
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
```

一旦你引入了一个加载器，你就已经准备好为场景添加模型了。不同加载器之间可能具有不同的语法 —— 当使用其它格式的时候请参阅该格式加载器的示例以及文档。对于glTF，使用全局script的用法类似：

```
const loader = new GLTFLoader(); loader.load( 'path/to/model.glb', function ( gltf ) { 	scene.add( gltf.scene ); }, undefined, function ( error ) { 	console.error( error ); } );
```

请参阅GLTFLoader documentation来深入了解详细信息。

## 故障排除

你花了几个小时亲手建了一个堪称杰作的模型，现在你把它给导入到网页中—— 哦，天呐~😭它导入以后完全失真了、材质贴图丢了、或者说整个模型完全丢失了！
接下来我们来按照下面的步骤排除故障：

1. 在Javascript的Console中查找错误，并确定当你调用*.load()*的时候，使用了*onError*回调函数来输出结果。
2. 请在其它的应用程序中查看3D模型。对于glTF格式的模型来说，可以直接在下面的应用程序中进行查看： [three.js](https://gltf-viewer.donmccurdy.com/)和 [babylon.js](http://sandbox.babylonjs.com/)。 如果该模型能够在一个或者多个应用程序中正确地呈现，请[点击这里向three.js提交Bug报告](https://github.com/mrdoob/three.js/issues/new)。 如果模型不能在任意一个应用程序里显示，我们强烈鼓励你向我们提交Bug报告，并告知我们你的模型是使用哪一款应用程序创建的。
3. 尝试将模型放大或缩小到原来的1000倍。许多模型的缩放比例各不相同，如果摄像机位于模型内，则大型模型将可能不会显示。
4. 尝试添加一个光源并改变其位置。模型或许被隐藏在黑暗中。
5. 在网络面板中查找失败的纹理贴图请求，比如说*C:\\Path\To\Model\texture.jpg*。载入贴图时，请使用相对于模型文件路径，例如 *images/texture.jpg* —— 这或许需要在文本编辑器中来对模型文件进行修改。

## 请求帮助

如果你已经尝试经历了以上故障排除的过程，但是你的模型仍然无法工作，寻求正确的方法来获得帮助将使您更快地获得解决方案。 您可以将您的问题发布到[three.js forum](https://discourse.threejs.org/)， 同时，尽可能将你的模型（或者一个简单的、具有相同问题的模型）包含在你能够使用的任何格式中，为其他人提供足够的信息，以便快速重现这个问题 —— 最好是一个能够现场演示的Demo。

# 常见问题（FAQ）

## 哪一种三维物体格式能够得到最好地支持？

推荐使用glTF（gl传输格式）来对三维物体进行导入和导出，由于glTF这种格式专注于在程序运行时呈现三维物体，因此它的传输效率非常高，且加载速度非常快。

three.js同样也为其它广受欢迎的格式（例如FBX、Collada以及OBJ等）提供了载入工具。即便如此，你应当还是首先尝试着在你的项目中建立一个基于glTF的工作流程。 了解更多详细信息，请查看[loading 3D models](https://threejs.org/docs/#manual/introduction/Loading-3D-models)。

## 为什么在示例中会有一些和viewport相关的meta标签？

<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

这些标签用于在移动端浏览器上控制视口的大小和缩放（页面内容可能会以与可视区域不同的大小来呈现）。

[Safari: Using the Viewport](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html)

[MDN: Using the viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)

## 如何在窗口调整大小时保持场景比例不变？

我们希望所有的物体，无论它们距离摄像机有多远，都能呈现相同尺寸，即使是在窗口被重新调整大小的时候。 解决这个问题的关键，是一个很重要的公式：给定距离，求可见高度`visible_height = 2 * Math.tan( ( Math.PI / 180 ) * camera.fov / 2 ) * distance_from_camera;`如果我们以一定的百分比增加了窗口的高度，那我们所想要的结果便是所有距离的可见高度都增加相同的百分比。 这并不能通过改变摄像机的位置来实现，相反，你得改变摄像机的视野角度（FOV）。这是个示例：[Example](http://jsfiddle.net/Q4Jpu/).

## 为什么我的物体的一部分是不可见的？

这可能是由于面剔除而导致的。面是具有朝向的，这个朝向决定了哪边是正面或者哪边是背面。 在正常情况下，渲染时会将背面进行剔除。要查看这是不是你所遇到的问题，请将material的side更改为THREE.DoubleSide。`material.side = THREE.DoubleSide`

# 一些有用的链接（Useful links）

以下是一些在你学习three.js过程中，可能会对你有所帮助的链接。
如果你想在此添加内容，或是认为下方某个链接不再相关或无法工作， 请随时点击右下角“编辑”按钮来进行一些更改。

需要注意的是，由于three.js处于快速发展中，很多链接会包含过时的信息 —— 如果某个地方不能够如你所想或如链接中所说的正常工作， 请查看浏览器控制台中的警告和报错信息，同时也请参阅相关的文档页面。

## 帮助论坛

Three.js官方使用[forum](https://discourse.threejs.org/)（官方论坛） 和 [Stack Overflow](http://stackoverflow.com/tags/three.js/info)来处理帮助请求。 如果你需要一些帮助，这才是你所要去的地方。请**一定不要**在GitHub上提issue来寻求帮助。

## 教程以及课程

### three.js入门

- [Three.js Fundamentals starting lesson](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)
- [Beginning with 3D WebGL](https://codepen.io/rachsmith/post/beginning-with-3d-webgl-pt-1-the-scene) by [Rachel Smith](https://codepen.io/rachsmith/).
- [Animating scenes with WebGL and three.js](https://www.august.com.au/blog/animating-scenes-with-webgl-three-js/)

### 更加广泛、高级的文章与教程

- [Discover three.js](https://discoverthreejs.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)
- [Collection of tutorials](http://blog.cjgammon.com/) by [CJ Gammon](http://www.cjgammon.com/).
- [Glossy spheres in three.js](https://medium.com/soffritti.pierfrancesco/glossy-spheres-in-three-js-bfd2785d4857).
- [Interactive 3D Graphics](https://www.udacity.com/course/cs291) - a free course on Udacity that teaches the fundamentals of 3D Graphics, and uses three.js as its coding tool.
- [Aerotwist](https://aerotwist.com/tutorials/) tutorials by [Paul Lewis](https://github.com/paullewis/).
- [Learning Three.js](http://learningthreejs.com/) – a blog with articles dedicated to teaching three.js
- [Three.js Bookshelf](https://discourse.threejs.org/t/three-js-bookshelf/2468) - Looking for more resources about three.js or computer graphics in general? Check out the selection of literature recommended by the community.

## 新闻与更新

- [Three.js on Twitter](https://twitter.com/hashtag/threejs)
- [Three.js on reddit](http://www.reddit.com/r/threejs/)
- [WebGL on reddit](http://www.reddit.com/r/webgl/)
- [Learning WebGL Blog](http://learningwebgl.com/blog/) – The authoritive news source for WebGL.

## 示例

- [three-seed](https://github.com/edwinwebb/three-seed/) - three.js starter project with ES6 and Webpack
- [Professor Stemkoskis Examples](http://stemkoski.github.io/Three.js/index.html) - a collection of beginner friendly examples built using three.js r60.
- [Official three.js examples](https://threejs.org/examples/) - these examples are maintained as part of the three.js repository, and always use the latest version of three.js.
- [Official three.js dev branch examples](https://raw.githack.com/mrdoob/three.js/dev/examples/) - Same as the above, except these use the dev branch of three.js, and are used to check that everything is working as three.js being is developed.

## 工具

- [physgl.org](http://www.physgl.org/) - JavaScript front-end with wrappers to three.js, to bring WebGL graphics to students learning physics and math.
- [Whitestorm.js](https://whsjs.readme.io/) – Modular three.js framework with AmmoNext physics plugin.
- [Three.js Inspector](http://zz85.github.io/zz85-bookmarklets/threelabs.html)
- [ThreeNodes.js](http://idflood.github.io/ThreeNodes.js/).
- [comment-tagged-templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates) - VSCode extension syntax highlighting for tagged template strings, like: glsl.js.
- [WebXR-emulator-extension](https://github.com/MozillaReality/WebXR-emulator-extension)

## WebGL参考

- [webgl-reference-card.pdf](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf) - Reference of all WebGL and GLSL keywords, terminology, syntax and definitions.

## 较旧的链接

这些链接是出于历史目的而保留的，你或许可以发现它们仍然很有用，它们可能含有和three.js较为早前版本的有关的信息。

- [AlterQualia at WebGL Camp 3](https://www.youtube.com/watch?v=Dir4KO9RdhM)
- [Yomotsus Examples](http://yomotsu.github.io/threejs-examples/) - a collection of examples using three.js r45.
- [Introduction to Three.js](http://fhtr.org/BasicsOfThreeJS/#1) by [Ilmari Heikkinen](http://github.com/kig/) (slideshow).
- [WebGL and Three.js](http://www.slideshare.net/yomotsu/webgl-and-threejs) by [Akihiro Oyamada](http://github.com/yomotsu) (slideshow).
- [Fast HTML5 game development using three.js](http://bkcore.com/blog/general/adobe-user-group-nl-talk-video-hexgl.html) by [BKcore](https://github.com/BKcore) (video).
- [Trigger Rally](https://www.youtube.com/watch?v=VdQnOaolrPA) by [jareiko](https://github.com/jareiko) (video).
- [ThreeFab](http://blackjk3.github.io/threefab/) - scene editor, maintained up until around three.js r50.
- [Max to Three.js workflow tips and tricks](http://bkcore.com/blog/3d/webgl-three-js-workflow-tips.html) by [BKcore](https://github.com/BKcore)
- [A whirlwind look at Three.js](http://12devsofxmas.co.uk/2012/01/webgl-and-three-js/) by [Paul King](http://github.com/nrocy)
- [Animated selective glow in Three.js](http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html) by [BKcore](https://github.com/BKcore)
- [Building A Physics Simulation Environment](http://www.natural-science.or.jp/article/20120220155529.php) - three.js tutorial in Japanese

# ----------------------进阶--------------------------------------------------

# 如何更新场景（How to update things）

默认情况下，所有对象都会自动更新它们的矩阵（如果它们已添加到场景中）

```
const object = new THREE.Object3D(); scene.add( object );`或者它们是已添加到场景中的另一个对象的子节点:`const object1 = new THREE.Object3D(); const object2 = new THREE.Object3D(); object1.add( object2 ); scene.add( object1 ); //object1 和 object2 会自动更新它们的矩阵
```

但是，如果你知道对象将是静态的，则可以禁用此选项并在需要时手动更新转换矩阵。

```
object.matrixAutoUpdate  = false; object.updateMatrix();
```

## BufferGeometry

BufferGeometries 将信息（例如顶点位置，面索引，法线，颜色，uv和任何自定义属性）存储在buffers —— 也就是， [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays). 这使得它们通常比标准Geometries更快，缺点是更难用。

关于更新BufferGeometries，最重要的是理解你不能调整 buffers 大小（这种操作开销很大，相当于创建了个新的geometry）。 但你可以更新 buffers的内容。

这意味着如果你知道BufferGeometry的一个属性会增长，比如顶点的数量， 你必须预先分配足够大的buffer来容纳可能创建的任何新顶点。 当然，这也意味着BufferGeometry将有一个最大大小 —— 无法创建一个可以高效地无限扩展的BufferGeometry。

我们以在渲染时扩展的line来示例。我们将分配可容纳500个顶点的空间但起初仅绘制2个，使用 在500个顶点的缓冲区中，但首先只使用 BufferGeometry.drawRange。

```
const MAX_POINTS = 500; // geometry const geometry = new THREE.BufferGeometry(); // attributes const positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) ); // draw range const drawCount = 2; // draw the first 2 points, only geometry.setDrawRange( 0, drawCount ); // material const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // line const line = new THREE.Line( geometry,  material ); scene.add( line );
```

然后我们随机增加顶点到line中，以这样的一种方式：

```
const positions = line.geometry.attributes.position.array; let x, y, z, index; x = y = z = index = 0; for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {     positions[ index ++ ] = x;    positions[ index ++ ] = y;    positions[ index ++ ] = z;     x += ( Math.random() - 0.5 ) * 30;    y += ( Math.random() - 0.5 ) * 30;    z += ( Math.random() - 0.5 ) * 30; }
```

如果要更改第一次渲染后渲染的*点数*，执行以下操作：

```
line.geometry.setDrawRange( 0, newValue );
```

如果要在第一次渲染后更改position数值，则需要像这样设置needsUpdate标志：

```
line.geometry.attributes.position.needsUpdate = true; // 需要加在第一次渲染之后
```

[这个fiddle](https://jsfiddle.net/xvnctbL0/2/)展示了一个你可以参考的运动的line。

### 例子

[WebGL / custom / attributes](https://threejs.org/examples/#webgl_custom_attributes)
[WebGL / buffergeometry / custom / attributes / particles](https://threejs.org/examples/#webgl_buffergeometry_custom_attributes_particles)

## 材质（Materials）

所有uniforms值都可以自由改变（比如 colors, textures, opacity 等等），这些数值在每帧都发给shader。

GL状态相关参数也可以随时改变（depthTest, blending, polygonOffset 等）。

在运行时无法轻松更改以下属性（一旦material被渲染了一次）：

- uniforms的数量和类型
- 是否存在
  - texture
  - fog
  - vertex colors
  - morphing
  - shadow map
  - alpha test

这些变化需要建立新的shader程序。你需要设置

```
material.needsUpdate = true
```

请记住，这可能会非常缓慢并导致帧率的波动。（特别是在Windows上，因为shader编译在directx中比opengl慢）。

为了获得更流畅的体验，您可以通过“虚拟”值（如零强度光，白色纹理或零密度雾）在一定程度上模拟这些功能的变化。

您可以自由更改用于几何块的材质，但是无法更改对象如何划分为块（根据面材料）。

### 如果你需要在运行时使用不同的材料配置：

如果材料/块的数量很少，您可以事先预先划分物体（例如，人的头发/脸部/身体/上衣/裤子，汽车的前部/侧面/顶部/玻璃/轮胎/内部）。

如果数量很大（例如，每个面可能有所不同），请考虑不同的解决方案，例如使用属性/纹理来驱动不同的每个面部外观。

### 例子

[WebGL / materials / car](https://threejs.org/examples/#webgl_materials_car)
[WebGL / webgl_postprocessing / dof](https://threejs.org/examples/#webgl_postprocessing_dof)

## 纹理（Textures）

如果更改了图像，画布，视频和数据纹理，则需要设置以下标志：

```
texture.needsUpdate = true;
```

渲染对象就会自动更新。

### 例子

[WebGL / materials / video](https://threejs.org/examples/#webgl_materials_video)
[WebGL / rtt](https://threejs.org/examples/#webgl_rtt)

## 相机（Cameras）

相机的位置和目标会自动更新。 如果你需要改变

- fov
- aspect
- near
- far

那么你需要重新计算投影矩阵：

```
camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
```

# 如何废置对象（How to dispose of objects）

为了提高性能，并避免应用程序中的内存泄露，一个重要的方面是废置未使用的类库实体。 每当你创建一个**three.js**中的实例时，都会分配一定数量的内存。然而，**three.js**会创建在渲染中所必需的特定对象， 例如几何体或材质，以及与WebGL相关的实体，例如buffers或着色器程序。 非常值得注意的是，这些对象并不会被自动释放；相反，应用程序必须使用特殊的API来释放这些资源。 本指南简要概述了这一API是如何使用的，以及哪些对象是和这一环境相关的。

## 几何体

几何体常用来表示定义为属性集合的顶点信息，**three.js**在内部为每一个属性创建一个[WebGLBuffer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer)类型的对象。 这些实体仅有在调用BufferGeometry.dispose()的时候才会被删除。 如果应用程序中的几何体已废弃，请执行该方法以释放所有相关资源。

## 材质

材质定义了物体将如何被渲染。**three.js**使用材质所定义的信息来构造一个着色器程序，以用于渲染。 着色器程序只有在相应材质被废置后才能被删除。由于性能的原因，**three.js**尽可能尝试复用已存在的着色器程序。 因此，着色器程序只有在所有相关材质被废置后才被删除。 你可以通过执行Material.dispose()方法来废置材质。

## 纹理

对材质的废置不会对纹理造成影响。它们是分离的，因此一个纹理可以同时被多个材质所使用。 每当你创建一个Texture实例的时候，three.js在内部会创建一个[WebGLTexture](https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture)实例。 和buffer相似，该对象只能通过调用Texture.dispose()来删除。

## 渲染目标

WebGLRenderTarget类型的对象不仅分配了[WebGLTexture](https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture)的实例， 还分配了[WebGLFramebuffer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLFramebuffer)和[WebGLRenderbuffer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderbuffer)来实现自定义渲染目标。 这些对象仅能通过执行WebGLRenderTarget.dispose()来解除分配。

## 杂项

有一些来自examples目录的类，例如控制器或者后期处理过程，提供了**dispose()**方法以用于移除内部事件监听器或渲染目标。 通常来讲，非常建议查阅类的API或者文档，并注意**dispose()**函数。如果该函数存在的话，你应当在清理时使用它。

## 常见问题

### 为何**three.js**不能够自动废置对象？

这一问题在社区中多次被问到，因此澄清这件事情是十分有必要的。事实是，**three.js**并不知道用户所创建的实体（例如几何体或者材质）的生命周期或作用范围，这些是应用程序的责任。 比如说，即使一个材质当前没有被用于渲染，但它也可能是下一帧所必需的。 因此，如果应用程序决定某个对象可以被删除，则它必须通过调用对应的**dispose()**方法来通知引擎。

### 将一个mesh（网格）从场景中移除，是否也会废置它的geometry（几何体）和material（材质）？

并不会，你必须通过**dispose()**来明确地废置geometry（几何体）或material（材质）。 请记住，geometry（几何体）或material（材质）可以在3D物体之间（例如mesh（网格））被共享。

### **three.js**是否会提供被缓存对象数量的相关信息？

是的，可以评估WebGLRenderer.info —— 渲染器中的一个特殊属性，具有一系列关于显存和渲染过程的统计信息。 除此之外，它还告诉你有多少纹理、几何体和着色器程序在内部存储。 如果你在你的应用程序中注意到了性能问题，一个较好的方法便是调试该属性，以便轻松识别内存泄漏。

### 当你在纹理还没有被加载时，在纹理上调用**dispose()**，会发生什么？

对于纹理的内部资源仅在图像完全被加载后才会分配。如果你在图像被加载之前废置纹理，什么都不会发生。 没有资源被分配，因此也没有必要进行清理。

### 当我在调用**dispose()**之后，使用相应的对象会发生什么？

被删除掉的内部资源会被引擎重新创建，因此不会有运行时错误发生，但你可能会注意到这会对当前帧的性能有一些影响，特别是当着色器程序被编译的时候。

### 我如何在我的应用程序中管理**three.js**中的对象？我如何知道什么时候该废置事物？

一般来说，对此并没有明确的建议。调用**dispose()**什么时候合适，很大程度上取决于具体的用例。 必须指出的是，没有必要总是废置对象。一个较好的例子便是一个由多个关卡所组成的游戏。使用到对象废置的地方就是当切换关卡的时候。 应用程序可以通过较老的场景，并废置所有过时的材质、几何体和纹理贴图。 正如在前面的章节中所提到，如果你废置一个仍然在使用的对象，并不会导致运行时错误。可能发生的最糟糕的事情便是单帧的性能会下降。

## 演示dispose()使用方法的示例

[WebGL / test / memory](https://threejs.org/examples/#webgl_test_memory)
[WebGL / test / memory2](https://threejs.org/examples/#webgl_test_memory2)

# 如何创建VR内容（How to create VR content）

本指南简要介绍了使用three.js来制作的基于Web的VR应用程序的基本组件。

## 工作流程

首先，你需要将[VRButton.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/VRButton.js) 包含到你的项目中。

```
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
```

**VRButton.createButton()**做了两件重要的事情：首先，它创建了一个按钮，指示了VR的兼容性； 此外，若用户激活了这个按钮，则它将开启一个VR会话。 你所要做的唯一一件事情，便是把下面的这一行代码加入到你的应用程序里。

```
document.body.appendChild( VRButton.createButton( renderer ) );
```

接下来，你需要告诉你的**WebGLRenderer**实例来启用XR渲染。

```
renderer.xr.enabled = true;
```

最后，你需要调整你的动画循环，因为在这里我们不能使用我们所熟知的 **window.requestAnimationFrame()**函数来更新场景。对于VR项目来说，我们使用的是setAnimationLoop。 简短的示例代码如下：

```
renderer.setAnimationLoop( function () { 	renderer.render( scene, camera ); } );
```

## 接下来的步骤

请查看官方示例中与WebVR相关的示例，了解这一工作流程的实际使用、运行情况。

[WebXR / VR / ballshooter](https://threejs.org/examples/#webxr_vr_ballshooter)
[WebXR / VR / cubes](https://threejs.org/examples/#webxr_vr_cubes)
[WebXR / VR / dragging](https://threejs.org/examples/#webxr_vr_dragging)
[WebXR / VR / lorenzattractor](https://threejs.org/examples/#webxr_vr_lorenzattractor)
[WebXR / VR / paint](https://threejs.org/examples/#webxr_vr_paint)
[WebXR / VR / panorama_depth](https://threejs.org/examples/#webxr_vr_panorama_depth)
[WebXR / VR / panorama](https://threejs.org/examples/#webxr_vr_panorama)
[WebXR / VR / rollercoaster](https://threejs.org/examples/#webxr_vr_rollercoaster)
[WebXR / VR / sandbox](https://threejs.org/examples/#webxr_vr_sandbox)
[WebXR / VR / sculpt](https://threejs.org/examples/#webxr_vr_sculpt)
[WebXR / VR / video](https://threejs.org/examples/#webxr_vr_video)

# 如何使用后期处理（How to use post-processing）

很多three.js应用程序是直接将三维物体渲染到屏幕上的。 有时，你或许希望应用一个或多个图形效果，例如景深、发光、胶片微粒或是各种类型的抗锯齿。 后期处理是一种被广泛使用、用于来实现这些效果的方式。 首先，场景被渲染到一个渲染目标上，渲染目标表示的是一块在显存中的缓冲区。 接下来，在图像最终被渲染到屏幕之前，一个或多个后期处理过程将滤镜和效果应用到图像缓冲区。

three.js通过EffectComposer（效果合成器），提供了一个完整的后期处理解决方案来实现这样的工作流程。

## 工作流程

首先，我们要做的是从示例（examples）文件夹导入所有必需的文件。本指南假设你正在使用three.js官方npm包（[npm package](https://www.npmjs.com/package/three)）。 在本指南的基础示例中，我们需要下列文件。

```
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'; import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
```

当这些文件被成功导入后，我们便可以通过传入一个WebGLRenderer的实例，来创建我们的合成器了。

```
const composer = new EffectComposer( renderer );
```

在使用合成器时，我们需要对应用程序的动画循环进行更改。 现在我们不再调用WebGLRenderer的render方法，而是使用EffectComposer中对应的render方法。

```
function animate() { 	requestAnimationFrame( animate ); 	composer.render(); }
```

我们的合成器已经准备好了，现在我们就可以来配置后期处理过程链了。 这些过程负责创建应用程序的最终视觉输出，它们按照添加/插入的顺序来进行处理。 在我们的示例中，首先执行的是**RenderPass**实例，然后是**GlitchPass**。在链中的最后一个过程将自动被渲染到屏幕上。 这些过程的设置类似这样：

```
const renderPass = new RenderPass( scene, camera ); composer.addPass( renderPass ); const glitchPass = new GlitchPass(); composer.addPass( glitchPass );
```

**RenderPass**通常位于过程链的开始，以便将渲染好的场景作为输入来提供给下一个后期处理步骤。 在我们的示例中，**GlitchPass**将会使用这些图像数据，来应用一个疯狂的故障效果。参见这个示例： [live example](https://threejs.org/examples/webgl_postprocessing_glitch)来看一看它的实际效果。

## 内置过程

你可以使用由本引擎提供的各种预定义好的后期处理过程， 它们位于[postprocessing](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/postprocessing)目录中。

## 自定义过程

有时你或许想要自己写一个自定义后期处理着色器，并将其包含到后期处理过程链中。 对于这个需求，你可以使用**ShaderPass**。在引入该文件以及你的自定义着色期后，可以使用下列代码来设置该过程：

```
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'; import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'; // later in your init routine const luminosityPass = new ShaderPass( LuminosityShader ); composer.addPass( luminosityPass );
```

本仓库中提供了一个名为[CopyShader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/shaders/CopyShader.js)的文件， 这是你自定义自己的着色器的一个很好的起始代码。**CopyShader**仅仅是拷贝了读缓冲区中的图像内容到写缓冲区，不会应用任何效果。

# 矩阵变换（Matrix transformations）

Three.js使用**matrix**编码3D变换 —— 平移（位置），旋转和缩放。 Object3D的每个实例都有一个matrix，用于存储该对象的位置，旋转和比例。本页介绍如何更新对象的变换。

## 便利的属性和**matrixAutoUpdate**（Convenience properties and **matrixAutoUpdate**）

有两种方法可以更新对象的转换：

1. 修改对象的**position**，**quaternion**和**scale**属性，让three.js重新计算来自这些属性的对象矩阵：`object.position.copy( start_position ); object.quaternion.copy( quaternion );`默认情况下，**matrixAutoUpdate**属性设置为true，并且将自动重新计算矩阵。 如果对象是静态的，或者您希望在重新计算时手动控制，则可以通过将属性设置为false来获得更好的性能：`object.matrixAutoUpdate = false;`更改任何属性后，手动更新矩阵：`object.updateMatrix();`
2. 直接修改对象的矩阵。 Matrix4类有各种修改矩阵的方法：`object.matrix.setRotationFromQuaternion( quaternion ); object.matrix.setPosition( start_position ); object.matrixAutoUpdate = false;`请注意，在这种情况下，**matrixAutoUpdate** *必须* 设置为**false**，并且您应该确保 *不* 调用**updateMatrix**。 调用**updateMatrix**将破坏对矩阵所做的手动更改，从**position**，**scale**重新计算矩阵，依此类推。

## 对象和世界矩阵（Object and world matrices）

一个对象的matrix存储了该对象 *相对于* 其Object3D.parent（父节点）的变换。要在 *世界* 坐标系中获取对象的转换，您必须访问该对象的Object3D.matrixWorld。

当父对象或子对象的变换发生更改时，可以通过调用[page:Object3D.updateMatrixWorld updateMatrixWorld()]来请求更新子对象的matrixWorld。

## 旋转和四元数（Rotation and Quaternion）

Three.js提供了两种表示3D旋转的方式：Euler angles（欧拉角）和Quaternions（四元数），以及两者之间的转换方法。 欧拉角有称为“万向节锁定”的问题，其中某些配置可能失去一定程度的自由度（防止物体绕一个轴旋转）。 因此，对象旋转 *始终* 存储在对象的quaternion中。

该库的早期版本包含**useQuaternion**属性，当设置为false时，将导致对象的matrix从欧拉角计算。这种做法已被弃用 - 作为代替，您应该使用setRotationFromEuler方法，该方法将更新四元数。

# 动画系统（Animation system）

## 概述

在three.js动画系统中，您可以为模型的各种属性设置动画： SkinnedMesh（蒙皮和装配模型）的骨骼，morph targets（变形目标）， 不同的材料属性（颜色，不透明度，布尔运算），可见性和变换。动画属性可以淡入、淡出、交叉淡化和扭曲。 在相同或不同物体上同时发生的动画的权重和时间比例的变化可以独立地进行。 相同或不同物体的动画也可以同步发生。

为了在一个同构系统中实现所有这一切， three.js的动画系统[在2015年彻底改变](https://github.com/mrdoob/three.js/issues/6881)（注意过时的信息！）， 它现在有一个与Unity/虚幻4引擎类似的架构。此页面简要阐述了这个系统中的主要组件以及它们如何协同工作。

### 动画片段（Animation Clips）

如果您已成功导入3D动画对象（无论它是否有骨骼或变形目标或两者皆有都不要紧）—— 例如使用[glTF Blender exporter](https://github.com/KhronosGroup/glTF-Blender-IO)（glTF Blender导出器） 从Blender导出它并使用GLTFLoader将其加载到three.js场景中 —— 其中一个响应字段应该是一个名为“animations”的数组， 其中包含此模型的AnimationClips（请参阅下面可用的加载器列表）。

每个**AnimationClip**通常保存对象某个活动的数据。 举个例子，假如mesh是一个角色，可能有一个AnimationClip实现步行循环， 第二个AnimationClip实现跳跃，第三个AnimationClip实现闪避等等。

### 关键帧轨道（Keyframe Tracks）

在这样的**AnimationClip**里面，每个动画属性的数据都存储在一个单独的KeyframeTrack中。 假设一个角色对象有Skeleton（骨架）， 一个关键帧轨道可以存储下臂骨骼位置随时间变化的数据， 另一个轨道追踪同一块骨骼的旋转变化，第三个追踪另外一块骨骼的位置、转角和尺寸，等等。 应该很清楚，AnimationClip可以由许多这样的轨道组成。

假设模型具有morph Targets（变形目标）—— 例如一个变形目标显示一个笑脸，另一个显示愤怒的脸 —— 每个轨道都持有某个变形目标在AnimationClip运行期间产生的Mesh.morphTargetInfluences（变形目标影响）如何变化的信息。

### 动画混合器（Animation Mixer）

存储的数据仅构成动画的基础 —— 实际播放由AnimationMixer控制。 你可以想象这不仅仅是动画的播放器，而是作为硬件的模拟，如真正的调音台，可以同时控制和混合若干动画。

### 动画行为（Animation Actions）

**AnimationMixer**本身只有很少的（大体上）属性和方法， 因为它可以通过AnimationActions来控制。 通过配置**AnimationAction**，您可以决定何时播放、暂停或停止其中一个混合器中的某个**AnimationClip**， 这个**AnimationClip**是否需要重复播放以及重复的频率， 是否需要使用淡入淡出或时间缩放，以及一些其他内容（例如交叉渐变和同步）。

### 动画对象组（Animation Object Groups）

如果您希望一组对象接收共享的动画状态，则可以使用AnimationObjectGroup。

### 支持的格式和加载器（Supported Formats and Loaders）

请注意，并非所有模型格式都包含动画（尤其是OBJ，没有）， 而且只有某些three.js加载器支持AnimationClip序列。 以下几个*确实*支持此动画类型：

- THREE.ObjectLoader
- THREE.BVHLoader
- THREE.ColladaLoader
- THREE.FBXLoader
- THREE.GLTFLoader
- THREE.MMDLoader

请注意，3ds max和Maya当前无法直接导出多个动画（这意味着动画不是在同一时间线上）到一个文件中。

## 范例

```
let mesh; // 新建一个AnimationMixer, 并取得AnimationClip实例列表 const mixer = new THREE.AnimationMixer( mesh ); const clips = mesh.animations; // 在每一帧中更新mixer function update () { mixer.update( deltaSeconds ); } // 播放一个特定的动画 const clip = THREE.AnimationClip.findByName( clips, 'dance' ); const action = mixer.clipAction( clip ); action.play(); // 播放所有动画 clips.forEach( function ( clip ) { mixer.clipAction( clip ).play(); } );
```

# ------------------构建工具

# 使用NPM进行测试（Testing with NPM）

这篇文章展示了如何将three.js置入[node.js](https://nodejs.org/en/)环境中， 这样你就可以执行自动化测试了。测试可以通过命令行或者类似[Travis](https://travis-ci.org/)的CI工具来运行。

## 一句话概括

如果你习惯使用node和npm，`$ npm install three --save-dev`并将`const THREE = require('three');`添加到你的测试中。

## 从头创建一个可测试的项目

如果你不太熟悉这些工具，下面是一个快速入门。（基于linux，在windows上的安装过程会稍稍有点不一样，不过NPM指令是相同的。）

### 基本设置

1. 安装[npm](https://www.npmjs.org/)和nodejs。最简单的方式一般像这样`$ sudo apt-get install -y npm nodejs-legacy # 修复默认registry URL中任何SSL的问题 $ npm config set registry http://registry.npmjs.org/`
2. 新建一个项目路径`$ mkdir test-example; cd test-example`
3. 让npm为你创建一份新的项目文件：`$ npm init`在所有出现的提示中敲击回车键来接受默认值。 这样，一份package.json就建立好了。
4. 尝试启动测试功能`$ npm test`当然，这一定会失败。 如果你检查一下package.json，test script的定义是这样的`"test": "echo \"Error: no test specified\" && exit 1"`

## 添加mocha

我们将使用[mocha](https://mochajs.org/)。

1. 安装mocha`$ npm install mocha --save-dev`你会注意到 node_modules/ 被创建了，并且你的依赖都出现在了这里面。 还有你的package.json被更新了，--save-dev指令向其中加入并更新了devDependencies属性。
2. 编辑package.json来使用mocha进行测试。当调用测试的时候，我们只想运行mocha并且生成一份详细的报告。 默认情况下这会运行 test/ 中的任何东西。 （如果项目中没有 test/ 目录的话，会导致npm报错。你可以通过mkdir test来创建这个目录）`"test": "mocha --reporter list"`
3. 重新运行测试`$ npm test`现在应该就能成功执行了，生成类似 0 passing (1ms) 的报告。

## 添加three.js

1. 现在添加我们的three.js依赖

   ```
   $ npm install three --save-dev
   ```

   - 如果你需要three.js的其他版本，使用`$ npm show three versions`来确认哪些是可用的。要让npm使用正确的版本，执行`$ npm install three@0.84.0 --save`（例子中用的是0.84.0）。 --save 指令将此加入项目的dependency而不是dev dependency。 更多信息请参阅[这份文档](https://www.npmjs.org/doc/json.html)。

2. Mocha会在 test/ 目录中寻找测试文件，所以我们先创建这个目录：`$ mkdir test`

3. 最后我们需要一份JS测试文件来运行。我们就添加一段简单的测试程序，这段程序会检验three.js对象是否能正常工作。 在 test/ 目录下创建verify-three.js包含以下代码：`const THREE = require('three'); const assert = require("assert"); describe('The THREE object', function() {  it('should have a defined BasicShadowMap constant', function() {    assert.notEqual('undefined', THREE.BasicShadowMap);  }),   it('should be able to construct a Vector3 with default of x=0', function() {    const vec3 = new THREE.Vector3();    assert.equal(0, vec3.x);  }) })`

4. 最后再次通过$ npm test来测试。这次应该能正确执行上面的代码，并且返回类似：`The THREE object should have a defined BasicShadowMap constant: 0ms The THREE object should be able to construct a Vector3 with default of x=0: 0ms 2 passing (8ms)`

## 加入你自己的代码

你需要做下面三件事：

1. 为你的代码写一段测试程序来检验期望结果，并把它放在 test/ 目录下。 [这里](https://github.com/air/encounter/blob/master/test/Physics-test.js)有一个实际项目的例子。
2. 将你的代码以nodejs承认的方式导出，即可以通过require的方式引用。 参考[这份代码](https://github.com/air/encounter/blob/master/js/Physics.js)。
3. 在测试程序中通过require引入你自己的代码，就像上面例子中我们通过require('three')来引入一样。

第2、3条会根据你组织代码的方式而改变。在上面给出的Physics.js的例子中，导出的部分在代码的最末尾。 我们将module.exports赋值为一个对象:

```
//============================================================================= // 为了在nodejs中可用 //============================================================================= if (typeof exports !== 'undefined') {  module.exports = Physics; }
```

## 处理依赖

如果你已经在使用require.js或者browserify之类的便捷工具，就跳过这个部分。

一般来说，一个three.js项目将在浏览器中运行，浏览器会通过执行一系列script标签来加载模块。 你自己的文件不用考虑依赖的问题。然而在nodejs环境中，没有一个关联所有文件的index.html，所以你需要显式地加载。

如果你要导出的模块还依赖其他文件，你需要告诉node去加载它们。下面是一种方式：

1. 在你的模块顶部，检查是否处于nodejs环境中。
2. 如果是，那就显式地声明你的依赖。
3. 如果不是，你多半处于浏览器环境中。这时候你不需要做任何多余操作。

用Physics.js中的代码举例:`//============================================================================= // 服务器端测试配置 //============================================================================= if (typeof require === 'function') // 检测nodejs环境 {  const THREE = require('three');  const MY3 = require('./MY3.js'); }`

