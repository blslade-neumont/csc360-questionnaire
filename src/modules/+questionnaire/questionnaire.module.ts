import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionnaireListComponent } from './pages/questionnaire-list/questionnaire-list';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire';

//Imports
import { SharedModule } from 'shared/shared.module';

const routerConfig: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', pathMatch: 'full', component: QuestionnaireListComponent},
    {path: ':slug', children: [
        { path: '', pathMatch: 'full', component: QuestionnaireComponent },
        { path: 'edit', component: EditQuestionnaireComponent }
    ]}
];

const module_exports = [QuestionnaireListComponent, QuestionnaireComponent, EditQuestionnaireComponent];

@NgModule({
    declarations: [...module_exports],
    imports:      [RouterModule.forChild(routerConfig), SharedModule.forRoot()],
    exports:      [...module_exports]
})
export class QuestionnaireModule {
}
