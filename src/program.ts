import {
  Ctx,
  IAttributes,
  IUniforms,
  setAttributes,
  setUniforms,
} from './utils'

export default class Program {
  private m_Program: WebGLProgram
  private m_Attrs: IAttributes
  private m_Uniforms: IUniforms

  constructor(ctx: Ctx, [vShader, fShader]: [WebGLShader, WebGLShader]) {
    const program = ctx.createProgram()

    ctx.attachShader(program, vShader)
    ctx.attachShader(program, fShader)
    ctx.linkProgram(program)

    if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
      console.error(
        'Unable to initialize the shader program:',
        ctx.getProgramInfoLog(program)
      )

      return null
    }

    console.info('Successfully linked program')

    this.m_Program = program
  }

  self(): WebGLProgram {
    return this.m_Program
  }

  attrs(attrs: IAttributes) {
    this.m_Attrs = attrs
  }

  uniforms(uniforms: IUniforms) {
    this.m_Uniforms = uniforms
  }

  bindAttrs(ctx: Ctx) {
    setAttributes(ctx, this.m_Program, this.m_Attrs)
  }

  bindUniforms(ctx: Ctx) {
    setUniforms(ctx, this.m_Program, this.m_Uniforms)
  }

  use(ctx: Ctx) {
    ctx.useProgram(this.m_Program)
  }
}
