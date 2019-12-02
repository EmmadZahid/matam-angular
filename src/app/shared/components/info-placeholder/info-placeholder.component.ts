import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-placeholder',
  templateUrl: './info-placeholder.component.html',
  styleUrls: ['./info-placeholder.component.scss']
})
export class InfoPlaceholderComponent implements OnInit {
  @Input() title:string;
  @Input() subTitle:string;
  @Input() imagePath:string;
  constructor() { }

  ngOnInit() {
  }

}
