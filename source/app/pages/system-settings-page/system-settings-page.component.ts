import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';
import { FormsModule } from '@angular/forms';
import { TooltipComponent } from "../../components/tooltip/tooltip.component";
import { Icons } from '../../common/enums/icons.enum';
import { StorageConstants } from '../../common/storage-constants';
import { AdministratorDefaultLayoutComponent } from "../../layout/administrator-default-layout/administrator-default-layout.component";
import { AuthorizeViewComponent } from "../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../modules/authorization/components/authorized/authorized.component";

@Component({
    selector: 'system-settings-page',
    standalone: true,
    templateUrl: './system-settings-page.component.html',
    imports: [
        FormsModule,
        TooltipComponent,
        AdministratorDefaultLayoutComponent,
        AuthorizeViewComponent,
        AuthorizedComponent
    ]
})
export class SystemSettingsPageComponent implements OnInit {
    private readonly settingsService: SettingsService;

    public icons = Icons;
    public settings = {  } as Settings;
    private cachedSettings = {  } as Settings;

    public constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public ngOnInit(): void {
        this.loadSettingsFromLocalStorage();
    }

    private loadSettingsFromLocalStorage(): void {
        const savedSettings = localStorage.getItem(StorageConstants.SystemSettings);

        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
            this.cachedSettings = { ...this.settings };
        }
        else {
            this.settingsService.getSettings().subscribe((settings) => {
                this.settings = settings;
                this.cachedSettings = { ...settings };

                this.updateLocalStorage();
            });
        }
    }

    public handleOnUpdate(): void {
        if (this.isSettingsChanged()) {
            this.settingsService.updateSettings(this.settings).subscribe(() => {
                this.cachedSettings = { ...this.settings };
                this.updateLocalStorage();

                alert('Configurações salvas com sucesso!');
            });
        }
        else {
            alert('Nenhuma alteração foi feita nas configurações.');
        }
    }

    private isSettingsChanged(): boolean {
        return JSON.stringify(this.settings) !== JSON.stringify(this.cachedSettings);
    }

    private updateLocalStorage(): void {
        localStorage.setItem(StorageConstants.SystemSettings, JSON.stringify(this.settings));
    }
}
