import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-console',
  templateUrl: './test-console.page.html',
  styleUrls: ['./test-console.page.scss'],
})
export class TestConsolePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['test-console/welcome']);
  }
}
