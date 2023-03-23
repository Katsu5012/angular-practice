import { Component, OnInit } from '@angular/core';

type User = {
  id: number;
  name: string;
  age: number;
};

const user1: User = {
  id: 1,
  name: 'tanaka',
  age: 28,
};

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.scss'],
})
export class LifeCycleComponent implements OnInit {
  user = user1;

  ngOnInit() {
    console.log('ngOnInit');
  }
}
