import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
    selector: 'challenge-editor',
    templateUrl: './challenge-editor.component.html',
    styleUrls: ['./challenge-editor.component.scss']
})

export class ChallengeEditorComponent implements OnInit {
    title = 'angular-template-ckeditor5-classic';
    Editor = ClassicEditor;
    immutableData: string;

    @Input() data: string;
    @Output() onDataChange: EventEmitter<string> = new EventEmitter<string>()

    ngOnInit(): void {
      this.immutableData = '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';

      this.Editor.defaultConfig.codeBlock = {};
      this.Editor.defaultConfig.image = undefined;
    }

    onChange({ editor }: ChangeEvent) {
      this.onDataChange.emit(editor?.data?.get());
    }
}