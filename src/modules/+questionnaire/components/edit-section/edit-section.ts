import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectionProvider } from 'services';
import { Section } from 'models';
import { ComponentBase } from 'utils/components';
import { ObservableInput } from 'utils';

@Component({
    selector: 'edit-section',
    templateUrl: './edit-section.html',
    styleUrls: ['./edit-section.scss']
})
export class EditSectionComponent extends ComponentBase {
    constructor(
        private selectionProvider: SelectionProvider
    ) {
        super();
    }
    
    get isSelected() {
        return this.selectionProvider.selection === this.section;
    }
    select(editTemplate: TemplateRef<any>) {
        this.selectionProvider.selection = this.section;
        this.selectionProvider.editTemplate = editTemplate;
    }
    
    @ObservableInput() @Input() section: Section;
    @Input('section-o') sectionObservable: Observable<Section>;
}
