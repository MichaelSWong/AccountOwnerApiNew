import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_interface/owner.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: Owner;
  public showAccounts;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getOwnerDetails();
  }
  /* tslint:disable:no-string-literal */
  private getOwnerDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl = `api/owner/${id}/account`;
    /* tslint:enable:no-string-literal */
    this.repository.getData(apiUrl).subscribe(
      res => {
        this.owner = res as Owner;
      },
      error => {
        this.errorHandler.handleError(error);
      }
    );
  };
}
