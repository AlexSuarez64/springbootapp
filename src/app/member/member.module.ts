import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { MemberRoutingModule } from './member-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MemberService } from './member.service';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MemberRoutingModule
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule { }
