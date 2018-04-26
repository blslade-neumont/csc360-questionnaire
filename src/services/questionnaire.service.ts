import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Questionnaire } from 'models';
import { slugify } from 'utils';
import { map } from 'rxjs/operators';
let allQuestionnairesJson: any[] = require('../dbs/questionnaires.json');

@Injectable()
export class QuestionnaireService {
    constructor() {
        this.init();
    }
    
    private init() {
        this.allQuestionnaires = <Questionnaire[]>allQuestionnairesJson.map(json => Questionnaire.fromJson(json)).filter(Boolean);
    }
    
    private allQuestionnaires: Questionnaire[];
    
    list(): Observable<Questionnaire[]> {
        return Observable.of(this.allQuestionnaires);
    }
    
    get(slug: string): Observable<Questionnaire | null> {
        let idx = this.allQuestionnaires.findIndex(q => q.slug === slug);
        if (idx === -1) return Observable.of(null);
        return Observable.of(this.allQuestionnaires[idx]);
    }
    
    canCreateWithName(name: string): Observable<boolean> {
        let slug = slugify(name);
        return this.list().pipe(
            map(qs => !qs.some(q => q.slug === slug))
        );
    }
}
