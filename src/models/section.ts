import { QuestionnairePart } from './questionnaire-part';

export class Section implements QuestionnairePart {
    constructor(private parent: QuestionnairePart | null) { }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        let section = new Section(parent);
        section._text = json.text;
        
        for (let partJson of json.parts || []) {
            let part = QuestionnairePart.fromJson(partJson, section);
            section.addChild(part);
        }
        
        return section;
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
