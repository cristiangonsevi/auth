import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';
import { CHANGEIMAGEREQUESTACTION } from 'src/app/state/profile/profile.actions';
import { getImage, getIsLoadingImg } from 'src/app/state/profile/profile.reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  host = environment;
  form!: UntypedFormGroup;
  isUploadingImg: Observable<boolean> = new Observable();
  imgUploaded: Observable<string | null> = new Observable();
  isChangingPassword: boolean = false;
  @ViewChild('password') password!: ElementRef;
  constructor(
    private _userService: UserService,
    private _fb: UntypedFormBuilder,
    private _sweetAlert: SweetAlertService,
    private _localStorageService: LocalStorageService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
    this.isUploadingImg = this._store.select(getIsLoadingImg)
    this.imgUploaded = this._store.select(getImage)   
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      bio: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
    });
    this.form.patchValue(this.currentUser);
  }
  onSubmit(value: any): any {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        if (this.form.controls[key].invalid) {
          this.form.controls[key].markAsTouched();
        }
      });
      return this._sweetAlert.toast({
        title: 'Error',
        text: 'Please fill all required fields',
        icon: 'error',
      });
    }
    this._userService.updateUserData(value, this.currentUser.id).subscribe({
      next: (resp) => this.handleResponse(resp),
      error: (err) => console.log(err),
    });
  }
  handleResponse(resp: any) {
    this._localStorageService.setItem('currentDataUser', resp.data);
    this._sweetAlert.toast({
      title: 'Information updated successfully!',
      icon: 'success',
    });
  }
  uploadImage(event: any) {
    // this.isUploadingImg = !this.isUploadingImg;
    const [file] = event.target.files;
    const formData = new FormData();
    formData.append('image', file);
    this._store.dispatch(
      CHANGEIMAGEREQUESTACTION({ image: formData, userId: this.currentUser.id })
    );
    // this._userService
    //   .updatedUserImage(formData, this.currentUser.id)
    //   .subscribe({
    //     next: (resp) => this.handleUpdateUserImage(resp),
    //     error: (err) => console.log(err),
    //   });
  }
  handleUpdateUserImage(resp: any) {
    // this.isUploadingImg = false;
    this.currentUser.image = resp.file.filename;
    this._localStorageService.setItem('currentDataUser', this.currentUser);
    this._sweetAlert.toast({
      title: 'Image updated successfully!',
      icon: 'success',
    });
  }
  changePassword(): any {
    const password = this.password.nativeElement.value;
    if (!password) {
      return this._sweetAlert.toast({
        title: "Password musn't be empty",
        icon: 'error',
      });
    }
    this._userService
      .updateUserPassword({ password }, this.currentUser.id)
      .subscribe({
        next: (resp) => this.handleUpdateUserPassword(resp),
        error: (err) => console.log(err),
      });
  }
  handleUpdateUserPassword(resp: any) {
    this.isChangingPassword = false;
    this._sweetAlert.toast({
      title: 'Password updated successfully!',
      icon: 'success',
    });
  }
}
