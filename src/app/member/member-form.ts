import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Member } from './member';

export class MemberForm {
    legalName: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    accountType: FormControl;

    constructor(data: Member, fb: FormBuilder) {
        this.legalName = fb.control(data.legalName || '', Validators.required);
        this.firstName = fb.control(data.firstName || '', Validators.required);
        this.lastName = fb.control(data.lastName || '', Validators.required);
        this.accountType = fb.control(data.accountType || '', Validators.required);
    }
}
