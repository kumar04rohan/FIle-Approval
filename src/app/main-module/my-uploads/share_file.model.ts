export class shareFileModel {
    "file_id":number;
    "user_id":number;

    constructor(fileId:number, userId:number) {
        this.file_id = fileId;
        this.user_id = userId;
    }
}