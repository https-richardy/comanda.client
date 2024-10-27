import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtTokenHandler } from './services/jwt-token-handler.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    providers: [
        JwtTokenHandler
    ]
})

export class AuthorizationModule { }
