import { QuestionnairePart } from './questionnaire-part';
import { Question } from './question';

export class Section extends QuestionnairePart {
    constructor(private parent: QuestionnairePart | null) {
        super();
    }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        let section = new Section(parent);
        section._text = json.text;
        section.addChildrenFromJson(json.parts);
        return section;
    }
    protected addChildrenFromJson(parts: any = []) {
        for (let partJson of parts) {
            let part = Section.questionnairePartFromJson(partJson, this);
            this.addChild(part);
        }
    }
    private static questionnairePartFromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        switch (json.type) {
        case 'question':
            return Question.fromJson(json, parent);
        case 'section':
            return Section.fromJson(json, parent);
        default:
            throw new Error(`Not supported`);
        }
    }
    
    private _text: string = '';
    getText(): string {
        return this._text;
    }
    setText(val: string): void {
        this._text = val;
    }
    
    getParent(): QuestionnairePart | null {
        return this.parent;
    }
    
    private _children: QuestionnairePart[] = [];
    addChild(child: QuestionnairePart) {
        this._children.push(child);
    }
    removeChild(child: QuestionnairePart) {
        let idx = this._children.indexOf(child);
        if (idx !== -1) this._children.splice(idx, 1);
    }
    getChildren() {
        return this._children;
    }
    
    *getParts(): IterableIterator<QuestionnairePart> {
        yield this;
        for (let child of this._children) {
            yield* child.getParts();
        }
    }
    
    toJson() {
        return {
            type: 'section',
            text: this._text
        };
    }
}
