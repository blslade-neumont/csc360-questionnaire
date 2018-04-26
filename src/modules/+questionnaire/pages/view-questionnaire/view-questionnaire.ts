import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
        private questionnaireService: QuestionnaireService,
        private router: Router
    ) {
        super();
    }
    
    questionnaireObservable: Observable<Questionnaire | null>;
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnaireObservable = this.questionnaireProvider.questionnaireObservable;
    }
    
    async delete(q: Questionnaire) {
        let deleted = await this.questionnaireService.delete(q.slug);
        if (!deleted) {
            alert(`Failed to delete questionnaire`);
            return;
        }
        this.router.navigate(['/q', 'list']);
    }
}
