// export default class WebGLApp {
//   private m_Wgl: WebGLRenderingContext
//   private m_Program: WebGLProgram
//   private m_Attrs = new Map<string, number>()
//   private m_Uniforms = new Map<string, WebGLUniformLocation>()
//   private m_PosBuffer: WebGLBuffer

//   constructor(contextSelector: string, shaderSelectors: [string, string]) {
//     this.m_Wgl = this.getRenderingContext(contextSelector)

//     const compiledShaders = this.loadShaders(
//       this.m_Wgl,
//       shaderSelectors[0],
//       shaderSelectors[1]
//     )

//     this.m_Program = this.createProgram(
//       this.m_Wgl,
//       compiledShaders[0],
//       compiledShaders[1]
//     )
//   }

//   private getRenderingContext(canvasSelector: string): WebGLRenderingContext {
//     const $canvas: HTMLCanvasElement = document.querySelector(canvasSelector)

//     if ($canvas == null)
//       throw new Error(`Can't find canvas element: '${canvasSelector}'`)

//     const wgl = $canvas.getContext('webgl')

//     if (wgl == null)
//       throw new Error(
//         `Can't get WebGL context: this browser doesn't suuport WebGL`
//       )

//     return wgl
//   }

//   private loadShaders(
//     wgl: WebGLRenderingContext,
//     vShaderSelector: string,
//     fShaderSelector: string
//   ): [WebGLShader, WebGLShader] {
//     const $vShader = document.querySelector(vShaderSelector)
//     if ($vShader == null)
//       throw new Error(
//         `Can't load vertex shader: element '${vShaderSelector}' doesn't exists`
//       )

//     const $fShader = document.querySelector(fShaderSelector)
//     if ($fShader == null)
//       throw new Error(
//         `Can't load vertex shader: element '${fShaderSelector}' doesn't exists`
//       )

//     const vShader = this.loadShader(
//       wgl,
//       ShaderType.Vertex,
//       $vShader.textContent
//     )
//     const fShader = this.loadShader(
//       wgl,
//       ShaderType.Fragment,
//       $fShader.textContent
//     )

//     return [vShader, fShader]
//   }

//   private loadShader(
//     wgl: WebGLRenderingContext,
//     type: ShaderType,
//     source: string
//   ): WebGLShader {
//     const shader =
//       type == ShaderType.Vertex
//         ? wgl.createShader(wgl.VERTEX_SHADER)
//         : wgl.createShader(wgl.FRAGMENT_SHADER)

//     wgl.shaderSource(shader, source)
//     wgl.compileShader(shader)

//     if (!wgl.getShaderParameter(shader, wgl.COMPILE_STATUS)) {
//       console.error(
//         `An error occured compiling the shaders: ${wgl.getShaderInfoLog(
//           shader
//         )}`
//       )
//       wgl.deleteShader(shader)
//       return null
//     }

//     console.info(
//       'Successfully loaded',
//       type == ShaderType.Vertex ? 'vertex' : 'fragment',
//       'shader'
//     )

//     return shader
//   }

//   createProgram(
//     wgl: WebGLRenderingContext,
//     vShader: WebGLShader,
//     fShader: WebGLShader
//   ): WebGLProgram {
//     const program = wgl.createProgram()

//     wgl.attachShader(program, vShader)
//     wgl.attachShader(program, fShader)
//     wgl.linkProgram(program)

//     if (!wgl.getProgramParameter(program, wgl.LINK_STATUS)) {
//       console.error(
//         'Unable to initialize the shader program:',
//         wgl.getProgramInfoLog(program)
//       )

//       return null
//     }

//     console.info('Successfully linked program')

//     return program
//   }

//   setAttr(name: string) {
//     this.m_Attrs.set(name, this.m_Wgl.getAttribLocation(this.m_Program, name))
//   }

//   setUniform(name: string) {
//     this.m_Uniforms.set(
//       name,
//       this.m_Wgl.getUniformLocation(this.m_Program, name)
//     )
//   }

//   initBuffer() {
//     this.m_PosBuffer = this.m_Wgl.createBuffer()
//     this.m_Wgl.bindBuffer(this.m_Wgl.ARRAY_BUFFER, this.m_PosBuffer)
//   }

//   drawTriangle(positions: Array<number>, color: Rgba) {
//     const { m_Wgl, m_Program, m_Attrs, m_PosBuffer, m_Uniforms } = this

//     m_Wgl.bufferData(
//       m_Wgl.ARRAY_BUFFER,
//       new Float32Array(positions),
//       m_Wgl.STATIC_DRAW
//     )
//     // drawScene(
//     //   m_Wgl,
//     //   m_Program,
//     //   m_Attrs.get('a_position'),
//     //   m_PosBuffer,
//     //   m_Uniforms.get('u_resolution'),
//     //   m_Uniforms.get('u_color'),
//     //   color
//     // )
//   }
// }
