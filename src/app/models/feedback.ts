import {Model} from 'radiks';

export default class FeedBack extends Model {
    static className = 'FeedBack';

    static schema = {
        message: { type: String , required: true , decrypted: true},
    };
}
