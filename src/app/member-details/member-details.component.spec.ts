import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let backButton: any;
  // let submitButton: any;
  let editButton: any;
  let deleteButton: any;
  let service: AppService;

  const mockRoute = {
    path: 'memberdetails',
    params: of(1)
  };
  const mockTeam = [
    'MockTeam'
  ];

  const selectors = {
    submit: '#submit',
    back: '#back',
    edit: '#edit',
    delete: '#delete'
  };
  const mockSubmit = {
    'firstName': 'Greg',
    'lastName': 'Forney',
    'jobTitle': 'Test',
    'team': 'Formula 2 - Car 54',
    'status': 'Inactive'
  };
  const mockEmployee = {
    'firstName': 'Greg',
    'lastName': 'Forney',
    'jobTitle': 'Test',
    'team': 'Formula 2 - Car 54',
    'status': 'Inactive',
    'id': 4
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        MemberDetailsComponent,
        {provide: ActivatedRoute, useValue: mockRoute},
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));


  beforeEach(() => {
    service = new AppService(null);
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    spyOn(service, 'getTeams').and.returnValue({subscribe: () => {mockTeam}});
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('backButton', () => {
    beforeEach(async() => {
      fixture = TestBed.createComponent(MemberDetailsComponent);
      component = fixture.componentInstance;
      backButton = fixture.debugElement.query(By.css(selectors.back));
      backButton.nativeElement.click();
      fixture.detectChanges();
    });
    it('different view for specific employee', () => {
      expect(component.goToMembersPage).toHaveBeenCalled;
    });
  });
  // TODO this is causing infinite loops in testing
  // describe('submitButton', () => {
  //   beforeEach(async() => {
  //     fixture = TestBed.createComponent(MemberDetailsComponent);
  //     component = fixture.componentInstance;
  //     submitButton = fixture.debugElement.query(By.css(selectors.submit));
  //     submitButton.nativeElement.click();
  //     fixture.detectChanges();
  //   });
  //   it('different view for specific employee', () => {
  //     expect(component.onSubmit).toHaveBeenCalled;
  //   });
  // })
  describe('deleteButton', () => {
    beforeEach(async() => {
      fixture = TestBed.createComponent(MemberDetailsComponent);
      component = fixture.componentInstance;
      component.employeeID = 1;
      component.employeeInformation = mockEmployee;
      spyOn(service, 'getMember').and.returnValue({subscribe: () => {mockTeam}});
      fixture.detectChanges();
      deleteButton = fixture.debugElement.query(By.css(selectors.delete));
      deleteButton.nativeElement.click();
      fixture.detectChanges();
    });
    it('different view for specific employee', () => {
      expect(component.onPut).toHaveBeenCalled;
    });
  })
  describe('editButton', () => {
    beforeEach(async() => {
      fixture = TestBed.createComponent(MemberDetailsComponent);
      component = fixture.componentInstance;
      component.employeeID = 4;
      component.employeeInformation = mockEmployee;
      spyOn(service, 'getMember').and.returnValue({subscribe: () => {mockTeam}});
      fixture.detectChanges();
      editButton = fixture.debugElement.query(By.css(selectors.edit));
      editButton.nativeElement.click();
      fixture.detectChanges();
    });
    it('different view for specific employee', () => {
      expect(component.onPut).toHaveBeenCalled;
    });
  })

});
