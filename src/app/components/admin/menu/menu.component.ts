import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Observable<firebase.User>

  constructor( private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.authUser();
  }

  sair(){
    this.authService.logout().then( () => {
      this.router.navigate(["/"]);
    })
  }

}
