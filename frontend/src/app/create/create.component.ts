import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private service: ApiserviceService) { }
  age: any;
  showAge: any;
  show = false;
  errormsg: any;
  successmsg: any;

  loginForm = new FormGroup
    (
      {
        fisrtname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required)
      }
    )

  collectData() {
    if (this.age) {
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      if (this.showAge > 18) {
        console.log("YOUR AGE IS:", this.showAge, "Above 18");
      }
      else {
        this.show = true;
        console.log("YOUR AGE IS:", this.showAge, "below 18");
        this.loginForm.get('dob')?.reset();
      }
    }


    if (this.loginForm.valid) {
      console.warn(this.loginForm.value);
      this.service.createData(this.loginForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.loginForm.reset();
        this.successmsg = res.message;
      });
    }
    else {
      this.errormsg = 'ALL FIELD IS REQUIRED';
    }
  }

}
