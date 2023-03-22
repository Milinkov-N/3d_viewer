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
        App.scene3D();
    };
    App.scene3D = function () {
        var $angle = document.querySelector('#angle');
        var $scale = document.querySelector('#scale');
        var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getRenderingContext)('#webgl'), wgl = _a[0], _ = _a[1];
        var shaders = (0,_shader__WEBPACK_IMPORTED_MODULE_3__.loadShaderFromScripts)(wgl, ['#v-shader-3d', '#f-shader']);
        var program = new _program__WEBPACK_IMPORTED_MODULE_0__["default"](wgl, shaders);
        var scene = new _scene__WEBPACK_IMPORTED_MODULE_1__.Scene3D(wgl);
        var cube = new _shapes__WEBPACK_IMPORTED_MODULE_2__.Cube();
        cube.scale(3);
        cube.moveTo([720 * 0.625, 480 / 1.25, 0]);
        cube.rotate(20);
        cube.moveOrigin([-97 / 2, -75, 0]);
        $angle.oninput = function () {
            cube.rotate(Number($angle.value));
            scene.draw();
        };
        $scale.oninput = function () {
            cube.scale(Number($scale.value));
            scene.draw();
        };
        scene.using(program);
        scene.setObjs([cube]);
        scene.draw();
    };
    App.scene2D = function () {
        var $angle = document.querySelector('#angle');
        var $scale = document.querySelector('#scale');
        var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getRenderingContext)('#webgl'), wgl = _a[0], _ = _a[1];
        var shaders = (0,_shader__WEBPACK_IMPORTED_MODULE_3__.loadShaderFromScripts)(wgl, ['#v-shader-2d', '#f-shader']);
        var program = new _program__WEBPACK_IMPORTED_MODULE_0__["default"](wgl, shaders);
        var scene = new _scene__WEBPACK_IMPORTED_MODULE_1__.Scene2D(wgl);
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
/* harmony export */   "Mat4": () => (/* binding */ Mat4),
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
var Mat4 = /** @class */ (function () {
    function Mat4(values) {
        this.m_Buf = values;
    }
    Mat4.Translation = function (_a) {
        var tx = _a[0], ty = _a[1], tz = _a[2];
        return new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]);
    };
    Mat4.RotationX = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new Mat4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    };
    Mat4.RotationY = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new Mat4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    };
    Mat4.RotationZ = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new Mat4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    };
    Mat4.Scaling = function (_a) {
        var sx = _a[0], sy = _a[1], sz = _a[2];
        return new Mat4([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]);
    };
    Mat4.Projection = function (_a) {
        var width = _a[0], height = _a[1], depth = _a[2];
        // Note: This matrix flips the Y axis so 0 is at the top.
        return new Mat4([
            2 / width,
            0,
            0,
            0,
            0,
            -2 / height,
            0,
            0,
            0,
            0,
            2 / depth,
            0,
            -1,
            1,
            0,
            1,
        ]);
    };
    Mat4.prototype.translate = function (translation) {
        return new Mat4(this.m_Buf).multiply(Mat4.Translation(translation));
    };
    Mat4.prototype.xRotate = function (radians) {
        return new Mat4(this.m_Buf).multiply(Mat4.RotationX(radians));
    };
    Mat4.prototype.yRotate = function (radians) {
        return new Mat4(this.m_Buf).multiply(Mat4.RotationY(radians));
    };
    Mat4.prototype.zRotate = function (radians) {
        return new Mat4(this.m_Buf).multiply(Mat4.RotationZ(radians));
    };
    Mat4.prototype.scale = function (scaling) {
        return new Mat4(this.m_Buf).multiply(Mat4.Scaling(scaling));
    };
    Mat4.prototype.multiply = function (other) {
        var _a = this.m_Buf, a11 = _a[0], a12 = _a[1], a13 = _a[2], a14 = _a[3], a21 = _a[4], a22 = _a[5], a23 = _a[6], a24 = _a[7], a31 = _a[8], a32 = _a[9], a33 = _a[10], a34 = _a[11], a41 = _a[12], a42 = _a[13], a43 = _a[14], a44 = _a[15];
        var _b = other.m_Buf, b11 = _b[0], b12 = _b[1], b13 = _b[2], b14 = _b[3], b21 = _b[4], b22 = _b[5], b23 = _b[6], b24 = _b[7], b31 = _b[8], b32 = _b[9], b33 = _b[10], b34 = _b[11], b41 = _b[12], b42 = _b[13], b43 = _b[14], b44 = _b[15];
        return new Mat4([
            b11 * a11 + b12 * a21 + b13 * a31 + b14 * a41,
            b11 * a12 + b12 * a22 + b13 * a32 + b14 * a42,
            b11 * a13 + b12 * a23 + b13 * a33 + b14 * a43,
            b11 * a14 + b12 * a24 + b13 * a34 + b14 * a44,
            b21 * a11 + b22 * a21 + b23 * a31 + b24 * a41,
            b21 * a12 + b22 * a22 + b23 * a32 + b24 * a42,
            b21 * a13 + b22 * a23 + b23 * a33 + b24 * a43,
            b21 * a14 + b22 * a24 + b23 * a34 + b24 * a44,
            b31 * a11 + b32 * a21 + b33 * a31 + b34 * a41,
            b31 * a12 + b32 * a22 + b33 * a32 + b34 * a42,
            b31 * a13 + b32 * a23 + b33 * a33 + b34 * a43,
            b31 * a14 + b32 * a24 + b33 * a34 + b34 * a44,
            b41 * a11 + b42 * a21 + b43 * a31 + b44 * a41,
            b41 * a12 + b42 * a22 + b43 * a32 + b44 * a42,
            b41 * a13 + b42 * a23 + b43 * a33 + b44 * a43,
            b41 * a14 + b42 * a24 + b43 * a34 + b44 * a44,
        ]);
    };
    return Mat4;
}());



/***/ }),

/***/ "./src/mesh.ts":
/*!*********************!*\
  !*** ./src/mesh.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mesh3D": () => (/* binding */ Mesh3D),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./src/matrix.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

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
var Mesh3D = /** @class */ (function () {
    function Mesh3D(vertices, color) {
        this.m_Translation = [0, 0, 0];
        this.m_Angle = 0;
        this.m_Scale = [1, 1, 1];
        this.m_Color = [0, 0, 0, 1];
        this.m_Vertices = vertices;
        if (color != undefined)
            this.m_Color = color;
    }
    Mesh3D.prototype.move = function (pixels) {
        this.m_Translation[0] += pixels[0];
        this.m_Translation[1] += pixels[1];
        this.m_Translation[2] += pixels[2];
    };
    Mesh3D.prototype.moveTo = function (pixels) {
        this.m_Translation[0] = pixels[0];
        this.m_Translation[1] = pixels[1];
        this.m_Translation[2] = pixels[2];
    };
    Mesh3D.prototype.moveOrigin = function (pos) {
        this.m_Origin = pos;
    };
    Mesh3D.prototype.scale = function (amount) {
        this.m_Scale = [amount, amount, amount];
    };
    Mesh3D.prototype.rotate = function (angle) {
        this.m_Angle = angle;
    };
    Mesh3D.prototype.computeTransform = function (projection) {
        var projectionMat = _matrix__WEBPACK_IMPORTED_MODULE_0__.Mat4.Projection(__spreadArray(__spreadArray([], projection, true), [720], false));
        var radians = ((360 - this.m_Angle) * Math.PI) / 180;
        var matrix = projectionMat
            .translate(this.m_Translation)
            .xRotate(radians)
            .yRotate(radians)
            .zRotate(radians)
            .scale(this.m_Scale);
        if (this.m_Origin != undefined)
            return matrix.translate(this.m_Origin).m_Buf;
        else
            return matrix.m_Buf;
    };
    Mesh3D.prototype.countIndices = function () {
        return this.m_Indices.length;
    };
    Mesh3D.prototype.data = function () {
        return this.m_Vertices;
    };
    Mesh3D.prototype.indices = function () {
        return this.m_Indices;
    };
    Mesh3D.prototype.color = function () {
        return this.m_Color;
    };
    return Mesh3D;
}());



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
/* harmony export */   "Scene": () => (/* binding */ Scene),
/* harmony export */   "Scene2D": () => (/* binding */ Scene2D),
/* harmony export */   "Scene3D": () => (/* binding */ Scene3D)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
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
    Scene.prototype.draw = function () { };
    return Scene;
}());

var Scene2D = /** @class */ (function (_super) {
    __extends(Scene2D, _super);
    function Scene2D(ctx) {
        return _super.call(this, ctx) || this;
    }
    Scene2D.prototype.draw = function () {
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
    return Scene2D;
}(Scene));

var Scene3D = /** @class */ (function (_super) {
    __extends(Scene3D, _super);
    function Scene3D(ctx) {
        return _super.call(this, ctx) || this;
    }
    Scene3D.prototype.setObjs = function (objects) {
        this.m_Objs = objects;
    };
    Scene3D.prototype.draw = function () {
        var _this = this;
        this.m_Ctx.viewport(0, 0, this.m_Ctx.canvas.width, this.m_Ctx.canvas.height);
        this.m_Ctx.clearColor(0, 0, 0, 0);
        this.m_Ctx.clear(this.m_Ctx.COLOR_BUFFER_BIT);
        this.m_Program.attrs({
            a_position: {
                buffer: this.m_pBuf,
                size: 3,
                type: this.m_Ctx.FLOAT,
            },
        });
        this.m_Program.use(this.m_Ctx);
        this.m_Program.bindAttrs(this.m_Ctx);
        this.m_Objs.forEach(function (obj) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setUniforms)(_this.m_Ctx, _this.m_Program.self(), {
                u_color: obj.color(),
                u_matrix: obj.computeTransform([
                    _this.m_Ctx.canvas.width,
                    _this.m_Ctx.canvas.height,
                ]),
            });
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
    return Scene3D;
}(Scene));



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
/* harmony export */   "Cube": () => (/* binding */ Cube),
/* harmony export */   "FLetter": () => (/* binding */ FLetter),
/* harmony export */   "FLetter3D": () => (/* binding */ FLetter3D),
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

var Cube = /** @class */ (function (_super) {
    __extends(Cube, _super);
    function Cube() {
        var _this = _super.call(this, [
            // front face
            0, 50, 0, 0, 0, 0, 50, 0, 0, 50, 50, 0,
            // back face
            50, 50, -50, 50, 0, -50, 0, 0, -50, 0, 50, -50,
        ]) || this;
        _this.m_Indices = [
            // front face
            0,
            1,
            2,
            0,
            2,
            3,
            //right face
            3,
            2,
            5,
            3,
            5,
            4,
            // back face
            4,
            5,
            6,
            4,
            6,
            7,
            // left face
            7,
            6,
            1,
            ,
            7,
            1,
            0,
            // bottom face
            0,
            7,
            4,
            0,
            4,
            3,
            // top face
            2,
            1,
            6,
            2,
            6,
            5,
            // loop back to origin
            3,
            0,
        ];
        return _this;
    }
    return Cube;
}(_mesh__WEBPACK_IMPORTED_MODULE_0__.Mesh3D));

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

var FLetter3D = /** @class */ (function (_super) {
    __extends(FLetter3D, _super);
    function FLetter3D() {
        var _this = _super.call(this, [
            // left column front
            0, 150, 0, 0, 0, 0, 30, 0, 0, 30, 150, 0,
            // top rung front
            30, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,
            // middle rung front
            30, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,
            // right of bottom
            30, 90, 0, 30, 150, 0, 30, 150, 30, 30, 90, 30,
            // bottom
            30, 150, 0, 0, 150, 0, 0, 150, 30, 30, 150, 30,
            // left side
            0, 150, 0, 0, 0, 0, 0, 0, 30, 0, 150, 30,
            // top
            0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 30,
            // top rung right
            100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 30,
            // under top rung
            30, 30, 0, 30, 30, 30, 100, 30, 30, 100, 30, 0,
            // between top rung and middle
            30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 60, 0,
            // top of middle rung
            30, 60, 0, 30, 60, 30, 67, 60, 0, 67, 60, 30,
            // right of middle rung
            67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 90, 0,
            // // left column back
            // 0, 0, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,
            // // top rung back
            // 30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,
            // // middle rung back
            // 30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,
        ]) || this;
        _this.m_Indices = [
            // left column front
            0, 1, 2, 0, 2, 3, 0,
            // top rung front
            4, 5, 6, 4, 6, 7, 4,
            // middle rung front
            8, 9, 10, 8, 10, 11, 8,
            // left column back
            12, 13, 14, 12, 14, 15, 12,
            // bottom
            16, 17, 18, 16, 18, 19, 16,
            // left side
            20, 21, 22, 20, 22, 23, 20,
            // top
            24, 25, 26, 24, 26, 27, 24,
            // top rung right
            28, 29, 30, 28, 30, 31, 28,
            // under top rung
            32, 33, 34, 32, 34, 35, 32,
            // between top rung and middle
            36, 37, 38, 36, 38, 39, 36,
            // top of middle rung
            40, 41, 42, 40, 42, 43, 40,
            // right of middle rung
            44, 45, 46, 44, 46, 47, 44,
        ];
        return _this;
    }
    return FLetter3D;
}(_mesh__WEBPACK_IMPORTED_MODULE_0__.Mesh3D));



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
                case 16:
                    ctx.uniformMatrix4fv(location, false, uniform);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFH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LENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7b0JBQzlDLE1BQUs7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztvQkFDOUMsTUFBSzthQUNSO1NBQ0Y7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRU0sU0FBUyxtQkFBbUIsQ0FDakMsY0FBc0I7SUFFdEIsSUFBTSxPQUFPLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBRXpFLElBQUksT0FBTyxJQUFJLElBQUk7UUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBK0IsY0FBYyxNQUFHLENBQUM7SUFFbkUsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFFdkMsSUFBSSxHQUFHLElBQUksSUFBSTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkRBQTZELENBQzlEO0lBRUgsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7QUFDdkIsQ0FBQzs7Ozs7OztVQzVHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnVCO0FBRXZCLElBQU0sR0FBRyxHQUFHLElBQUksNENBQUcsRUFBRTtBQUVyQixHQUFHLENBQUMsR0FBRyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vM2Rfdmlld2VyLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvLi9zcmMvbWF0cml4LnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9tZXNoLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9wcm9ncmFtLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9zY2VuZS50cyIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvLi9zcmMvc2hhZGVyLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vM2Rfdmlld2VyLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8zZF92aWV3ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzNkX3ZpZXdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzNkX3ZpZXdlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvZ3JhbSBmcm9tICcuL3Byb2dyYW0nXHJcbmltcG9ydCB7IFNjZW5lMkQsIFNjZW5lM0QgfSBmcm9tICcuL3NjZW5lJ1xyXG5pbXBvcnQgeyBUcmlhbmdsZSwgRkxldHRlciwgRkxldHRlcjNELCBDdWJlIH0gZnJvbSAnLi9zaGFwZXMnXHJcblxyXG5pbXBvcnQgeyBsb2FkU2hhZGVyRnJvbVNjcmlwdHMgfSBmcm9tICcuL3NoYWRlcidcclxuaW1wb3J0IHsgZ2V0UmVuZGVyaW5nQ29udGV4dCB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gIHJ1bigpIHtcclxuICAgIEFwcC5zY2VuZTNEKClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzY2VuZTNEKCkge1xyXG4gICAgY29uc3QgJGFuZ2xlOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FuZ2xlJylcclxuICAgIGNvbnN0ICRzY2FsZTogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2FsZScpXHJcblxyXG4gICAgY29uc3QgW3dnbCwgX10gPSBnZXRSZW5kZXJpbmdDb250ZXh0KCcjd2ViZ2wnKVxyXG4gICAgY29uc3Qgc2hhZGVycyA9IGxvYWRTaGFkZXJGcm9tU2NyaXB0cyh3Z2wsIFsnI3Ytc2hhZGVyLTNkJywgJyNmLXNoYWRlciddKVxyXG4gICAgY29uc3QgcHJvZ3JhbSA9IG5ldyBQcm9ncmFtKHdnbCwgc2hhZGVycylcclxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lM0Qod2dsKVxyXG5cclxuICAgIGNvbnN0IGN1YmUgPSBuZXcgQ3ViZSgpXHJcblxyXG4gICAgY3ViZS5zY2FsZSgzKVxyXG4gICAgY3ViZS5tb3ZlVG8oWzcyMCAqIDAuNjI1LCA0ODAgLyAxLjI1LCAwXSlcclxuICAgIGN1YmUucm90YXRlKDIwKVxyXG4gICAgY3ViZS5tb3ZlT3JpZ2luKFstOTcgLyAyLCAtNzUsIDBdKVxyXG5cclxuICAgICRhbmdsZS5vbmlucHV0ID0gKCkgPT4ge1xyXG4gICAgICBjdWJlLnJvdGF0ZShOdW1iZXIoJGFuZ2xlLnZhbHVlKSlcclxuICAgICAgc2NlbmUuZHJhdygpXHJcbiAgICB9XHJcblxyXG4gICAgJHNjYWxlLm9uaW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgIGN1YmUuc2NhbGUoTnVtYmVyKCRzY2FsZS52YWx1ZSkpXHJcbiAgICAgIHNjZW5lLmRyYXcoKVxyXG4gICAgfVxyXG5cclxuICAgIHNjZW5lLnVzaW5nKHByb2dyYW0pXHJcbiAgICBzY2VuZS5zZXRPYmpzKFtjdWJlXSlcclxuICAgIHNjZW5lLmRyYXcoKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNjZW5lMkQoKSB7XHJcbiAgICBjb25zdCAkYW5nbGU6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYW5nbGUnKVxyXG4gICAgY29uc3QgJHNjYWxlOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjYWxlJylcclxuXHJcbiAgICBjb25zdCBbd2dsLCBfXSA9IGdldFJlbmRlcmluZ0NvbnRleHQoJyN3ZWJnbCcpXHJcbiAgICBjb25zdCBzaGFkZXJzID0gbG9hZFNoYWRlckZyb21TY3JpcHRzKHdnbCwgWycjdi1zaGFkZXItMmQnLCAnI2Ytc2hhZGVyJ10pXHJcbiAgICBjb25zdCBwcm9ncmFtID0gbmV3IFByb2dyYW0od2dsLCBzaGFkZXJzKVxyXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUyRCh3Z2wpXHJcblxyXG4gICAgY29uc3QgZiA9IG5ldyBGTGV0dGVyKClcclxuXHJcbiAgICBmLnNjYWxlKDIpXHJcbiAgICBmLnJvdGF0ZSgxNylcclxuICAgIGYubW92ZVRvKFs5NywgMTUwXSlcclxuICAgIGYubW92ZU9yaWdpbihbLTk3IC8gMiwgLTc1XSlcclxuXHJcbiAgICBjb25zdCB0cmlhbmdsZXMgPSBbXHJcbiAgICAgIG5ldyBUcmlhbmdsZShbNSwgNV0sIFswLCAxLCAwLCAxXSksXHJcbiAgICAgIG5ldyBUcmlhbmdsZShbMzYwLCAyNDBdKSxcclxuICAgICAgbmV3IFRyaWFuZ2xlKFs1LCAyNDVdKSxcclxuICAgICAgbmV3IFRyaWFuZ2xlKFszNjAsIDVdKSxcclxuICAgIF0ubWFwKHQgPT4ge1xyXG4gICAgICB0LnNjYWxlKDAuMjUpXHJcbiAgICAgIHQucm90YXRlKDI1KVxyXG4gICAgICByZXR1cm4gdFxyXG4gICAgfSlcclxuXHJcbiAgICAkYW5nbGUub25pbnB1dCA9ICgpID0+IHtcclxuICAgICAgZi5yb3RhdGUoTnVtYmVyKCRhbmdsZS52YWx1ZSkpXHJcbiAgICAgIHNjZW5lLmRyYXcoKVxyXG4gICAgfVxyXG5cclxuICAgICRzY2FsZS5vbmlucHV0ID0gKCkgPT4ge1xyXG4gICAgICBmLnNjYWxlKE51bWJlcigkc2NhbGUudmFsdWUpKVxyXG4gICAgICBzY2VuZS5kcmF3KClcclxuICAgIH1cclxuXHJcbiAgICBzY2VuZS51c2luZyhwcm9ncmFtKVxyXG4gICAgc2NlbmUuc2V0T2JqZWN0cyhbLi4udHJpYW5nbGVzLCBmXSlcclxuICAgIHNjZW5lLmRyYXcoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWMyLCBWZWMzIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCB0eXBlIE1hdDNCdWZmZXIgPSBbXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXJcclxuXVxyXG5cclxuZXhwb3J0IHR5cGUgTWF0NEJ1ZmZlciA9IFtcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXIsXHJcbiAgbnVtYmVyLFxyXG4gIG51bWJlcixcclxuICBudW1iZXJcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0MyB7XHJcbiAgbV9CdWY6IE1hdDNCdWZmZXJcclxuXHJcbiAgY29uc3RydWN0b3IodmFsdWVzOiBNYXQzQnVmZmVyKSB7XHJcbiAgICB0aGlzLm1fQnVmID0gdmFsdWVzXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgVHJhbnNsYXRpb24odHg6IG51bWJlciwgdHk6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQzKFsxLCAwLCAwLCAwLCAxLCAwLCB0eCwgdHksIDFdKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIFJvdGF0aW9uKGFuZ2xlOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHNpbmUgPSBNYXRoLnNpbihhbmdsZSlcclxuICAgIGNvbnN0IGNvc2luZSA9IE1hdGguY29zKGFuZ2xlKVxyXG4gICAgcmV0dXJuIG5ldyBNYXQzKFtjb3NpbmUsIC1zaW5lLCAwLCBzaW5lLCBjb3NpbmUsIDAsIDAsIDAsIDFdKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIFNjYWxpbmcoc3g6IG51bWJlciwgc3k6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQzKFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIFByb2plY3Rpb24oW3dpZHRoLCBoZWlnaHRdOiBWZWMyKSB7XHJcbiAgICAvLyBOb3RlOiBUaGlzIG1hdHJpeCBmbGlwcyB0aGUgWSBheGlzIHNvIHRoYXQgMCBpcyBhdCB0aGUgdG9wLlxyXG4gICAgcmV0dXJuIG5ldyBNYXQzKFsyIC8gd2lkdGgsIDAsIDAsIDAsIC0yIC8gaGVpZ2h0LCAwLCAtMSwgMSwgMV0pXHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGUodHg6IG51bWJlciwgdHk6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQzKHRoaXMubV9CdWYpLm11bHRpcGx5KE1hdDMuVHJhbnNsYXRpb24odHgsIHR5KSlcclxuICB9XHJcblxyXG4gIHJvdGF0ZShzY2FsYXI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQzKHRoaXMubV9CdWYpLm11bHRpcGx5KE1hdDMuUm90YXRpb24oc2NhbGFyKSlcclxuICB9XHJcblxyXG4gIHNjYWxlKHN4OiBudW1iZXIsIHN5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0Myh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQzLlNjYWxpbmcoc3gsIHN5KSlcclxuICB9XHJcblxyXG4gIG11bHRpcGx5KG90aGVyOiBNYXQzKSB7XHJcbiAgICBjb25zdCBbYTAwLCBhMDEsIGEwMiwgYTEwLCBhMTEsIGExMiwgYTIwLCBhMjEsIGEyMl0gPSB0aGlzLm1fQnVmXHJcbiAgICBjb25zdCBbYjAwLCBiMDEsIGIwMiwgYjEwLCBiMTEsIGIxMiwgYjIwLCBiMjEsIGIyMl0gPSBvdGhlci5tX0J1ZlxyXG5cclxuICAgIHJldHVybiBuZXcgTWF0MyhbXHJcbiAgICAgIGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMCxcclxuICAgICAgYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxLFxyXG4gICAgICBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjIsXHJcbiAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCxcclxuICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxLFxyXG4gICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIsXHJcbiAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCxcclxuICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxLFxyXG4gICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIsXHJcbiAgICBdKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdDQge1xyXG4gIG1fQnVmOiBNYXQ0QnVmZmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKHZhbHVlczogTWF0NEJ1ZmZlcikge1xyXG4gICAgdGhpcy5tX0J1ZiA9IHZhbHVlc1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIFRyYW5zbGF0aW9uKFt0eCwgdHksIHR6XTogVmVjMykge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCB0eCwgdHksIHR6LCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBSb3RhdGlvblgocmFkaWFuczogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkaWFucylcclxuICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWRpYW5zKVxyXG5cclxuICAgIHJldHVybiBuZXcgTWF0NChbMSwgMCwgMCwgMCwgMCwgYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDFdKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIFJvdGF0aW9uWShyYWRpYW5zOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWRpYW5zKVxyXG4gICAgY29uc3QgcyA9IE1hdGguc2luKHJhZGlhbnMpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KFtjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMV0pXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgUm90YXRpb25aKHJhZGlhbnM6IG51bWJlcikge1xyXG4gICAgY29uc3QgYyA9IE1hdGguY29zKHJhZGlhbnMpXHJcbiAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkaWFucylcclxuXHJcbiAgICByZXR1cm4gbmV3IE1hdDQoW2MsIHMsIDAsIDAsIC1zLCBjLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBTY2FsaW5nKFtzeCwgc3ksIHN6XTogVmVjMykge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KFtzeCwgMCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDAsIHN6LCAwLCAwLCAwLCAwLCAxXSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBQcm9qZWN0aW9uKFt3aWR0aCwgaGVpZ2h0LCBkZXB0aF06IFZlYzMpIHtcclxuICAgIC8vIE5vdGU6IFRoaXMgbWF0cml4IGZsaXBzIHRoZSBZIGF4aXMgc28gMCBpcyBhdCB0aGUgdG9wLlxyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KFtcclxuICAgICAgMiAvIHdpZHRoLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAtMiAvIGhlaWdodCxcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgMiAvIGRlcHRoLFxyXG4gICAgICAwLFxyXG4gICAgICAtMSxcclxuICAgICAgMSxcclxuICAgICAgMCxcclxuICAgICAgMSxcclxuICAgIF0pXHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGUodHJhbnNsYXRpb246IFZlYzMpIHtcclxuICAgIHJldHVybiBuZXcgTWF0NCh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQ0LlRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSlcclxuICB9XHJcblxyXG4gIHhSb3RhdGUocmFkaWFuczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdDQodGhpcy5tX0J1ZikubXVsdGlwbHkoTWF0NC5Sb3RhdGlvblgocmFkaWFucykpXHJcbiAgfVxyXG5cclxuICB5Um90YXRlKHJhZGlhbnM6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KHRoaXMubV9CdWYpLm11bHRpcGx5KE1hdDQuUm90YXRpb25ZKHJhZGlhbnMpKVxyXG4gIH1cclxuXHJcbiAgelJvdGF0ZShyYWRpYW5zOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgTWF0NCh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQ0LlJvdGF0aW9uWihyYWRpYW5zKSlcclxuICB9XHJcblxyXG4gIHNjYWxlKHNjYWxpbmc6IFZlYzMpIHtcclxuICAgIHJldHVybiBuZXcgTWF0NCh0aGlzLm1fQnVmKS5tdWx0aXBseShNYXQ0LlNjYWxpbmcoc2NhbGluZykpXHJcbiAgfVxyXG5cclxuICBtdWx0aXBseShvdGhlcjogTWF0NCkge1xyXG4gICAgY29uc3QgW1xyXG4gICAgICBhMTEsXHJcbiAgICAgIGExMixcclxuICAgICAgYTEzLFxyXG4gICAgICBhMTQsXHJcbiAgICAgIGEyMSxcclxuICAgICAgYTIyLFxyXG4gICAgICBhMjMsXHJcbiAgICAgIGEyNCxcclxuICAgICAgYTMxLFxyXG4gICAgICBhMzIsXHJcbiAgICAgIGEzMyxcclxuICAgICAgYTM0LFxyXG4gICAgICBhNDEsXHJcbiAgICAgIGE0MixcclxuICAgICAgYTQzLFxyXG4gICAgICBhNDQsXHJcbiAgICBdID0gdGhpcy5tX0J1ZlxyXG5cclxuICAgIGNvbnN0IFtcclxuICAgICAgYjExLFxyXG4gICAgICBiMTIsXHJcbiAgICAgIGIxMyxcclxuICAgICAgYjE0LFxyXG4gICAgICBiMjEsXHJcbiAgICAgIGIyMixcclxuICAgICAgYjIzLFxyXG4gICAgICBiMjQsXHJcbiAgICAgIGIzMSxcclxuICAgICAgYjMyLFxyXG4gICAgICBiMzMsXHJcbiAgICAgIGIzNCxcclxuICAgICAgYjQxLFxyXG4gICAgICBiNDIsXHJcbiAgICAgIGI0MyxcclxuICAgICAgYjQ0LFxyXG4gICAgXSA9IG90aGVyLm1fQnVmXHJcblxyXG4gICAgcmV0dXJuIG5ldyBNYXQ0KFtcclxuICAgICAgYjExICogYTExICsgYjEyICogYTIxICsgYjEzICogYTMxICsgYjE0ICogYTQxLFxyXG4gICAgICBiMTEgKiBhMTIgKyBiMTIgKiBhMjIgKyBiMTMgKiBhMzIgKyBiMTQgKiBhNDIsXHJcbiAgICAgIGIxMSAqIGExMyArIGIxMiAqIGEyMyArIGIxMyAqIGEzMyArIGIxNCAqIGE0MyxcclxuICAgICAgYjExICogYTE0ICsgYjEyICogYTI0ICsgYjEzICogYTM0ICsgYjE0ICogYTQ0LFxyXG4gICAgICBiMjEgKiBhMTEgKyBiMjIgKiBhMjEgKyBiMjMgKiBhMzEgKyBiMjQgKiBhNDEsXHJcbiAgICAgIGIyMSAqIGExMiArIGIyMiAqIGEyMiArIGIyMyAqIGEzMiArIGIyNCAqIGE0MixcclxuICAgICAgYjIxICogYTEzICsgYjIyICogYTIzICsgYjIzICogYTMzICsgYjI0ICogYTQzLFxyXG4gICAgICBiMjEgKiBhMTQgKyBiMjIgKiBhMjQgKyBiMjMgKiBhMzQgKyBiMjQgKiBhNDQsXHJcbiAgICAgIGIzMSAqIGExMSArIGIzMiAqIGEyMSArIGIzMyAqIGEzMSArIGIzNCAqIGE0MSxcclxuICAgICAgYjMxICogYTEyICsgYjMyICogYTIyICsgYjMzICogYTMyICsgYjM0ICogYTQyLFxyXG4gICAgICBiMzEgKiBhMTMgKyBiMzIgKiBhMjMgKyBiMzMgKiBhMzMgKyBiMzQgKiBhNDMsXHJcbiAgICAgIGIzMSAqIGExNCArIGIzMiAqIGEyNCArIGIzMyAqIGEzNCArIGIzNCAqIGE0NCxcclxuICAgICAgYjQxICogYTExICsgYjQyICogYTIxICsgYjQzICogYTMxICsgYjQ0ICogYTQxLFxyXG4gICAgICBiNDEgKiBhMTIgKyBiNDIgKiBhMjIgKyBiNDMgKiBhMzIgKyBiNDQgKiBhNDIsXHJcbiAgICAgIGI0MSAqIGExMyArIGI0MiAqIGEyMyArIGI0MyAqIGEzMyArIGI0NCAqIGE0MyxcclxuICAgICAgYjQxICogYTE0ICsgYjQyICogYTI0ICsgYjQzICogYTM0ICsgYjQ0ICogYTQ0LFxyXG4gICAgXSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmdiYSwgVmVjMiwgVmVjMyB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBNYXQzLCB7IE1hdDQgfSBmcm9tICcuL21hdHJpeCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc2gge1xyXG4gIHByb3RlY3RlZCBtX1ZlcnRpY2VzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJvdGVjdGVkIG1fSW5kaWNlczogQXJyYXk8bnVtYmVyPlxyXG4gIHByb3RlY3RlZCBtX09yaWdpbjogVmVjMlxyXG4gIHByb3RlY3RlZCBtX1RyYW5zbGF0aW9uOiBWZWMyID0gWzAsIDBdXHJcbiAgcHJvdGVjdGVkIG1fQW5nbGUgPSAwXHJcbiAgcHJvdGVjdGVkIG1fU2NhbGU6IFZlYzIgPSBbMSwgMV1cclxuICBwcm90ZWN0ZWQgbV9Db2xvcjogUmdiYSA9IFswLCAwLCAwLCAxXVxyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0aWNlczogQXJyYXk8bnVtYmVyPiwgY29sb3I/OiBSZ2JhKSB7XHJcbiAgICB0aGlzLm1fVmVydGljZXMgPSB2ZXJ0aWNlc1xyXG4gICAgaWYgKGNvbG9yICE9IHVuZGVmaW5lZCkgdGhpcy5tX0NvbG9yID0gY29sb3JcclxuICB9XHJcblxyXG4gIG1vdmUocGl4ZWxzOiBWZWMyKSB7XHJcbiAgICB0aGlzLm1fVHJhbnNsYXRpb25bMF0gKz0gcGl4ZWxzWzBdXHJcbiAgICB0aGlzLm1fVHJhbnNsYXRpb25bMV0gKz0gcGl4ZWxzWzFdXHJcbiAgfVxyXG5cclxuICBtb3ZlVG8ocGl4ZWxzOiBWZWMyKSB7XHJcbiAgICB0aGlzLm1fVHJhbnNsYXRpb25bMF0gPSBwaXhlbHNbMF1cclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblsxXSA9IHBpeGVsc1sxXVxyXG4gIH1cclxuXHJcbiAgbW92ZU9yaWdpbihwb3M6IFZlYzIpIHtcclxuICAgIHRoaXMubV9PcmlnaW4gPSBwb3NcclxuICB9XHJcblxyXG4gIHNjYWxlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm1fU2NhbGUgPSBbYW1vdW50LCBhbW91bnRdXHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy5tX0FuZ2xlID0gYW5nbGVcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUcmFuc2Zvcm0ocHJvamVjdGlvbjogVmVjMikge1xyXG4gICAgY29uc3QgcHJvamVjdGlvbk1hdCA9IE1hdDMuUHJvamVjdGlvbihwcm9qZWN0aW9uKVxyXG4gICAgY29uc3QgcmFkaWFucyA9ICgoMzYwIC0gdGhpcy5tX0FuZ2xlKSAqIE1hdGguUEkpIC8gMTgwXHJcbiAgICBjb25zdCBbdHJhbnNsYXRlWCwgdHJhbnNsYXRlWV0gPSB0aGlzLm1fVHJhbnNsYXRpb25cclxuICAgIGNvbnN0IFtzY2FsZVgsIHNjYWxlWV0gPSB0aGlzLm1fU2NhbGVcclxuXHJcbiAgICBsZXQgbWF0cml4ID0gcHJvamVjdGlvbk1hdFxyXG4gICAgICAudHJhbnNsYXRlKHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpXHJcbiAgICAgIC5yb3RhdGUocmFkaWFucylcclxuICAgICAgLnNjYWxlKHNjYWxlWCwgc2NhbGVZKVxyXG5cclxuICAgIGlmICh0aGlzLm1fT3JpZ2luICE9IHVuZGVmaW5lZClcclxuICAgICAgcmV0dXJuIG1hdHJpeC50cmFuc2xhdGUodGhpcy5tX09yaWdpblswXSwgdGhpcy5tX09yaWdpblsxXSkubV9CdWZcclxuICAgIGVsc2UgcmV0dXJuIG1hdHJpeC5tX0J1ZlxyXG4gIH1cclxuXHJcbiAgY291bnRJbmRpY2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubV9JbmRpY2VzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1fVmVydGljZXNcclxuICB9XHJcblxyXG4gIGluZGljZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tX0luZGljZXNcclxuICB9XHJcblxyXG4gIGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubV9Db2xvclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc2gzRCB7XHJcbiAgcHJvdGVjdGVkIG1fVmVydGljZXM6IEFycmF5PG51bWJlcj5cclxuICBwcm90ZWN0ZWQgbV9JbmRpY2VzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJvdGVjdGVkIG1fT3JpZ2luOiBWZWMzXHJcbiAgcHJvdGVjdGVkIG1fVHJhbnNsYXRpb246IFZlYzMgPSBbMCwgMCwgMF1cclxuICBwcm90ZWN0ZWQgbV9BbmdsZSA9IDBcclxuICBwcm90ZWN0ZWQgbV9TY2FsZTogVmVjMyA9IFsxLCAxLCAxXVxyXG4gIHByb3RlY3RlZCBtX0NvbG9yOiBSZ2JhID0gWzAsIDAsIDAsIDFdXHJcblxyXG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBBcnJheTxudW1iZXI+LCBjb2xvcj86IFJnYmEpIHtcclxuICAgIHRoaXMubV9WZXJ0aWNlcyA9IHZlcnRpY2VzXHJcbiAgICBpZiAoY29sb3IgIT0gdW5kZWZpbmVkKSB0aGlzLm1fQ29sb3IgPSBjb2xvclxyXG4gIH1cclxuXHJcbiAgbW92ZShwaXhlbHM6IFZlYzMpIHtcclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblswXSArPSBwaXhlbHNbMF1cclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblsxXSArPSBwaXhlbHNbMV1cclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblsyXSArPSBwaXhlbHNbMl1cclxuICB9XHJcblxyXG4gIG1vdmVUbyhwaXhlbHM6IFZlYzMpIHtcclxuICAgIHRoaXMubV9UcmFuc2xhdGlvblswXSA9IHBpeGVsc1swXVxyXG4gICAgdGhpcy5tX1RyYW5zbGF0aW9uWzFdID0gcGl4ZWxzWzFdXHJcbiAgICB0aGlzLm1fVHJhbnNsYXRpb25bMl0gPSBwaXhlbHNbMl1cclxuICB9XHJcblxyXG4gIG1vdmVPcmlnaW4ocG9zOiBWZWMzKSB7XHJcbiAgICB0aGlzLm1fT3JpZ2luID0gcG9zXHJcbiAgfVxyXG5cclxuICBzY2FsZShhbW91bnQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5tX1NjYWxlID0gW2Ftb3VudCwgYW1vdW50LCBhbW91bnRdXHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy5tX0FuZ2xlID0gYW5nbGVcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUcmFuc2Zvcm0ocHJvamVjdGlvbjogVmVjMikge1xyXG4gICAgY29uc3QgcHJvamVjdGlvbk1hdCA9IE1hdDQuUHJvamVjdGlvbihbLi4ucHJvamVjdGlvbiwgNzIwXSlcclxuICAgIGNvbnN0IHJhZGlhbnMgPSAoKDM2MCAtIHRoaXMubV9BbmdsZSkgKiBNYXRoLlBJKSAvIDE4MFxyXG5cclxuICAgIGxldCBtYXRyaXggPSBwcm9qZWN0aW9uTWF0XHJcbiAgICAgIC50cmFuc2xhdGUodGhpcy5tX1RyYW5zbGF0aW9uKVxyXG4gICAgICAueFJvdGF0ZShyYWRpYW5zKVxyXG4gICAgICAueVJvdGF0ZShyYWRpYW5zKVxyXG4gICAgICAuelJvdGF0ZShyYWRpYW5zKVxyXG4gICAgICAuc2NhbGUodGhpcy5tX1NjYWxlKVxyXG5cclxuICAgIGlmICh0aGlzLm1fT3JpZ2luICE9IHVuZGVmaW5lZCkgcmV0dXJuIG1hdHJpeC50cmFuc2xhdGUodGhpcy5tX09yaWdpbikubV9CdWZcclxuICAgIGVsc2UgcmV0dXJuIG1hdHJpeC5tX0J1ZlxyXG4gIH1cclxuXHJcbiAgY291bnRJbmRpY2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubV9JbmRpY2VzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1fVmVydGljZXNcclxuICB9XHJcblxyXG4gIGluZGljZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tX0luZGljZXNcclxuICB9XHJcblxyXG4gIGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubV9Db2xvclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEN0eCxcclxuICBJQXR0cmlidXRlcyxcclxuICBJVW5pZm9ybXMsXHJcbiAgc2V0QXR0cmlidXRlcyxcclxuICBzZXRVbmlmb3JtcyxcclxufSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3JhbSB7XHJcbiAgcHJpdmF0ZSBtX1Byb2dyYW06IFdlYkdMUHJvZ3JhbVxyXG4gIHByaXZhdGUgbV9BdHRyczogSUF0dHJpYnV0ZXNcclxuICBwcml2YXRlIG1fVW5pZm9ybXM6IElVbmlmb3Jtc1xyXG5cclxuICBjb25zdHJ1Y3RvcihjdHg6IEN0eCwgW3ZTaGFkZXIsIGZTaGFkZXJdOiBbV2ViR0xTaGFkZXIsIFdlYkdMU2hhZGVyXSkge1xyXG4gICAgY29uc3QgcHJvZ3JhbSA9IGN0eC5jcmVhdGVQcm9ncmFtKClcclxuXHJcbiAgICBjdHguYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZTaGFkZXIpXHJcbiAgICBjdHguYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZTaGFkZXIpXHJcbiAgICBjdHgubGlua1Byb2dyYW0ocHJvZ3JhbSlcclxuXHJcbiAgICBpZiAoIWN0eC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGN0eC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAnVW5hYmxlIHRvIGluaXRpYWxpemUgdGhlIHNoYWRlciBwcm9ncmFtOicsXHJcbiAgICAgICAgY3R4LmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pXHJcbiAgICAgIClcclxuXHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdTdWNjZXNzZnVsbHkgbGlua2VkIHByb2dyYW0nKVxyXG5cclxuICAgIHRoaXMubV9Qcm9ncmFtID0gcHJvZ3JhbVxyXG4gIH1cclxuXHJcbiAgc2VsZigpOiBXZWJHTFByb2dyYW0ge1xyXG4gICAgcmV0dXJuIHRoaXMubV9Qcm9ncmFtXHJcbiAgfVxyXG5cclxuICBhdHRycyhhdHRyczogSUF0dHJpYnV0ZXMpIHtcclxuICAgIHRoaXMubV9BdHRycyA9IGF0dHJzXHJcbiAgfVxyXG5cclxuICB1bmlmb3Jtcyh1bmlmb3JtczogSVVuaWZvcm1zKSB7XHJcbiAgICB0aGlzLm1fVW5pZm9ybXMgPSB1bmlmb3Jtc1xyXG4gIH1cclxuXHJcbiAgYmluZEF0dHJzKGN0eDogQ3R4KSB7XHJcbiAgICBzZXRBdHRyaWJ1dGVzKGN0eCwgdGhpcy5tX1Byb2dyYW0sIHRoaXMubV9BdHRycylcclxuICB9XHJcblxyXG4gIGJpbmRVbmlmb3JtcyhjdHg6IEN0eCkge1xyXG4gICAgc2V0VW5pZm9ybXMoY3R4LCB0aGlzLm1fUHJvZ3JhbSwgdGhpcy5tX1VuaWZvcm1zKVxyXG4gIH1cclxuXHJcbiAgdXNlKGN0eDogQ3R4KSB7XHJcbiAgICBjdHgudXNlUHJvZ3JhbSh0aGlzLm1fUHJvZ3JhbSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IE1lc2gsIHsgTWVzaDNEIH0gZnJvbSAnLi9tZXNoJ1xyXG5pbXBvcnQgUHJvZ3JhbSBmcm9tICcuL3Byb2dyYW0nXHJcbmltcG9ydCB7IEN0eCwgc2V0VW5pZm9ybXMgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lIHtcclxuICBwcm90ZWN0ZWQgbV9DdHg6IEN0eFxyXG4gIHByb3RlY3RlZCBtX1Byb2dyYW06IFByb2dyYW1cclxuICBwcm90ZWN0ZWQgbV9PYmplY3RzOiBBcnJheTxNZXNoPlxyXG4gIHByb3RlY3RlZCBtX3BCdWY6IFdlYkdMQnVmZmVyXHJcbiAgcHJvdGVjdGVkIG1faUJ1ZjogV2ViR0xCdWZmZXJcclxuXHJcbiAgY29uc3RydWN0b3IoY3R4OiBDdHgpIHtcclxuICAgIHRoaXMubV9DdHggPSBjdHhcclxuXHJcbiAgICB0aGlzLm1faUJ1ZiA9IGN0eC5jcmVhdGVCdWZmZXIoKVxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1faUJ1ZilcclxuXHJcbiAgICB0aGlzLm1fcEJ1ZiA9IGN0eC5jcmVhdGVCdWZmZXIoKVxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkFSUkFZX0JVRkZFUiwgdGhpcy5tX3BCdWYpXHJcbiAgfVxyXG5cclxuICB1c2luZyhwcm9ncmFtOiBQcm9ncmFtKSB7XHJcbiAgICB0aGlzLm1fUHJvZ3JhbSA9IHByb2dyYW1cclxuICB9XHJcblxyXG4gIHNldE9iamVjdHMob2JqZWN0czogQXJyYXk8TWVzaD4pIHtcclxuICAgIHRoaXMubV9PYmplY3RzID0gb2JqZWN0c1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2VuZTJEIGV4dGVuZHMgU2NlbmUge1xyXG4gIGNvbnN0cnVjdG9yKGN0eDogQ3R4KSB7XHJcbiAgICBzdXBlcihjdHgpXHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBkcmF3KCkge1xyXG4gICAgdGhpcy5tX0N0eC52aWV3cG9ydCgwLCAwLCB0aGlzLm1fQ3R4LmNhbnZhcy53aWR0aCwgdGhpcy5tX0N0eC5jYW52YXMuaGVpZ2h0KVxyXG4gICAgdGhpcy5tX0N0eC5jbGVhckNvbG9yKDAsIDAsIDAsIDApXHJcbiAgICB0aGlzLm1fQ3R4LmNsZWFyKHRoaXMubV9DdHguQ09MT1JfQlVGRkVSX0JJVClcclxuXHJcbiAgICB0aGlzLm1fUHJvZ3JhbS5hdHRycyh7XHJcbiAgICAgIGFfcG9zaXRpb246IHtcclxuICAgICAgICBidWZmZXI6IHRoaXMubV9wQnVmLFxyXG4gICAgICAgIHNpemU6IDIsXHJcbiAgICAgICAgdHlwZTogdGhpcy5tX0N0eC5GTE9BVCxcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgLy8gVGVsbCBpdCB0byB1c2Ugb3VyIHByb2dyYW0gKHBhaXIgb2Ygc2hhZGVycylcclxuICAgIHRoaXMubV9Qcm9ncmFtLnVzZSh0aGlzLm1fQ3R4KVxyXG5cclxuICAgIC8vIHRoaXMubV9DdHguYmluZEJ1ZmZlcih0aGlzLm1fQ3R4LkFSUkFZX0JVRkZFUiwgdGhpcy5tX3BCdWYpXHJcblxyXG4gICAgdGhpcy5tX1Byb2dyYW0uYmluZEF0dHJzKHRoaXMubV9DdHgpXHJcblxyXG4gICAgdGhpcy5tX09iamVjdHMuZm9yRWFjaChvYmogPT4ge1xyXG4gICAgICBzZXRVbmlmb3Jtcyh0aGlzLm1fQ3R4LCB0aGlzLm1fUHJvZ3JhbS5zZWxmKCksIHtcclxuICAgICAgICB1X2NvbG9yOiBvYmouY29sb3IoKSxcclxuICAgICAgICB1X21hdHJpeDogb2JqLmNvbXB1dGVUcmFuc2Zvcm0oW1xyXG4gICAgICAgICAgdGhpcy5tX0N0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgICB0aGlzLm1fQ3R4LmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgXSksXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyB0aGlzLm1fQ3R4LmJpbmRCdWZmZXIodGhpcy5tX0N0eC5BUlJBWV9CVUZGRVIsIHRoaXMubV9wQnVmKVxyXG5cclxuICAgICAgdGhpcy5tX0N0eC5iaW5kQnVmZmVyKHRoaXMubV9DdHguRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubV9pQnVmKVxyXG4gICAgICB0aGlzLm1fQ3R4LmJ1ZmZlckRhdGEoXHJcbiAgICAgICAgdGhpcy5tX0N0eC5FTEVNRU5UX0FSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgVWludDE2QXJyYXkob2JqLmluZGljZXMoKSksXHJcbiAgICAgICAgdGhpcy5tX0N0eC5TVEFUSUNfRFJBV1xyXG4gICAgICApXHJcblxyXG4gICAgICB0aGlzLm1fQ3R4LmJ1ZmZlckRhdGEoXHJcbiAgICAgICAgdGhpcy5tX0N0eC5BUlJBWV9CVUZGRVIsXHJcbiAgICAgICAgbmV3IEZsb2F0MzJBcnJheShvYmouZGF0YSgpKSxcclxuICAgICAgICB0aGlzLm1fQ3R4LlNUQVRJQ19EUkFXXHJcbiAgICAgIClcclxuXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBkcmF3IHBvaW50c1xyXG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVR5cGUgPSB0aGlzLm1fQ3R4LlBPSU5UU1xyXG4gICAgICAgIGNvbnN0IGRyYXdPZmZzZXQgPSAwXHJcbiAgICAgICAgY29uc3QgY291bnQgPSBvYmouY291bnRJbmRpY2VzKClcclxuICAgICAgICB2YXIgaW5kZXhUeXBlID0gdGhpcy5tX0N0eC5VTlNJR05FRF9TSE9SVFxyXG4gICAgICAgIHRoaXMubV9DdHguZHJhd0VsZW1lbnRzKHByaW1pdGl2ZVR5cGUsIGNvdW50LCBpbmRleFR5cGUsIGRyYXdPZmZzZXQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBkcmF3IHRyaWFuZ2xlc1xyXG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVR5cGUgPSB0aGlzLm1fQ3R4LkxJTkVfU1RSSVBcclxuICAgICAgICBjb25zdCBkcmF3T2Zmc2V0ID0gMFxyXG4gICAgICAgIGNvbnN0IGNvdW50ID0gb2JqLmNvdW50SW5kaWNlcygpXHJcbiAgICAgICAgdmFyIGluZGV4VHlwZSA9IHRoaXMubV9DdHguVU5TSUdORURfU0hPUlRcclxuICAgICAgICB0aGlzLm1fQ3R4LmRyYXdFbGVtZW50cyhwcmltaXRpdmVUeXBlLCBjb3VudCwgaW5kZXhUeXBlLCBkcmF3T2Zmc2V0KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lM0QgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgcHJpdmF0ZSBtX09ianM6IEFycmF5PE1lc2gzRD5cclxuXHJcbiAgY29uc3RydWN0b3IoY3R4OiBDdHgpIHtcclxuICAgIHN1cGVyKGN0eClcclxuICB9XHJcblxyXG4gIHNldE9ianMob2JqZWN0czogQXJyYXk8TWVzaDNEPikge1xyXG4gICAgdGhpcy5tX09ianMgPSBvYmplY3RzXHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBkcmF3KCkge1xyXG4gICAgdGhpcy5tX0N0eC52aWV3cG9ydCgwLCAwLCB0aGlzLm1fQ3R4LmNhbnZhcy53aWR0aCwgdGhpcy5tX0N0eC5jYW52YXMuaGVpZ2h0KVxyXG4gICAgdGhpcy5tX0N0eC5jbGVhckNvbG9yKDAsIDAsIDAsIDApXHJcbiAgICB0aGlzLm1fQ3R4LmNsZWFyKHRoaXMubV9DdHguQ09MT1JfQlVGRkVSX0JJVClcclxuXHJcbiAgICB0aGlzLm1fUHJvZ3JhbS5hdHRycyh7XHJcbiAgICAgIGFfcG9zaXRpb246IHtcclxuICAgICAgICBidWZmZXI6IHRoaXMubV9wQnVmLFxyXG4gICAgICAgIHNpemU6IDMsXHJcbiAgICAgICAgdHlwZTogdGhpcy5tX0N0eC5GTE9BVCxcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5tX1Byb2dyYW0udXNlKHRoaXMubV9DdHgpXHJcblxyXG4gICAgdGhpcy5tX1Byb2dyYW0uYmluZEF0dHJzKHRoaXMubV9DdHgpXHJcblxyXG4gICAgdGhpcy5tX09ianMuZm9yRWFjaChvYmogPT4ge1xyXG4gICAgICBzZXRVbmlmb3Jtcyh0aGlzLm1fQ3R4LCB0aGlzLm1fUHJvZ3JhbS5zZWxmKCksIHtcclxuICAgICAgICB1X2NvbG9yOiBvYmouY29sb3IoKSxcclxuICAgICAgICB1X21hdHJpeDogb2JqLmNvbXB1dGVUcmFuc2Zvcm0oW1xyXG4gICAgICAgICAgdGhpcy5tX0N0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgICB0aGlzLm1fQ3R4LmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgXSksXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLm1fQ3R4LmJpbmRCdWZmZXIodGhpcy5tX0N0eC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5tX2lCdWYpXHJcbiAgICAgIHRoaXMubV9DdHguYnVmZmVyRGF0YShcclxuICAgICAgICB0aGlzLm1fQ3R4LkVMRU1FTlRfQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgIG5ldyBVaW50MTZBcnJheShvYmouaW5kaWNlcygpKSxcclxuICAgICAgICB0aGlzLm1fQ3R4LlNUQVRJQ19EUkFXXHJcbiAgICAgIClcclxuXHJcbiAgICAgIHRoaXMubV9DdHguYnVmZmVyRGF0YShcclxuICAgICAgICB0aGlzLm1fQ3R4LkFSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KG9iai5kYXRhKCkpLFxyXG4gICAgICAgIHRoaXMubV9DdHguU1RBVElDX0RSQVdcclxuICAgICAgKVxyXG5cclxuICAgICAge1xyXG4gICAgICAgIC8vIGRyYXcgcG9pbnRzXHJcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVHlwZSA9IHRoaXMubV9DdHguUE9JTlRTXHJcbiAgICAgICAgY29uc3QgZHJhd09mZnNldCA9IDBcclxuICAgICAgICBjb25zdCBjb3VudCA9IG9iai5jb3VudEluZGljZXMoKVxyXG4gICAgICAgIHZhciBpbmRleFR5cGUgPSB0aGlzLm1fQ3R4LlVOU0lHTkVEX1NIT1JUXHJcbiAgICAgICAgdGhpcy5tX0N0eC5kcmF3RWxlbWVudHMocHJpbWl0aXZlVHlwZSwgY291bnQsIGluZGV4VHlwZSwgZHJhd09mZnNldClcclxuICAgICAgfVxyXG5cclxuICAgICAge1xyXG4gICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVHlwZSA9IHRoaXMubV9DdHguTElORV9TVFJJUFxyXG4gICAgICAgIGNvbnN0IGRyYXdPZmZzZXQgPSAwXHJcbiAgICAgICAgY29uc3QgY291bnQgPSBvYmouY291bnRJbmRpY2VzKClcclxuICAgICAgICB2YXIgaW5kZXhUeXBlID0gdGhpcy5tX0N0eC5VTlNJR05FRF9TSE9SVFxyXG4gICAgICAgIHRoaXMubV9DdHguZHJhd0VsZW1lbnRzKHByaW1pdGl2ZVR5cGUsIGNvdW50LCBpbmRleFR5cGUsIGRyYXdPZmZzZXQpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiIsImVudW0gU2hhZGVyVHlwZSB7XHJcbiAgVmVydGV4LFxyXG4gIEZyYWdtZW50LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXIge1xyXG4gIHByaXZhdGUgbV9Tb3VyY2U6IHN0cmluZ1xyXG4gIHByaXZhdGUgbV9UeXBlOiBTaGFkZXJUeXBlXHJcblxyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0ICRzaGFkZXIgPSB0aGlzLl9nZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cclxuICAgIHRoaXMuX3NldFR5cGUoc2VsZWN0b3IsICRzaGFkZXIudHlwZSlcclxuICAgIHRoaXMubV9Tb3VyY2UgPSAkc2hhZGVyLnRleHRDb250ZW50XHJcbiAgfVxyXG5cclxuICBjb21waWxlKGN0eDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogV2ViR0xTaGFkZXIge1xyXG4gICAgY29uc3Qgc2hhZGVyID1cclxuICAgICAgdGhpcy5tX1R5cGUgPT0gU2hhZGVyVHlwZS5WZXJ0ZXhcclxuICAgICAgICA/IGN0eC5jcmVhdGVTaGFkZXIoY3R4LlZFUlRFWF9TSEFERVIpXHJcbiAgICAgICAgOiBjdHguY3JlYXRlU2hhZGVyKGN0eC5GUkFHTUVOVF9TSEFERVIpXHJcblxyXG4gICAgY3R4LnNoYWRlclNvdXJjZShzaGFkZXIsIHRoaXMubV9Tb3VyY2UpXHJcbiAgICBjdHguY29tcGlsZVNoYWRlcihzaGFkZXIpXHJcblxyXG4gICAgaWYgKCF0aGlzLl9jaGVja0NvbXBpbGVTdGF0dXMoY3R4LCBzaGFkZXIpKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnNvbGUuaW5mbyhcclxuICAgICAgJ1N1Y2Nlc3NmdWxseSBsb2FkZWQnLFxyXG4gICAgICB0aGlzLm1fVHlwZSA9PSBTaGFkZXJUeXBlLlZlcnRleCA/ICd2ZXJ0ZXgnIDogJ2ZyYWdtZW50JyxcclxuICAgICAgJ3NoYWRlcidcclxuICAgIClcclxuXHJcbiAgICByZXR1cm4gc2hhZGVyXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MU2NyaXB0RWxlbWVudCB7XHJcbiAgICBjb25zdCAkc2hhZGVyOiBIVE1MU2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbiAgICBpZiAoJHNoYWRlciA9PSBudWxsKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFNoYWRlciBjcmVhdGlvbiBmYWlsZWQgKGVsZW1lbnQgJyR7c2VsZWN0b3J9JyBkb2Vzbid0IGV4aXN0cylgXHJcbiAgICAgIClcclxuXHJcbiAgICByZXR1cm4gJHNoYWRlclxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0VHlwZShzZWxlY3Rvcjogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKG1pbWVUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ3gtc2hhZGVyL3gtdmVydGV4JzpcclxuICAgICAgICB0aGlzLm1fVHlwZSA9IFNoYWRlclR5cGUuVmVydGV4XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAneC1zaGFkZXIveC1mcmFnbWVudCc6XHJcbiAgICAgICAgdGhpcy5tX1R5cGUgPSBTaGFkZXJUeXBlLkZyYWdtZW50XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICBgU2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAoZWxlbWVudCAnJHtzZWxlY3Rvcn0nIGhhdmUgd3Jvbmcgc2hhZGVyIHR5cGUgJyR7bWltZVR5cGV9JylgXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tDb21waWxlU3RhdHVzKFxyXG4gICAgY3R4OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXHJcbiAgICBzaGFkZXI6IFdlYkdMU2hhZGVyXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWN0eC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBjdHguQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgYEFuIGVycm9yIG9jY3VyZWQgY29tcGlsaW5nIHRoZSBzaGFkZXJzOiAke2N0eC5nZXRTaGFkZXJJbmZvTG9nKFxyXG4gICAgICAgICAgc2hhZGVyXHJcbiAgICAgICAgKX1gXHJcbiAgICAgIClcclxuICAgICAgY3R4LmRlbGV0ZVNoYWRlcihzaGFkZXIpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNoYWRlckZyb21TY3JpcHRzKFxyXG4gIGN0eDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxyXG4gIFt2U2hhZGVyU2VsZWN0b3IsIGZTaGFkZXJTZWxlY3Rvcl06IFtzdHJpbmcsIHN0cmluZ11cclxuKTogW1dlYkdMU2hhZGVyLCBXZWJHTFNoYWRlcl0ge1xyXG4gIGNvbnN0IHZTaGFkZXIgPSBuZXcgU2hhZGVyKHZTaGFkZXJTZWxlY3RvcikuY29tcGlsZShjdHgpXHJcbiAgY29uc3QgZlNoYWRlciA9IG5ldyBTaGFkZXIoZlNoYWRlclNlbGVjdG9yKS5jb21waWxlKGN0eClcclxuXHJcbiAgcmV0dXJuIFt2U2hhZGVyLCBmU2hhZGVyXVxyXG59XHJcbiIsImltcG9ydCBNZXNoLCB7IE1lc2gzRCB9IGZyb20gJy4vbWVzaCdcclxuaW1wb3J0IHsgUmdiYSwgVmVjMiB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBNZXNoIHtcclxuICBjb25zdHJ1Y3RvcihvcmlnaW46IFZlYzIsIGNvbG9yPzogUmdiYSkge1xyXG4gICAgc3VwZXIoWzAsIDI0MCwgMCwgMCwgMzYwLCAyNDBdLCBjb2xvcilcclxuICAgIHRoaXMubV9JbmRpY2VzID0gWzAsIDEsIDIsIDBdXHJcbiAgICB0aGlzLm1fVHJhbnNsYXRpb24gPSBvcmlnaW5cclxuXHJcbiAgICBjb2xvciAhPSB1bmRlZmluZWRcclxuICAgICAgPyAodGhpcy5tX0NvbG9yID0gY29sb3IpXHJcbiAgICAgIDogKHRoaXMubV9Db2xvciA9IFtNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCAxXSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdWJlIGV4dGVuZHMgTWVzaDNEIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFtcclxuICAgICAgLy8gZnJvbnQgZmFjZVxyXG4gICAgICAwLCA1MCwgMCwgMCwgMCwgMCwgNTAsIDAsIDAsIDUwLCA1MCwgMCxcclxuXHJcbiAgICAgIC8vIGJhY2sgZmFjZVxyXG4gICAgICA1MCwgNTAsIC01MCwgNTAsIDAsIC01MCwgMCwgMCwgLTUwLCAwLCA1MCwgLTUwLFxyXG4gICAgXSlcclxuXHJcbiAgICB0aGlzLm1fSW5kaWNlcyA9IFtcclxuICAgICAgLy8gZnJvbnQgZmFjZVxyXG4gICAgICAwLFxyXG4gICAgICAxLFxyXG4gICAgICAyLFxyXG4gICAgICAwLFxyXG4gICAgICAyLFxyXG4gICAgICAzLFxyXG5cclxuICAgICAgLy9yaWdodCBmYWNlXHJcbiAgICAgIDMsXHJcbiAgICAgIDIsXHJcbiAgICAgIDUsXHJcbiAgICAgIDMsXHJcbiAgICAgIDUsXHJcbiAgICAgIDQsXHJcblxyXG4gICAgICAvLyBiYWNrIGZhY2VcclxuICAgICAgNCxcclxuICAgICAgNSxcclxuICAgICAgNixcclxuICAgICAgNCxcclxuICAgICAgNixcclxuICAgICAgNyxcclxuXHJcbiAgICAgIC8vIGxlZnQgZmFjZVxyXG4gICAgICA3LFxyXG4gICAgICA2LFxyXG4gICAgICAxLFxyXG4gICAgICAsXHJcbiAgICAgIDcsXHJcbiAgICAgIDEsXHJcbiAgICAgIDAsXHJcblxyXG4gICAgICAvLyBib3R0b20gZmFjZVxyXG4gICAgICAwLFxyXG4gICAgICA3LFxyXG4gICAgICA0LFxyXG4gICAgICAwLFxyXG4gICAgICA0LFxyXG4gICAgICAzLFxyXG5cclxuICAgICAgLy8gdG9wIGZhY2VcclxuICAgICAgMixcclxuICAgICAgMSxcclxuICAgICAgNixcclxuICAgICAgMixcclxuICAgICAgNixcclxuICAgICAgNSxcclxuXHJcbiAgICAgIC8vIGxvb3AgYmFjayB0byBvcmlnaW5cclxuICAgICAgMyxcclxuICAgICAgMCxcclxuICAgIF1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGTGV0dGVyIGV4dGVuZHMgTWVzaCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihbXHJcbiAgICAgIC8vIGxlZnQgY29sdW1uXHJcbiAgICAgIDAsIDE1MCwgMCwgMCwgMzAsIDAsIDMwLCAxNTAsXHJcblxyXG4gICAgICAvLyAvLyB0b3AgcnVuZ1xyXG4gICAgICAzMCwgMCwgMTAwLCAwLCAxMDAsIDMwLCAzMCwgMzAsXHJcblxyXG4gICAgICAvLyAvLyBtaWRkbGUgcnVuZ1xyXG4gICAgICAzMCwgNjAsIDY3LCA2MCwgNjcsIDkwLCAzMCwgOTAsXHJcbiAgICBdKVxyXG5cclxuICAgIHRoaXMubV9JbmRpY2VzID0gW1xyXG4gICAgICAvLyBsZWZ0IGNvbHVtblxyXG4gICAgICAwLCAxLCAyLCAwLCAyLCAzLCAwLFxyXG5cclxuICAgICAgLy8gLy8gdG9wIHJ1bmdcclxuICAgICAgNCwgNSwgNiwgNCwgNiwgNyxcclxuXHJcbiAgICAgIC8vIC8vIG1pZGRsZSBydW5nXHJcbiAgICAgIDgsIDksIDEwLCA4LCAxMCwgMTEsIDgsXHJcbiAgICBdXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRkxldHRlcjNEIGV4dGVuZHMgTWVzaDNEIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFtcclxuICAgICAgLy8gbGVmdCBjb2x1bW4gZnJvbnRcclxuICAgICAgMCwgMTUwLCAwLCAwLCAwLCAwLCAzMCwgMCwgMCwgMzAsIDE1MCwgMCxcclxuXHJcbiAgICAgIC8vIHRvcCBydW5nIGZyb250XHJcbiAgICAgIDMwLCAwLCAwLCAzMCwgMzAsIDAsIDEwMCwgMzAsIDAsIDEwMCwgMCwgMCxcclxuXHJcbiAgICAgIC8vIG1pZGRsZSBydW5nIGZyb250XHJcbiAgICAgIDMwLCA2MCwgMCwgMzAsIDkwLCAwLCA2NywgOTAsIDAsIDY3LCA2MCwgMCxcclxuXHJcbiAgICAgIC8vIHJpZ2h0IG9mIGJvdHRvbVxyXG4gICAgICAzMCwgOTAsIDAsIDMwLCAxNTAsIDAsIDMwLCAxNTAsIDMwLCAzMCwgOTAsIDMwLFxyXG5cclxuICAgICAgLy8gYm90dG9tXHJcbiAgICAgIDMwLCAxNTAsIDAsIDAsIDE1MCwgMCwgMCwgMTUwLCAzMCwgMzAsIDE1MCwgMzAsXHJcblxyXG4gICAgICAvLyBsZWZ0IHNpZGVcclxuICAgICAgMCwgMTUwLCAwLCAwLCAwLCAwLCAwLCAwLCAzMCwgMCwgMTUwLCAzMCxcclxuXHJcbiAgICAgIC8vIHRvcFxyXG4gICAgICAwLCAwLCAwLCAxMDAsIDAsIDAsIDEwMCwgMCwgMzAsIDAsIDAsIDMwLFxyXG5cclxuICAgICAgLy8gdG9wIHJ1bmcgcmlnaHRcclxuICAgICAgMTAwLCAwLCAwLCAxMDAsIDMwLCAwLCAxMDAsIDMwLCAzMCwgMTAwLCAwLCAzMCxcclxuXHJcbiAgICAgIC8vIHVuZGVyIHRvcCBydW5nXHJcbiAgICAgIDMwLCAzMCwgMCwgMzAsIDMwLCAzMCwgMTAwLCAzMCwgMzAsIDEwMCwgMzAsIDAsXHJcblxyXG4gICAgICAvLyBiZXR3ZWVuIHRvcCBydW5nIGFuZCBtaWRkbGVcclxuICAgICAgMzAsIDMwLCAwLCAzMCwgNjAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgNjAsIDAsXHJcblxyXG4gICAgICAvLyB0b3Agb2YgbWlkZGxlIHJ1bmdcclxuICAgICAgMzAsIDYwLCAwLCAzMCwgNjAsIDMwLCA2NywgNjAsIDAsIDY3LCA2MCwgMzAsXHJcblxyXG4gICAgICAvLyByaWdodCBvZiBtaWRkbGUgcnVuZ1xyXG4gICAgICA2NywgNjAsIDAsIDY3LCA5MCwgMzAsIDY3LCA2MCwgMzAsIDY3LCA5MCwgMCxcclxuXHJcbiAgICAgIC8vIC8vIGxlZnQgY29sdW1uIGJhY2tcclxuICAgICAgLy8gMCwgMCwgMzAsIDAsIDE1MCwgMzAsIDMwLCAwLCAzMCwgMzAsIDE1MCwgMzAsXHJcblxyXG4gICAgICAvLyAvLyB0b3AgcnVuZyBiYWNrXHJcbiAgICAgIC8vIDMwLCAwLCAzMCwgMTAwLCAwLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgMTAwLCAwLCAzMCwgMTAwLCAzMCwgMzAsXHJcblxyXG4gICAgICAvLyAvLyBtaWRkbGUgcnVuZyBiYWNrXHJcbiAgICAgIC8vIDMwLCA2MCwgMzAsIDY3LCA2MCwgMzAsIDMwLCA5MCwgMzAsIDMwLCA5MCwgMzAsIDY3LCA2MCwgMzAsIDY3LCA5MCwgMzAsXHJcbiAgICBdKVxyXG5cclxuICAgIHRoaXMubV9JbmRpY2VzID0gW1xyXG4gICAgICAvLyBsZWZ0IGNvbHVtbiBmcm9udFxyXG4gICAgICAwLCAxLCAyLCAwLCAyLCAzLCAwLFxyXG5cclxuICAgICAgLy8gdG9wIHJ1bmcgZnJvbnRcclxuICAgICAgNCwgNSwgNiwgNCwgNiwgNywgNCxcclxuXHJcbiAgICAgIC8vIG1pZGRsZSBydW5nIGZyb250XHJcbiAgICAgIDgsIDksIDEwLCA4LCAxMCwgMTEsIDgsXHJcblxyXG4gICAgICAvLyBsZWZ0IGNvbHVtbiBiYWNrXHJcbiAgICAgIDEyLCAxMywgMTQsIDEyLCAxNCwgMTUsIDEyLFxyXG5cclxuICAgICAgLy8gYm90dG9tXHJcbiAgICAgIDE2LCAxNywgMTgsIDE2LCAxOCwgMTksIDE2LFxyXG5cclxuICAgICAgLy8gbGVmdCBzaWRlXHJcbiAgICAgIDIwLCAyMSwgMjIsIDIwLCAyMiwgMjMsIDIwLFxyXG5cclxuICAgICAgLy8gdG9wXHJcbiAgICAgIDI0LCAyNSwgMjYsIDI0LCAyNiwgMjcsIDI0LFxyXG5cclxuICAgICAgLy8gdG9wIHJ1bmcgcmlnaHRcclxuICAgICAgMjgsIDI5LCAzMCwgMjgsIDMwLCAzMSwgMjgsXHJcblxyXG4gICAgICAvLyB1bmRlciB0b3AgcnVuZ1xyXG4gICAgICAzMiwgMzMsIDM0LCAzMiwgMzQsIDM1LCAzMixcclxuXHJcbiAgICAgIC8vIGJldHdlZW4gdG9wIHJ1bmcgYW5kIG1pZGRsZVxyXG4gICAgICAzNiwgMzcsIDM4LCAzNiwgMzgsIDM5LCAzNixcclxuXHJcbiAgICAgIC8vIHRvcCBvZiBtaWRkbGUgcnVuZ1xyXG4gICAgICA0MCwgNDEsIDQyLCA0MCwgNDIsIDQzLCA0MCxcclxuXHJcbiAgICAgIC8vIHJpZ2h0IG9mIG1pZGRsZSBydW5nXHJcbiAgICAgIDQ0LCA0NSwgNDYsIDQ0LCA0NiwgNDcsIDQ0LFxyXG4gICAgXVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYXQzQnVmZmVyLCBNYXQ0QnVmZmVyIH0gZnJvbSAnLi9tYXRyaXgnXHJcblxyXG5leHBvcnQgdHlwZSBDdHggPSBXZWJHTFJlbmRlcmluZ0NvbnRleHRcclxuZXhwb3J0IHR5cGUgUmdiYSA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBdHRyaWJ1dGUge1xyXG4gIGJ1ZmZlcjogV2ViR0xCdWZmZXJcclxuICBzaXplOiBudW1iZXJcclxuICB0eXBlOiBudW1iZXJcclxuICBub3JtYWxpemU/OiBib29sZWFuXHJcbiAgc3RyaWRlPzogbnVtYmVyXHJcbiAgb2Zmc2V0PzogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUF0dHJpYnV0ZXMge1xyXG4gIFtrZXk6IHN0cmluZ106IElBdHRyaWJ1dGVcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVmVjMiA9IFtudW1iZXIsIG51bWJlcl1cclxuZXhwb3J0IHR5cGUgVmVjMyA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG5leHBvcnQgdHlwZSBWZWM0ID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuXHJcbmV4cG9ydCB0eXBlIFVuaWZvcm1UeXBlID0gbnVtYmVyIHwgVmVjMiB8IFZlYzMgfCBWZWM0IHwgTWF0M0J1ZmZlciB8IE1hdDRCdWZmZXJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVuaWZvcm1zIHtcclxuICBba2V5OiBzdHJpbmddOiBVbmlmb3JtVHlwZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhcclxuICBjdHg6IEN0eCxcclxuICBwcm9ncmFtOiBXZWJHTFByb2dyYW0sXHJcbiAgYXR0cnM6IElBdHRyaWJ1dGVzXHJcbikge1xyXG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBjb25zdCBhdHRyTG9jYXRpb24gPSBjdHguZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwga2V5KVxyXG4gICAgaWYgKGF0dHJMb2NhdGlvbiA9PSAtMSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gbG9jYXRlIGF0dHJpYnV0ZSAnJHtrZXl9J2ApXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGN0eC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyTG9jYXRpb24pXHJcblxyXG4gICAgY3R4LmJpbmRCdWZmZXIoY3R4LkFSUkFZX0JVRkZFUiwgYXR0cnNba2V5XS5idWZmZXIpXHJcblxyXG4gICAgY3R4LnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgIGF0dHJMb2NhdGlvbixcclxuICAgICAgYXR0cnNba2V5XS5zaXplLFxyXG4gICAgICBhdHRyc1trZXldLnR5cGUsXHJcbiAgICAgIGF0dHJzW2tleV0ubm9ybWFsaXplIHx8IGZhbHNlLFxyXG4gICAgICBhdHRyc1trZXldLnN0cmlkZSB8fCAwLFxyXG4gICAgICBhdHRyc1trZXldLm9mZnNldCB8fCAwXHJcbiAgICApXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFVuaWZvcm1zKFxyXG4gIGN0eDogQ3R4LFxyXG4gIHByb2dyYW06IFdlYkdMUHJvZ3JhbSxcclxuICB1bmlmb3JtczogSVVuaWZvcm1zXHJcbikge1xyXG4gIE9iamVjdC5rZXlzKHVuaWZvcm1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGN0eC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwga2V5KVxyXG4gICAgaWYgKGxvY2F0aW9uID09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGxvY2F0ZSB1bmlmb3JtICcke2tleX0nYClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pZm9ybSA9IHVuaWZvcm1zW2tleV1cclxuICAgIGlmICh0eXBlb2YgdW5pZm9ybSA9PSAnbnVtYmVyJykge1xyXG4gICAgICBjdHgudW5pZm9ybTFmKGxvY2F0aW9uLCB1bmlmb3JtKVxyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHVuaWZvcm0pKSB7XHJcbiAgICAgIHN3aXRjaCAodW5pZm9ybS5sZW5ndGgpIHtcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICBjdHgudW5pZm9ybTJmdihsb2NhdGlvbiwgdW5pZm9ybSlcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgY3R4LnVuaWZvcm0zZnYobG9jYXRpb24sIHVuaWZvcm0pXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgIGN0eC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB1bmlmb3JtKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICBjdHgudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHVuaWZvcm0pXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICBjdHgudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHVuaWZvcm0pXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlcmluZ0NvbnRleHQoXHJcbiAgY2FudmFzU2VsZWN0b3I6IHN0cmluZ1xyXG4pOiBbQ3R4LCBIVE1MQ2FudmFzRWxlbWVudF0ge1xyXG4gIGNvbnN0ICRjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXNTZWxlY3RvcilcclxuXHJcbiAgaWYgKCRjYW52YXMgPT0gbnVsbClcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZmluZCBjYW52YXMgZWxlbWVudDogJyR7Y2FudmFzU2VsZWN0b3J9J2ApXHJcblxyXG4gIGNvbnN0IHdnbCA9ICRjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKVxyXG5cclxuICBpZiAod2dsID09IG51bGwpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDYW4ndCBnZXQgV2ViR0wgY29udGV4dDogdGhpcyBicm93c2VyIGRvZXNuJ3Qgc3V1cG9ydCBXZWJHTGBcclxuICAgIClcclxuXHJcbiAgcmV0dXJuIFt3Z2wsICRjYW52YXNdXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpXHJcblxyXG5hcHAucnVuKClcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9