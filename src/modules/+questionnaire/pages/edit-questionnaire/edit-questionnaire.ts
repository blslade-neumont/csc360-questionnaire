import { Component } from '@angular/core';
import { QuestionnaireService } from 'services';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './edit-questionnaire.html',
    styleUrls: ['./edit-questionnaire.scss']
})
export class EditQuestionnaireComponent extends ComponentBase {
    constructor(
        public questionnaireService: QuestionnaireService
    ) {
        super();
    }
}
