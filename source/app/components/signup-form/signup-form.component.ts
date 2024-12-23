import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { SignupCredentials } from '../../payloads/requests/identity-payloads/signup-credentials.payload';
import { Icons } from '../../common/enums/icons.enum';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    standalone: true,
    imports: [ CommonModule, ReactiveFormsModule ],
})
export class SignupFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly signupService: SignupService;

    private credentials!: SignupCredentials;

    public icons = Icons;
    public form!: FormGroup;
    public showPassword: boolean = false;
    public step: number = 1;

    @ViewChild("nameInput")
    public nameInput!: ElementRef<HTMLInputElement>;

    @ViewChild("emailInput")
    public emailInput!: ElementRef<HTMLInputElement>;

    @ViewChild("passwordInput")
    public passwordInput!: ElementRef<HTMLInputElement>;

    public constructor(formBuilder: FormBuilder, signupService: SignupService) {
        this.formBuilder = formBuilder;
        this.signupService = signupService;
    }

    public ngOnInit(): void {
        const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";

        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.pattern(passwordPattern), Validators.minLength(8)]],
        });
    }

    public handleBaseInfoSubmit(): void {
        if (this.form.get("email")?.valid && this.form.get("name")?.valid) {
            this.step = 2;
        }
    }

    public togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    public handleSignup(): void {
        this.credentials = this.form.value;
        this.signupService.signup(this.credentials).subscribe();
    }
}
