import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export class Allocation {
  constructor(
    public start?: Date,
    public end?: Date,
    public type?: string,
    public station?: number
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class AllocationServiceService {
  constructor(private http: HttpClient) {}
  getAllocationData() {
    return this.http.get<string[]>('http://localhost:5001/allocationData')
  }


  sendSMS() {
    return this.http.get<string>('http://localhost:5001/send_sms');
  }
}


