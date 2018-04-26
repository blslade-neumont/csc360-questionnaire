import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionnaireProvider } from 'services';
import { Questionnaire, QuestionnairePart, Section, Question } from 'models';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './take-questionnaire.html',
    styleUrls: ['./take-questionnaire.scss']
})
export class TakeQuestionnaireComponent extends ComponentBase {
    constructor(
        private questionnaireProvider: QuestionnaireProvider
    ) {
        super();
    }
    
    questionnaireObservable: Observable<Questionnaire | null>;
    
    correctCount = 0;
    totalCount = 0;
    isDone = false;
    
    currentIterator: IterableIterator<QuestionnairePart>;
    currentPart: QuestionnairePart;
    breadcrumbs: QuestionnairePart[];
    answers: string[];
    selectedAnswer: string;
    
    get isSection() {
        return this.currentPart instanceof Section;
    }
    get isQuestion() {
        return this.currentPart instanceof Question;
    }
    
    get isCorrect() {
        return this.currentPart instanceof Question && this.selectedAnswer === this.currentPart.correctAnswer;
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.questionnaireObservable = this.questionnaireProvider.questionnaireObservable;
        this.subscriptions.push(this.questionnaireObservable.subscribe(q => {
            if (!q) return;
            this.currentIterator = q.getParts();
            this.next();
        }));
    }
    
    next() {
        if (this.isDone) return;
        if (this.isQuestion) {
            this.totalCount++;
            if (this.isCorrect) this.correctCount++;
        }
        let result = this.currentIterator.next();
        
        this.currentPart = result.value || null;
        if (this.currentPart instanceof Question) {
            this.selectedAnswer = '';
            this.answers = this.currentPart.getAnswers();
        }
        if (result.done) this.isDone = true;
        this.createBreadcrumbs();
    }
    private createBreadcrumbs() {
        if (!this.currentPart) {
            this.breadcrumbs = [];
            return;
        }
        let breadcrumbs: QuestionnairePart[] = (this.breadcrumbs = []);
        let parent: QuestionnairePart | null = this.currentPart;
        while ((parent = parent!.getParent()) !== null) {
            breadcrumbs.unshift(parent!);
        }
    }
}
