import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Scene } from "./scene/scene.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Scene],
  template: `
    <app-scene>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('replicator');
}
