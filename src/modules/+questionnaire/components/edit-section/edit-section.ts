import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectionProvider } from 'services';
import { Section, Question } from 'models';
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
    
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
    
    get isSelected() {
        return this.selectionProvider.selection === this.section;
    }
    select(editTemplate: TemplateRef<any>) {
        this.selectionProvider.selection = this.section;
        this.selectionProvider.editTemplate = editTemplate;
    }
    
    @ObservableInput() @Input() section: Section;
    @Input('section-o') sectionObservable: Observable<Section>;
    
    delete() {
        (<Section>this.section.getParent()).removeChild(this.section);
        this.selectionProvider.selection = null;
        this.selectionProvider.editTemplate = null;
    }
    addQuestion() {
        let question = new Question(this.section);
        question.correctAnswer = '';
        this.section.addChild(question);
        this.selectionProvider.selection = question;
        this.selectionProvider.editTemplate = null;
    }
    addSection() {
        let section = new Section(this.section);
        this.section.addChild(section);
        this.selectionProvider.selection = section;
        this.selectionProvider.editTemplate = null;
    }
    
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.selectionProvider.selection === this.section) {
                this.selectionProvider.editTemplate = this.editTemplate;
            }
        });
    }
}
