import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireProvider } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './take-questionnaire.html',
    styleUrls: ['./take-questionnaire.scss']
})
export class TakeQuestionnaireComponent extends ComponentBase {
    constructor(
        private questionnaireProvider: QuestionnaireProvider
    ) {
        super();
    }
    
    questionnaireObservable: Observable<Questionnaire | null>;
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnaireObservable = this.questionnaireProvider.questionnaireObservable;
    }
}
