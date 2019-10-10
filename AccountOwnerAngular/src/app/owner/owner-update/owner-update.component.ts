import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Owner } from 'src/app/_interface/owner.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.scss']
})
export class OwnerUpdateComponent implements OnInit {
  public owner: Owner;
  public ownerForm: FormGroup;
  private dialogConfig;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      terminationDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ])
    });

    this.getOwnerById();
  }

  private getOwnerById() {
    const ownerId = this.activateRoute.snapshot.params['id'];

    const ownerByIdUrl = `api/owner/${ownerId}`;

    this.repository.getData(ownerByIdUrl).subscribe(
      res => {
        this.owner = res as Owner;
        this.ownerForm.patchValue(this.owner);
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public updateOwner(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate(ownerFormValue) {
    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = ownerFormValue.dateOfBirth;
    this.owner.address = ownerFormValue.address;
    this.owner.hireDate = ownerFormValue.hireDate;
    this.owner.terminationDate = ownerFormValue.terminationDate;

    let apiUrl = `api/owner/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );
        console.log(ownerFormValue);

        // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog
        dialogRef.afterClosed().subscribe(result => {
          this.location.back();
        });
      },
      error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      }
    );
  }
}
