import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;


  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  employeeID: any;
  employeeInformation: {
    id: any;
    firstName: string;
    lastName: string;
    team: string;
    jobTitle: string;
    status: string;
  };

  constructor(private fb: FormBuilder, private AppService: AppService, private router: Router, private route: ActivatedRoute) {
    this.employeeID = null;
    this.employeeInformation = null;
  }

  ngOnInit() {
    this.memberForm = this.createNewFormGroup();
    this.AppService.getTeams().subscribe(teams => (this.teams = teams));
      this.route.params.subscribe(params => {
        this.employeeID = params['id'];
      })
    if (this.employeeID) {
      this.AppService.getMember(this.employeeID).subscribe(member => {
        this.employeeInformation = member;
        this.memberForm = this.createEmployeeFormGroup();
      })
    }
  }

  ngOnChanges() {}

  public createEmployeeFormGroup() {
    return this.fb.group({
      firstName: [this.employeeInformation.firstName, [Validators.required, Validators.minLength(1)]],
      lastName: [this.employeeInformation.lastName, [Validators.required, Validators.minLength(1)]],
      jobTitle: [this.employeeInformation.jobTitle, [Validators.required, Validators.minLength(1)]],
      team: [this.employeeInformation.team, [Validators.required, Validators.minLength(1)]],
      status: [this.employeeInformation.status, [Validators.required, Validators.minLength(1)]],
    })
  }

  public createNewFormGroup() {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      jobTitle: ['', [Validators.required, Validators.minLength(1)]],
      team: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  goToMembersPage(){
    this.router.navigate(['/members'])
  }

  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    this.AppService.addMember(this.memberModel);
    this.router.navigate(['/members']);
  }
  onPut(employeeID ,form: FormGroup) {
    this.memberModel = form.value;
    this.AppService.editMember(employeeID, this.memberModel);
    this.router.navigate(['/members']);
  }

  onDelete(employeeID) {
    this.AppService.deleteMember(employeeID);
    this.router.navigate(['/members']);
  }
};
