import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import sha256 from 'async-sha256';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroup: FormGroup;
  obj: typeof Object = Object;

  constructor(public userService: UserService,
              public router: Router) {

    let formGroupConfig = {
      firstName: new FormControl("", this.createValidatorArr("firstName", 2, 15, /^[A-Za-z]+$/)),
      lastName: new FormControl("", this.createValidatorArr("lastName", 2, 15, /^[A-Za-z]+$/)),
      password: new FormControl("", this.createValidatorArr("password", 5, 10)),
      userName: new FormControl("", this.createValidatorArr("userName", 3, 15, /^[A-Za-z]+$/)),
    };

    this.formGroup = new FormGroup(formGroupConfig);
  }

  submitRegister() {
  
    let person: User = this.formGroup.value;
    sha256(person.password).then(p=>{person.password=p; 
      this.userService.registerUser(person);
    this.router.navigate(['/bookStore/home']);});
   
  }

  createValidatorArr(cntName: string, min: number, max: number, pattern?: RegExp): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && pattern && !f.value.match(pattern) ? { "val": `${cntName} is contain only english letter` } : null,
      f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null
    ];
  }

}

