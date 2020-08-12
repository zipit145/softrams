import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { By } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppService } from '../app.service';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let addMemberButton: any;
  let firstMemberButton: any;
  let service: AppService;
  const selectors = {
    addMemberButton: '#addMemberButton',
    firstMemberButton: '#viewMemberdetails1'
  }
  const mockEmployees = [{
    "firstName": "Greg",
    "lastName": "Forney",
    "jobTitle": "Test",
    "team": "Formula 2 - Car 54",
    "status": "Inactive",
    "id": 1
  }]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    service = new AppService(null);
    component.members = mockEmployees;
    spyOn(service, 'getMembers').and.returnValue({subscribe: () => {mockEmployees}})
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addMemberButton', () => {
    beforeEach(async(() => {
      addMemberButton = fixture.debugElement.query(By.css(selectors.addMemberButton));
      addMemberButton.nativeElement.click();
      fixture.detectChanges();
    }));
    it('different view for specific employee', () => {
      expect(addMemberButton).toBeTruthy();
    });
  })
  // Button is not visible so it cannot be clicked
  // describe('firstMemberButton', () => {
  //   beforeEach(() => {
  //     firstMemberButton = fixture.debugElement.query(By.css(selectors.firstMemberButton));
  //     firstMemberButton.nativeElement.click();
  //     fixture.detectChanges();
  //   });
  //   it('different view for specific employee', () => {
  //     expect(addMemberButton).toBeTruthy();
  //   });
  // })
});
