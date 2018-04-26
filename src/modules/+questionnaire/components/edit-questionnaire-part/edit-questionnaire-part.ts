import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnairePart, Section, Question } from 'models';
import { ComponentBase } from 'utils/components';
import { ObservableInput } from 'utils';

@Component({
    selector: 'edit-questionnaire-part',
    templateUrl: './edit-questionnaire-part.html',
    styleUrls: ['./edit-questionnaire-part.scss']
})
export class EditQuestionnairePartComponent extends ComponentBase {
    constructor() {
        super();
    }
    
    get isQuestion() {
        return this.part instanceof Question;
    }
    
    get isSection() {
        return this.part instanceof Section;
    }
    
    @ObservableInput() @Input() part: QuestionnairePart;
    @Input('part-o') partObservable: Observable<QuestionnairePart>;
}
