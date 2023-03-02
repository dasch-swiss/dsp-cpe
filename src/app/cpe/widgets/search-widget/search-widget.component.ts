import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {ComponentCommunicationService, Events, Status} from "../../../services/component-communication.service";

@Component({
    selector: "app-search-widget",
    templateUrl: "./search-widget.component.html",
    styleUrls: ["./search-widget.component.scss"]
})
export class SearchWidgetComponent implements OnInit {

    constructor(private _communicationService: ComponentCommunicationService) {
    }

    ngOnInit() {
    }

    getMockData(): Observable<{ id: number, title: string }[]> {
        return of([
            {id: 1, title: "Richard III", published: "1593", author: "William Shakespeare", passage: "[Richard:] A horse, a horse, my kingdom for a horse!"},
            {id: 2, title: "What You Will", published: "1601", author: "John Marston", passage: "[Lampatho Doria:] Nay, hear it, and relish it judiciously.<br>Quadratus: I do relish it most judiciously.<br>[Lampatho Doria:] Adored excellence, delicious sweet <br>[Quadratus:] \"Delicious sweet\"! good, very good."},
            {id: 3, title: "Hamlet", published: "1600", author: "William Shakespeare", passage: "[Hamlet:] [...] my two schoolfellows,<br> Whom I will trust as I will adders fanged,<br>They bear the mandate; they must sweep my way<br>And marshal me to knavery."},
            {id: 4, title: "The Tragedy of Charles, Duke of Byron", published: "1608", author: "George Chapmann", passage: "[Captain:] And to make this no less than an Ostent;<br>Another that hath fortuned since, confirms it:<br>Your goodly horse Pastrana, which the Archduke,<br>Gave you at Brussels; in the very hour,<br>You left your strength, fell mad, and killed himself;<br>The like chanced to the horse the great duke sent you:<br>And, with both these, the horse the duke of Lorraine,<br>Sent you at, Vimie made a third presage, [...]<br>Who like the other pined away and died. "}
        ]).pipe(delay(15));
    }

    changeBG() {
        this._communicationService.emit({event: Events.changeBackground, status: Status.finished});
    }

    search() {
        this._communicationService.emit({event: Events.searchExecuted, status: Status.started});
        this.getMockData()
            .subscribe({
                next: data => {
                    this._communicationService.emit({
                        event: Events.searchExecuted,
                        status: Status.finished,
                        value: data
                    });
                },
                error: _ => {
                    this._communicationService.emit({
                        event: Events.searchExecuted,
                        status: Status.failed,
                        errorMsg: "Search failed!"
                    });
                }
            });
    }
}
