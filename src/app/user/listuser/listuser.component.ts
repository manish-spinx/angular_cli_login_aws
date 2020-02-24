import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2'

// user service
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-listuser',
    templateUrl: 'listuser.component.html'
})

export class ListUserComponent implements OnInit 
{
    /**************datatable related variable*****************************************/
     currentPage = 1;
     totalItem = 0;
     offset = 0;
     smallnumPages = 0;
     page: any = 1;
     limit = 10;
     sort_type: any;
     sort_field: any;
     showPagination: Boolean = false;
     isDataLoading: Boolean = false;
     isFilter: Boolean = false;
     params: any = {};
     user_recordList: any = [];
     resData: any;
     fieldNameUsed: any;
     order_type: any = 'asc';
     objectKeys = Object.keys;
    /**************datatable related variable*****************************************/  
    selectedAll: any;
    selectedAll_checked:any = [];
    bulk_type:any=0;

    constructor
    (
        private fb: FormBuilder,
        private router: Router, 
        private _uservice:UserService,
        private toastrService: ToastrService
    ) 
    { 

    }

selectAll() 
{
    for (var i = 0; i < this.user_recordList.length; i++) 
    {
        this.user_recordList[i].selected = this.selectedAll;        

            if(this.selectedAll)
            {
            this.selectedAll_checked.push(this.user_recordList[i]._id);
            }
            else{
                let index = this.selectedAll_checked.indexOf(this.user_recordList[i]._id);
                if (index !== -1) {
                    this.selectedAll_checked.splice(index, 1);
                }
            }
    }
}

checkIfAllSelected_new(id,event)
{
    this.selectedAll = this.user_recordList.every(function(item:any) {
                    return item.selected == true;
                })

      if(event.target.checked)
      {
        this.selectedAll_checked.push(id);
      }
      else{
        let index = this.selectedAll_checked.indexOf(id);
        if (index !== -1) {
            this.selectedAll_checked.splice(index, 1);
        }
      }
}

bulk_action_apply()
{
    if(this.selectedAll_checked.length<=0)
    {
        this.toastrService.error('','Please Select Atleast One Record !');
    }
    else if(this.bulk_type<=0)
    {
        this.toastrService.error('','Please Select Bulk Action !');
    }
    else{
    let text_message = (this.bulk_type==1)?' Active':(this.bulk_type==2)?' Inactive':' Delete';
    text_message+=' user ?';

    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to apply bulk action for '+text_message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

            this._uservice.user_post('bulk_action_update_angular',{user_ids:this.selectedAll_checked,bulk_type:this.bulk_type}).subscribe(response => 
            {
                if(response['status']===200)
                {
                    this.bulk_type=0;
                    this.selectedAll=false;
                    this.getUserdataList(this.offset, this.limit);
                    this.selectedAll_checked = [];
                    this.user_recordList = [];
                    Swal.fire('User Management',response['message'],'success');
                } 
                
            }, err => {
            this.isDataLoading = false;
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) 
        {
            this.selectedAll=false;
            this.getUserdataList(this.offset, this.limit);
        }
      })

    }
    

   
}


async ngOnInit() { 
    await this.getUserdataList(this.offset, this.limit);
}

getUserdataList(offset: number, limit: number, resetPagination: Boolean = false) 
{

    this.isDataLoading = true;
    let sort;
    if (this.sort_type) 
    {
    sort = { 'colId': this.sort_field, 'sort': this.sort_type };
    } 
    else 
    {
    sort = {};
    }

    let filter = {};

    if (this.isFilter) 
    {
        filter = Object.assign({}, this.params);
    }


    this._uservice.getUserData(offset, limit, sort, filter).subscribe(response => 
    {
    this.isDataLoading = false;
    this.resData = response;

    if (response.status === 200) 
    {
        this.user_recordList = this.resData.data.rows;
        for (let i = 0; i < this.user_recordList.length; i++) 
        {
            const status = (this.user_recordList[i].status === 1) ? true : false;
            this.user_recordList[i].displayStatus = status;
        }

        if (this.offset === 0) {
        this.totalItem = this.resData.data.count;
        }

        this.showPagination = true;
        if (resetPagination) {
        this.currentPage = 1;
        }
    } 
    else 
        {
            //this.toastrService.error('', this.resData.message);
        }
    }, err => {
    this.isDataLoading = false;
    });
}

pageChanged(event: any, resetPagination: Boolean = false): void 
{
    this.page = event.page;
    this.offset = ((this.page - 1) * this.limit);
    this.getUserdataList(this.offset, this.limit, resetPagination);
}

sorting() 
{
    if (this.totalItem > 10) 
    {
      const event = { page: 1 };
      this.showPagination = false;
      this.pageChanged(event, true);
    }
}


/* This function is use for reset filter */
resetFilter() {
    this.params = {};
    if (this.isFilter) {
        this.isFilter = false;
        const event = { page: 1 };
        this.showPagination = false;
        this.pageChanged(event, true);
    }
}


/* This function is use for filter data */
filterData() 
{
    for (const propName in this.params) {
        if (this.params[propName] === null || this.params[propName] === undefined || this.params[propName] === "") {
        delete this.params[propName];
        }
    }

    /*Use for check that filter value has object contains */
    if (Object.keys(this.params).length === 0 && this.params.constructor === Object) {
        this.isFilter = false;
    } else {
        this.isFilter = true;
    }
    const event = { page: 1 };
    this.showPagination = false;
    this.pageChanged(event, true);
}


headerSort(field_name, order_type) 
{
    this.sort_field = field_name;
    if (!this.fieldNameUsed) 
    {
        this.fieldNameUsed = this.sort_field;
        this.sort_type = order_type;
        if (order_type === 'asc') 
        {
            this.order_type = 'desc';
        } else 
        {
            this.order_type = 'asc';
        }
    } else if (this.fieldNameUsed === field_name) 
    {
        this.sort_type = order_type;
        if (order_type === 'asc') {
            this.order_type = 'desc';
        } else {
            this.order_type = 'asc';
        }
    } else {
        this.fieldNameUsed = field_name;
        this.order_type = 'desc';
        this.sort_type = 'asc';
    }
        const event = { page: 1 };
        this.showPagination = false;
        this.pageChanged(event, true);
}

delete_user(id:any)
{
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete user ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

            this._uservice.user_post('delete_user_angular',{user_id:id}).subscribe(response => 
            {
                if(response['status']===200)
                {
                    this.getUserdataList(this.offset, this.limit);
                    Swal.fire('User Management',response['message'],'success');
                } 
                
            }, err => {
            this.isDataLoading = false;
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) 
        {
            this.getUserdataList(this.offset, this.limit);
        }
      })

//    this._uservice.user_post('delete_user_angular',{user_id:id}).subscribe(response => 
//     {
//         if(response['status']===200)
//         {
//             this.toastrService.success(response['message'],'User Management');
//             this.getUserdataList(this.offset, this.limit);
//         } 
        
//     }, err => {
//     this.isDataLoading = false;
//     });

}

updateStatus(status, Id, i, displayStatus)
{
    //console.log('------status----: '+status+'------id-----: '+Id+'----displayStatus------: '+displayStatus);

    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update user status ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        const statusVal = (status === 1) ? 0 : 1;

        if (result.value) {

            this._uservice.user_post('update_status_user_angular',{user_id:Id,value: statusVal}).subscribe(response => 
            {
                if(response['status']===200)
                {
                    this.toastrService.success('User Update successfully', 'User Management');
                    this.getUserdataList(this.offset, this.limit);
                } 
                
            }, err => {
            this.isDataLoading = false;
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) 
        {
            this.getUserdataList(this.offset, this.limit);
        }
      })


}

}