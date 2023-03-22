import Mesh, { Mesh3D } from './mesh'
import Program from './program'
import { Ctx, setUniforms } from './utils'

export class Scene {
  protected m_Ctx: Ctx
  protected m_Program: Program
  protected m_Objects: Array<Mesh>
  protected m_pBuf: WebGLBuffer
  protected m_iBuf: WebGLBuffer

  constructor(ctx: Ctx) {
    this.m_Ctx = ctx

    this.m_iBuf = ctx.createBuffer()
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.m_iBuf)

    this.m_pBuf = ctx.createBuffer()
    ctx.bindBuffer(ctx.ARRAY_BUFFER, this.m_pBuf)
  }

  using(program: Program) {
    this.m_Program = program
  }

  setObjects(objects: Array<Mesh>) {
    this.m_Objects = objects
  }

  draw() {}
}

export class Scene2D extends Scene {
  constructor(ctx: Ctx) {
    super(ctx)
  }

  override draw() {
    this.m_Ctx.viewport(0, 0, this.m_Ctx.canvas.width, this.m_Ctx.canvas.height)
    this.m_Ctx.clearColor(0, 0, 0, 0)
    this.m_Ctx.clear(this.m_Ctx.COLOR_BUFFER_BIT)

    this.m_Program.attrs({
      a_position: {
        buffer: this.m_pBuf,
        size: 2,
        type: this.m_Ctx.FLOAT,
      },
    })

    // Tell it to use our program (pair of shaders)
    this.m_Program.use(this.m_Ctx)

    // this.m_Ctx.bindBuffer(this.m_Ctx.ARRAY_BUFFER, this.m_pBuf)

    this.m_Program.bindAttrs(this.m_Ctx)

    this.m_Objects.forEach(obj => {
      setUniforms(this.m_Ctx, this.m_Program.self(), {
        u_color: obj.color(),
        u_matrix: obj.computeTransform([
          this.m_Ctx.canvas.width,
          this.m_Ctx.canvas.height,
        ]),
      })

      // this.m_Ctx.bindBuffer(this.m_Ctx.ARRAY_BUFFER, this.m_pBuf)

      this.m_Ctx.bindBuffer(this.m_Ctx.ELEMENT_ARRAY_BUFFER, this.m_iBuf)
      this.m_Ctx.bufferData(
        this.m_Ctx.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(obj.indices()),
        this.m_Ctx.STATIC_DRAW
      )

      this.m_Ctx.bufferData(
        this.m_Ctx.ARRAY_BUFFER,
        new Float32Array(obj.data()),
        this.m_Ctx.STATIC_DRAW
      )

      {
        // draw points
        const primitiveType = this.m_Ctx.POINTS
        const drawOffset = 0
        const count = obj.countIndices()
        var indexType = this.m_Ctx.UNSIGNED_SHORT
        this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset)
      }

      {
        // draw triangles
        const primitiveType = this.m_Ctx.LINE_STRIP
        const drawOffset = 0
        const count = obj.countIndices()
        var indexType = this.m_Ctx.UNSIGNED_SHORT
        this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset)
      }
    })
  }
}

export class Scene3D extends Scene {
  private m_Objs: Array<Mesh3D>

  constructor(ctx: Ctx) {
    super(ctx)
  }

  setObjs(objects: Array<Mesh3D>) {
    this.m_Objs = objects
  }

  override draw() {
    this.m_Ctx.viewport(0, 0, this.m_Ctx.canvas.width, this.m_Ctx.canvas.height)
    this.m_Ctx.clearColor(0, 0, 0, 0)
    this.m_Ctx.clear(this.m_Ctx.COLOR_BUFFER_BIT)

    this.m_Program.attrs({
      a_position: {
        buffer: this.m_pBuf,
        size: 3,
        type: this.m_Ctx.FLOAT,
      },
    })

    this.m_Program.use(this.m_Ctx)

    this.m_Program.bindAttrs(this.m_Ctx)

    this.m_Objs.forEach(obj => {
      setUniforms(this.m_Ctx, this.m_Program.self(), {
        u_color: obj.color(),
        u_matrix: obj.computeTransform([
          this.m_Ctx.canvas.width,
          this.m_Ctx.canvas.height,
        ]),
      })

      this.m_Ctx.bindBuffer(this.m_Ctx.ELEMENT_ARRAY_BUFFER, this.m_iBuf)
      this.m_Ctx.bufferData(
        this.m_Ctx.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(obj.indices()),
        this.m_Ctx.STATIC_DRAW
      )

      this.m_Ctx.bufferData(
        this.m_Ctx.ARRAY_BUFFER,
        new Float32Array(obj.data()),
        this.m_Ctx.STATIC_DRAW
      )

      {
        // draw points
        const primitiveType = this.m_Ctx.POINTS
        const drawOffset = 0
        const count = obj.countIndices()
        var indexType = this.m_Ctx.UNSIGNED_SHORT
        this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset)
      }

      {
        // draw triangles
        const primitiveType = this.m_Ctx.LINE_STRIP
        const drawOffset = 0
        const count = obj.countIndices()
        var indexType = this.m_Ctx.UNSIGNED_SHORT
        this.m_Ctx.drawElements(primitiveType, count, indexType, drawOffset)
      }
    })
  }
}
