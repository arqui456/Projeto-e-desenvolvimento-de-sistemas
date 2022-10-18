import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon: string = '';
  @Input() color: string = '';
  // @Input() size: number = 16;

  constructor() { }

  ngOnInit(): void {
  }

}
