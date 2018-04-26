import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireService, QuestionnaireProvider, SelectionProvider } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './edit-questionnaire.html',
    styleUrls: ['./edit-questionnaire.scss'],
    providers: [SelectionProvider]
})
export class EditQuestionnaireComponent extends ComponentBase implements OnInit {
    constructor(
        private questionnaireProvider: QuestionnaireProvider,
        private questionnaireService: QuestionnaireService,
        private selectionProvider: SelectionProvider
    ) {
        super();
    }
    
    questionnaireObservable: Observable<Questionnaire | null>;
    selectionObservable: Observable<any>;
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnaireObservable = this.questionnaireProvider.questionnaireObservable;
        this.selectionObservable = this.selectionProvider.selectionObservable;
    }
}
