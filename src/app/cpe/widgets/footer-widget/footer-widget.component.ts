import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-footer-widget',
  templateUrl: './footer-widget.component.html',
  styleUrls: ['./footer-widget.component.scss']
})
export class FooterWidgetComponent implements OnInit{
    @Input() data: any;

    ngOnInit() {
    }

}
