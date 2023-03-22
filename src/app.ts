import Program from './program'
import { Scene2D, Scene3D } from './scene'
import { Triangle, FLetter, FLetter3D, Cube } from './shapes'

import { loadShaderFromScripts } from './shader'
import { getRenderingContext } from './utils'

export default class App {
  run() {
    App.scene3D()
  }

  static scene3D() {
    const $angle: HTMLInputElement = document.querySelector('#angle')
    const $scale: HTMLInputElement = document.querySelector('#scale')

    const [wgl, _] = getRenderingContext('#webgl')
    const shaders = loadShaderFromScripts(wgl, ['#v-shader-3d', '#f-shader'])
    const program = new Program(wgl, shaders)
    const scene = new Scene3D(wgl)

    const cube = new Cube()

    cube.scale(3)
    cube.moveTo([720 * 0.625, 480 / 1.25, 0])
    cube.rotate(20)
    cube.moveOrigin([-97 / 2, -75, 0])

    $angle.oninput = () => {
      cube.rotate(Number($angle.value))
      scene.draw()
    }

    $scale.oninput = () => {
      cube.scale(Number($scale.value))
      scene.draw()
    }

    scene.using(program)
    scene.setObjs([cube])
    scene.draw()
  }

  static scene2D() {
    const $angle: HTMLInputElement = document.querySelector('#angle')
    const $scale: HTMLInputElement = document.querySelector('#scale')

    const [wgl, _] = getRenderingContext('#webgl')
    const shaders = loadShaderFromScripts(wgl, ['#v-shader-2d', '#f-shader'])
    const program = new Program(wgl, shaders)
    const scene = new Scene2D(wgl)

    const f = new FLetter()

    f.scale(2)
    f.rotate(17)
    f.moveTo([97, 150])
    f.moveOrigin([-97 / 2, -75])

    const triangles = [
      new Triangle([5, 5], [0, 1, 0, 1]),
      new Triangle([360, 240]),
      new Triangle([5, 245]),
      new Triangle([360, 5]),
    ].map(t => {
      t.scale(0.25)
      t.rotate(25)
      return t
    })

    $angle.oninput = () => {
      f.rotate(Number($angle.value))
      scene.draw()
    }

    $scale.oninput = () => {
      f.scale(Number($scale.value))
      scene.draw()
    }

    scene.using(program)
    scene.setObjects([...triangles, f])
    scene.draw()
  }
}
