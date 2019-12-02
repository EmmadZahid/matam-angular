import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    //Timer just for delay. Quick logout does not feel good :D
    setTimeout(()=>{
      this.authService.logout()
    }, 500)
  }
}
