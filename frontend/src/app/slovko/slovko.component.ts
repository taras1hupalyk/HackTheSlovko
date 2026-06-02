import {Component, HostListener, OnInit} from '@angular/core';
import {SlovkoService} from "../slovko.service";
import {WordInterface} from "../types/word.interface";

const WORD_LENGTH = 5;
const NUM_TRIES = 6;


const LETTERS = (() => {
  const ret: {[key: string]: boolean} = {};
  const chars = ["а", "б", "в", "г", "ґ", "д", "е", "є", "ж", "з", "и", "і", "ї", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х","ц","ч","ш","щ","ь","ю", "я" ];
  for (let a = 0; a< chars.length; a++){
    ret[chars[a]] = true;
  }
  return ret;
})();



export interface Letter {
  text: string;
  state: LetterState;
}

export interface Try {
  letters: Letter[];

}

enum LetterState {
  WRONG,
  PARTIAL_MATCH,
  FULL_MATCH,
  PENDING,
}

@Component({
    selector: 'app-slovko',
    templateUrl: './slovko.component.html',
    styleUrls: ['./slovko.component.scss'],
    standalone: false
})
export class SlovkoComponent implements OnInit {
  isDataLoaded :boolean = false;
  errorMessage = '';
  words : WordInterface[] = []
  readonly tries: Try[] =[];

  private currentLetterIndex = 0;
  private numSubmittedTries = 0;
  readonly LetterState = LetterState;

  constructor(private slovkoService: SlovkoService) {
    for (let i = 0; i < NUM_TRIES; i++){
      const letters: Letter[]=[]
      for (let j = 0; j < WORD_LENGTH; j++){
        letters.push({text: '', state: LetterState.PENDING})
      }
      this.tries.push({letters})
    }



  }

  getSome() {
    return 'some';
  }

  ngOnInit(): void {
    this.loadWords();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event : KeyboardEvent){
    this.handleClickKey(event.key);
  }


  private  handleClickKey(key: string){
    if(LETTERS[key.toLowerCase()]){
      if (this.currentLetterIndex < (this.numSubmittedTries + 1) * WORD_LENGTH){
        this.setLetter(key);
        this.currentLetterIndex++;
      }
    }
    else if(key === 'Backspace'){
      if (this.currentLetterIndex > (this.numSubmittedTries * WORD_LENGTH) ){
        this.currentLetterIndex--;
        this.setLetter('');

      }
    }
  }
  private setLetter(letter: string){
    const tryIndex = Math.floor(this.currentLetterIndex / WORD_LENGTH);
    const letterIndex = this.currentLetterIndex - tryIndex * WORD_LENGTH;
    this.tries[tryIndex].letters[letterIndex].text = letter;
  }

  submitTry() {
    this.words = [];
    this.isDataLoaded = false;
    this.errorMessage = '';

    if(this.numSubmittedTries < NUM_TRIES - 1) {
      this.numSubmittedTries++;
    }
    const requestBody: Try[] = []
    for(let i = 0; i < this.numSubmittedTries; i++){
      requestBody.push(this.tries[i]);
    }

     this.slovkoService.sendFilter(requestBody).subscribe({
       next: (response) =>{
         this.words = response;
         this.isDataLoaded = true;
       },
       error: () => {
         this.errorMessage = 'Could not load matching words.';
         this.isDataLoaded = true;
       }
     });

  }

  onLetterClick(tryIndex : number, letterIndex: number) {
    const letter = this.tries[tryIndex].letters[letterIndex];
    letter.state = letter.state === LetterState.PENDING
      ? LetterState.WRONG
      : letter.state + 1;
  }

  printChosenWord(chosenWord: WordInterface) {
    for(let i = 0; i < chosenWord.word.length; i++){
      if (this.currentLetterIndex >= (this.numSubmittedTries + 1) * WORD_LENGTH) {
        return;
      }

      this.setLetter(chosenWord.word[i]);
      this.currentLetterIndex++;
    }
  }

  private loadWords() {
    this.isDataLoaded = false;
    this.errorMessage = '';

    this.slovkoService.getWords().subscribe({
      next: (data : WordInterface[]) => {
        this.words = data;
        this.isDataLoaded = true;
      },
      error: () => {
        this.errorMessage = 'Could not load words.';
        this.isDataLoaded = true;
      }
    });
  }
}
