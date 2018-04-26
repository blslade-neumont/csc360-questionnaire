import { NgModule, ModuleWithProviders } from '@angular/core';

//Imports
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

//Declarations
import { AutofocusDirective } from './directives/autofocus.directive';
import { NgLet } from './directives/ng-let.directive';

export const module_exports = [AutofocusDirective, NgLet];

const imported_modules = [FormsModule, CommonModule, HttpModule];
export const exported_modules = [FormsModule, CommonModule, HttpModule];

@NgModule({
    declarations: [...module_exports],
    imports     : [...imported_modules],
    exports     : [...module_exports, ...exported_modules]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
