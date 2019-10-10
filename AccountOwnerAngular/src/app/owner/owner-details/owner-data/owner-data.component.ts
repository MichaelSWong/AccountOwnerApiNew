import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Owner } from 'src/app/_interface/owner.model';

@Component({
  selector: 'app-owner-data',
  templateUrl: './owner-data.component.html',
  styleUrls: ['./owner-data.component.scss']
})
export class OwnerDataComponent implements OnInit {
  @Input() public owner: Owner;
  public selectOptions = [
    { name: 'Show', value: 'show' },
    { name: `Don't Show`, value: '' }
  ];
  @Output() selectEmitt = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public onChange = event => {
    this.selectEmitt.emit(event.value);
  };
}
