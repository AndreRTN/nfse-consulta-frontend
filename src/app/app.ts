import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsultComponent } from './consult/consult.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'nfse-consulta';
}
