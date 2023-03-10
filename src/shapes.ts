import Mesh from './mesh'
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
