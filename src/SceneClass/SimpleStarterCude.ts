import 'pepjs';
import { Engine } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";
import { FreeCamera } from "@babylonjs/core";
import { HemisphericLight } from "@babylonjs/core";
import { MeshBuilder } from '@babylonjs/core';
import { StandardMaterial } from '@babylonjs/core';

export class SimpleStarterCube {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: FreeCamera;
    private _light: HemisphericLight;

    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas, true);

        // Create a basic BJS Scene object.
        this._scene = new Scene(this._engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        this._camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this._scene);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);
    }

    static renderScene(): void {
        // Create the game using the 'renderCanvas'.
        const game = new SimpleStarterCube('renderCanvas');

        // Create the scene.
        game.createScene();

        // standart render loop.
        game.doRender();
    }

    createScene(): void {
        // Target the camera to scene origin.
        this._camera.setTarget(Vector3.Zero());

        // Attach the camera to the canvas.
        this._camera.attachControl(this._canvas, false);

        // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
        const sphere = MeshBuilder.CreateSphere('sphere1',
            { segments: 16, diameter: 2 }, this._scene);

        // Move the sphere upward 1/2 of its height.
        sphere.position.y = 1;

        // Create a built-in "ground" shape.
        const ground = MeshBuilder.CreateGround('ground1',
            { width: 6, height: 6, subdivisions: 2 }, this._scene);
    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

