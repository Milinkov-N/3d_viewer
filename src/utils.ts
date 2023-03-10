import { Mat3Buffer } from './matrix'

export type Ctx = WebGLRenderingContext
export type Rgba = [number, number, number, number]

export interface IAttribute {
  buffer: WebGLBuffer
  size: number
  type: number
  normalize?: boolean
  stride?: number
  offset?: number
}

export interface IAttributes {
  [key: string]: IAttribute
}

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]

export type UniformType = number | Vec2 | Vec3 | Vec4 | Mat3Buffer

export interface IUniforms {
  [key: string]: UniformType
}

export function setAttributes(
  ctx: Ctx,
  program: WebGLProgram,
  attrs: IAttributes
) {
  Object.keys(attrs).forEach(key => {
    const attrLocation = ctx.getAttribLocation(program, key)
    if (attrLocation == -1) {
      console.error(`Failed to locate attribute '${key}'`)
      return
    }

    ctx.enableVertexAttribArray(attrLocation)

    ctx.bindBuffer(ctx.ARRAY_BUFFER, attrs[key].buffer)

    ctx.vertexAttribPointer(
      attrLocation,
      attrs[key].size,
      attrs[key].type,
      attrs[key].normalize || false,
      attrs[key].stride || 0,
      attrs[key].offset || 0
    )
  })
}

export function setUniforms(
  ctx: Ctx,
  program: WebGLProgram,
  uniforms: IUniforms
) {
  Object.keys(uniforms).forEach(key => {
    const location = ctx.getUniformLocation(program, key)
    if (location == null) {
      console.error(`Failed to locate uniform '${key}'`)
      return
    }

    const uniform = uniforms[key]
    if (typeof uniform == 'number') {
      ctx.uniform1f(location, uniform)
    } else if (Array.isArray(uniform)) {
      switch (uniform.length) {
        case 2:
          ctx.uniform2fv(location, uniform)
          break
        case 3:
          ctx.uniform3fv(location, uniform)
          break
        case 4:
          ctx.uniform4fv(location, uniform)
          break
        case 9:
          ctx.uniformMatrix3fv(location, false, uniform)
          break
      }
    }
  })
}

export function getRenderingContext(
  canvasSelector: string
): [Ctx, HTMLCanvasElement] {
  const $canvas: HTMLCanvasElement = document.querySelector(canvasSelector)

  if ($canvas == null)
    throw new Error(`Can't find canvas element: '${canvasSelector}'`)

  const wgl = $canvas.getContext('webgl')

  if (wgl == null)
    throw new Error(
      `Can't get WebGL context: this browser doesn't suuport WebGL`
    )

  return [wgl, $canvas]
}
