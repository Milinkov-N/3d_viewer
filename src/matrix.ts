import { Vec2 } from './utils'

export type Mat3Buffer = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export default class Mat3 {
  m_Buf: Mat3Buffer

  constructor(values: Mat3Buffer) {
    this.m_Buf = values
  }

  static Translation(tx: number, ty: number) {
    return new Mat3([1, 0, 0, 0, 1, 0, tx, ty, 1])
  }

  static Rotation(angle: number) {
    const sine = Math.sin(angle)
    const cosine = Math.cos(angle)
    return new Mat3([cosine, -sine, 0, sine, cosine, 0, 0, 0, 1])
  }

  static Scaling(sx: number, sy: number) {
    return new Mat3([sx, 0, 0, 0, sy, 0, 0, 0, 1])
  }

  static Projection([width, height]: Vec2) {
    // Note: This matrix flips the Y axis so that 0 is at the top.
    return new Mat3([2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1])
  }

  translate(tx: number, ty: number) {
    return new Mat3(this.m_Buf).multiply(Mat3.Translation(tx, ty))
  }

  rotate(scalar: number) {
    return new Mat3(this.m_Buf).multiply(Mat3.Rotation(scalar))
  }

  scale(sx: number, sy: number) {
    return new Mat3(this.m_Buf).multiply(Mat3.Scaling(sx, sy))
  }

  multiply(other: Mat3) {
    const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = this.m_Buf
    const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = other.m_Buf

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
    ])
  }
}
