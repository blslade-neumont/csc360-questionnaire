import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map as rxMap, switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';
import { QuestionnaireService, QuestionnaireProvider } from 'services';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.scss'],
    providers: [QuestionnaireProvider]
})
export class QuestionnaireComponent extends ComponentBase implements OnInit {
    constructor(
        private questionnaireProvider: QuestionnaireProvider,
        private questionnaireService: QuestionnaireService,
        private route: ActivatedRoute
    ) {
        super();
    }
    
    ngOnInit() {
        super.ngOnInit();
        
        let slugObservable = this.route.paramMap.pipe(
            rxMap(map => map.get('slug'))
        );
        this.questionnaireProvider.questionnaireObservable = slugObservable.pipe(
            switchMap(slug => {
                if (!slug) return Observable.of(null);
                return this.questionnaireService.get(slug).pipe(
                    startWith(null)
                );
            }),
            distinctUntilChanged()
        );
    }
}
