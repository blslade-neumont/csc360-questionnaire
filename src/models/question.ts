import { QuestionnairePart } from './questionnaire-part';
import { shuffle } from 'utils';

export class Question implements QuestionnairePart {
    constructor(private parent: QuestionnairePart | null) { }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        let question = new Question(parent);
        question._text = json.text;
        question._answers = json.answers;
        return question;
    }
    
    private _text: string;
    private _answers: string[];
    
    getText(): string {
        return this._text;
    }
    setText(val: string) {
        this._text = val;
    }
    
    getAnswers(): string[] {
        let toReturn = [...this._answers];
        shuffle(toReturn);
        return toReturn;
    }
    get correctAnswer() {
        return this._answers[0];
    }
    
    getParent(): QuestionnairePart | null {
        return this.parent;
    }
    *getParts(): IterableIterator<QuestionnairePart> {
        yield this;
    }
    
    toJson() {
        return {
            type: 'question',
            text: this._text,
            answers: [...this._answers]
        };
    }
}
