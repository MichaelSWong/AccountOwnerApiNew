import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from 'src/app/_interface/owner.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'name',
    'dateOfBirth',
    'address',
    'details',
    'update',
    'delete'
  ];

  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/owner').subscribe(
      res => {
        this.dataSource.data = res as Owner[];
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  };

  public redirectToDetails = (id: string) => {
    const url = `/owner/details/${id}`;
    this.router.navigate([url]);
  };

  public redirectToUpdate = (id: string) => {
    const updateUrl = `/owner/update/${id}`;
    this.router.navigate([updateUrl]);
  };

  public redirectToDelete = (id: string) => {};

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
