import { Component } from '@angular/core';

import { QuillEditorComponent } from './quill-editor/quill-editor.component';
@Component({
  selector: 'app-root',
  imports: [QuillEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quill-mention';
}
