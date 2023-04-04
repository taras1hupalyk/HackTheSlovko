import {Component, HostListener, OnInit} from '@angular/core';
import {SlovkoService} from "../slovko.service";
import {HttpClient} from "@angular/common/http";
import {WordInterface} from "../types/word.interface";
import { environment } from 'src/environments/environment';

const WORD_LENGTH = 5;
const NUM_TRIES = 6;


const LETTERS = (() => {
  const ret: {[key: string]: boolean} = {};
  const chars = ["а", "б", "в", "г", "ґ", "д", "е", "є", "ж", "з", "и", "і", "ї", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х","ц","ч","ш","щ","ь","ю", "я" ];
  for (let a = 0; a< chars.length; a++){
    ret[chars[a]] = true;
  }
  console.log(ret);
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
  styleUrls: ['./slovko.component.scss']
})
export class SlovkoComponent implements OnInit {
  baseUrl = environment.baseUrl;
  isDataLoaded :boolean = false;
  words : WordInterface[] = []
  readonly tries: Try[] =[];

  private currentLetterIndex = 0;
  private numSubmittedTries = 0;
  readonly LetterState = LetterState;

  constructor( private http : HttpClient, private  slovkoService: SlovkoService) {
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
    this.http.get<WordInterface[]>(`${this.baseUrl}/words`)
      .subscribe((data : WordInterface[]) => {
        console.log('res', data)
        this.words = data
        this.isDataLoaded =true;
      });

    console.log('in on init' , this.words);
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
        console.log(this.currentLetterIndex);
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

    if(this.numSubmittedTries < NUM_TRIES - 1) {
      this.numSubmittedTries++;
    }
    console.log(this.numSubmittedTries );
    let requestBody: Try[] = []
    for(let i = 0; i < this.numSubmittedTries; i++){
      requestBody.push(this.tries[i]);
    }

     this.slovkoService.SendFilter(requestBody).subscribe((response) =>{
       this.words = response;
      this.isDataLoaded = true;
     });

  }

  onLetterClick(event : any) {
      console.log(event.target.id);
      let chosenNumTry = event.target.id[0];
      let chosenNumLetter = event.target.id[1];

    function changeLetterState(state: number) {
      if (state == 3){
        return 0;
      }
      else {
        return state + 1;
      }
    }

    this.tries[chosenNumTry].letters[chosenNumLetter].state = changeLetterState(this.tries[chosenNumTry].letters[chosenNumLetter].state);
    console.log(this.tries[chosenNumTry].letters[chosenNumLetter].state)
    console.log(this.tries)
  }

  printChosenWord(chosenWord: WordInterface) {
    console.log('chosen word is ' + chosenWord);
    for(let i = 0; i < chosenWord.value.length; i++){
      console.log(chosenWord.value[i])
      this.setLetter(chosenWord.value[i]);
      this.currentLetterIndex++;
    }
  }
}
