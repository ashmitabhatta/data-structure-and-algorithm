import { Component } from '@angular/core';
import { UserInfo } from '../../shared/user-info';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule],
  templateUrl: './template-forms.component.html',
  styleUrl: './template-forms.component.scss'
})
export class TemplateFormsComponent {

  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 0,
    passport: '',
    fullAddress: '',
    city: '',
    postCode: 0
  }

}
