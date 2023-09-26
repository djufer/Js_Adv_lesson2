import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrls: ['./lesson2.component.scss'],
})
export class Lesson2Component {
  // регулярка для перевірки інпутів
  public loginRegex: RegExp = /^[a-zA-Z_][a-zA-Z0-9_]{4,14}$/;
  public passwordRegex: RegExp = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  public emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // змінні для значень в інпути
  public inputLogin: string = '';
  public inputPassword: string = '';
  public inputEmail: string = '';

  // змінні класу для стилізації бордерів кольорами відповідно до коректності введення
  public classForLog!: string;
  public classForPassw!: string;
  public classForEm!: string;
  // ------ методи фокусації інпутів
  focusedLogInput(): void {
    this.classForLog = 'defaultInput';
  }
  focusedPasswInput(): void {
    this.classForPassw = 'defaultInput';
  }
  focusedEmailInput(): void {
    this.classForEm = 'defaultInput';
  }
  // ------------------------------------

  isWarningLog(): void {
    this.classForLog = this.loginRegex.test(this.inputLogin)
      ? 'correctInput'
      : 'incorrectInput';
  }
  isWarningPassw(): void {
    this.classForPassw = this.passwordRegex.test(this.inputPassword)
      ? 'correctInput'
      : 'incorrectInput';
    console.log('fffffdfff');
      
  }
  isWarningEm(): void {
    this.classForEm = this.emailRegex.test(this.inputEmail)
      ? 'correctInput'
      : 'incorrectInput';
  }

  public showAddUserBtn = true;
  // номер рядка таблиці для редагування
  public rowNum!: number;

  user = {
    login: '',
    password: '',
    email: '',
  };

  public arrAll: any[] = [];

  addUser(): void {
    if (
      this.loginRegex.test(this.inputLogin) &&
      this.passwordRegex.test(this.inputPassword) &&
      this.emailRegex.test(this.inputEmail)
    ) {
      this.user.login = this.inputLogin;
      this.user.password = this.inputPassword;
      this.user.email = this.inputEmail;

      this.arrAll.push({ ...this.user });

      this.inputLogin = '';
      this.inputPassword = '';
      this.inputEmail = '';
    } else {
      alert('Невірне введення');
    }
  }

  // метод що приховує велику кнопку "Add user" і показує "Edit user", також тут визначається змінна рядка, на якому клікнути, щоб знати який рядок масиву редагувати/видаляти.
  showEditBtn(rowNum: number): void {
    this.showAddUserBtn = false;
    // дістаємо номер рядка з індекса масиву
    this.rowNum = rowNum;
    // вносимо дані з масиву в інпути для подальшого редагування
    this.inputLogin = this.arrAll[this.rowNum].login;
    this.inputPassword = this.arrAll[this.rowNum].password;
    this.inputEmail = this.arrAll[this.rowNum].email;
  }
  editRow(): void {
    this.arrAll[this.rowNum].login = this.inputLogin;
    this.arrAll[this.rowNum].password = this.inputPassword;
    this.arrAll[this.rowNum].email = this.inputEmail;
  }
  hideEditBtn(): void {
    this.showAddUserBtn = true;
  }
  // метод для видалення рядка
  deletRow(rowNum: number): void {
    this.rowNum = rowNum;
    this.arrAll.splice(rowNum, 1);
  }
}
