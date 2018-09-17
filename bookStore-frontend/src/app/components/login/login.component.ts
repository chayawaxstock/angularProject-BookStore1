import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { BookStoreService } from '../../shared/services/book-store.service'
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import sha256 from 'async-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formGroup: FormGroup;
  obj: typeof Object = Object;
  user: User;

  constructor(private userService: UserService,
              private router: Router) {
    let formGroupConfig = {
      userName: new FormControl("", this.createValidatorArr("name", 3, 15, /^[A-Za-z]+$/)),
      password: new FormControl("", this.createValidatorArr("password", 5, 10))
    };
    this.formGroup = new FormGroup(formGroupConfig);
  }

  submitLogin() {
    if (this.formGroup.invalid) {
      return;
    }
    else {
      this.user = this.formGroup.value;

     sha256(this.user.password).then(p=>{this.user.password=p
    this.userService.login(this.user);
      this.router.navigate(['/bookStore/home']);
    });
      
    }
  }

  createValidatorArr(cntName: string, min: number, max: number, pattern?: RegExp): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => pattern && f.value && !f.value.match(pattern) ? { "val": `${cntName} is contains only English letters` } : null,
      f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null
    ];
  }
}
