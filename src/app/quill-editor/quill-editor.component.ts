import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
import { Mention } from 'quill-mention';

// Register the mention module with Quill
Quill.register('modules/mention', Mention);

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [CommonModule],
  template: `<div #editor></div>`,
  styles: [
    `
      :host {
        display: block;
        margin: 20px;
      }
      .ql-editor {
        min-height: 200px;
      }
      .mention-item {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        cursor: pointer;
      }
      .mention-item:hover {
        background-color: #f0f0f0;
      }
      .mention-item img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
      }
      .mention-item-details {
        display: flex;
        flex-direction: column;
      }
      .mention-item-name {
        font-weight: 500;
      }
      .mention-item-title {
        font-size: 12px;
        color: #666;
      }
      .ql-mention-list-container {
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        max-height: 200px;
        overflow-y: auto;
        width: 250px;
        z-index: 9999;
      }
      .ql-mention-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .mention {
        background-color: #e8f0fe;
        border-radius: 3px;
        padding: 2px 4px;
      }
    `,
  ],
})
export class QuillEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  editor!: Quill;

  ngOnInit() {
    const atValues = [
      {
        id: 1,
        value: 'Fredrik Sundqvist',
        avatar: 'https://i.pravatar.cc/150?img=1',
        title: 'Software Engineer',
      },
      {
        id: 2,
        value: 'Patrik Sjölin',
        avatar: 'https://i.pravatar.cc/150?img=2',
        title: 'Product Manager',
      },
      {
        id: 3,
        value: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        title: 'UX Designer',
      },
      {
        id: 4,
        value: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=4',
        title: 'Developer',
      },
    ];

    this.editor = new Quill(this.editorElement.nativeElement, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['link', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ['@'],
          source: (
            searchTerm: string,
            renderList: Function,
            mentionChar: string
          ) => {
            const values = atValues;
            const matches = values.filter((item) =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderList(matches, searchTerm);
          },
          renderItem(item: any) {
            const element = document.createElement('div');
            element.className = 'mention-item';

            if (item.avatar) {
              const img = document.createElement('img');
              img.src = item.avatar;
              img.alt = item.value;
              element.appendChild(img);

              const details = document.createElement('div');
              details.className = 'mention-item-details';

              const name = document.createElement('span');
              name.className = 'mention-item-name';
              name.textContent = item.value;

              const title = document.createElement('span');
              title.className = 'mention-item-title';
              title.textContent = item.title;

              details.appendChild(name);
              details.appendChild(title);
              element.appendChild(details);
            } else {
              element.textContent = item.value;
            }

            return element;
          },
        },
      },
      placeholder: 'Type @ to mention users',
      theme: 'snow',
    });

    this.editor.on('text-change', (delta, oldDelta, source) => {
      console.log('Text changed:', { delta, oldDelta, source });
    });

    this.editor.on('mention-selected', (selected: any, prefix: string) => {
      console.log('Mention selected:', { selected, prefix });
    });
  }
}
