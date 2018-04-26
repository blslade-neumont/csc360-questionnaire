import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObservableInput } from 'utils';
import { Questionnaire } from 'models';

@Injectable()
export class QuestionnaireProvider {
    constructor() { }
    
    @ObservableInput() questionnaire: Questionnaire | null;
    questionnaireObservable: Observable<Questionnaire | null>;
}
