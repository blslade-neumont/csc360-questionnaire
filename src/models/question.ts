import { QuestionnairePart } from './questionnaire-part';
import { shuffle } from 'utils';

export class Question extends QuestionnairePart {
    constructor(private parent: QuestionnairePart | null) {
        super();
    }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        let question = new Question(parent);
        question._text = json.text;
        question._answers = json.answers;
        return question;
    }
    
    private _text: string;
    private _answers: string[] = [];
    
    getText(): string {
        return this._text;
    }
    setText(val: string) {
        this._text = val;
    }
    
    getRandomizedAnswers(): string[] {
        let toReturn = [...this._answers];
        shuffle(toReturn);
        return toReturn;
    }
    getAnswers(): string[] {
        return this._answers;
    }
    get correctAnswer() {
        return this._answers[0] || '';
    }
    set correctAnswer(val: string) {
        if (this._answers.length === 0) this._answers.push(val);
        else this._answers[0] = val;
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
