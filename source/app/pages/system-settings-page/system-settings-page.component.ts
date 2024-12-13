import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'system-settings-page',
    standalone: true,
    imports: [ FormsModule ],
    templateUrl: './system-settings-page.component.html'
})
export class SystemSettingsPageComponent implements OnInit {
    private readonly settingsService: SettingsService;
    public settings = {  } as Settings;

    public constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public ngOnInit(): void {
        this.settingsService.getSettings().subscribe((settings) => {
            this.settings = settings;
        })
    }
}
