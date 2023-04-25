import { Component,OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private interval: any;
  title = 'sistema-encuesta-frontend';

  constructor(public login:LoginService,private sessionService: SessionService) { }

  ngOnInit(): void {
    this.startInterval();
    document.addEventListener("mousemove", this.resetInterval.bind(this));
  }
  private startInterval(): void {
    this.interval = setInterval(() => {
      if (this.sessionService.isUserInactive()) {
        this.logout();
      }
    }, 10000);
  }
  private resetInterval(): void {
    this.sessionService.updateLastActivityTime();
    clearInterval(this.interval);
    this.startInterval();
  }
  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
