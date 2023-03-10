enum ShaderType {
  Vertex,
  Fragment,
}

export default class Shader {
  private m_Source: string
  private m_Type: ShaderType

  constructor(selector: string) {
    const $shader = this._getElement(selector)

    this._setType(selector, $shader.type)
    this.m_Source = $shader.textContent
  }

  compile(ctx: WebGLRenderingContext): WebGLShader {
    const shader =
      this.m_Type == ShaderType.Vertex
        ? ctx.createShader(ctx.VERTEX_SHADER)
        : ctx.createShader(ctx.FRAGMENT_SHADER)

    ctx.shaderSource(shader, this.m_Source)
    ctx.compileShader(shader)

    if (!this._checkCompileStatus(ctx, shader)) return null

    console.info(
      'Successfully loaded',
      this.m_Type == ShaderType.Vertex ? 'vertex' : 'fragment',
      'shader'
    )

    return shader
  }

  private _getElement(selector: string): HTMLScriptElement {
    const $shader: HTMLScriptElement = document.querySelector(selector)
    if ($shader == null)
      throw new Error(
        `Shader creation failed (element '${selector}' doesn't exists)`
      )

    return $shader
  }

  private _setType(selector: string, mimeType: string) {
    switch (mimeType) {
      case 'x-shader/x-vertex':
        this.m_Type = ShaderType.Vertex
        break
      case 'x-shader/x-fragment':
        this.m_Type = ShaderType.Fragment
        break
      default:
        throw new Error(
          `Shader creation failed (element '${selector}' have wrong shader type '${mimeType}')`
        )
    }
  }

  private _checkCompileStatus(
    ctx: WebGLRenderingContext,
    shader: WebGLShader
  ): boolean {
    if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
      console.error(
        `An error occured compiling the shaders: ${ctx.getShaderInfoLog(
          shader
        )}`
      )
      ctx.deleteShader(shader)
      return false
    }

    return true
  }
}

export function loadShaderFromScripts(
  ctx: WebGLRenderingContext,
  [vShaderSelector, fShaderSelector]: [string, string]
): [WebGLShader, WebGLShader] {
  const vShader = new Shader(vShaderSelector).compile(ctx)
  const fShader = new Shader(fShaderSelector).compile(ctx)

  return [vShader, fShader]
}
