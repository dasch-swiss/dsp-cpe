import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CpeColorTheme {
    black: string;
    white: string;
    primary: string;
    secondary: string;
    highlight: string;
    disabledText: string;
    disabledBackground: string;
    selected: string;
    checked: string;
    unchecked: string;
    warningText: string;
    warningBackground: string;
}

export const defaultTheme = { // fallback theme
    "black": "#000000",
    "white": "#FFFFFF",
    "primary": "#336790",
    "secondary": "#FFFFFF",
    "highlight": "#74A2CF",
    "disabledText": "#9CA3AF",
    "disabledBackground": "#E5E7EB",
    "selected": "#D6E0E8",
    "checked": "#D6E0E8",
    "unchecked": "#E5E7EB",
    "warningText": "#F59E0B",
    "warningBackground": "#FEF3C7",
    "surface": "#000000",
    "surfaceText": "#FFFFFF"
}

@Injectable({
    providedIn: 'root'
})
export class TailwindThemeService {

    private _themes: { [key: string]: CpeColorTheme } = {};
    private _selectedTheme: string;

    constructor(private http: HttpClient) {
    }

    // loading themes and apply the selected theme
    public initThemes(themeUrl = '../../assets/theme/cpeTheme.json') {
        // reset themes
        this._themes = {};
        this.loadThemes(themeUrl).subscribe(response => {
            // set the themes
            for (const themeKey in response.themes) {
                this.setTheme(themeKey, response.themes[themeKey]);
            }
            // set/apply the selected theme
            this._selectedTheme = response.selectedTheme;
            this.applyTheme(response.selectedTheme);
        });
    }

    public loadThemes(url: string): Observable<{ selectedTheme: string, themes: { [key: string]: CpeColorTheme } }> {
        return this.http.get<{ selectedTheme: string, themes: { [key: string]: CpeColorTheme } }>(url);
    }

    public applyTheme(themeId: string) {
        let theme = this._themes[themeId];
        if (!theme) { // fallback
            console.warn(`No theme ${themeId} found. Switching to default theme.`);
            theme = this.getTheme('default');
        }
        // set the css variables
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
        this._selectedTheme = themeId;
    }

    public get themes(): { [key: string]: CpeColorTheme } {
        return this._themes;
    }

    public get selectedTheme() {
        return this._selectedTheme;
    }

    public getTheme(id: string): CpeColorTheme {
        return this.themes[id];
    }

    public setTheme(id: string, theme: CpeColorTheme) {
        this.themes[id] = theme;
    }

    public nextTheme() {
        // if there are no themes set or there was a fallback to the default theme we abort
        if (!this.themes || this.selectedTheme === 'default') { // guard
            return;
        }
        const themeIds = Object.keys(this.themes);
        const currentThemeIndex = themeIds.indexOf(this._selectedTheme);
        const nextThemeIndex = (currentThemeIndex + 1) % themeIds.length;
        this.applyTheme(themeIds[nextThemeIndex]);
    }
}
