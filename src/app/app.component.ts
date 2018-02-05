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

  chartData:Array<any> = [
    {data: [0],
    label:'Total Dmg'}
  ];
  chartLabels:Array<any> = ['[00:00:00]']
  chartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  chartType:string = 'bar';
  chartLegend:boolean = false;
  chartColors:Array<any> = [
    {
      backgroundColor: '#4286f4',
      borderColor: '#4286f4',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]

  craftingLabels = ['Fail', '94', '95', '96', '97', '98', '99', '100'];
  craftingSeries = [];
  craftingData = [];

  isParsing = false;

  todoList = [
    'Determine if bleed damage is distinct from proc/spell damage',
    'Wild healing?',
    'How is kill-count determined?',
    'Pet damage'
  ]

  errorMessageList = []



  ngOnInit() {
  }


  fileSelected(event) {
    this.isParsing = true;
    let fileList: FileList = event.target.files;
    let file = fileList[0];
    this.parserService.sendFileToParse(file)
      .subscribe(
        (results: any) => {
          this.isParsing = false;
          let messages = results['Messages']
          if (messages) {
            this.errorMessageList = messages;
          }
          let castedResults = results['Results'] as ParsingResults;
          if (castedResults) {
            this.resultsForPage = castedResults;
            this.pushResultsToDataSources(castedResults);
            
          }
        }
      )
  }

  pushResultsToDataSources(castedResults) {
    this.chartData = [{data: castedResults.Combat.ChartData.Values, label:'Total Dmg'}];
    setTimeout(() => {this.chartLabels = castedResults.Combat.ChartData.Labels;}, 50);

    this.craftingSeries = castedResults.Crafting.Series;
    this.craftingData = castedResults.Crafting.Values;
  
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

  checkIfNameIsPlayer(name) {
    if (name.indexOf(' ') > -1) {
      return false;
    }

    if (name[0] != name[0].toUpperCase()) {
      return false;
    }

    return true;
  }

  tabChange(event) {
    alert('Tab changed')
  }
}
