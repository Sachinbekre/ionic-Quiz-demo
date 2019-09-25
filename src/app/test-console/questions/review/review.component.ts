import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  constructor(private modalCntrl: ModalController) { }
  @Input() quiz: any;
  isAns;

  ngOnInit() {
    // console.log(this.isAns);
  }
  goTo(index: number) {
    console.log(index);
    this.modalCntrl.dismiss();
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
  }
}
