

export abstract class QuestionnairePart {
    constructor() { }
    
    get text(): string {
        return this.getText();
    }
    set text(val: string) {
        this.setText(val);
    }
    
    abstract getText(): string;
    abstract setText(val: string): void;
    
    abstract getParent(): QuestionnairePart | null;
    
    abstract getParts(): IterableIterator<QuestionnairePart>;
    
    abstract toJson(): any;
}
