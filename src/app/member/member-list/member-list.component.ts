import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  destroySource = new Subject<boolean>();
  destroy$ = new Observable<boolean>();
  components: Member[] = [];
  filterLegalName = '';
  filterFirstName = '';
  filterLastName = '';
  filterAccountType = '';
  loading = false;

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {
    this.destroy$ = this.destroySource.asObservable();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getMembers();
  }

  ngOnDestroy(): void {
    this.destroySource.next(true);
    this.destroySource.complete();
  }

  getMembers() {
    this.memberService.getMembers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: this.memberSuccess, error: this.memberFailure });
  }

  memberSuccess = (members: Member[]) => {
    this.components = members as Member[];
    this.loading = false;
  }

  memberFailure = (error: any) => {
    console.error(error);
  }

  onEdit(key: number) {
    this.router.navigateByUrl('/member/edit/' + key.toString());
  }

  onAdd() {
    this.router.navigateByUrl('/member/edit/0');
  }

  onDelete(key: number) {
    this.memberService.deleteMember(key)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(e => this.router.navigateByUrl('/member'));
        },
        error: (err) => console.log(err)
      });
  }
}
