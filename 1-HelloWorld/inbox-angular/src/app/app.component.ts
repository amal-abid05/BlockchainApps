import {AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



import web3 from '../web3';
import inbox from '../inbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  // model: any = {};
  title = 'Hello Ethereum';
  message = '';
  // address = '0x117509aeD8D3466b343Cccf45DC55643D8345f3f';
  state = '';
  registerForm: FormGroup;
  newmessage = new FormControl('', Validators.required);
  submitted = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'newmessage': this.newmessage
    });
  }

  async ngAfterContentChecked() {
    // contentChild is updated after the content has been checked
    const messageInit = await inbox.methods.message().call();
    this.message = messageInit;
  }


  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const m = this.registerForm.controls.newmessage.value;
    const accounts = await web3.eth.getAccounts();


    this.state = 'Waiting on transaction success...';

    await inbox.methods.setMessage(m).send({ from: accounts[0]});
    this.message = await inbox.methods.message().call();

    this.state = 'Your message is modified';

    this.registerForm.setValue({newmessage: ''});



    // this.registerForm.setValue({newmessage: 'Bye'});
    // alert(this.registerForm.controls.newmessage.value);
  }

}
