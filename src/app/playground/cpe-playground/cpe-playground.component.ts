import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpe-playground',
  templateUrl: './cpe-playground.component.html',
  styleUrls: ['./cpe-playground.component.scss']
})
export class CpePlaygroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logToConsole(me: string) {
    console.log('clicked ' + me);
  }
}
