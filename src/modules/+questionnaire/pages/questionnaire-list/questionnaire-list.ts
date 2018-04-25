import { Component } from '@angular/core';
import { QuestionnaireService } from 'services';
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
}
