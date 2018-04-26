import { QuestionnairePart } from './questionnaire-part';

export class Question implements QuestionnairePart {
    constructor(private parent: QuestionnairePart | null) { }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        let question = new Question(parent);
        question._text = json.text;
        return question;
    }
    
    private _text: string;
    
    getText(): string {
        return this._text;
    }
    setText(val: string) {
        this._text = val;
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
            text: this._text
        };
    }
}
