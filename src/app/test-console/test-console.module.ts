import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { TestConsolePage } from './test-console.page';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReviewComponent } from './questions/review/review.component';

const routes: Routes = [
  {
    path: '',
    component: TestConsolePage
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestConsolePage, WelcomeComponent, QuestionsComponent, ReviewComponent],
  entryComponents:[ReviewComponent]
})
export class TestConsolePageModule {}
