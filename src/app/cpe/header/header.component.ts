import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() editMode = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  toggleEdit(){
    this.editMode = !this.editMode;

    this._router.navigate(['/'], {queryParams: {edit: this.editMode}})
    
  }

}
