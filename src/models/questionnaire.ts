import { QuestionnairePart } from './questionnaire-part';
import { Section } from './section';
import { slugify } from 'utils';

export class Questionnaire extends Section {
    constructor() {
        super(null);
    }
    
    public static fromJson(json: any, parent: QuestionnairePart | null = null): Questionnaire {
        if (!json.name) throw new Error(`Not supported`);
        
        let q = new Questionnaire();
        q.setText(json.name);
        
        for (let partJson of json.parts || []) {
            let part = QuestionnairePart.fromJson(partJson, q);
            q.addChild(part);
        }
        
        return q;
    }
    
    get name() {
        return this.getText();
    }
    get slug() {
        return slugify(this.name);
    }
}
