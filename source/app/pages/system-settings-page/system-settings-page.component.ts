import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';
import { FormsModule } from '@angular/forms';
import { TooltipComponent } from "../../components/tooltip/tooltip.component";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { Icons } from '../../common/enums/icons.enum';

@Component({
    selector: 'system-settings-page',
    standalone: true,
    imports: [FormsModule, TooltipComponent, MainLayoutComponent],
    templateUrl: './system-settings-page.component.html'
})
export class SystemSettingsPageComponent implements OnInit {
    private readonly settingsService: SettingsService;

    public icons = Icons;
    public settings = {  } as Settings;

    public constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public ngOnInit(): void {
        this.settingsService.getSettings().subscribe((settings) => {
            this.settings = settings;
        })
    }

    public handleOnUpdate() {
        this.settingsService.updateSettings(this.settings).subscribe(() => {
            alert('Configurações salvas com sucesso!');
        });
    }
}
