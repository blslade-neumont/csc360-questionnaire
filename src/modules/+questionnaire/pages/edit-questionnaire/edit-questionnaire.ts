import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireService, QuestionnaireProvider } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './edit-questionnaire.html',
    styleUrls: ['./edit-questionnaire.scss']
})
export class EditQuestionnaireComponent extends ComponentBase implements OnInit {
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
}
