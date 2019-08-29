import {Model} from 'radiks';

export default class Task extends Model {
    static className = 'Task';

    static schema = {
        // username: { type: String, required: true, decrypted: true },
        dateCreated: { type: String , required: true , decrypted: true},
        doneBy: { type: String},
        isDone : { type : Boolean, required: true},
        name: { type: String, required: true },
        description: { type: String }
    };
}
