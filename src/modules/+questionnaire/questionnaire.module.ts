import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionnaireListComponent } from './pages/questionnaire-list/questionnaire-list';

import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire';

import { QuestionnaireComponent } from './pages/questionnaire/questionnaire';
import { ViewQuestionnaireComponent } from './pages/view-questionnaire/view-questionnaire';
import { TakeQuestionnaireComponent } from './pages/take-questionnaire/take-questionnaire';
import { EditQuestionnaireComponent } from './pages/edit-questionnaire/edit-questionnaire';

//Imports
import { SharedModule } from 'shared/shared.module';

const routerConfig: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', pathMatch: 'full', component: QuestionnaireListComponent},
    {path: 'create', pathMatch: 'full', component: CreateQuestionnaireComponent },
    {path: ':slug', component: QuestionnaireComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'view'},
        {path: 'view', pathMatch: 'full', component: ViewQuestionnaireComponent},
        {path: 'take', pathMatch: 'full', component: TakeQuestionnaireComponent},
        {path: 'edit', pathMatch: 'full', component: EditQuestionnaireComponent}
    ]}
];

const module_exports = [
    QuestionnaireListComponent,
    
    CreateQuestionnaireComponent,
    
    QuestionnaireComponent,
    ViewQuestionnaireComponent, TakeQuestionnaireComponent, EditQuestionnaireComponent
];

@NgModule({
    declarations: [...module_exports],
    imports:      [RouterModule.forChild(routerConfig), SharedModule.forRoot()],
    exports:      [...module_exports]
})
export class QuestionnaireModule {
}
