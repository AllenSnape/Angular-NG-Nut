import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule, NzCheckboxModule} from 'ng-zorro-antd';
import {UserComponent} from './user/user.component';
import {SysRoutingModule} from './sys-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoleComponent } from './role/role.component';

@NgModule({
  imports: [
    // 公共
    CommonModule,
    // 路由
    SysRoutingModule,
    // 表单模块
    FormsModule,
    ReactiveFormsModule,
    // ng-zorro
    NgZorroAntdModule,
  ],
  declarations: [
    UserComponent,
    RoleComponent
  ]
})
export class SysModule { }
