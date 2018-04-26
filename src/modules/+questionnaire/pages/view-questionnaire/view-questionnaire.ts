import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireService, QuestionnaireProvider } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './view-questionnaire.html',
    styleUrls: ['./view-questionnaire.scss']
})
export class ViewQuestionnaireComponent extends ComponentBase {
    constructor(
        private questionnaireProvider: QuestionnaireProvider,
        private questionnaireService: QuestionnaireService
    ) {
        super();
    }
    
    questionnaireObservable: Observable<Questionnaire | null>;
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnaireObservable = this.questionnaireProvider.questionnaireObservable;
    }
    
    deleteQuestionnaire() {
        alert(`Deleting questionnaires is not yet supported.`);
    }
}
