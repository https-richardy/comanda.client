import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Icons } from '../../common/enums/icons.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationCredentials } from '../../payloads/requests/identity-payloads/authenticationCredentials';
import { AuthenticationStateService } from '../../services/authentication-state.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule ],
})
export class LoginFormComponent implements OnInit, AfterViewInit {
    private readonly formBuilder: FormBuilder;
    private readonly authenticationStateService: AuthenticationStateService;

    private credentials!: AuthenticationCredentials;

    public icons = Icons;
    public form!: FormGroup;
    public showPassword: boolean = false;
    public step: number = 1;

    @ViewChild("emailInput")
    public emailInput!: ElementRef<HTMLInputElement>;

    @ViewChild("passwordInput")
    public passwordInput!: ElementRef<HTMLInputElement>;

    public constructor(
        formBuilder: FormBuilder,
        authenticationStateService: AuthenticationStateService
    ) {
        this.formBuilder = formBuilder;
        this.authenticationStateService = authenticationStateService
    }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]]
        });
    }

    public ngAfterViewInit(): void {
        this.focusInput();
    }

    public focusInput() {
        if (this.step == 1) {
            this.emailInput.nativeElement.focus();
        }
        else {
            this.passwordInput.nativeElement.focus();
        }
    }

    public handleEmailSubmit(): void {
        if (this.form.get("email")?.valid) {
            this.step = 2;
            this.focusInput();
        }
    }

    public handleLogin(): void {
        if (this.form.valid) {
            this.credentials = this.form.value;
            this.authenticationStateService.login(this.credentials);
        }
    }

    public togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
