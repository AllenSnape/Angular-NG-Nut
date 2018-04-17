import {Injectable, Injector} from '@angular/core';
import {CommonService} from '../../base/services/common.service';
import {Utils} from '../../base/utils/utils';
import {HttpService} from '../../base/services/http.service';
import {environment} from '../../../environments/environment';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs/Observable';

/**
 * 管理员平台的路由
 * @type {{login: string}}
 */
export const ADMIN_ROUTES = {
  // 登录界面
  login:        '/admin/passport/login',
  // 首页
  dashboard:    '/admin/dashboard/home'
};

/**
 * 寄存在公共服务中的请求头信息
 * @type {string}
 */
export const COMMON_DATA_HEADERS_KEY = 'as_ng_nut_admin_COMMON_DATA_HEADERS_KEY';

@Injectable()
export class AdminService {

  /**
   * 管理员登录token在localStorage中的key
   * @type {string}
   */
  private USER_DATA_LOCAL_STORAGE_KEY = 'as_ng_nut_admin_USER_DATA_LOCAL_STORAGE_KEY';

  /**
   * 当前登录的管理员
   * @type {null}
   */
  public user = null;

  constructor(
    private injector:     Injector,
    private cs:           CommonService,
    private http:         HttpService,
    private msg:          NzMessageService,
  ) { }

  /**
   * 设置当前登陆的管理员
   * @param {string} token             管理员登录之后的token; 为null时使用localStorage中的token进行操作
   */
  public loginUser(token?: string): Observable<Object> {
    // 失败时返回的订阅
    const errorObs = () => {
      this.gotoLogin();
      return new Observable<Object>(
      (subscriber) => {
          subscriber.error('token不存在!');
        }
      );
    };

    // 检查是否指定token
    if (!Utils.hasText(token)) {
      try {
        // 未指定token时从localStorage中获取token
        const user = JSON.parse(window.localStorage.getItem(this.USER_DATA_LOCAL_STORAGE_KEY));
        // localStorage也不存在token时跳转至登录界面
        if (user === null || !Utils.hasText(user.token)) {
          return errorObs();
        }
        token = user.token;
      } catch (e) {
        console.error('整理localStorage已登录管理员失败! err', e);
        return errorObs();
      }
    }

    // 设置http请求头
    this.cs.setData(COMMON_DATA_HEADERS_KEY, {Authorization: 'Bearer Web ' + token});

    // 返回订阅对象
    return new Observable<Object>((subscriber) => {
      // 获取管理员信息
      this.http.post(environment.http.urls.user.current, null).subscribe(
        (res: any) => {
          if (res.code === environment.http.rescodes.ok) {
            // 获取数据
            this.user = Utils.referencable(res.data) ? res.data : {};
            this.user.token = token;
            // 放入localStorage
            window.localStorage.setItem(this.USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(this.user));
            // 触发回调
            subscriber.next(res);
          } else {
            this.msg.warning('获取您的信息失败! err: ' + res.msg);
            subscriber.error(res);
            this.gotoLogin();
          }
        }
      );
    });
  }

  /**
   * 登出当前管理员
   */
  public logoutUser() {
    this.user = null;
    window.localStorage.removeItem(this.USER_DATA_LOCAL_STORAGE_KEY);
    this.gotoLogin();
  }

  /**
   * 获取当前登录的管理员信息
   * @param {boolean} nonCheck      是否检查; false且当前管理员不存在, 则会跳转至登录界面
   * @param {Function} notLogined   没有对应登录的用户时候的回调, 返回true时才跳转至登录界面
   * @returns {any}
   */
  public getUser(nonCheck: boolean = false, notLogined?: Function) {
    if (this.user === null && !nonCheck) {
      if (notLogined === null) {
        this.gotoLogin();
      } else {
        if (notLogined.call(this)) {
          this.gotoLogin();
        }
      }
    }
    return this.user;
  }

  /**
   * 跳转至登录界面
   */
  public gotoLogin() {
    this.cs.goto(ADMIN_ROUTES.login);
  }

}
