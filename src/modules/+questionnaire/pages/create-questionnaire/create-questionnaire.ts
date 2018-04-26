import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap, startWith } from 'rxjs/operators';
import { QuestionnaireService } from 'services';
import { Questionnaire } from 'models';
import { ComponentBase } from 'utils/components';
import { ObservableInput } from 'utils';

@Component({
    templateUrl: './create-questionnaire.html',
    styleUrls: ['./create-questionnaire.scss']
})
export class CreateQuestionnaireComponent extends ComponentBase {
    constructor(
        private questionnaireService: QuestionnaireService,
        private router: Router
    ) {
        super();
    }
    
    isValidNameObservable: Observable<boolean>;
    
    @ObservableInput() name: string = '';
    nameObservable: Observable<string>;
    
    ngOnInit() {
        super.ngOnInit();
        this.isValidNameObservable = this.nameObservable.pipe(
            switchMap(name => {
                if (!name) return Observable.of(false);
                return this.questionnaireService.canCreateWithName(name).pipe(startWith(false));
            })
        );
    }
    
    async create() {
        let name = this.name;
        let q = await this.questionnaireService.create(name);
        if (!q) {
            alert(`Failed to create questionnaire.`);
            return;
        }
        this.router.navigate(['q', q.slug, 'edit']);
    }
}
