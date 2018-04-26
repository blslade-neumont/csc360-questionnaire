import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObservableInput } from 'utils';
import { Questionnaire } from 'models';

@Injectable()
export class SelectionProvider {
    constructor() { }
    
    @ObservableInput() selection: any;
    selectionObservable: Observable<any>;
    
    @ObservableInput() editTemplate: TemplateRef<any> | null;
    editTemplateObservable: Observable<TemplateRef<any> | null>;
}
