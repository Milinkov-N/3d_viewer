import { Vec2, Vec3 } from './utils'

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

export type Mat4Buffer = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
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

export class Mat4 {
  m_Buf: Mat4Buffer

  constructor(values: Mat4Buffer) {
    this.m_Buf = values
  }

  static Translation([tx, ty, tz]: Vec3) {
    return new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1])
  }

  static RotationX(radians: number) {
    const c = Math.cos(radians)
    const s = Math.sin(radians)

    return new Mat4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
  }

  static RotationY(radians: number) {
    const c = Math.cos(radians)
    const s = Math.sin(radians)

    return new Mat4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1])
  }

  static RotationZ(radians: number) {
    const c = Math.cos(radians)
    const s = Math.sin(radians)

    return new Mat4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }

  static Scaling([sx, sy, sz]: Vec3) {
    return new Mat4([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1])
  }

  static Projection([width, height, depth]: Vec3) {
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
    ])
  }

  translate(translation: Vec3) {
    return new Mat4(this.m_Buf).multiply(Mat4.Translation(translation))
  }

  xRotate(radians: number) {
    return new Mat4(this.m_Buf).multiply(Mat4.RotationX(radians))
  }

  yRotate(radians: number) {
    return new Mat4(this.m_Buf).multiply(Mat4.RotationY(radians))
  }

  zRotate(radians: number) {
    return new Mat4(this.m_Buf).multiply(Mat4.RotationZ(radians))
  }

  scale(scaling: Vec3) {
    return new Mat4(this.m_Buf).multiply(Mat4.Scaling(scaling))
  }

  multiply(other: Mat4) {
    const [
      a11,
      a12,
      a13,
      a14,
      a21,
      a22,
      a23,
      a24,
      a31,
      a32,
      a33,
      a34,
      a41,
      a42,
      a43,
      a44,
    ] = this.m_Buf

    const [
      b11,
      b12,
      b13,
      b14,
      b21,
      b22,
      b23,
      b24,
      b31,
      b32,
      b33,
      b34,
      b41,
      b42,
      b43,
      b44,
    ] = other.m_Buf

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
    ])
  }
}
