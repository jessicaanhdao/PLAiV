import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() error : string
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
  onClose():void {
    this.activeModal.close('closed');
  }



  onDismiss(reason : String):void {
    this.activeModal.dismiss(reason);
  }
}
