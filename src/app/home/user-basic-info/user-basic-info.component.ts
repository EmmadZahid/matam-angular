import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from 'src/app/shared/services/localstore.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss']
})
export class UserBasicInfoComponent implements OnInit {
  public userName:string = ''
  constructor(private authService:AuthService) { }

  ngOnInit() {
    let user:User = this.authService.getLoggedInUser()
    if(user){
      this.userName = user.fullname
    }
  }
}
