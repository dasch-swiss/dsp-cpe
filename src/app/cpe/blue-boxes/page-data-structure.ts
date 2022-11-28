import { testWidgetData } from "../widgets/test-widget/test-widget.component"
export interface Page {
    header: Header,
    body: Body,
    footer: Footer
}
interface PagePart {
    widgets: testWidgetData[]
}

interface Header extends PagePart {
}
interface Footer extends PagePart{}
interface Body extends PagePart{
    gridDimensions: gridCoordinates
}
/**
 * TODO: Check for integers, might be hard in typescript
 */   
export interface WidgetData {
    id: number,
    coordinates: gridCoordinates, // TODO: Check that y must be 1 for header & footer
    width: number,
    height: number // TODO: Check that height must be 1 for header & footer
}
interface gridCoordinates {
    x: number,
    y: number
}
export interface PageDataStructure {
}
