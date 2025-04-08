import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WordInterface} from "../types/word.interface";

@Component({
    selector: 'app-wordlist',
    templateUrl: './wordlist.component.html',
    styleUrls: ['./wordlist.component.scss'],
    standalone: false
})
export class WordlistComponent implements OnInit {

  @Input() words : WordInterface[] = [];

  @Output() chosen = new EventEmitter<WordInterface>();

  constructor() { }

  ngOnInit(): void {
  }

  onWordChosen(word: WordInterface) {
    this.chosen.emit(word);
  }
}
