import { NgModule } from '@angular/core';

//Providers
import { QuestionnaireService } from './questionnaire.service';

const module_providers = [QuestionnaireService];

@NgModule({
    providers: [...module_providers]
})
export class ServicesModule {
}
