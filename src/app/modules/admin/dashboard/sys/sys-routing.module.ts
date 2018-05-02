import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';
import {DeptComponent} from './dept/dept.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'role', component: RoleComponent},
  {path: 'dept', component: DeptComponent},
  {path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
