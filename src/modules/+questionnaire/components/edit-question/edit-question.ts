import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectionProvider } from 'services';
import { Question, Section } from 'models';
import { ComponentBase } from 'utils/components';
import { ObservableInput } from 'utils';

@Component({
    selector: 'edit-question',
    templateUrl: './edit-question.html',
    styleUrls: ['./edit-question.scss']
})
export class EditQuestionComponent extends ComponentBase {
    constructor(
        private selectionProvider: SelectionProvider
    ) {
        super();
    }
    
    get isSelected() {
        return this.selectionProvider.selection === this.question;
    }
    select(editTemplate: TemplateRef<any>) {
        this.selectionProvider.selection = this.question;
        this.selectionProvider.editTemplate = editTemplate;
    }
    
    @ObservableInput() @Input() question: Question;
    @Input('question-o') questionObservable: Observable<Question>;
    
    delete() {
        (<Section>this.question.getParent()).removeChild(this.question);
        this.selectionProvider.selection = null;
        this.selectionProvider.editTemplate = null;
    }
    removeIncorrectAnswer(idx: number) {
        this.question.getAnswers().splice(idx, 1);
    }
    addIncorrectAnswer() {
        this.question.getAnswers().push('');
    }
    
    trackByIndex(index: number, item: any) {
        return index;
    }
}
