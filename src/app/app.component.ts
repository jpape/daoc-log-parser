import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop';
import { ParserService } from './services/parser.service';

import { ParsingResults } from '../models/parse-results.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @Input() fileExt: string = "TXT, LOG";

  constructor(
    private formBuilder: FormBuilder,
    private parserService: ParserService
  ) {}

  resultsForPage: ParsingResults;

  todoList = [
    'Determine if bleed damage is distinct from proc/spell damage',
    'Wild healing?',
    'How is kill-count determined?',
    'Pet damage',
    'Style growth rates / dmg',
    'Unassigned crits',
  ]

  errorMessageList = []


  ngOnInit() {
  }


  fileSelected(event) {
    let fileList: FileList = event.target.files;
    let file = fileList[0];
    this.parserService.sendFileToParse(file)
      .subscribe(
        (results: any) => {
          let messages = results['Messages']
          if (messages) {
            this.errorMessageList = messages;
          }
          let castedResults = results['Results'] as ParsingResults;
          if (castedResults) {
            this.resultsForPage = castedResults;
          }
        }
      )
  }


  currencyPrintHelper(currency_dict) {
    let result_text = '';
    if (currency_dict[0] > 0) {
        result_text += currency_dict[0] + 'p ';
    } 
    if (currency_dict[1] > 0) {
        result_text += currency_dict[1] + 'g ';
    }
    if (currency_dict[2] > 0) {
        result_text += currency_dict[2] + 's ';
    }
    if (currency_dict[3] > 0) {
        result_text += currency_dict[3] + 'c';
    }
    return result_text
  }
}
