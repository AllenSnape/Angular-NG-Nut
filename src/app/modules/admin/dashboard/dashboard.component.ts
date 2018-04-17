import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CommonService} from '../../../base/services/common.service';
import {ADMIN_ROUTES, AdminService} from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private COMPONENT_NAME = 'AdminDashboardComponent';

  /**
   * 菜单是否折叠
   * @type {boolean}
   */
  public isCollapsed = false;

  constructor(
    private title:            Title,
    private cs:               CommonService,
    private as:               AdminService,
  ) {
    this.title.setTitle('管理平台');

    // 获取管理员信息
    if (this.as.getUser(true) === null) {
      // 打开遮罩
      this.cs.mask = true;
      // 请求登录
      this.as.loginUser().subscribe(
        () => {
          // 关闭mask
          this.cs.mask = false;
          this.cs.goto(ADMIN_ROUTES.dashboard);
        },
        () => {
          // 关闭mask
          this.cs.mask = false;
          this.as.gotoLogin();
        }
      );
    }
  }

  ngOnInit() {
    this.cs.registerComponent(this.COMPONENT_NAME, this);
  }

  ngOnDestroy(): void {
    this.cs.unregisterComponent(this.COMPONENT_NAME);
  }

  /**
   * 登出
   */
  public logout() {
    this.as.logoutUser();
  }

}
