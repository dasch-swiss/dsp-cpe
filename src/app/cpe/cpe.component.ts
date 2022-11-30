import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-cpe',
  templateUrl: './cpe.component.html',
  styleUrls: ['./cpe.component.scss']
})
export class CpeComponent implements OnInit {
   // editParam$: Observable<boolean | null>;
   editParam: boolean = false;

  constructor(
    private _route: ActivatedRoute
  ) {
    // this.editParam$ = this._route.queryParamMap.pipe(
    //   map((params: ParamMap) => {
    //     const value = params.get('edit');
    //     return value ? value.toLocaleLowerCase() === 'true' : false;
    //   }));

    // this.editParam$.subscribe(param => console.log(param));

    this._route.queryParamMap.subscribe((param) => {
      const value = param.get('edit');
      this.editParam = value ? value.toLocaleLowerCase() === 'true' : false;
    });

    console.log('edit: ', this.editParam);
  }

  ngOnInit(): void {
  }

}
