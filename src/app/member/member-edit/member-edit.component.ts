import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Member } from '../member';
import { MemberForm } from '../member-form';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit, OnDestroy {
  destroySource = new Subject<boolean>();
  destroy$ = new Observable<boolean>();
  form: any;
  loading = false;

  id: any = '';
  member: Member = {} as Member;
  blankMember: Member = { legalName: '', firstName: '', lastName: '', accountType: '' } as Member;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private fb: FormBuilder,
  ) {
    this.destroy$ = this.destroySource.asObservable();
  }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '0';
    if (this.id === '0') {
      this.member = this.blankMember;
      this.buildForm(this.member);
      this.loading = false;
    } else {
      this.getMember(this.id);
    }
  }

  ngOnDestroy(): void {
    this.destroySource.next(true);
    this.destroySource.complete();
  }

  buildForm(member: Member) {
    this.form = this.fb.group({
      legalName: this.fb.control(this.member.legalName || '', Validators.required),
      firstName: this.fb.control(this.member.firstName || '', Validators.required),
      lastName: this.fb.control(this.member.lastName || '', Validators.required),
      accountType: this.fb.control(this.member.accountType || '', Validators.required)
    });
  }

  getMember(id: string) {
    this.memberService.getMember(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: this.memberSuccess,
        error: this.memberFailure
      });
  }

  memberSuccess = (member: Member) => {
    this.member = member;
    this.buildForm(this.member);
    this.loading = false;
  }

  memberPostSuccess = (member: Member) => {
    this.loading = false;
    this.router.navigateByUrl('/member');
  }

  memberPutSuccess = (member: Member) => {
    this.loading = false;
    this.router.navigateByUrl('/member');
  }

  memberFailure = (error: any) => {
    this.loading = false;
    console.error(error);
  }

  onSave() {
    this.loading = true;
    this.member = this.form.getRawValue();
    if (this.id === '0') {
      this.memberService.postMember(this.member)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: this.memberPostSuccess,
          error: this.memberFailure
        });
    } else {
      this.memberService.putMember(this.id, this.member)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: this.memberPutSuccess,
          error: this.memberFailure
        });
    }
  }
}
