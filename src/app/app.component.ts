import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ParserService } from './services/parser.service';

import { ParsingResults } from '../models/parse-results.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { containerEnd } from '@angular/core/src/render3/instructions';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  TODO = 
    [
     'Guard blocks',
     'Guarded blocks',
     'Pet intercepts'
    ];

  fileExt: string[] = ["txt, log"];
  API_VERSION = 'v2.0';

  constructor(
    private parserService: ParserService
  ) {}

  resultsForPage: ParsingResults;



  dpsChartData:Array<any> = [];
  dpsChartLabels:Array<any> = [];
  dpsChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  dpsChartColors:Array<any> = [
    {
      backgroundColor: '#4286f4',
      borderColor: '#4286f4',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]
  dpsLegend: boolean = false;


  craftingChartData: any[] = [];
  craftingLabels:Array<any> = ['Fail', '94', '95', '96', '97', '98', '99', '100'];


  xpChartData: any[] = [];
  xpChartColors = {
    domain: ['#156489','#b57506','#dd8e07','#f8ac29','#fac364','#fbd491','#fde5bd','#dc0d0e']
  }
  xpShowXAxis = true;


  errorMessageList = [];
  isParsing = false;
  logFileName = '';
  logFileContent = '';
  showingLogFile = false;

  currentlyParsedFile: File;

  resultsIncludeCombat = false;
  resultsIncludeMoney = false;
  resultsIncludeRvr = false;


  ngOnInit() {
  }

  pushDataToCharts(castedResults: ParsingResults) {
    this.dpsChartData = [{data: castedResults.Combat.ChartData.Values, label:'Total Dmg'}];
    setTimeout(() => {this.dpsChartLabels = castedResults.Combat.ChartData.Labels;}, 50);

    let tmpData = [];
    for (var i = 0; i < this.craftingLabels.length; i++) {
      let series = []
      for (var x = 0; x < castedResults.Crafting.Series.length; x++) {
        series.push( {
          "name": castedResults.Crafting.Series[x],
          "value": castedResults.Crafting.Values[x][i]
        })
      }
      tmpData.push( {
        "name": this.craftingLabels[i],
        "series": series
      })
    }

    this.craftingChartData = tmpData;

    this.xpChartData = castedResults.PvE.XP;
    this.xpShowXAxis = castedResults.PvE.XP.length < 75;
  }

  checkResultsForCombat(castedResults: ParsingResults) {
    let hasPhysical = castedResults.Combat.PhysicalAttack.TotalAttacks > 0;
    let hasCasting = castedResults.Combat.CasterAttack.TotalAttacks > 0;
    let hasDefense = castedResults.Combat.Defense.TotalAttacks > 0;
    let hasHealing = this.checkResultsForRvr(castedResults);

    return hasPhysical || hasCasting || hasDefense || hasHealing;
  }

  checkResultsForMoney(castedResults: ParsingResults) {
    let hasMoneyValue = false;
    castedResults.PvE.Monies.Loot.forEach(denom => {
      if (denom) {
        hasMoneyValue = true;
      }
    })

    if (hasMoneyValue) {
      return true;
    }

    castedResults.PvE.Monies.Expense.forEach(denom => {
      if (denom) {
        hasMoneyValue = true;
      }
    })

    if (hasMoneyValue) {
      return true;
    }

    castedResults.PvE.Monies.Income.forEach(denom => {
      if (denom) {
        hasMoneyValue = true;
      }
    })

    return hasMoneyValue;

  }

  checkResultsForRvr(castedResults: ParsingResults) {
    let containsHealing = castedResults.Combat.Healing.Delivered > 0
      || castedResults.Combat.Healing.Received > 0
      || castedResults.Combat.Healing.Lifetapped > 0;

    let containsDeathRpsKills = castedResults.Combat.Summary.Deaths > 0
      || castedResults.Combat.Summary.RPs > 0
      || castedResults.Combat.Summary.DeathblowCount > 0;

    return containsHealing || containsDeathRpsKills;
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

  dpsChartClicked(ev: any) {
    let ts = this.dpsChartLabels[ev.active[0]._index];
    console.log(ts)
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', ts);
      e.preventDefault();
      // document.removeEventListener('copy');
    });
    document.execCommand('copy');
    // console.log(ev)
  }

  checkIfNameIsPlayer(name: string) {
    if (name.indexOf(' ') > -1) {
      return false;
    }

    if (name[0] != name[0].toUpperCase()) {
      return false;
    }

    return true;
  }

  tabChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel == 'Crafting' || event.tab.textLabel == 'XP') {
      window.dispatchEvent(new Event('resize'));
    }
  }

  fileSelected(event) {
    this.showingLogFile = false;
    this.logFileContent = '';
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.currentlyParsedFile = fileList[0];
      this.logFileName = this.currentlyParsedFile.name;
      this.isParsing = true;
      this.parserService.sendFileToParse(this.currentlyParsedFile, this.API_VERSION)
        .subscribe(
          (results: any) => {
            this.isParsing = false;
            if (results['Errors']) {
              alert('This page is out of date. Please refresh the page and try again. \rWindows key combination: Ctrl + F5')
            }
            else {
              let messages = results['Messages']
              if (messages) {
                this.errorMessageList = messages;
              }
              let castedResults = results as ParsingResults;
              if (castedResults) {
                this.resultsForPage = castedResults;
                this.pushDataToCharts(castedResults);
                this.resultsIncludeCombat = this.checkResultsForCombat(castedResults);
                this.resultsIncludeMoney = this.checkResultsForMoney(castedResults);
                this.resultsIncludeRvr = this.checkResultsForRvr(castedResults);
              }
            }
          },
          (error: any) => {
            alert('Error parsing your log file. Please try again. If the problem persists, please contact system admin.');
            this.isParsing = false;
            this.resultsForPage = null;
          }
        )
    }
  }

  showLogFile() {
    this.logFileContent = 'Loading...'
    this.showingLogFile = true;
    let reader = new FileReader();
    reader.readAsText(this.currentlyParsedFile);
    let me = this;
    reader.onload = function () {
      me.logFileContent = reader.result;
    }
  }
}
