import { Component } from '@angular/core';
import { QuestionnaireService } from 'services';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.scss']
})
export class QuestionnaireComponent extends ComponentBase {
    constructor(
        public questionnaireService: QuestionnaireService
    ) {
        super();
    }
}
