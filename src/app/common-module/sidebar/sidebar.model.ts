export class sidebarModel {
    sidebarElements!:sidebarElementModel[];
}

export class sidebarElementModel {
    component:string;
    url:string;

    constructor(component:string, url:string) {
        this.component =component;
        this.url = url;
    }
}