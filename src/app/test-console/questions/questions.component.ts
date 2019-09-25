import { Component, OnInit } from '@angular/core';
import { Quiz, QuizConfig, Question, Option } from '../models';
import { QuetionService } from './quetion.service';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController } from '@ionic/angular';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  question;
  logo = 'assets/images/logo-small.png';
  constructor(private quizService: QuetionService,
    private http: HttpClient,
    private modalCntrl: ModalController,
    private alrtCntrl: AlertController) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz();
    console.log('ellapsedTime', this.ellapsedTime);
  }
  loadQuiz() {
    this.quizService.get('assets/javascript.json').subscribe(res => {
      this.quiz = new Quiz(res);
      this.question = this.quiz.questions;
      console.log(this.question);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    }, error => {
      console.log(error);
    });
    this.mode = 'quiz';
  }
  get filteredQuestions() {
    debugger;
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onSelect(question: Question, option: Option) {
    console.log(option)
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
  review() {
    let modalData = this.quiz;
    this.modalCntrl.create({ component: ReviewComponent, componentProps: { quiz: this.quiz, isAns:this.isAnswered } }).then(modalEl => {
      modalEl.present();
    });
  }
  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }

  onSubmit() {
    this.alrtCntrl
    .create({
      header: 'Alert!',
      message: 'Are you sure you want to Submit the Answer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            let answers = [];
            this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
            console.log(this.quiz.questions);
            this.mode = 'result';
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present();
    });
  
    
  }

}
