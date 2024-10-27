import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationStateProvider } from '../../authenticationStateProvider';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'authorize-view',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './authorize-view.component.html',
})

export class AuthorizeViewComponent implements OnInit {
    @Input() roles: string[] = [];
    public isAuthorized: boolean = false;
    private readonly authenticationStateProvider: AuthenticationStateProvider;

    public constructor(authenticationStateProvider: AuthenticationStateProvider) {
        this.authenticationStateProvider = authenticationStateProvider;
    }

    public ngOnInit(): void {
        var authenticationState = this.authenticationStateProvider.getAuthenticationState();

        if (authenticationState.isAuthenticated()) {
            var userClaims = authenticationState.user;

            this.isAuthorized = this.roles.length === 0 ||
            this.roles.some(role => userClaims?.hasRole(role));
        }
    }
}
