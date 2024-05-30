import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page: number = 1;
  itemsPerPages: number = 10;
  searchText:any='';
  userList:any[]=[];
  deleteModal:any;
  userId:any;
  constructor(private service:AdminsideServiceService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.FetchUserList();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeMissionModal')
    );
  }

  async FetchUserList() {
    console.log('Inside Comp ------------');
  
    try {
      const data: any = await this.service.UserList().toPromise();
      console.log('data: ', data);
      this.userList = data;
  
      if (data.result === 1) {
        console.log('this.userList', this.userList);
        console.log('data.data', data.data);
        this.userList = data.data;
      } else {
        this.toast.error({ detail: 'ERROR', summary: data.message, duration: 3000 });
      }
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err.error?.message || 'An error occurred';
      this.toast.error({ detail: 'ERROR', summary: errorMessage, duration: 3000 });
    }
  }
  /*FetchUserList(){
    this.service.UserList().subscribe((data:any)=>{
      console.log(data)
      if(data.result == 1)
      {
        this.userList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}));
  }*/

  showDeleteModel(userId: number){
    this.deleteModal.show();
    this.userId = userId;
  }
  
  CloseRemoveMissionModal(){
    this.deleteModal.hide();
  }
  DeleteUser(){
    this.service.DeleteUser(this.userId).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
            this.deleteModal.hide();
          window.location.reload();
          }, 1000);
      }
      else{
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}))
  }

}
