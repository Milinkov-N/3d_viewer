/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _program__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./program */ "./src/program.ts");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scene */ "./src/scene.ts");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapes */ "./src/shapes.ts");
/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader */ "./src/shader.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};





var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.run = function () {
        var $angle = document.querySelector('#angle');
        var $scale = document.querySelector('#scale');
        var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getRenderingContext)('#webgl'), wgl = _a[0], _ = _a[1];
        var shaders = (0,_shader__WEBPACK_IMPORTED_MODULE_3__.loadShaderFromScripts)(wgl, ['#v-shader', '#f-shader']);
        var program = new _program__WEBPACK_IMPORTED_MODULE_0__["default"](wgl, shaders);
        var scene = new _scene__WEBPACK_IMPORTED_MODULE_1__["default"](wgl);
        var f = new _shapes__WEBPACK_IMPORTED_MODULE_2__.FLetter();
        f.scale(2);
        f.rotate(17);
        f.moveTo([97, 150]);
        f.moveOrigin([-97 / 2, -75]);
        var triangles = [
            new _shapes__WEBPACK_IMPORTED_MODULE_2__.Triangle([5, 5], [0, 1, 0, 1]),
            new _shapes__WEBPACK_IMPORTED_MODULE_2__.Triangle([360, 240]),
            new _shapes__WEBPACK_IMPORTED_MODULE_2__.Triangle([5, 245]),
            new _shapes__WEBPACK_IMPORTED_MODULE_2__.Triangle([360, 5]),
        ].map(function (t) {
            t.scale(0.25);
            t.rotate(25);
            return t;
        });
        $angle.oninput = function () {
            f.rotate(Number($angle.value));
            scene.draw();
        };
        $scale.oninput = function () {
            f.scale(Number($scale.value));
            scene.draw();
        };
        scene.using(program);
        scene.setObjects(__spreadArray(__spreadArray([], triangles, true), [f], false));
        scene.draw();
    };
    return App;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


/***/ }),

/***/ "./src/matrix.ts":
/*!***********************!*\
  !*** ./src/matrix.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Mat3 = /** @class */ (function () {
    function Mat3(values) {
        this.m_Buf = values;
    }
    Mat3.Translation = function (tx, ty) {
        return new Mat3([1, 0, 0, 0, 1, 0, tx, ty, 1]);
    };
    Mat3.Rotation = function (angle) {
        var sine = Math.sin(angle);
        var cosine = Math.cos(angle);
        return new Mat3([cosine, -sine, 0, sine, cosine, 0, 0, 0, 1]);
    };
    Mat3.Scaling = function (sx, sy) {
        return new Mat3([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
    };
    Mat3.Projection = function (_a) {
        var width = _a[0], height = _a[1];
        // Note: This matrix flips the Y axis so that 0 is at the top.
        return new Mat3([2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]);
    };
    Mat3.prototype.translate = function (tx, ty) {
        return new Mat3(this.m_Buf).multiply(Mat3.Translation(tx, ty));
    };
    Mat3.prototype.rotate = function (scalar) {
        return new Mat3(this.m_Buf).multiply(Mat3.Rotation(scalar));
    };
    Mat3.prototype.scale = function (sx, sy) {
        return new Mat3(this.m_Buf).multiply(Mat3.Scaling(sx, sy));
    };
    Mat3.prototype.multiply = function (other) {
        var _a = this.m_Buf, a00 = _a[0], a01 = _a[1], a02 = _a[2], a10 = _a[3], a11 = _a[4], a12 = _a[5], a20 = _a[6], a21 = _a[7], a22 = _a[8];
        var _b = other.m_Buf, b00 = _b[0], b01 = _b[1], b02 = _b[2], b10 = _b[3], b11 = _b[4], b12 = _b[5], b20 = _b[6], b21 = _b[7], b22 = _b[8];
        return new Mat3([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);
    };
    return Mat3;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mat3);


/***/ }),

/***/ "./src/mesh.ts":
/*!*********************!*\
  !*** ./src/mesh.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./src/matrix.ts");

var Mesh = /** @class */ (function () {
    function Mesh(vertices, color) {
        this.m_Translation = [0, 0];
        this.m_Angle = 0;
        this.m_Scale = [1, 1];
        this.m_Color = [0, 0, 0, 1];
        this.m_Vertices = vertices;
        if (color != undefined)
            this.m_Color = color;
    }
    Mesh.prototype.move = function (pixels) {
        this.m_Translation[0] += pixels[0];
        this.m_Translation[1] += pixels[1];
    };
    Mesh.prototype.moveTo = function (pixels) {
        this.m_Translation[0] = pixels[0];
        this.m_Translation[1] = pixels[1];
    };
    Mesh.prototype.moveOrigin = function (pos) {
        this.m_Origin = pos;
    };
    Mesh.prototype.scale = function (amount) {
        this.m_Scale = [amount, amount];
    };
    Mesh.prototype.rotate = function (angle) {
        this.m_Angle = angle;
    };
    Mesh.prototype.computeTransform = function (projection) {
        var projectionMat = _matrix__WEBPACK_IMPORTED_MODULE_0__["default"].Projection(projection);
        var radians = ((360 - this.m_Angle) * Math.PI) / 180;
        var _a = this.m_Translation, translateX = _a[0], translateY = _a[1];
        var _b = this.m_Scale, scaleX = _b[0], scaleY = _b[1];
        var matrix = projectionMat
            .translate(translateX, translateY)
            .rotate(radians)
            .scale(scaleX, scaleY);
        if (this.m_Origin != undefined)
            return matrix.translate(this.m_Origin[0], this.m_Origin[1]).m_Buf;
        else
            return matrix.m_Buf;
    };
    Mesh.prototype.countIndices = function () {
        return this.m_Indices.length;
    };
    Mesh.prototype.data = function () {
        return this.m_Vertices;
    };
    Mesh.prototype.indices = function () {
        return this.m_Indices;
    };
    Mesh.prototype.color = function () {
        return this.m_Color;
    };
    return Mesh;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mesh);


/***/ }),

/***/ "./src/program.ts":
/*!************************!*\
  !*** ./src/program.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var Program = /** @class */ (function () {
    function Program(ctx, _a) {
        var vShader = _a[0], fShader = _a[1];
        var program = ctx.createProgram();
        ctx.attachShader(program, vShader);
        ctx.attachShader(program, fShader);
        ctx.linkProgram(program);
        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', ctx.getProgramInfoLog(program));
            return null;
        }
        console.info('Successfully linked program');
        this.m_Program = program;
    }
    Program.prototype.self = function () {
        return this.m_Program;
    };
    Program.prototype.attrs = function (attrs) {
        this.m_Attrs = attrs;
    };
    Program.prototype.uniforms = function (uniforms) {
        this.m_Uniforms = uniforms;
    };
    Program.prototype.bindAttrs = function (ctx) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setAttributes)(ctx, this.m_Program, this.m_Attrs);
    };
    Program.prototype.bindUniforms = function (ctx) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setUniforms)(ctx, this.m_Program, this.m_Uniforms);
    };
    Program.prototype.use = function (ctx) {
        ctx.useProgram(this.m_Program);
    };
    return Program;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Program);


/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var Scene = /** @class */ (function () {
    function Scene(ctx) {
        this.m_Ctx = ctx;
        this.m_iBuf = ctx.createBuffer();
        ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.m_iBuf);
        this.m_pBuf = ctx.createBuffer();
        ctx.bindBuffer(ctx.ARRAY_BUFFER, this.m_pBuf);
    }
    Scene.prototype.using = function (program) {
        this.m_Program = program;
    };
    Scene.prototype.setObjects = function (objects) {
        this.m_Objects = objects;
    };
    Scene.prototype.draw = function () {
        var _this = this;
        this.m_Ctx.viewport(0, 0, this.m_Ctx.canvas.width, this.m_Ctx.canvas.height);
        this.m_Ctx.clearColor(0, 0, 0, 0);
        this.m_Ctx.clear(this.m_Ctx.COLOR_BUFFER_BIT);
        this.m_Program.attrs({
            a_position: {
                buffer: this.m_pBuf,
                size: 2,
                type: this.m_Ctx.FLOAT,
            },
        });
        // Tell it to use our program (pair of shaders)
        this.m_Program.use(this.m_Ctx);
        // this.m_Ctx.bindBuffer(this.m_Ctx.ARRAY_BUFFER, this.m_pBuf)
        this.m_Program.bindAttrs(this.m_Ctx);
        this.m_Objects.forEach(function (obj) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setUniforms)(_this.m_Ctx, _this.m_Program.self(), {
                u_color: obj.color(),
                u_matrix: obj.computeTransform([
                    _this.m_Ctx.canvas.width,
                    _this.m_Ctx.canvas.height,
                ]),
            });
            // this.m_Ctx.bindBuffer(this.m_Ctx.ARRAY_BUFFER, this.m_pBuf)
            _this.m_Ctx.bindBuffer(_this.m_Ctx.ELEMENT_ARRAY_BUFFER, _this.m_iBuf);
            _this.m_Ctx.bufferData(_this.m_Ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.indices()), _this.m_Ctx.STATIC_DRAW);
            _this.m_Ctx.bufferData(_this.m_Ctx.ARRAY_BUFFER, new Float32Array(obj.data()), _this.m_Ctx.STATIC_DRAW);
            {
                // draw points
                var primitiveType = _this.m_Ctx.POINTS;
                var drawOffset = 0;
                var count = obj.countIndices();
                var indexType = _this.m_Ctx.UNSIGNED_SHORT;
                _this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset);
            }
            {
                // draw triangles
                var primitiveType = _this.m_Ctx.LINE_STRIP;
                var drawOffset = 0;
                var count = obj.countIndices();
                var indexType = _this.m_Ctx.UNSIGNED_SHORT;
                _this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset);
            }
        });
    };
    return Scene;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene);


/***/ }),

/***/ "./src/shader.ts":
/*!***********************!*\
  !*** ./src/shader.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "loadShaderFromScripts": () => (/* binding */ loadShaderFromScripts)
/* harmony export */ });
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["Vertex"] = 0] = "Vertex";
    ShaderType[ShaderType["Fragment"] = 1] = "Fragment";
})(ShaderType || (ShaderType = {}));
var Shader = /** @class */ (function () {
    function Shader(selector) {
        var $shader = this._getElement(selector);
        this._setType(selector, $shader.type);
        this.m_Source = $shader.textContent;
    }
    Shader.prototype.compile = function (ctx) {
        var shader = this.m_Type == ShaderType.Vertex
            ? ctx.createShader(ctx.VERTEX_SHADER)
            : ctx.createShader(ctx.FRAGMENT_SHADER);
        ctx.shaderSource(shader, this.m_Source);
        ctx.compileShader(shader);
        if (!this._checkCompileStatus(ctx, shader))
            return null;
        console.info('Successfully loaded', this.m_Type == ShaderType.Vertex ? 'vertex' : 'fragment', 'shader');
        return shader;
    };
    Shader.prototype._getElement = function (selector) {
        var $shader = document.querySelector(selector);
        if ($shader == null)
            throw new Error("Shader creation failed (element '".concat(selector, "' doesn't exists)"));
        return $shader;
    };
    Shader.prototype._setType = function (selector, mimeType) {
        switch (mimeType) {
            case 'x-shader/x-vertex':
                this.m_Type = ShaderType.Vertex;
                break;
            case 'x-shader/x-fragment':
                this.m_Type = ShaderType.Fragment;
                break;
            default:
                throw new Error("Shader creation failed (element '".concat(selector, "' have wrong shader type '").concat(mimeType, "')"));
        }
    };
    Shader.prototype._checkCompileStatus = function (ctx, shader) {
        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            console.error("An error occured compiling the shaders: ".concat(ctx.getShaderInfoLog(shader)));
            ctx.deleteShader(shader);
            return false;
        }
        return true;
    };
    return Shader;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shader);
function loadShaderFromScripts(ctx, _a) {
    var vShaderSelector = _a[0], fShaderSelector = _a[1];
    var vShader = new Shader(vShaderSelector).compile(ctx);
    var fShader = new Shader(fShaderSelector).compile(ctx);
    return [vShader, fShader];
}


/***/ }),

/***/ "./src/shapes.ts":
/*!***********************!*\
  !*** ./src/shapes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FLetter": () => (/* binding */ FLetter),
/* harmony export */   "Triangle": () => (/* binding */ Triangle)
/* harmony export */ });
/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(origin, color) {
        var _this = _super.call(this, [0, 240, 0, 0, 360, 240], color) || this;
        _this.m_Indices = [0, 1, 2, 0];
        _this.m_Translation = origin;
        color != undefined
            ? (_this.m_Color = color)
            : (_this.m_Color = [Math.random(), Math.random(), Math.random(), 1]);
        return _this;
    }
    return Triangle;
}(_mesh__WEBPACK_IMPORTED_MODULE_0__["default"]));

var FLetter = /** @class */ (function (_super) {
    __extends(FLetter, _super);
    function FLetter() {
        var _this = _super.call(this, [
            // left column
            0, 150, 0, 0, 30, 0, 30, 150,
            // // top rung
            30, 0, 100, 0, 100, 30, 30, 30,
            // // middle rung
            30, 60, 67, 60, 67, 90, 30, 90,
        ]) || this;
        _this.m_Indices = [
            // left column
            0, 1, 2, 0, 2, 3, 0,
            // // top rung
            4, 5, 6, 4, 6, 7,
            // // middle rung
            8, 9, 10, 8, 10, 11, 8,
        ];
        return _this;
    }
    return FLetter;
}(_mesh__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRenderingContext": () => (/* binding */ getRenderingContext),
/* harmony export */   "setAttributes": () => (/* binding */ setAttributes),
/* harmony export */   "setUniforms": () => (/* binding */ setUniforms)
/* harmony export */ });
function setAttributes(ctx, program, attrs) {
    Object.keys(attrs).forEach(function (key) {
        var attrLocation = ctx.getAttribLocation(program, key);
        if (attrLocation == -1) {
            console.error("Failed to locate attribute '".concat(key, "'"));
            return;
        }
        ctx.enableVertexAttribArray(attrLocation);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, attrs[key].buffer);
        ctx.vertexAttribPointer(attrLocation, attrs[key].size, attrs[key].type, attrs[key].normalize || false, attrs[key].stride || 0, attrs[key].offset || 0);
    });
}
function setUniforms(ctx, program, uniforms) {
    Object.keys(uniforms).forEach(function (key) {
        var location = ctx.getUniformLocation(program, key);
        if (location == null) {
            console.error("Failed to locate uniform '".concat(key, "'"));
            return;
        }
        var uniform = uniforms[key];
        if (typeof uniform == 'number') {
            ctx.uniform1f(location, uniform);
        }
        else if (Array.isArray(uniform)) {
            switch (uniform.length) {
                case 2:
                    ctx.uniform2fv(location, uniform);
                    break;
                case 3:
                    ctx.uniform3fv(location, uniform);
                    break;
                case 4:
                    ctx.uniform4fv(location, uniform);
                    break;
                case 9:
                    ctx.uniformMatrix3fv(location, false, uniform);
                    break;
            }
        }
    });
}
function getRenderingContext(canvasSelector) {
    var $canvas = document.querySelector(canvasSelector);
    if ($canvas == null)
        throw new Error("Can't find canvas element: '".concat(canvasSelector, "'"));
    var wgl = $canvas.getContext('webgl');
    if (wgl == null)
        throw new Error("Can't get WebGL context: this browser doesn't suuport WebGL");
    return [wgl, $canvas];
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.ts");

var app = new _app__WEBPACK_IMPORTED_MODULE_0__["default"]();
app.run();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUgsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7QUFDdkIsQ0FBQzs7Ozs7OztVQ3pHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnVCO0FBRXZCLElBQU0sR0FBRyxHQUFHLElBQUksNENBQUcsRUFBRTtBQUVyQixHQUFHLENBQUMsR0FBRyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vM2Rfdmlld2VyLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvLi9zcmMvbWF0cml4LnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9tZXNoLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9wcm9ncmFtLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9zY2VuZS50cyIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvLi9zcmMvc2hhZGVyLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vM2Rfdmlld2VyLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvZ3JhbSBmcm9tICcuL3Byb2dyYW0nXHJcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lJ1xyXG5pbXBvcnQgeyBUcmlhbmdsZSwgRkxldHRlciB9IGZyb20gJy4vc2hhcGVzJ1xyXG5cclxuaW1wb3J0IHsgbG9hZFNoYWRlckZyb21TY3JpcHRzIH0gZnJvbSAnLi9zaGFkZXInXHJcbmltcG9ydCB7IGdldFJlbmRlcmluZ0NvbnRleHQgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcclxuICBydW4oKSB7XHJcbiAgICBjb25zdCAkYW5nbGU6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYW5nbGUnKVxyXG4gICAgY29uc3QgJHNjYWxlOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjYWxlJylcclxuXHJcbiAgICBjb25zdCBbd2dsLCBfXSA9IGdldFJlbmRlcmluZ0NvbnRleHQoJyN3ZWJnbCcpXHJcbiAgICBjb25zdCBzaGFkZXJzID0gbG9hZFNoYWRlckZyb21TY3JpcHRzKHdnbCwgWycjdi1zaGFkZXInLCAnI2Ytc2hhZGVyJ10pXHJcbiAgICBjb25zdCBwcm9ncmFtID0gbmV3IFByb2dyYW0od2dsLCBzaGFkZXJzKVxyXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUod2dsKVxyXG5cclxuICAgIGNvbnN0IGYgPSBuZXcgRkxldHRlcigpXHJcblxyXG4gICAgZi5zY2FsZSgyKVxyXG4gICAgZi5yb3RhdGUoMTcpXHJcbiAgICBmLm1vdmVUbyhbOTcsIDE1MF0pXHJcbiAgICBmLm1vdmVPcmlnaW4oWy05NyAvIDIsIC03NV0pXHJcblxyXG4gICAgY29uc3QgdHJpYW5nbGVzID0gW1xyXG4gICAgICBuZXcgVHJpYW5nbGUoWzUsIDVdLCBbMCwgMSwgMCwgMV0pLFxyXG4gICAgICBuZXcgVHJpYW5nbGUoWzM2MCwgMjQwXSksXHJcbiAgICAgIG5ldyBUcmlhbmdsZShbNSwgMjQ1XSksXHJcbiAgICAgIG5ldyBUcmlhbmdsZShbMzYwLCA1XSksXHJcbiAgICBdLm1hcCh0ID0+IHtcclxuICAgICAgdC5zY2FsZSgwLjI1KVxyXG4gICAgICB0LnJvdGF0ZSgyNSlcclxuICAgICAgcmV0dXJuIHRcclxuICAgIH0pXHJcblxyXG4gICAgJGFuZ2xlLm9uaW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgIGYucm90YXRlKE51bWJlcigkYW5nbGUudmFsdWUpKVxyXG4gICAgICBzY2VuZS5kcmF3KClcclxuICAgIH1cclxuXHJcbiAgICAkc2NhbGUub25pbnB1dCA9ICgpID0+IHtcclxuICAgICAgZi5zY2FsZShOdW1iZXIoJHNjYWxlLnZhbHVlKSlcclxuICAgICAgc2NlbmUuZHJhdygpXHJcbiAgICB9XHJcblxyXG4gICAgc2NlbmUudXNpbmcocHJvZ3JhbSlcclxuICAgIHNjZW5lLnNldE9iamVjdHMoWy4uLnRyaWFuZ2xlcywgZl0pXHJcbiAgICBzY2VuZS5kcmF3KClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgdHlwZSBNYXQzQnVmZmVyID0gW1xyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyXHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdDMge1xyXG4gIG1fQnVmOiBNYXQzQnVmZmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKHZhbHVlczogTWF0M0J1ZmZlcikge1xyXG4gICAgdGhpcy5tX0J1ZiA9IHZhbHVlc1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIFRyYW5zbGF0aW9uKHR4OiBudW1iZXIsIHR5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0MyhbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBSb3RhdGlvbihhbmdsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzaW5lID0gTWF0aC5zaW4oYW5nbGUpXHJcbiAgICBjb25zdCBjb3NpbmUgPSBNYXRoLmNvcyhhbmdsZSlcclxuICAgIHJldHVybiBuZXcgTWF0MyhbY29zaW5lLCAtc2luZSwgMCwgc2luZSwgY29zaW5lLCAwLCAwLCAwLCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBTY2FsaW5nKHN4OiBudW1iZXIsIHN5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0Myhbc3gsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBQcm9qZWN0aW9uKFt3aWR0aCwgaGVpZ2h0XTogVmVjMikge1xyXG4gICAgLy8gTm90ZTogVGhpcyBtYXRyaXggZmxpcHMgdGhlIFkgYXhpcyBzbyB0aGF0IDAgaXMgYXQgdGhlIHRvcC5cclxuICAgIHJldHVybiBuZXcgTWF0MyhbMiAvIHdpZHRoLCAwLCAwLCAwLCAtMiAvIGhlaWdodCwgMCwgLTEsIDEsIDFdKVxyXG4gIH1cclxuXHJcbiAgdHJhbnNsYXRlKHR4OiBudW1iZXIsIHR5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0Myh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQzLlRyYW5zbGF0aW9uKHR4LCB0eSkpXHJcbiAgfVxyXG5cclxuICByb3RhdGUoc2NhbGFyOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0Myh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQzLlJvdGF0aW9uKHNjYWxhcikpXHJcbiAgfVxyXG5cclxuICBzY2FsZShzeDogbnVtYmVyLCBzeTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdDModGhpcy5tX0J1ZikubXVsdGlwbHkoTWF0My5TY2FsaW5nKHN4LCBzeSkpXHJcbiAgfVxyXG5cclxuICBtdWx0aXBseShvdGhlcjogTWF0Mykge1xyXG4gICAgY29uc3QgW2EwMCwgYTAxLCBhMDIsIGExMCwgYTExLCBhMTIsIGEyMCwgYTIxLCBhMjJdID0gdGhpcy5tX0J1ZlxyXG4gICAgY29uc3QgW2IwMCwgYjAxLCBiMDIsIGIxMCwgYjExLCBiMTIsIGIyMCwgYjIxLCBiMjJdID0gb3RoZXIubV9CdWZcclxuXHJcbiAgICByZXR1cm4gbmV3IE1hdDMoW1xyXG4gICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAsXHJcbiAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSxcclxuICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyLFxyXG4gICAgICBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAsXHJcbiAgICAgIGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSxcclxuICAgICAgYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyLFxyXG4gICAgICBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjAsXHJcbiAgICAgIGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMSxcclxuICAgICAgYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyLFxyXG4gICAgXSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmdiYSwgVmVjMiB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBNYXQzIGZyb20gJy4vbWF0cml4J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzaCB7XHJcbiAgcHJvdGVjdGVkIG1fVmVydGljZXM6IEFycmF5PG51bWJlcj5cclxuICBwcm90ZWN0ZWQgbV9JbmRpY2VzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJvdGVjdGVkIG1fT3JpZ2luOiBWZWMyXHJcbiAgcHJvdGVjdGVkIG1fVHJhbnNsYXRpb246IFZlYzIgPSBbMCwgMF1cclxuICBwcm90ZWN0ZWQgbV9BbmdsZSA9IDBcclxuICBwcm90ZWN0ZWQgbV9TY2FsZTogVmVjMiA9IFsxLCAxXVxyXG4gIHByb3RlY3RlZCBtX0NvbG9yOiBSZ2JhID0gWzAsIDAsIDAsIDFdXHJcblxyXG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBBcnJheTxudW1iZXI+LCBjb2xvcj86IFJnYmEpIHtcclxuICAgIHRoaXMubV9WZXJ0aWNlcyA9IHZlcnRpY2VzXHJcbiAgICBpZiAoY29sb3IgIT0gdW5kZWZpbmVkKSB0aGlzLm1fQ29sb3IgPSBjb2xvclxyXG4gIH1cclxuXHJcbiAgbW92ZShwaXhlbHM6IFZlYzIpIHtcclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblswXSArPSBwaXhlbHNbMF1cclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblsxXSArPSBwaXhlbHNbMV1cclxuICB9XHJcblxyXG4gIG1vdmVUbyhwaXhlbHM6IFZlYzIpIHtcclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblswXSA9IHBpeGVsc1swXVxyXG4gICAgdGhpcy5tX1RyYW5zbGF0aW9uWzFdID0gcGl4ZWxzWzFdXHJcbiAgfVxyXG5cclxuICBtb3ZlT3JpZ2luKHBvczogVmVjMikge1xyXG4gICAgdGhpcy5tX09yaWdpbiA9IHBvc1xyXG4gIH1cclxuXHJcbiAgc2NhbGUoYW1vdW50OiBudW1iZXIpIHtcclxuICAgIHRoaXMubV9TY2FsZSA9IFthbW91bnQsIGFtb3VudF1cclxuICB9XHJcblxyXG4gIHJvdGF0ZShhbmdsZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm1fQW5nbGUgPSBhbmdsZVxyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVRyYW5zZm9ybShwcm9qZWN0aW9uOiBWZWMyKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uTWF0ID0gTWF0My5Qcm9qZWN0aW9uKHByb2plY3Rpb24pXHJcbiAgICBjb25zdCByYWRpYW5zID0gKCgzNjAgLSB0aGlzLm1fQW5nbGUpICogTWF0aC5QSSkgLyAxODBcclxuICAgIGNvbnN0IFt0cmFuc2xhdGVYLCB0cmFuc2xhdGVZXSA9IHRoaXMubV9UcmFuc2xhdGlvblxyXG4gICAgY29uc3QgW3NjYWxlWCwgc2NhbGVZXSA9IHRoaXMubV9TY2FsZVxyXG5cclxuICAgIGxldCBtYXRyaXggPSBwcm9qZWN0aW9uTWF0XHJcbiAgICAgIC50cmFuc2xhdGUodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSlcclxuICAgICAgLnJvdGF0ZShyYWRpYW5zKVxyXG4gICAgICAuc2NhbGUoc2NhbGVYLCBzY2FsZVkpXHJcblxyXG4gICAgaWYgKHRoaXMubV9PcmlnaW4gIT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm4gbWF0cml4LnRyYW5zbGF0ZSh0aGlzLm1fT3JpZ2luWzBdLCB0aGlzLm1fT3JpZ2luWzFdKS5tX0J1ZlxyXG4gICAgZWxzZSByZXR1cm4gbWF0cml4Lm1fQnVmXHJcbiAgfVxyXG5cclxuICBjb3VudEluZGljZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tX0luZGljZXMubGVuZ3RoXHJcbiAgfVxyXG5cclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubV9WZXJ0aWNlc1xyXG4gIH1cclxuXHJcbiAgaW5kaWNlcygpIHtcclxuICAgIHJldHVybiB0aGlzLm1fSW5kaWNlc1xyXG4gIH1cclxuXHJcbiAgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tX0NvbG9yXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ3R4LFxyXG4gIElBdHRyaWJ1dGVzLFxyXG4gIElVbmlmb3JtcyxcclxuICBzZXRBdHRyaWJ1dGVzLFxyXG4gIHNldFVuaWZvcm1zLFxyXG59IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmFtIHtcclxuICBwcml2YXRlIG1fUHJvZ3JhbTogV2ViR0xQcm9ncmFtXHJcbiAgcHJpdmF0ZSBtX0F0dHJzOiBJQXR0cmlidXRlc1xyXG4gIHByaXZhdGUgbV9Vbmlmb3JtczogSVVuaWZvcm1zXHJcblxyXG4gIGNvbnN0cnVjdG9yKGN0eDogQ3R4LCBbdlNoYWRlciwgZlNoYWRlcl06IFtXZWJHTFNoYWRlciwgV2ViR0xTaGFkZXJdKSB7XHJcbiAgICBjb25zdCBwcm9ncmFtID0gY3R4LmNyZWF0ZVByb2dyYW0oKVxyXG5cclxuICAgIGN0eC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdlNoYWRlcilcclxuICAgIGN0eC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZlNoYWRlcilcclxuICAgIGN0eC5saW5rUHJvZ3JhbShwcm9ncmFtKVxyXG5cclxuICAgIGlmICghY3R4LmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgY3R4LkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICdVbmFibGUgdG8gaW5pdGlhbGl6ZSB0aGUgc2hhZGVyIHByb2dyYW06JyxcclxuICAgICAgICBjdHguZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSlcclxuICAgICAgKVxyXG5cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmluZm8oJ1N1Y2Nlc3NmdWxseSBsaW5rZWQgcHJvZ3JhbScpXHJcblxyXG4gICAgdGhpcy5tX1Byb2dyYW0gPSBwcm9ncmFtXHJcbiAgfVxyXG5cclxuICBzZWxmKCk6IFdlYkdMUHJvZ3JhbSB7XHJcbiAgICByZXR1cm4gdGhpcy5tX1Byb2dyYW1cclxuICB9XHJcblxyXG4gIGF0dHJzKGF0dHJzOiBJQXR0cmlidXRlcykge1xyXG4gICAgdGhpcy5tX0F0dHJzID0gYXR0cnNcclxuICB9XHJcblxyXG4gIHVuaWZvcm1zKHVuaWZvcm1zOiBJVW5pZm9ybXMpIHtcclxuICAgIHRoaXMubV9Vbmlmb3JtcyA9IHVuaWZvcm1zXHJcbiAgfVxyXG5cclxuICBiaW5kQXR0cnMoY3R4OiBDdHgpIHtcclxuICAgIHNldEF0dHJpYnV0ZXMoY3R4LCB0aGlzLm1fUHJvZ3JhbSwgdGhpcy5tX0F0dHJzKVxyXG4gIH1cclxuXHJcbiAgYmluZFVuaWZvcm1zKGN0eDogQ3R4KSB7XHJcbiAgICBzZXRVbmlmb3JtcyhjdHgsIHRoaXMubV9Qcm9ncmFtLCB0aGlzLm1fVW5pZm9ybXMpXHJcbiAgfVxyXG5cclxuICB1c2UoY3R4OiBDdHgpIHtcclxuICAgIGN0eC51c2VQcm9ncmFtKHRoaXMubV9Qcm9ncmFtKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgTWVzaCBmcm9tICcuL21lc2gnXHJcbmltcG9ydCBQcm9ncmFtIGZyb20gJy4vcHJvZ3JhbSdcclxuaW1wb3J0IHsgQ3R4LCBzZXRVbmlmb3JtcyB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZSB7XHJcbiAgcHJpdmF0ZSBtX0N0eDogQ3R4XHJcbiAgcHJpdmF0ZSBtX1Byb2dyYW06IFByb2dyYW1cclxuICBwcml2YXRlIG1fT2JqZWN0czogQXJyYXk8TWVzaD5cclxuICBwcml2YXRlIG1fcEJ1ZjogV2ViR0xCdWZmZXJcclxuICBwcml2YXRlIG1faUJ1ZjogV2ViR0xCdWZmZXJcclxuXHJcbiAgY29uc3RydWN0b3IoY3R4OiBDdHgpIHtcclxuICAgIHRoaXMubV9DdHggPSBjdHhcclxuXHJcbiAgICB0aGlzLm1faUJ1ZiA9IGN0eC5jcmVhdGVCdWZmZXIoKVxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1faUJ1ZilcclxuXHJcbiAgICB0aGlzLm1fcEJ1ZiA9IGN0eC5jcmVhdGVCdWZmZXIoKVxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkFSUkFZX0JVRkZFUiwgdGhpcy5tX3BCdWYpXHJcbiAgfVxyXG5cclxuICB1c2luZyhwcm9ncmFtOiBQcm9ncmFtKSB7XHJcbiAgICB0aGlzLm1fUHJvZ3JhbSA9IHByb2dyYW1cclxuICB9XHJcblxyXG4gIHNldE9iamVjdHMob2JqZWN0czogQXJyYXk8TWVzaD4pIHtcclxuICAgIHRoaXMubV9PYmplY3RzID0gb2JqZWN0c1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMubV9DdHgudmlld3BvcnQoMCwgMCwgdGhpcy5tX0N0eC5jYW52YXMud2lkdGgsIHRoaXMubV9DdHguY2FudmFzLmhlaWdodClcclxuICAgIHRoaXMubV9DdHguY2xlYXJDb2xvcigwLCAwLCAwLCAwKVxyXG4gICAgdGhpcy5tX0N0eC5jbGVhcih0aGlzLm1fQ3R4LkNPTE9SX0JVRkZFUl9CSVQpXHJcblxyXG4gICAgdGhpcy5tX1Byb2dyYW0uYXR0cnMoe1xyXG4gICAgICBhX3Bvc2l0aW9uOiB7XHJcbiAgICAgICAgYnVmZmVyOiB0aGlzLm1fcEJ1ZixcclxuICAgICAgICBzaXplOiAyLFxyXG4gICAgICAgIHR5cGU6IHRoaXMubV9DdHguRkxPQVQsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFRlbGwgaXQgdG8gdXNlIG91ciBwcm9ncmFtIChwYWlyIG9mIHNoYWRlcnMpXHJcbiAgICB0aGlzLm1fUHJvZ3JhbS51c2UodGhpcy5tX0N0eClcclxuXHJcbiAgICAvLyB0aGlzLm1fQ3R4LmJpbmRCdWZmZXIodGhpcy5tX0N0eC5BUlJBWV9CVUZGRVIsIHRoaXMubV9wQnVmKVxyXG5cclxuICAgIHRoaXMubV9Qcm9ncmFtLmJpbmRBdHRycyh0aGlzLm1fQ3R4KVxyXG5cclxuICAgIHRoaXMubV9PYmplY3RzLmZvckVhY2gob2JqID0+IHtcclxuICAgICAgc2V0VW5pZm9ybXModGhpcy5tX0N0eCwgdGhpcy5tX1Byb2dyYW0uc2VsZigpLCB7XHJcbiAgICAgICAgdV9jb2xvcjogb2JqLmNvbG9yKCksXHJcbiAgICAgICAgdV9tYXRyaXg6IG9iai5jb21wdXRlVHJhbnNmb3JtKFtcclxuICAgICAgICAgIHRoaXMubV9DdHguY2FudmFzLndpZHRoLFxyXG4gICAgICAgICAgdGhpcy5tX0N0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIF0pLFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gdGhpcy5tX0N0eC5iaW5kQnVmZmVyKHRoaXMubV9DdHguQVJSQVlfQlVGRkVSLCB0aGlzLm1fcEJ1ZilcclxuXHJcbiAgICAgIHRoaXMubV9DdHguYmluZEJ1ZmZlcih0aGlzLm1fQ3R4LkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1faUJ1ZilcclxuICAgICAgdGhpcy5tX0N0eC5idWZmZXJEYXRhKFxyXG4gICAgICAgIHRoaXMubV9DdHguRUxFTUVOVF9BUlJBWV9CVUZGRVIsXHJcbiAgICAgICAgbmV3IFVpbnQxNkFycmF5KG9iai5pbmRpY2VzKCkpLFxyXG4gICAgICAgIHRoaXMubV9DdHguU1RBVElDX0RSQVdcclxuICAgICAgKVxyXG5cclxuICAgICAgdGhpcy5tX0N0eC5idWZmZXJEYXRhKFxyXG4gICAgICAgIHRoaXMubV9DdHguQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkob2JqLmRhdGEoKSksXHJcbiAgICAgICAgdGhpcy5tX0N0eC5TVEFUSUNfRFJBV1xyXG4gICAgICApXHJcblxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gZHJhdyBwb2ludHNcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVUeXBlID0gdGhpcy5tX0N0eC5QT0lOVFNcclxuICAgICAgICBjb25zdCBkcmF3T2Zmc2V0ID0gMFxyXG4gICAgICAgIGNvbnN0IGNvdW50ID0gb2JqLmNvdW50SW5kaWNlcygpXHJcbiAgICAgICAgdmFyIGluZGV4VHlwZSA9IHRoaXMubV9DdHguVU5TSUdORURfU0hPUlRcclxuICAgICAgICB0aGlzLm1fQ3R4LmRyYXdFbGVtZW50cyhwcmltaXRpdmVUeXBlLCBjb3VudCwgaW5kZXhUeXBlLCBkcmF3T2Zmc2V0KVxyXG4gICAgICB9XHJcblxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVUeXBlID0gdGhpcy5tX0N0eC5MSU5FX1NUUklQXHJcbiAgICAgICAgY29uc3QgZHJhd09mZnNldCA9IDBcclxuICAgICAgICBjb25zdCBjb3VudCA9IG9iai5jb3VudEluZGljZXMoKVxyXG4gICAgICAgIHZhciBpbmRleFR5cGUgPSB0aGlzLm1fQ3R4LlVOU0lHTkVEX1NIT1JUXHJcbiAgICAgICAgdGhpcy5tX0N0eC5kcmF3RWxlbWVudHMocHJpbWl0aXZlVHlwZSwgY291bnQsIGluZGV4VHlwZSwgZHJhd09mZnNldClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIiwiZW51bSBTaGFkZXJUeXBlIHtcclxuICBWZXJ0ZXgsXHJcbiAgRnJhZ21lbnQsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRlciB7XHJcbiAgcHJpdmF0ZSBtX1NvdXJjZTogc3RyaW5nXHJcbiAgcHJpdmF0ZSBtX1R5cGU6IFNoYWRlclR5cGVcclxuXHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3I6IHN0cmluZykge1xyXG4gICAgY29uc3QgJHNoYWRlciA9IHRoaXMuX2dldEVsZW1lbnQoc2VsZWN0b3IpXHJcblxyXG4gICAgdGhpcy5fc2V0VHlwZShzZWxlY3RvciwgJHNoYWRlci50eXBlKVxyXG4gICAgdGhpcy5tX1NvdXJjZSA9ICRzaGFkZXIudGV4dENvbnRlbnRcclxuICB9XHJcblxyXG4gIGNvbXBpbGUoY3R4OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiBXZWJHTFNoYWRlciB7XHJcbiAgICBjb25zdCBzaGFkZXIgPVxyXG4gICAgICB0aGlzLm1fVHlwZSA9PSBTaGFkZXJUeXBlLlZlcnRleFxyXG4gICAgICAgID8gY3R4LmNyZWF0ZVNoYWRlcihjdHguVkVSVEVYX1NIQURFUilcclxuICAgICAgICA6IGN0eC5jcmVhdGVTaGFkZXIoY3R4LkZSQUdNRU5UX1NIQURFUilcclxuXHJcbiAgICBjdHguc2hhZGVyU291cmNlKHNoYWRlciwgdGhpcy5tX1NvdXJjZSlcclxuICAgIGN0eC5jb21waWxlU2hhZGVyKHNoYWRlcilcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NoZWNrQ29tcGlsZVN0YXR1cyhjdHgsIHNoYWRlcikpIHJldHVybiBudWxsXHJcblxyXG4gICAgY29uc29sZS5pbmZvKFxyXG4gICAgICAnU3VjY2Vzc2Z1bGx5IGxvYWRlZCcsXHJcbiAgICAgIHRoaXMubV9UeXBlID09IFNoYWRlclR5cGUuVmVydGV4ID8gJ3ZlcnRleCcgOiAnZnJhZ21lbnQnLFxyXG4gICAgICAnc2hhZGVyJ1xyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBzaGFkZXJcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxTY3JpcHRFbGVtZW50IHtcclxuICAgIGNvbnN0ICRzaGFkZXI6IEhUTUxTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgIGlmICgkc2hhZGVyID09IG51bGwpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgU2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAoZWxlbWVudCAnJHtzZWxlY3Rvcn0nIGRvZXNuJ3QgZXhpc3RzKWBcclxuICAgICAgKVxyXG5cclxuICAgIHJldHVybiAkc2hhZGVyXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRUeXBlKHNlbGVjdG9yOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAobWltZVR5cGUpIHtcclxuICAgICAgY2FzZSAneC1zaGFkZXIveC12ZXJ0ZXgnOlxyXG4gICAgICAgIHRoaXMubV9UeXBlID0gU2hhZGVyVHlwZS5WZXJ0ZXhcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICd4LXNoYWRlci94LWZyYWdtZW50JzpcclxuICAgICAgICB0aGlzLm1fVHlwZSA9IFNoYWRlclR5cGUuRnJhZ21lbnRcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBTaGFkZXIgY3JlYXRpb24gZmFpbGVkIChlbGVtZW50ICcke3NlbGVjdG9yfScgaGF2ZSB3cm9uZyBzaGFkZXIgdHlwZSAnJHttaW1lVHlwZX0nKWBcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGVja0NvbXBpbGVTdGF0dXMoXHJcbiAgICBjdHg6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcclxuICAgIHNoYWRlcjogV2ViR0xTaGFkZXJcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICghY3R4LmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGN0eC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICBgQW4gZXJyb3Igb2NjdXJlZCBjb21waWxpbmcgdGhlIHNoYWRlcnM6ICR7Y3R4LmdldFNoYWRlckluZm9Mb2coXHJcbiAgICAgICAgICBzaGFkZXJcclxuICAgICAgICApfWBcclxuICAgICAgKVxyXG4gICAgICBjdHguZGVsZXRlU2hhZGVyKHNoYWRlcilcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkU2hhZGVyRnJvbVNjcmlwdHMoXHJcbiAgY3R4OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXHJcbiAgW3ZTaGFkZXJTZWxlY3RvciwgZlNoYWRlclNlbGVjdG9yXTogW3N0cmluZywgc3RyaW5nXVxyXG4pOiBbV2ViR0xTaGFkZXIsIFdlYkdMU2hhZGVyXSB7XHJcbiAgY29uc3QgdlNoYWRlciA9IG5ldyBTaGFkZXIodlNoYWRlclNlbGVjdG9yKS5jb21waWxlKGN0eClcclxuICBjb25zdCBmU2hhZGVyID0gbmV3IFNoYWRlcihmU2hhZGVyU2VsZWN0b3IpLmNvbXBpbGUoY3R4KVxyXG5cclxuICByZXR1cm4gW3ZTaGFkZXIsIGZTaGFkZXJdXHJcbn1cclxuIiwiaW1wb3J0IE1lc2ggZnJvbSAnLi9tZXNoJ1xyXG5pbXBvcnQgeyBSZ2JhLCBWZWMyIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlhbmdsZSBleHRlbmRzIE1lc2gge1xyXG4gIGNvbnN0cnVjdG9yKG9yaWdpbjogVmVjMiwgY29sb3I/OiBSZ2JhKSB7XHJcbiAgICBzdXBlcihbMCwgMjQwLCAwLCAwLCAzNjAsIDI0MF0sIGNvbG9yKVxyXG4gICAgdGhpcy5tX0luZGljZXMgPSBbMCwgMSwgMiwgMF1cclxuICAgIHRoaXMubV9UcmFuc2xhdGlvbiA9IG9yaWdpblxyXG5cclxuICAgIGNvbG9yICE9IHVuZGVmaW5lZFxyXG4gICAgICA/ICh0aGlzLm1fQ29sb3IgPSBjb2xvcilcclxuICAgICAgOiAodGhpcy5tX0NvbG9yID0gW01hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIDFdKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZMZXR0ZXIgZXh0ZW5kcyBNZXNoIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFtcclxuICAgICAgLy8gbGVmdCBjb2x1bW5cclxuICAgICAgMCwgMTUwLCAwLCAwLCAzMCwgMCwgMzAsIDE1MCxcclxuXHJcbiAgICAgIC8vIC8vIHRvcCBydW5nXHJcbiAgICAgIDMwLCAwLCAxMDAsIDAsIDEwMCwgMzAsIDMwLCAzMCxcclxuXHJcbiAgICAgIC8vIC8vIG1pZGRsZSBydW5nXHJcbiAgICAgIDMwLCA2MCwgNjcsIDYwLCA2NywgOTAsIDMwLCA5MCxcclxuICAgIF0pXHJcblxyXG4gICAgdGhpcy5tX0luZGljZXMgPSBbXHJcbiAgICAgIC8vIGxlZnQgY29sdW1uXHJcbiAgICAgIDAsIDEsIDIsIDAsIDIsIDMsIDAsXHJcblxyXG4gICAgICAvLyAvLyB0b3AgcnVuZ1xyXG4gICAgICA0LCA1LCA2LCA0LCA2LCA3LFxyXG5cclxuICAgICAgLy8gLy8gbWlkZGxlIHJ1bmdcclxuICAgICAgOCwgOSwgMTAsIDgsIDEwLCAxMSwgOCxcclxuICAgIF1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0M0J1ZmZlciB9IGZyb20gJy4vbWF0cml4J1xyXG5cclxuZXhwb3J0IHR5cGUgQ3R4ID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0XHJcbmV4cG9ydCB0eXBlIFJnYmEgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXR0cmlidXRlIHtcclxuICBidWZmZXI6IFdlYkdMQnVmZmVyXHJcbiAgc2l6ZTogbnVtYmVyXHJcbiAgdHlwZTogbnVtYmVyXHJcbiAgbm9ybWFsaXplPzogYm9vbGVhblxyXG4gIHN0cmlkZT86IG51bWJlclxyXG4gIG9mZnNldD86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBdHRyaWJ1dGVzIHtcclxuICBba2V5OiBzdHJpbmddOiBJQXR0cmlidXRlXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFZlYzIgPSBbbnVtYmVyLCBudW1iZXJdXHJcbmV4cG9ydCB0eXBlIFZlYzMgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuZXhwb3J0IHR5cGUgVmVjNCA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcblxyXG5leHBvcnQgdHlwZSBVbmlmb3JtVHlwZSA9IG51bWJlciB8IFZlYzIgfCBWZWMzIHwgVmVjNCB8IE1hdDNCdWZmZXJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVuaWZvcm1zIHtcclxuICBba2V5OiBzdHJpbmddOiBVbmlmb3JtVHlwZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhcclxuICBjdHg6IEN0eCxcclxuICBwcm9ncmFtOiBXZWJHTFByb2dyYW0sXHJcbiAgYXR0cnM6IElBdHRyaWJ1dGVzXHJcbikge1xyXG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBjb25zdCBhdHRyTG9jYXRpb24gPSBjdHguZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwga2V5KVxyXG4gICAgaWYgKGF0dHJMb2NhdGlvbiA9PSAtMSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gbG9jYXRlIGF0dHJpYnV0ZSAnJHtrZXl9J2ApXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGN0eC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyTG9jYXRpb24pXHJcblxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkFSUkFZX0JVRkZFUiwgYXR0cnNba2V5XS5idWZmZXIpXHJcblxyXG4gICAgY3R4LnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgIGF0dHJMb2NhdGlvbixcclxuICAgICAgYXR0cnNba2V5XS5zaXplLFxyXG4gICAgICBhdHRyc1trZXldLnR5cGUsXHJcbiAgICAgIGF0dHJzW2tleV0ubm9ybWFsaXplIHx8IGZhbHNlLFxyXG4gICAgICBhdHRyc1trZXldLnN0cmlkZSB8fCAwLFxyXG4gICAgICBhdHRyc1trZXldLm9mZnNldCB8fCAwXHJcbiAgICApXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFVuaWZvcm1zKFxyXG4gIGN0eDogQ3R4LFxyXG4gIHByb2dyYW06IFdlYkdMUHJvZ3JhbSxcclxuICB1bmlmb3JtczogSVVuaWZvcm1zXHJcbikge1xyXG4gIE9iamVjdC5rZXlzKHVuaWZvcm1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGN0eC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwga2V5KVxyXG4gICAgaWYgKGxvY2F0aW9uID09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGxvY2F0ZSB1bmlmb3JtICcke2tleX0nYClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pZm9ybSA9IHVuaWZvcm1zW2tleV1cclxuICAgIGlmICh0eXBlb2YgdW5pZm9ybSA9PSAnbnVtYmVyJykge1xyXG4gICAgICBjdHgudW5pZm9ybTFmKGxvY2F0aW9uLCB1bmlmb3JtKVxyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHVuaWZvcm0pKSB7XHJcbiAgICAgIHN3aXRjaCAodW5pZm9ybS5sZW5ndGgpIHtcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICBjdHgudW5pZm9ybTJmdihsb2NhdGlvbiwgdW5pZm9ybSlcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgY3R4LnVuaWZvcm0zZnYobG9jYXRpb24sIHVuaWZvcm0pXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgIGN0eC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB1bmlmb3JtKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICBjdHgudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHVuaWZvcm0pXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlcmluZ0NvbnRleHQoXHJcbiAgY2FudmFzU2VsZWN0b3I6IHN0cmluZ1xyXG4pOiBbQ3R4LCBIVE1MQ2FudmFzRWxlbWVudF0ge1xyXG4gIGNvbnN0ICRjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXNTZWxlY3RvcilcclxuXHJcbiAgaWYgKCRjYW52YXMgPT0gbnVsbClcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZmluZCBjYW52YXMgZWxlbWVudDogJyR7Y2FudmFzU2VsZWN0b3J9J2ApXHJcblxyXG4gIGNvbnN0IHdnbCA9ICRjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKVxyXG5cclxuICBpZiAod2dsID09IG51bGwpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDYW4ndCBnZXQgV2ViR0wgY29udGV4dDogdGhpcyBicm93c2VyIGRvZXNuJ3Qgc3V1cG9ydCBXZWJHTGBcclxuICAgIClcclxuXHJcbiAgcmV0dXJuIFt3Z2wsICRjYW52YXNdXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpXHJcblxyXG5hcHAucnVuKClcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9