import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { Auth } from 'aws-amplify';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {}
  signIn(providerName: string){
    Auth.federatedSignIn({customProvider: providerName}).then(data=> console.log(data))
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      console.log(authState, authData)
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
