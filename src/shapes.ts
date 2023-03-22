import Mesh, { Mesh3D } from './mesh'
import { Rgba, Vec2 } from './utils'

export class Triangle extends Mesh {
  constructor(origin: Vec2, color?: Rgba) {
    super([0, 240, 0, 0, 360, 240], color)
    this.m_Indices = [0, 1, 2, 0]
    this.m_Translation = origin

    color != undefined
      ? (this.m_Color = color)
      : (this.m_Color = [Math.random(), Math.random(), Math.random(), 1])
  }
}

export class Cube extends Mesh3D {
  constructor() {
    super([
      // front face
      0, 50, 0, 0, 0, 0, 50, 0, 0, 50, 50, 0,

      // back face
      50, 50, -50, 50, 0, -50, 0, 0, -50, 0, 50, -50,
    ])

    this.m_Indices = [
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
    ]
  }
}

export class FLetter extends Mesh {
  constructor() {
    super([
      // left column
      0, 150, 0, 0, 30, 0, 30, 150,

      // // top rung
      30, 0, 100, 0, 100, 30, 30, 30,

      // // middle rung
      30, 60, 67, 60, 67, 90, 30, 90,
    ])

    this.m_Indices = [
      // left column
      0, 1, 2, 0, 2, 3, 0,

      // // top rung
      4, 5, 6, 4, 6, 7,

      // // middle rung
      8, 9, 10, 8, 10, 11, 8,
    ]
  }
}

export class FLetter3D extends Mesh3D {
  constructor() {
    super([
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
    ])

    this.m_Indices = [
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
    ]
  }
}
