import { Rgba, Vec2 } from './utils'
import Mat3 from './matrix'

export default class Mesh {
  protected m_Vertices: Array<number>
  protected m_Indices: Array<number>
  protected m_Origin: Vec2
  protected m_Translation: Vec2 = [0, 0]
  protected m_Angle = 0
  protected m_Scale: Vec2 = [1, 1]
  protected m_Color: Rgba = [0, 0, 0, 1]

  constructor(vertices: Array<number>, color?: Rgba) {
    this.m_Vertices = vertices
    if (color != undefined) this.m_Color = color
  }

  move(pixels: Vec2) {
    this.m_Translation[0] += pixels[0]
    this.m_Translation[1] += pixels[1]
  }

  moveTo(pixels: Vec2) {
    this.m_Translation[0] = pixels[0]
    this.m_Translation[1] = pixels[1]
  }

  moveOrigin(pos: Vec2) {
    this.m_Origin = pos
  }

  scale(amount: number) {
    this.m_Scale = [amount, amount]
  }

  rotate(angle: number) {
    this.m_Angle = angle
  }

  computeTransform(projection: Vec2) {
    const projectionMat = Mat3.Projection(projection)
    const radians = ((360 - this.m_Angle) * Math.PI) / 180
    const [translateX, translateY] = this.m_Translation
    const [scaleX, scaleY] = this.m_Scale

    let matrix = projectionMat
      .translate(translateX, translateY)
      .rotate(radians)
      .scale(scaleX, scaleY)

    if (this.m_Origin != undefined)
      return matrix.translate(this.m_Origin[0], this.m_Origin[1]).m_Buf
    else return matrix.m_Buf
  }

  countIndices() {
    return this.m_Indices.length
  }

  data() {
    return this.m_Vertices
  }

  indices() {
    return this.m_Indices
  }

  color() {
    return this.m_Color
  }
}
