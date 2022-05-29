export class FileUploadModel {
    "name": string;
    "data": File;
    "path": string;
    "version": number;
    "is_approved": boolean|string;
    "user_id": number;

    constructor(data: File, user_id:number) {

        this.data = data;
        this.is_approved = "";
        this.user_id = user_id;
        this.version = 1;
    }
}