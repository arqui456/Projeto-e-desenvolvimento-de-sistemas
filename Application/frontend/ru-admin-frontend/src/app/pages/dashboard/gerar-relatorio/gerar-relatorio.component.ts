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
  snackBar: any;
  constructor(private reportService: GenReportService) { }

  ngOnInit(): void { }

  gerarRelatorioDiario() {
    if (this.range.value.start != null && this.range.value.end != null) {
      let start = this.range.value.start!.toString()
      let end = this.range.value.end!.toString()
      let startFiltered = start.substring(8, 15)
      let endFiltered = end.substring(8, 15)
    }
  }

  gerarRelatorioAlunos() {
    let startDate: string = ""
    let endDate: string = ""

    if (this.range.value.start != null || this.range.value.end != null) { 
      startDate = this.range.value.start!.toISOString().split('T')[0]

      endDate = this.range.value.end!.toISOString().split('T')[0]
    }

    this.reportService.getDailyReport({
      startDate: startDate,
      endDate: endDate
    }).subscribe((buffer) => {
      if(!buffer){
        this.reportService.showMessage('Erro: Não foi possível gerar o relatório.',true,'center','bottom' );
      }
      else{
        const data: Blob = new Blob([buffer], {
          type: "text/csv;charset=utf-8"
        });
        saveAs(data, "relatorio_por_cpf.csv");
      }
     
    });
  }
}
