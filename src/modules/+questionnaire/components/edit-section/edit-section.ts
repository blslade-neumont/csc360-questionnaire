import { Component, Input } from '@angular/core';
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
    select() {
        this.selectionProvider.selection = this.section;
    }
    
    @ObservableInput() @Input() section: Section;
    @Input('section-o') sectionObservable: Observable<Section>;
}
