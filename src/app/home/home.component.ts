import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DisplayComponent } from '../display/display.component';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DisplayComponent, InputComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  display = false;

  switchPages() {
    this.display = !this.display;
  }
}
