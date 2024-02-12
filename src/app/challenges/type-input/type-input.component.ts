import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'type-input',
    templateUrl: 'type-input.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
        './type-input.component.scss',
    ]
})

export class TypeInputComponent implements OnInit {
    @Input() includeVoid = false;
    @Input() label: string = 'Type';
    @Output() onTypeChange: EventEmitter<number> = new EventEmitter<number>();
    
    isArray: boolean = false;
    selectedType: number = 0;

    availableTypes: InternalType[] = [];

    ngOnInit(): void {
        this.availableTypes = [
            { name: 'Int 32', id: 0 },
            { name: 'Int 64', id: 1 },
            { name: 'Float', id: 2, },
            { name: 'Double', id: 3 },
            { name: 'Char', id: 4 },
            { name: 'String', id: 5 },
            { name: 'Boolean', id: 6 },
        ];

        if (this.includeVoid) {
            this.availableTypes.push({ name: 'Void', id: 255 })
        }
    }

    onSelectChange($event: Event): void {
        const target = $event.target as HTMLInputElement;
        this.selectedType = Number(target.value);
        this.onChange();
    }

    onCheckboxChange($event: Event): void {
        const target = $event.target as HTMLInputElement;
        this.isArray = target.checked;
        this.onChange();
    }

    onChange(): void {
        this.onTypeChange.emit(this.getType());
    }

    getType(): number {
        return this.selectedType + (this.isArray ? 128 : 0);
    }
}

export class InternalType {
    id: number;
    name: string;
}
