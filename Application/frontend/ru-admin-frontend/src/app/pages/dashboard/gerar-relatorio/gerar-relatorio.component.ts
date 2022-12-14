import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GenReportService } from 'src/app/services/gen-report.service';
import { MatStartDate } from '@angular/material/datepicker';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.scss']
})
export class GerarRelatorioComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private reportService: GenReportService) { }

  ngOnInit(): void {}

  gerarRelatorioAlunos(){
    if(this.range.value.start != null && this.range.value.end != null){
      let start = this.range.value.start!.toString()
      let end = this.range.value.end!.toString()
      let startFiltered = start.substring(8,15)
      let endFiltered = start.substring(8,15)
      console.log(startFiltered)
      console.log(endFiltered)
      console.log(this.range.value.end)
      console.log(this.range.value.start)
    }
  }

  gerarRelatorioDiario(){
    let startDate: string = ""
    let endDate: string = ""

    if(this.range.value.start != null || this.range.value.end != null) {
      startDate = this.range.value.start!.getFullYear().toString() + "-" +
                              this.range.value.start!.getMonth().toString() +  "-" +
                              this.range.value.start!.getDay().toString()
      endDate   = this.range.value.start!.getFullYear().toString() + "-" +
                              this.range.value.start!.getMonth().toString() + "-" +
                              this.range.value.start!.getDay().toString()
    }

    this.reportService.getDailyReport({
      startDate: startDate,
      endDate: endDate}).subscribe(data => {})
  }
}
