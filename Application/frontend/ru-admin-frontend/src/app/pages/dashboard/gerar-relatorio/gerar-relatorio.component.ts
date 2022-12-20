import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GenReportService } from 'src/app/services/gen-report.service';
import { MatStartDate } from '@angular/material/datepicker';
import { buffer } from 'rxjs';
import { saveAs } from "file-saver";

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

  ngOnInit(): void { }

  gerarRelatorioAlunos() {
    if (this.range.value.start != null && this.range.value.end != null) {
      let start = this.range.value.start!.toString()
      let end = this.range.value.end!.toString()
      let startFiltered = start.substring(8, 15)
      let endFiltered = end.substring(8, 15)
      console.log(startFiltered)
      console.log(endFiltered)
    }
  }

  gerarRelatorioDiario() {
    let startDate: string = ""
    let endDate: string = ""

    if (this.range.value.start != null || this.range.value.end != null) {
      startDate = this.range.value.start!.getFullYear().toString() + "-" + 
      (this.range.value.start!.getMonth() + 1).toString() + "-" +
      this.range.value.start!.getDate().toString() 
      endDate = this.range.value.end!.getFullYear().toString() + "-" + 
       (this.range.value.end!.getMonth() + 1).toString() + "-" +
       this.range.value.end!.getDate().toString() 
      
        
    }
    console.log(startDate)
    console.log(endDate)
    console.log(this.range.value)

    this.reportService.getDailyReport({
      startDate: startDate,
      endDate: endDate
    }).subscribe((buffer) => {
      console.log(buffer);
      const data: Blob = new Blob([buffer], {
        type: "text/csv;charset=utf-8"
      });
      // you may improve this code to customize the name 
      // of the export based on date or some other factors
      saveAs(data, "relatorio_diario.csv");
    });
  }
}
