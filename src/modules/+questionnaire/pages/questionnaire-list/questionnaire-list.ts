import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireService } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './questionnaire-list.html',
    styleUrls: ['./questionnaire-list.scss']
})
export class QuestionnaireListComponent extends ComponentBase {
    constructor(
        private questionnaireService: QuestionnaireService
    ) {
        super();
    }
    
    questionnairesObservable: Observable<Questionnaire[]>;
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnairesObservable = this.questionnaireService.list();
    }
}
