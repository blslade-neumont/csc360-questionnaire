import { Question } from './question';
import { Section } from './section';

export abstract class QuestionnairePart {
    constructor() { }
    
    public static fromJson(json: any, parent: QuestionnairePart | null): QuestionnairePart {
        switch (json.type) {
        case 'question':
            return Question.fromJson(json, parent);
        case 'section':
            return Section.fromJson(json, parent);
        default:
            throw new Error(`Not supported`);
        }
    }
    
    abstract getText(): string;
    abstract setText(val: string): void;
    
    abstract getParent(): QuestionnairePart | null;
    
    abstract getParts(): IterableIterator<QuestionnairePart>;
    
    abstract toJson(): any;
}
